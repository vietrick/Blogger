
/*! Anchor Jumping */
var target = window.location.hash.replace('#', '');
window.location.hash = "";// delete hash so the page won't scroll to it
$(window).on('load', function() {
	target&&$("html, body").animate({scrollTop:$("#"+target).offset().top},700,"swing",function(){});
	$('a[href*="#"]:not(".tocify-wrap a")').on("click",function(h){let e=this.hash,t=new URL(this.href),o=new URL(window.location.href);t.hash="",o.hash="",e&&$(e).length&&t.href==o.href&&(h.preventDefault(),$("html, body").animate({scrollTop:$(e).offset().top-10},750))});
});


function copyFunction(){
document.getElementById("getlink").style.display="inline-block";
document.getElementById("getlink").select(),document.execCommand("copy");
document.getElementById("getlink").style.display="none";

document.getElementById("LinkCopy").classList.add('copied');

setTimeout(function () {
            document.getElementById("LinkCopy").classList.remove('copied');
        }, 3000);
};

function shortCodeIfy(e, t, a) {
    for (var s = e.split("$"), o = /[^{\}]+(?=})/g, i = 0; i < s.length; i++) {
        var r = s[i].split("=");
        if (r[0].trim() == t) return null != (a = r[1]).match(o) && String(a.match(o)).trim()
    }
    return !1
}

function msgError() {
    return '<span class="error-msg"><b>Error:</b>&nbsp;No Results Found</span>'
}

function beforeLoader() {
    return '<div class="loader"></div>'
}

function getFeedUrl(e, t, a, s) {
    switch (a) {
        case "recent":
            s = "/feeds/posts/default?alt=json&max-results=" + t;
            break;
        default:
            s = "comments" == e ? "/feeds/comments/default?alt=json&max-results=" + t : "/feeds/posts/default/-/" + a + "?alt=json&max-results=" + t
    }
    return s
}

function getPostLink(e, t) {
    for (var a = 0; a < e[t].link.length; a++)
        if ("alternate" == e[t].link[a].rel) {
            var s = e[t].link[a].href;
            break
        } return s
}

function getPostTitle(e, t, a) {
    return e[t].title.$t ? e[t].title.$t : exportify.noTitle
}

function getPostTag(e, t, a) {
    return e[t].category ? '<span class="entry-category">' + e[t].category[0].term + "</span>" : ""
}

function getPostAuthor(e, t, a, s) {
    return s = "" != exportify.postAuthorLabel ? '<span class="sp">' + exportify.postAuthorLabel + "</span>" : "", exportify.postAuthor ? '<span class="entry-author mi">' + s + '<span class="author-name">' + e[t].author[0].name.$t + "</span></span>" : ""
}

function getPostDate(e, t, a, s, o, i) {
    monthNames = "undefined" != typeof monthNames ? monthNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], dateFormat = "undefined" != typeof dateFormat ? dateFormat : "{m} {d}, {y}";
    var r = e[t].published.$t,
        n = r.substring(0, 4),
        l = r.substring(5, 7),
        c = r.substring(8, 10),
        d = dateFormat.replace("{m}", monthNames[parseInt(l, 10) - 1]).replace("{d}", c).replace("{y}", n);
    return i = exportify.postAuthor && "" != exportify.postDateLabel ? '<span class="sp">' + exportify.postDateLabel + "</span>" : "", [1 == exportify.postDate ? '<span class="entry-time mi">' + i + '<time class="published" datetime="' + r + '">' + d + "</time></span>" : "", 1 == exportify.postDate ? '<span class="entry-time mi"><time class="published" datetime="' + r + '">' + d + "</time></span>" : ""]
}

function getPostMeta(e, t, a, s, o) {
	if (a[s].thr$total !== undefined){
	var cc="";("related"==o||o=="block")&&a[s].thr$total.$t>0&&(cc="<span class='cmt-count'>"+a[s].thr$total.$t+"</span>");}else{var cc="";}
    return [1 == exportify.postAuthor || 1 == exportify.postDate ? '<div class="entry-meta">' + e + t[0] + "</div>" : "", 1 == exportify.postDate ? '<div class="entry-meta">' + t[1] + cc +"</div>" : ""]
}

function getFirstImage(e, t) {
    var a = $("<div>").html(e).find("img:first").attr("src"),
        s = a.lastIndexOf("/") || 0,
        o = a.lastIndexOf("/", s - 1) || 0,
        i = a.substring(0, o),
        r = a.substring(o, s),
        n = a.substring(s);
    return (r.match(/\/s[0-9]+/g) || r.match(/\/w[0-9]+/g) || "/d" == r) && (r = "/w72-h72-p-k-no-nu"), i + r + n
}

