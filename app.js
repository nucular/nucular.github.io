$(function() {

  $(".fab[data-expands]").on("click", function(e) {
    var $trigger = $(this);
    var $target = $("#" + $trigger.attr("data-expands"));

    var count = $target.children().length;
    var pos = $trigger.position();
    var center = {
      top: pos.top + $trigger.height()/2,
      left: pos.left + $trigger.width()/2
    };

    $target.find(".sub.fab").each(function(i, v) {
      var $fab = $(v);
      $fab.css("transition-delay", (i / 10 + Math.random()*0.1) + "s");

      if (!$target.hasClass("expanded")) {
        $fab.css({
          "top": "0px",
          "left": "0px"
        });
      } else {
        var fpos = $fab.offset();
        $fab.css({
          "top": -((fpos.top - center.top) + $fab.height()/2) + "px",
          "left": -((fpos.left - center.left) - $fab.width()) + "px"
        });
      }
    });

    $target.toggleClass("expanded");
  });
});
