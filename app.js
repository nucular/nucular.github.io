$(function() {

  $(".fab[expands]").each(function(i, v) {
    var $trigger = $(this);
    var $target = $("#" + $trigger.attr("expands"));

    var pos = $trigger.offset();
    var center = {
      top: pos.top + $trigger.height()/2,
      left: pos.left + $trigger.width()/2
    };

    $target.find(".sub.fab").each(function(i, v) {
      var $fab = $(v);
      $fab.css("transition-delay", (i / 10) + "s");
      $fab.css({
        "top": -($fab.offset().top - center.top + $fab.height()/2) + "px",
        "left": -($fab.offset().left - center.left + $fab.width()/2) + "px"
      });
    });
  }).on("click", function(e) {
    var $trigger = $(this);
    var $target = $("#" + $trigger.attr("expands"));
    $target.toggleClass("expanded");
  });

  $(".fab").on("mousedown", function(e) {
    var $fab = $(this);

    if ($fab.find(".ripple").length == 0)
      $fab.prepend("<span class='ripple'></span>");

    var $ripple = $fab.find(".ripple");
    $ripple.removeClass("animate");

    var s = Math.max($fab.outerWidth(), $fab.outerHeight());
    $ripple.css({
      height: s,
      width: s,
      "background-color": $fab.attr("ripple-color")
    });

    var mx = e.pageX - $fab.offset().left - $ripple.width()/2;
    var my = e.pageY - $fab.offset().top - $ripple.height()/2;
    
    $ripple.css({top: my+"px", left: mx+"px"}).addClass("animate");
  });

  setTimeout(function() {
    $(".fab[expands]").mousedown().click();
  }, 500);
});
