/* 陈墨 · Mori Chen — 简洁大方的个人网站 · 交互脚本 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 数字滚动（首屏统计） ---------- */
  function animateCount(el) {
    var target = parseInt(el.dataset.count, 10);
    var duration = 1100;
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

  var statNums = document.querySelectorAll(".hero-stats .stat-num");
  if (reducedMotion) {
    statNums.forEach(function (el) { el.textContent = el.dataset.count; });
  } else {
    statNums.forEach(function (el) {
      el.textContent = "0";
      animateCount(el);
    });
  }

  /* ---------- 滚动进入动画 ---------- */
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    if (reducedMotion) el.classList.add("visible");
    else observer.observe(el);
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
