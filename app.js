$(function() {

  $(".fab[data-expands]").on("click", function(e) {
    var $trigger = $(this);
    var $target = $("#" + $trigger.attr("data-expands"));

    var count = $target.children().length;
    var pos = $trigger.position();
    var center = {
      top: pos.top + $trigger.height()/2,
      left: pos.left + $trigger.width()
    };

    $target.find(".sub.fab").each(function(i, v) {
      var $fab = $(v);
      $fab.css("transition-delay", (i / 10) + "s");

      if (!$target.hasClass("expanded")) {
        $fab.css({
          "top": "0px",
          "left": "0px"
        });
      } else {
        var fpos = $fab.offset();
        console.log(center, fpos);
        $fab.css({
          "top": -(fpos.top - center.top) + "px",
          "left": -(fpos.left - center.left) + "px"
        });
      }
    });

    $target.toggleClass("expanded");
  });
});
