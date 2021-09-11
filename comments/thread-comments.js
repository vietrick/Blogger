$(function() {
  var url = window.location.href,
    str = $('.toplevel-thread .top-comment-wrap>ol>li'),
    l = '',
    id = '',
    li = '',
    m = 5, // Số bình luận hiển thị chính
    n = str.length,
    k = 0,
    p = 0
	$("#top-continue").removeClass("hidden");
  // Gọi iframe khi click vào nút reply
  $('.comment a.comment-reply').click(function(e) {
	top_li = $(this).parent().parent()
    l = $('#comment-editor').attr('src')
    $('.cancel-reply').remove()
    $('.comment-actions .comment-reply').removeAttr('style')
    //$('#top-continue.continue').hide()
    var $this = $(this), id = $this.attr('data-comment-id')
    l = l + '&parentID=' + id
    li = $this.parent().parent().parent().attr('id')
    $('#comment-editor').attr('src', l)
    $this.hide()
	$('#top-continue').next().addClass('hidden');
	
    //$('#comment-editor').appendTo($('#' + li + '>.comment-replybox-single'))
	
	top_li.find('.comment-replybox-single').first().append($('#comment-editor'));
	
	top_li.find('.comment-replybox-single').first().append('<div class="cancel-reply"><button class="cancel-button" type="button">Cancel</button></div>');
	
    //$('#' + li + '>.comment-replybox-single').append('<div class="calcel-reply"><button class="theme-button green" type="button">Hủy</button></div>')
	//top_li.append('<div class="cancel-reply"><button class="cancel-button" type="button">Cancel</button></div>')
	
    $('.cancel-reply').click(function() {
      //$(this).remove();
	  $('.cancel-reply').remove()
      $('.comment-actions .comment-reply,#top-continue.continue,#top-ce').removeAttr('style');
      $('#comment-editor').appendTo($('#top-ce'))
	  
    })
	$("#top-ce").attr("style","display:none")
  })
  // Gọi iframe khi click vào nút Thêm nhận xét dưới cùng
  $('#top-continue.continue>a.comment-reply').click(function(e) {
    e.preventDefault()
    $(this).parent().hide(),$("#top-ce").hide()
    $('#comments .cancel-reply').remove()
	$('.comment-thread > .comment-replybox-thread').removeClass('hidden');
    $('.comment-actions').removeAttr('style')
    $('#comment-editor').appendTo($(this).parent().next())
	$('.comment-replybox-thread').append('<div class="cancel-reply"><button class="cancel-button" type="button">Cancel</button></div>')
	
    $('.cancel-reply').click(function() {
      //$(this).remove()
	  $('#comments .cancel-reply').remove()
	  $('#top-continue.continue').removeClass('hidden');
	  $('.comment-thread > .comment-replybox-thread').addClass('hidden');
	  $("#top-ce").removeClass('hidden');
	  $('.comment-actions .comment-reply,#top-continue.continue,#top-ce').removeAttr('style');
      $('#comment-editor').appendTo($('#top-ce'))
    })
  })
  
  // Xử lý địa chỉ trình duyệt nếu có liên kết đến bình luận
  if (url.indexOf('?showComment') != -1) {
    if (url.indexOf('#c') != -1) {
      var li = '#' + url.substring(url.indexOf('#c') + 1, url.length)
      if ($(li).parents('.comment-thread').hasClass('thirdlevel-thread')) {
        k = $(li).parents('li').parents('li').index()
      } else if ($(li).parents('.comment-thread').hasClass('secondlevel-thread')) {
        k = $(li).parents('li').index()
      } else {
        k = $(li).index()
      }
      if (k >= m) {
        for (var i = 0; i < k + 1; i++) {
          $(str[i]).removeClass('hidden')
        }
      } else {
        for (var i = 0; i < m; i++) {
          $(str[i]).removeClass('hidden')
        }
      }
      if (k < n) {
        $('#comments .loadmore').removeClass('hidden')
      }
    } else {
      for (var i = 0; i < m; i++) {
        $(str[i]).removeClass('hidden')
      }
      if (n > m) {
        $('#comments .loadmore').removeClass('hidden')
      }
    }
  } else {
    for (var i = 0; i < m; i++) {
      $(str[i]).removeClass('hidden')
    }
    if (n > m) {
      $('#comments .loadmore').removeClass('hidden')
    }
  }
  // Loadmore comments 
  $('#comments .loadmore>a').click(function() {
    p = $('.toplevel-thread .top-comment-wrap>ol>li.comment.hidden').length
    k = n - p
    if (p == 0) {
	  $('div.loadmore a').addClass('hidden')
    } else {
		if( $('#comment-sortbox').prop("checked") == true ) {
		 for (var i = p-1; i >= p-m; i--) {
			$(str[i]).slideToggle(200),$(str[i]).removeClass('hidden'),$(str[i]).removeAttr('style')
		  }
		  
		} else {
		  for (var i = k; i < k + m; i++) {
			$(str[i]).slideToggle(200),$(str[i]).removeClass('hidden'),$(str[i]).removeAttr('style')
			
		  }
		}
    }
	
  });

//Toggle comment orders
$(".commentSort").click(function(){$(".comment-control").toggleClass("top"),$(".top-comment-wrap > .loadmore").slideToggle();var e=$(".toplevel-thread .top-comment-wrap>ol>li.comment").length;if(p=$(".toplevel-thread .top-comment-wrap>ol>li.comment.hidden").length,$(".toplevel-thread .top-comment-wrap>ol>li.comment").addClass("hidden"),1==$("#comment-sortbox").prop("checked"))for(var o=0;o<e-p;o++)$(str[o]).removeClass("hidden");else for(o=e-1;o>=p;o--)$(str[o]).removeClass("hidden")});

})