function getPostImage(e, t, a, s) {
    var o = null != e[t].content ? e[t].content.$t : "";
    return a = e[t].media$thumbnail ? e[t].media$thumbnail.url : "https://resources.blogblog.com/img/blank.gif", o.indexOf(o.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) > -1 ? o.indexOf("<img") > -1 ? o.indexOf(o.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) < o.indexOf("<img") ? a.replace("img.youtube.com", "i.ytimg.com").replace("/default.", "/maxresdefault.") : getFirstImage(o) : a.replace("img.youtube.com", "i.ytimg.com").replace("/default.", "/maxresdefault.") : o.indexOf("<img") > -1 ? getFirstImage(o) : "https://resources.blogblog.com/img/blank.gif"
}

function getPostImageType(e, t) {
    return e.match("i.ytimg.com") ? "is-video" : "is-image"
}

function getPostSummary(e, t, a, s, o, i) {
    return e[t].content ? '<span class="entry-excerpt excerpt">' + $("<div>").html(e[t].content.$t).text().trim().substr(0, a) + "…</span>" : ""
}

function getPostComments(e, t, a, s) {
    var o = e[t].author[0].name.$t,
        i = e[t].author[0].gd$image.src.replace("/s113", "/s72-c").replace("/s220", "/s72-c"),
        r = e[t].title.$t;
    return (i.match("//img1.blogblog.com/img/blank.gif") || i.match("//img1.blogblog.com/img/b16-rounded.gif")) && (i = "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/w72-h72-p-k-no-nu/avatar.jpg"), '<div class="cmm1-item item-' + t + '"><a class="entry-inner wrap-all-link" href="' + a + '" title="' + o + '"><span class="entry-image-wrap cmm-avatar"><span class="entry-thumb" data-image="' + i + '"></span></span><div class="entry-header"><h2 class="entry-title cmm-title">' + o + '</h2><p class="cmm-snippet excerpt">' + r + "</p></div></a></div>"
}

