(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  document.querySelectorAll(".acc button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var open = item.classList.contains("open");
      document.querySelectorAll(".acc").forEach(function (el) { el.classList.remove("open"); });
      if (!open) item.classList.add("open");
    });
  });

  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var started = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || started) return;
        started = true;
        counters.forEach(function (el) {
          var target = parseInt(el.getAttribute("data-count"), 10);
          var suffix = el.getAttribute("data-suffix") || "";
          var prefix = el.getAttribute("data-prefix") || "";
          var duration = 1400;
          var start = performance.now();
          function tick(now) {
            var p = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = prefix + Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      });
    }, { threshold: 0.4 });
    io.observe(counters[0]);
  }

  var tallyIframe = document.querySelector("iframe[data-tally-src]");
  if (tallyIframe) {
    var tallySrc = "https://tally.so/widgets/embed.js";
    var loadTally = function () {
      if (typeof Tally !== "undefined") Tally.loadEmbeds();
      else {
        document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach(function (frame) {
          frame.src = frame.dataset.tallySrc;
        });
      }
    };
    if (typeof Tally !== "undefined") loadTally();
    else if (!document.querySelector('script[src="' + tallySrc + '"]')) {
      var script = document.createElement("script");
      script.src = tallySrc;
      script.onload = loadTally;
      script.onerror = loadTally;
      document.body.appendChild(script);
    }
  }

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
