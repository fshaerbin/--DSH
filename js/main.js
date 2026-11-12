/* 科技风个人网站 · 交互脚本 */
(function () {
  "use strict";

  /* ---------- 背景粒子画布 ---------- */
  var canvas = document.getElementById("bg-canvas");
  var ctx = canvas.getContext("2d");
  var particles = [];
  var mouse = { x: null, y: null };
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function randomParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      color: Math.random() > 0.5 ? "34,211,238" : "167,139,250"
    };
  }

  function initParticles() {
    particles = [];
    var count = Math.min(90, Math.floor((canvas.width * canvas.height) / 16000));
    for (var i = 0; i < count; i++) particles.push(randomParticle());
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + p.color + ",0.7)";
      ctx.fill();

      // 连线
      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        var dist = dx * dx + dy * dy;
        if (dist < 12000) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(99,120,255," + (0.14 * (1 - dist / 12000)) + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }

  if (!reducedMotion) {
    resizeCanvas();
    initParticles();
    drawParticles();
    window.addEventListener("resize", function () {
      resizeCanvas();
      initParticles();
    });
  }

  /* ---------- 打字机效果 ---------- */
  var typedEl = document.querySelector(".typed");
  if (typedEl && !reducedMotion) {
    var text = typedEl.dataset.typed;
    var idx = 0;
    (function type() {
      if (idx <= text.length) {
        typedEl.textContent = text.slice(0, idx);
        idx++;
        setTimeout(type, 60);
      }
    })();
  } else if (typedEl) {
    typedEl.textContent = typedEl.dataset.typed;
  }

  /* ---------- 数字滚动 ---------- */
  function animateCount(el) {
    var target = parseInt(el.dataset.count, 10);
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* ---------- 滚动进入动画 ---------- */
  document.querySelectorAll(".hero-stats .stat-num").forEach(function (el) {
    if (reducedMotion) {
      el.textContent = el.dataset.count;
    } else {
      animateCount(el);
    }
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.querySelectorAll(".stat-num").forEach(animateCount);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });

  /* ---------- 移动端导航 ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
