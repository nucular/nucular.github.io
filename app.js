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
      "height": s,
      "width": s,
      "background-color": $fab.attr("ripple-color")
    });

    var mx = e.pageX - $fab.offset().left - $ripple.width()/2;
    var my = e.pageY - $fab.offset().top - $ripple.height()/2;
    
    $ripple.css({top: my+"px", left: mx+"px"}).addClass("animate");
  });

  setTimeout(function() {
    $(".fab[expands]").mousedown().click();
  }, 100);


  var $canvas = $("#background");
  var canvas = $canvas[0];
  var ctx = canvas.getContext("2d");
  particles = [];
  var maxlife = 20;
  var lasttime = 0;

  function spawn(initial) {
    var theta = Math.random() * Math.PI * 2;
    var length = Math.random() * 0.1;
    var p = {
      x: 0.5, y: 0.5,
      dx: Math.cos(theta) * length,
      dy: Math.sin(theta) * length,
      life: Math.random() * maxlife
    };
    if (initial) {
      var dt = Math.random() * p.life;
      p.x += p.dx * dt;
      p.y += p.dy * dt;
      p.life -= dt;
    } else {
      setTimeout(spawn, Math.random() * 200 + 200);
    }
    particles.push(p);
  }

  function frame() {
    requestAnimationFrame(frame);

    var width = canvas.width;
    var height = canvas.height;
    var scale = Math.max(width, height);
    ctx.clearRect(0, 0, width, height);

    var time = performance ? performance.now() : Number(new Date());
    var dt = (time - lasttime) / 1000;
    lasttime = time;

    for (var i = particles.length; i >= 0; i--) {
      var p = particles[i];
      if (!p) continue;

      p.x += p.dx * dt;
      p.y += p.dy * dt;
      p.life -= dt;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      var size = ((maxlife - p.life) / maxlife) * 0.01;
      ctx.fillStyle = "rgba(33, 33, 33, " + (p.life / maxlife / 2) + ")";
      ctx.fillRect(p.x * width, p.y * height, size * scale, size * scale);
    }
  }

  canvas.width = $(window).width() / 2;
  canvas.height = $(window).height() / 2;
  $(window).on("resize", function(e) {
    canvas.width = $(window).width() / 2;
    canvas.height = $(window).height() / 2;
  });

  for (var i = 0; i < 20; i++)
    spawn(true);
  spawn();
  requestAnimationFrame(frame);
});