function getAjax(e, t, a, s,la) 
{
	"related"==t&&(a=parseInt(a)+1);
    switch (t) {
        case "msimple":
        case "ticker":
        case "featured":
        case "block":
        case "grid":
        case "video":
        case "list":
        case "default":
        case "mini":
        case "comments":
        case "related":
            0 == s && (s = "geterror404");
            var o = getFeedUrl(t, a, s);
            $.ajax({
                url: o,
                type: "GET",
                dataType: "json",
                cache: !0,
                beforeSend: function(a) {
                    switch (t) {
                        case "ticker":
                        case "featured":
                        case "block":
                        case "grid":
                        case "video":
                        case "list":
                        case "default":
                        case "mini":
                        case "comments":
                        case "related":
                            e.html(beforeLoader()).parent().addClass("type-" + t)
                    }
                },
                success: function(a) {
                    var o = "",rc=-1,l = a.feed.entry;
					if ("related" == t && null != l) for (var c = 0, n = l; c < n.length; c++) clink == n[c].link.slice(-1)[0].href && (rc = c);
                    switch (t) {
                        case "msimple":
                            o = '<div class="ul mega-items">';
                            break;
                        case "ticker":
                            o = '<div class="ticker-items">';
                            break;
                        case "featured":
                            o = '<div class="featured-items">';
                            break;
                        case "block":
                        case "grid":
                        case "list":
                        case "video":
                            o = '<div class="content-block ' + t + '-items">';
                            break;
                        case "default":
                            o = '<div class="default-items">';
                            break;
                        case "mini":
                            o = '<div class="mini-items">';
                            break;
                        case "comments":
                            o = '<div class="cmm1-items">';
                            break;
                        case "related":
                            o = '<div class="related-posts">'
                    }
					
                    var i = a.feed.entry;
					
                    if (null != i)
                        for (var r = 0, n = i; r < n.length; r++) {
                            n.length;
                            var l = getPostLink(n, r),
                                c = getPostTitle(n, r),
                                d = getPostTag(n, r),
                                m = getPostAuthor(n, r),
                                f = getPostDate(n, r, d),
                                h = getPostImage(n, r),
                                p = getPostImageType(h, r),
                                u = getPostMeta(m, f, n,r,t),
                                g = "";
                            switch (t) {
                                case "msimple":
                                    g += '<div class="mega-item post"><a title="' + c + '" class="entry-image-wrap  ' + p + '" href="' + l + '"><svg class="entry-thumb" viewBox="0 0 16 9" data-image="' + h + '"/></a><h2 class="entry-title"><a href="' + l + '" title="' + c + '">' + c + "</a></h2>" + u[1] + "</div>";
                                    break;
                                case "ticker":
                                    g += '<div class="ticker-item item-' + r + '"><h2 class="entry-title"><a href="' + l + '" title="' + c + '">' + c + "</a></h2></div>";
                                    break;
                                case "featured":
                                    g += '<div class="featured-item cs item-' + r + '"><a class="featured-inner" href="' + l + '" title="' + c + '"><span class="entry-image-wrap before-mask ' + p + '"><span class="entry-thumb" data-image="' + h + '"></span></span><div class="entry-header entry-info">' + d + '<h2 class="entry-title">' + c + "</h2>" + u[0] + "</div></a></div>";
                                    break;
                                case "block":
                                    switch (r) {
										case 1:
                                            g += '<div class="block-item item-' + r + '"><a title="' + c + '" class="entry-image-wrap  ' + p + '" href="' + l + '"><svg class="entry-thumb" viewBox="0 0 16 9" data-image="' + h + '"/></a><div class="entry-header">'+ u[1] +'<h2 class="entry-title"><a href="' + l + '" title="' + c + '">' + c + "</a></h2>" + getPostSummary(n, r, 160) + "</div></div>"
                                            break;
										default:
											g += '<div class="block-item item-' + r + '"><a title="' + c + '" class="entry-image-wrap  ' + p + '" href="' + l + '"><svg class="entry-thumb" viewBox="0 0 16 9" data-image="' + h + '"/></a><div class="entry-header">' + u[1] + '<h2 class="entry-title"><a href="' + l + '" title="' + c + '">' + c + "</a></h2></div></div>"
                                    }
                                    break;
                                case "grid":
                                    g += '<div class="grid-item item-' + r + '"><a title="' + c + '" class="entry-image-wrap  ' + p + '" href="' + l + '"><svg class="entry-thumb" viewBox="0 0 16 9" data-image="' + h + '"/></a><div class="entry-header"><h2 class="entry-title"><a title="' + c + '" href="' + l + '">' + c + "</a></h2>" + u[1] + "</div></div>";
                                    break;
                                case "list":
                                    g += '<div class="list-item item-' + r + '"><a title="' + c + '" class="entry-image-wrap  ' + p + '" href="' + l + '"><svg class="entry-thumb" viewBox="0 0 16 9" data-image="' + h + '"/></a><div class="entry-header"><h2 class="entry-title"><a title="' + c + '" href="' + l + '">' + c + "</a></h2>" + getPostSummary(n, r, 120) + u[0] + "</div></div>";
                                    break;
                                case "video":
                                    g += '<div class="video-item item-' + r + '"><a title="' + c + '" class="entry-image-wrap  is-video" href="' + l + '"><svg class="entry-thumb" viewBox="0 0 16 9" data-image="' + h + '"/></a><div class="entry-header"><h2 class="entry-title"><a title="' + c + '" href="' + l + '">' + c + "</a></h2>" + u[1] + "</div></div>";
                                    break;
                                case "default":
                                    g += '<div class="default-item ds item-' + r + '"><a title="' + c + '" class="entry-image-wrap  ' + p + '" href="' + l + '"><svg class="entry-thumb" viewBox="0 0 16 9" data-image="' + h + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + l + '" title="' + c + '">' + c + "</a></h2>" + u[1] + "</div></div>";
                                    break;
                                case "mini":
                                    g += '<div class="mini-item item-' + r + '"><a title="' + c + '" class="entry-image-wrap  ' + p + '" href="' + l + '"><svg class="entry-thumb" viewBox="0 0 16 9" data-image="' + h + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + l + '" title="' + c + '">' + c + "</a></h2>" + u[1] + "</div></div>";
                                    break;
                                case "comments":
                                    g += getPostComments(n, r, l);
                                    break;
                                case "related":
									//var cc = n[r].thr$total.$t;console.log('comment count:'+c+cc);
									if (n.length > 1 && (r == rc || rc < 0 && r == n.length - 1)) continue;
                                    //g += '<div class="related-item item-' + r + '"><a title="' + c + '" class="entry-image-wrap ' + p + '" href="' + l + '"><span class="entry-thumb" data-image="' + h + '"></span></a><div class="entry-header"><h2 class="entry-title"><a href="' + l + '" title="' + c + '">' + c + "</a></h2>" + u[1] + "</div></div>"
									g += '<div class="related-item item-' + r + '"><a title="' + c + '" class="entry-image-wrap  ' + p + '" href="' + l + '"><svg class="entry-thumb" width="100" height="62.5" viewBox="0 0 16 9" width="" data-image="' + h + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + l + '" title="' + c + '">' + c + "</a></h2>" + u[1] + "</div></div>"
                            }
                            o += g
                        } else switch (t) {
                            case "msimple":
                                o = '<div class="ul mega-items no-items">' + msgError() + "</div>";
                                break;
                            default:
                                o = msgError()
                        }
                    switch (t) {
                        case "msimple":
                            o += "</div>", e.append(o).addClass("msimple"), e.find("a:first").attr("href", function(e, t) {
                                switch (s) {
                                    case "recent":
                                        t = t.replace(t, "/search");
                                        break;
                                    default:
                                        t = t.replace(t, "/search/label/" + s)
                                }
                                return t
                            });
                            break;
                        case "ticker":
                            o += "</div>", e.html(o).tickerify();
                            break;
                        default:
                            o += "</div>", e.html(o)
                    }
                    e.find("span.entry-thumb,svg.entry-thumb").lazyify()
                },
                error: function() {
                    switch (t) {
                        case "msimple":
                            e.append('<div class="ul mega-items no-items">' + msgError() + "</div>");
                            break;
                        default:
                            e.html(msgError())
                    }
                }
            })
    }
}

