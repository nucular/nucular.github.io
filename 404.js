function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function getPageUrl(href) {
    var s = href.split("/");
    return s.slice(0, 4).join("/");
}

$(function() {
    var h = window.location.href;
    var p = getPageUrl(h);

    if (!inIframe() && h != p) {
        window.location.href = p + "/404.html";
    }

    setTimeout(function() {
        $("html, body").css({"display": "block"});
    }, 500)
});