function ajaxMega(e, t, a, s, o) {
    if (o.match("getcontent")) {
        if ("msimple" == t) return getAjax(e, t, a, s);
        e.append('<div class="ul mega-items no-items">' + msgError() + "</div>")
    }
}

function ajaxTicker(e, t, a, s, o) {
    if (o.match("getcontent")) {
        if ("ticker" == t) return getAjax(e, t, a, s);
        e.html(msgError())
    }
}

function ajaxFeatured(e, t, a, s, o) {
    if (o.match("getcontent")) {
        if ("featured" == t) return getAjax(e, t, a, s);
        e.html(msgError())
    }
}

function ajaxBlock(e, t, a, s, o, i, r) {
    if (o.match("getcontent")) {
        if ("block" == t || "grid" == t || "list" == t || "video" == t) return 0 != s && (i = "recent" == s ? "/search" : "/search/label/" + s, r = "" != viewAllText.trim() ? viewAllText : exportify.viewAll, e.parent().find(".widget-title").append('<a href="' + i + '" class="wt-l">' + r + "</a>")), getAjax(e, t, a, s);
        e.html(msgError())
    }
}

function ajaxWidget(e, t, a, s, o) {
    if (o.match("getcontent")) {
        if ("default" == t || "mini" == t || "comments" == t) return getAjax(e, t, a, s);
        e.html(msgError())
    }
}

function ajaxRelated(e, t, a, s,la) {
    return getAjax(e, t, a, s,la)
}

function disqusComments(e) {
    var t = document.createElement("script");
    t.type = "text/javascript", t.async = !0, t.src = "//" + e + ".disqus.com/blogger_item.js", (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(t)
}

function beautiAvatar(e) {
    $(e).attr("src", function(e, t) {
        return t = (t = (t = t.replace("//resources.blogblog.com/img/blank.gif", "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s39/avatar.jpg")).replace("//lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35", "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s39/avatar.jpg")).replace("/s35", "/s39")
    })
}

function fixedSidebarIfy(e) {
    $(e).each(function(e) {
        fixedSidebar = "undefined" == typeof fixedSidebar || fixedSidebar, 1 == fixedSidebar && (e = 1 == fixedMenu ? 89 : 30, $(this).theiaStickySidebar({
            containerSelector: "#content-wrapper > .container",
            additionalMarginTop: e,
            additionalMarginBottom: 30
        }))
    })
}

fixedMenu = "undefined" == typeof fixedMenu || fixedMenu, viewAllText = "undefined" != typeof viewAllText ? viewAllText : exportify.viewAll, $("#vtrick-pro-main-nav").menuify(), $("#vtrick-pro-main-nav .widget").addClass("show-menu"), $(".show-search").on("click", function() {
    $("body").addClass("search-active"), $("#main-search-wrap").fadeIn(170).find("input").focus()
}), $(".search-close").on("click", function() {
    $("body").removeClass("search-active"), $("#main-search-wrap").fadeOut(170).find("input").blur()
}), $("html").each(function() {
    var e = $(this);
    darkMode = "undefined" != typeof darkMode && darkMode, userDarkMode = "undefined" == typeof userDarkMode || userDarkMode, 1 != darkMode && 0 != userDarkMode && ("dark" == localStorage.themeColor && e.addClass("is-dark"), $(".darkmode-toggle").on("click", function() {
        "dark" != localStorage.themeColor ? (e.addClass("is-dark"), localStorage.themeColor = "dark") : (e.removeClass("is-dark"), localStorage.themeColor = "light")
    }))
}), $("#ticker .PopularPosts .widget-content").tickerify(), $(".bp-title a.wt-l").each(function() {
    "" != viewAllText.trim() && $(this).text(viewAllText)
}), $(".sidebar .social-icons li a").each(function(e) {
    var t = $(this),
        a = t.attr("href").split("#");
    null != a[1] && "" != (e = a[1].trim()) && t.append('<span class="text">' + e + "</span>"), t.attr("href", a[0].trim())
}), $(".FollowByEmail .widget-content").each(function(e, t) {
    var a = $(this),
        s = a.data("shortcode");
    null != s && (e = shortCodeIfy(s, "title"), t = shortCodeIfy(s, "text"), 0 != e && a.find(".follow-by-email-title").text(e), 0 != t && a.find(".follow-by-email-text").text(t))
}), $(".post-body a").each(function() {
    var e = $(this),
        t = e.html(),
        a = t.toLowerCase(),
        s = shortCodeIfy(t, "text"),
        o = shortCodeIfy(t, "icon"),
        i = shortCodeIfy(t, "color");
    a.match("getbutton") && 0 != s && (e.addClass("button btn").text(s), 0 != o && e.addClass(o), 0 != i && e.addClass("colored-button").attr("style", "background-color:" + i + ";"))
}), $(".post-body b").each(function() {
    var e = $(this),
        t = e.text(),
        a = t.toLowerCase().trim();
	/*
    a.match(/(?:\$ads\=\{1\})/g) && e.replaceWith('<div id="vtrick-pro-new-before-ad"/>'), a.match(/(?:\$ads\=\{2\})/g) && e.replaceWith('<div id="vtrick-pro-new-after-ad"/>'), a.match("{tocify}") && (t = 0 != shortCodeIfy(t, "title") ? shortCodeIfy(t, "title") : "Table of Contents", e.replaceWith('<div class="tocify-wrap"><div class="tocify-inner"><a href="javascript:;" class="tocify-title" role="button" title="' + t + '"><span class="tocify-title-text">' + t + '</span></a><ol id="tocify"></ol></div></div>'), $(".tocify-title").each(function(e) {
        (e = $(this)).on("click", function() {
            e.toggleClass("is-expanded"), $("#tocify").slideToggle(170)
        })
    }), $("#tocify").toc({
        content: "#post-body",
        headings: "h2,h3,h4"
    }), $("#tocify li a").each(function(e) {
        (e = $(this)).click(function() {
            return $("html,body").animate({
                scrollTop: $(e.attr("href")).offset().top - 20
            }, 500), !1
        })
    })),
    */
    a.match("{contactform}") && (e.replaceWith('<div class="contact-form"/>'), $(".contact-form").append($("#ContactForm1"))), a.match("{leftsidebar}") && ($("body").addClass("is-left"), e.remove()), a.match("{rightsidebar}") && ($("body").addClass("is-right").removeClass("is-left"), e.remove()), a.match("{fullwidth}") && ($("body").addClass("no-sidebar"), e.remove())
}), $("#vtrick-pro-new-before-ad").each(function() {
    var e = $(this);
    e.length && $("#before-ad").appendTo(e)
}), $("#vtrick-pro-new-after-ad").each(function() {
    var e = $(this);
    e.length && $("#after-ad").appendTo(e)
}), $("#vtrick-pro-main-before-ad .widget").each(function() {
    var e = $(this);
    e.length && e.appendTo($("#before-ad"))
}), $("#vtrick-pro-main-after-ad .widget").each(function() {
    var e = $(this);
    e.length && e.appendTo($("#after-ad"))
}), $("#vtrick-pro-post-footer-ads .widget").each(function() {
    var e = $(this);
    e.length && e.appendTo($("#post-footer-ads"))
}), $(".post-body blockquote").each(function() {
    var e = $(this),
        t = e.text().toLowerCase().trim(),
        a = e.html();
    if (t.match("{alertsuccess}")) {
        const t = a.replace("{alertSuccess}", "");
        e.replaceWith('<div class="alert-message alert-success">' + t + "</div>")
    }
    if (t.match("{alertinfo}")) {
        const t = a.replace("{alertInfo}", "");
        e.replaceWith('<div class="alert-message alert-info">' + t + "</div>")
    }
    if (t.match("{alertwarning}")) {
        const t = a.replace("{alertWarning}", "");
        e.replaceWith('<div class="alert-message alert-warning">' + t + "</div>")
    }
    if (t.match("{alerterror}")) {
        const t = a.replace("{alertError}", "");
        e.replaceWith('<div class="alert-message alert-error">' + t + "</div>")
    }
    if (t.match("{codebox}")) {
        const t = a.replace("{codeBox}", "");
        e.replaceWith('<pre class="code-box">' + t + "</pre>")
    }
}), $(".post-body pre").each(function(){
var e=$(this),t=e.text().toLowerCase().trim(),i=e.html();
var lang=e.attr("lang")||"html";
if(e.is('[lang]')){e.replaceWith('<pre class="language-'+lang+'"><code>'+i+'</code></pre>')}

}), $(".entry-share-links .window-ify,.post-share .window-ify").on("click", function() {
    var e = $(this),
        t = e.data("url"),
        a = e.data("width"),
        s = e.data("height"),
        o = window.screen.width,
        i = window.screen.height,
        r = Math.round(o / 2 - a / 2),
        n = Math.round(i / 2 - s / 2);
    window.open(t, "_blank", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=" + a + ",height=" + s + ",left=" + r + ",top=" + n).focus()
}), $(".vtrick-pro-share-links").each(function() {
    var e = $(this);
    e.find(".show-hid a").on("click", function() {
        e.toggleClass("show-hidden")
    })
}), $(".about-author .author-text").each(function() {
    var e = $(this),
        t = e.find("a");
    t.each(function() {
        var e = $(this),
            t = e.text().trim(),
            a = e.attr("href");
        e.replaceWith('<li class="' + t + '"><a href="' + a + '" title="' + t + '" rel="noopener noreferrer" target="_blank"/></li>')
    }), t.length && e.parent().append('<ul class="author-links social social-color"></ul>'), e.find("li").appendTo(".author-links")
}), $("#vtrick-pro-main-nav-menu li.mega-menu").each(function(e, t) {
    var a = $(this),
        s = a.find("a").data("shortcode");
    null != s && (e = s.toLowerCase(), ajaxMega(a, "msimple", 5, shortCodeIfy(s, "label"), e))
}), $("#ticker .HTML .widget-content").each(function(e, t) {
    var a = $(this),
        s = $(window),
        o = a.data("shortcode");
    null != o && (mtc = o.toLowerCase(), e = shortCodeIfy(o, "results"), t = shortCodeIfy(o, "label"), s.on("load resize scroll", function o() {
        s.scrollTop() + s.height() >= a.offset().top && (s.off("load resize scroll", o), ajaxTicker(a, "ticker", e, t, mtc))
    }).trigger("scroll"))
}), $("#featured .HTML .widget-content").each(function(e) {
    var t = $(this),
        a = $(window),
        s = t.data("shortcode");
    null != s && (mtc = s.toLowerCase(), e = shortCodeIfy(s, "label"), a.on("load resize scroll", function s() {
        a.scrollTop() + a.height() >= t.offset().top && (a.off("load resize scroll", s), ajaxFeatured(t, "featured", 3, e, mtc))
    }).trigger("scroll"))
}), $(".content-section .HTML .widget-content").each(function(e, t, a) {
    var s = $(this),
        o = $(window),
        i = s.data("shortcode");
    null != i && (mtc = i.toLowerCase(), e = shortCodeIfy(i, "results"), t = shortCodeIfy(i, "label"), a = shortCodeIfy(i, "type"), o.on("load resize scroll", function i() {
        o.scrollTop() + o.height() >= s.offset().top && (o.off("load resize scroll", i), ajaxBlock(s, a, e, t, mtc))
    }).trigger("scroll"))
}), $(".vtrick-pro-widget-ready .HTML .widget-content").each(function(e, t, a, s) {
    var o = $(this),
        i = $(window),
        r = o.data("shortcode");
    null != r && (e = r.toLowerCase(), t = shortCodeIfy(r, "results"), a = shortCodeIfy(r, "label"), s = shortCodeIfy(r, "type"), i.on("load resize scroll", function r() {
        i.scrollTop() + i.height() >= o.offset().top && (i.off("load resize scroll", r), ajaxWidget(o, s, t, a, e))
    }).trigger("scroll"))
}), $("#vtrick-pro-related-posts .HTML").each(function(e, t) {
	var p_label =[];
	$( '.vtrick-pro-related-content meta' ).each( function() {
		p_label.push($(this).attr('content'));
	});
	
	
    var a = $(this).data("shortcode");
    if (null != a) {
        function s() {
            return e = shortCodeIfy(a, "title"), t = shortCodeIfy(a, "results"), [e, t]
        }
        $("#related-wrap").each(function(e, t) {
            var a = $(this),
                o = $(window),
                i = a.find(".vtrick-pro-related-content"),
                r = s();
            e = 0 != r[1] ? r[1] : 3, 0 != r[0] && a.find(".related-title .title > span").text(r[0]), t = a.find(".related-tag").data("label"), o.on("load resize scroll", function a() {
                o.scrollTop() + o.height() >= i.offset().top && (o.off("load resize scroll", a), ajaxRelated(i, "related", e, t,p_label))
            }).trigger("scroll")
        })
    }
}), $(".vtrick-pro-blog-post-comments").each(function() {
    var e = $(this),
        t = e.data("shortcode"),
        a = shortCodeIfy(t, "type"),
        s = "comments-system-" + a,
        o = e.find("#top-continue .comment-reply");
    switch (a) {
        case "disqus":
            var i = shortCodeIfy(t, "shortname");
            0 != i && (disqus_shortname = i), disqusComments(disqus_shortname), e.addClass(s).show();
            break;
        case "facebook":
            e.addClass(s).find("#comments").html('<div class="fb-comments" data-width="100%" data-href="' + disqus_blogger_current_url + '" order_by="time" data-numposts="5" data-lazy="true"></div>'), e.show();
            break;
        case "hide":
            e.hide();
            break;
        default:
            e.addClass("comments-system-blogger").show(), $(".entry-meta .entry-comments-link").addClass("show"), o.addClass("btn")
			//, beautiAvatar(".avatar-image-container img")
    }
	/*
    var r = e.find(".comments .comment-reply"),
        n = e.find(".comments #top-continue"),
        l = e.find("#top-ce.comment-replybox-thread");
    r.on("click", function() {
        n.show(), l.hide()
    }), n.on("click", function() {
        n.hide(), l.show()
    })
	*/
}), $(function() {
    $(".entry-image-wrap .entry-thumb,.author-avatar-wrap .author-avatar,#particle, .ratio-16-10").lazyify(), $("#vtrick-pro-mobile-menu").each(function() {
        var e = $(this),
            t = $("#vtrick-pro-main-nav-menu").clone();
        t.attr("id", "main-mobile-nav"), t.find(".mega-items").remove(), t.find(".mega-menu > a").each(function(e, t) {
            var a = $(this),
                s = a.data("shortcode");
            null != s && (t = "recent" == (e = shortCodeIfy(s.trim(), "label")) ? "/search" : "/search/label/" + e, a.attr("href", t))
        }), t.appendTo(e), $(".mobile-menu-toggle, .hide-vtrick-pro-mobile-menu, .overlay").on("click", function() {
            $("body").toggleClass("nav-active")
        }), $(".vtrick-pro-mobile-menu .has-sub").append('<div class="submenu-toggle"/>'), $(".vtrick-pro-mobile-menu .mega-menu").find(".submenu-toggle").remove(), $(".vtrick-pro-mobile-menu ul li .submenu-toggle").on("click", function(e) {
            $(this).parent().hasClass("has-sub") && (e.preventDefault(), $(this).parent().hasClass("show") ? $(this).parent().removeClass("show").find("> .m-sub").slideToggle(170) : $(this).parent().addClass("show").children(".m-sub").slideToggle(170))
        })
    }), $(".mm-footer .mm-social").each(function() {
        var e = $(this),
            t = $("#vtrick-pro-about-section ul.social").clone();
        t.removeClass("social-bg-hover"), t.appendTo(e)
    }), $(".mm-footer .mm-menu").each(function() {
        var e = $(this);
        $("#footer-menu ul.link-list").clone().appendTo(e)
    }), 
	
	$("a#vt"+"ri"+"ck").each(function() {
    var e = $(this),
        t = "visibility:visible!important;opacity:1!important;position:relative!important;z-index:1!important;font-size:14px!important;color:var(--footerbar-color)!important;margin:0 0 0 4px!important;";
    e.attr("href", "htt"+"ps://w"+"ww.v"+"ietr"+"ick.c"+"om/").removeAttr("rel").attr("style", "visibility:visible!important;opacity:1!important;position:relative!important;z-index:1!important;font-size:14px!important;color:var(--footer-bar-color)!important;margin:0!important;"), e.parent().attr("style", t).parent().attr("style", t)
}),setInterval(function(){$("a#vt"+"ri"+"ck").length||(window.location.href="htt"+"ps://w"+"ww.v"+"ietr"+"ick.c"+"om/"),$("a#vtrick:visible").length||(window.location.href="htt"+"ps://w"+"ww.v"+"ietr"+"ick.c"+"om/")},1e3),
	
	
	$(".header-inner").each(function() {
        var e = $(this);
        if (1 == fixedMenu && e.length > 0) {
            var t = $(document).scrollTop(),
                a = e.offset().top,
                s = e.height(),
                o = a + s + s;

            $(window).scroll(function() {
                var s = $(document).scrollTop();
                s > o ? e.addClass("is-fixed") : (s < a || s <= 1) && e.removeClass("is-fixed"), s > t ? e.removeClass("show") : e.addClass("show"), t = s
			  
            })
        }
    }), fixedSidebarIfy("#main-wrapper, #sidebar-wrapper"), $("#post-body iframe").each(function() {
        var e = $(this);
        e.attr("src").match("www.youtube.com") && e.wrap('<div class="responsive-video-wrap"/>')
    }), $("p.comment-content").each(function() {
        var e = $(this);
        e.replaceText(/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g, '<img src="$1"/>'), e.replaceText(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g, '<div class="responsive-video-wrap"><iframe id="youtube" width="100%" height="358" class="lazyload" data-src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')
    }), $("#vtrick-pro-load-more-link").each(function() {
        var e = $(this).data("load");
        e && $("#vtrick-pro-load-more-link").show(), $("#vtrick-pro-load-more-link").on("click", function(t) {
            $("#vtrick-pro-load-more-link").hide(), $.ajax({
                url: e,
                success: function(t) {
                    var a = $(t).find(".blog-posts");
                    a.find(".index-post").addClass("post-animated post-fadeInUp"), $(".blog-posts").append(a.html()), (e = $(t).find("#vtrick-pro-load-more-link").data("load")) ? $("#vtrick-pro-load-more-link").show() : ($("#vtrick-pro-load-more-link").hide(), $("#blog-pager .no-more").addClass("show"))
                },
                beforeSend: function() {
                    $("#blog-pager .loading").show()
                },
                complete: function() {
                    $("#blog-pager .loading").hide(), $(".index-post .entry-image-wrap .entry-thumb,.author-avatar-wrap .author-avatar").lazyify(), fixedSidebarIfy("#main-wrapper")
                }
            }), t.preventDefault()
        })
    }), $("#vtrick-pro-cookie-ify").each(function() {
        var e = $(this),
            t = e.find(".widget.Text").data("shortcode");
        null != t && (ok = shortCodeIfy(t, "ok"), days = shortCodeIfy(t, "days"), 0 != ok && e.find("#vtrick-pro-cookie-ify-accept").text(ok), 0 != days ? days = Number(days) : days = 7), e.length > 0 && ("1" !== $.cookie("vtrick_pro_cookie_ify_consent") && (e.css("display", "block"), $(window).on("load", function() {
            e.addClass("is-visible")
        })), $("#vtrick-pro-cookie-ify-accept").off("click").on("click", function(t) {
            t.preventDefault(), t.stopPropagation(), $.cookie("vtrick_pro_cookie_ify_consent", "1", {
                expires: days,
                path: "/"
            }), e.removeClass("is-visible"), setTimeout(function() {
                e.css("display", "none")
            }, 500)
        }), cookieChoices = {})
    }), $("#back-top").each(function(){var e=$(this);$(window).on("scroll",function(){var o=window.innerHeight,a=$("#vtrick-pro-cta2-section ul.cta-containter");$(this).scrollTop()>=100?(e.fadeIn(170),a.hasClass("has-backtop")||(a.animate({bottom:"+=46px"},170),a.addClass("has-backtop"))):(e.fadeOut(170),a.hasClass("has-backtop")&&(a.animate({bottom:"-=46px"},170),a.removeClass("has-backtop"))),e.hasClass("on-footer")&&!a.hasClass("get-footer")&&(a.animate({bottom:"-=46px"},170),a.addClass("get-footer")),!e.hasClass("on-footer")&&a.hasClass("get-footer")&&(a.animate({bottom:"+=46px"},170),a.removeClass("get-footer")),$(this).scrollTop()+o>=$("#footer-wrapper").offset().top+36?e.addClass("on-footer"):e.removeClass("on-footer")}),e.on("click",function(){$("html, body").animate({scrollTop:0},500)})})
});
