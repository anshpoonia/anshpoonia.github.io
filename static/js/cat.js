/* A tiny cat that strolls across the bottom of the screen now and then.
   Purely decorative: skipped entirely for visitors who prefer reduced motion,
   never blocks clicks, and quietly reschedules itself at random intervals. */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce && reduce.matches) return;
  if (typeof document.body === "undefined") return;

  var CAT_SVG =
    '<svg class="cat-svg" viewBox="0 0 70 46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      "<style>" +
        ".cat-svg .leg{transform-box:fill-box;transform-origin:top center;animation:catLeg .5s ease-in-out infinite}" +
        ".cat-svg .leg.b{animation-delay:.25s}" +
        ".cat-svg .tail{transform-box:fill-box;transform-origin:right bottom;animation:catTail 1.2s ease-in-out infinite}" +
        "@keyframes catLeg{0%,100%{transform:rotate(11deg)}50%{transform:rotate(-11deg)}}" +
        "@keyframes catTail{0%,100%{transform:rotate(-9deg)}50%{transform:rotate(11deg)}}" +
      "</style>" +
      '<g fill="#3b332b">' +
        '<path class="tail" d="M15 30 C 3 29 3 15 12 12" fill="none" stroke="#3b332b" stroke-width="4.5" stroke-linecap="round"/>' +
        '<rect class="leg" x="20" y="30" width="3.6" height="11" rx="1.8"/>' +
        '<rect class="leg b" x="27" y="30" width="3.6" height="11" rx="1.8"/>' +
        '<rect class="leg" x="40" y="30" width="3.6" height="11" rx="1.8"/>' +
        '<rect class="leg b" x="46" y="30" width="3.6" height="11" rx="1.8"/>' +
        '<ellipse cx="32" cy="26" rx="18" ry="9.5"/>' +
        '<path d="M45 16 l3 -8 l4 7 z"/>' +
        '<path d="M53 15 l4 -7 l3 8 z"/>' +
        '<circle cx="52" cy="21" r="8.5"/>' +
      "</g>" +
      '<circle cx="55" cy="20" r="1.3" fill="#FBF6EC"/>' +
    "</svg>";

  var walker = document.createElement("div");
  walker.id = "cat-walker";
  walker.setAttribute("aria-hidden", "true");
  var flip = document.createElement("div");
  flip.className = "cat-flip";
  flip.innerHTML = CAT_SVG;
  walker.appendChild(flip);

  var CAT_W = 70;       // approximate rendered width in px
  var SPEED = 80;       // px per second — a relaxed stroll
  var anim = null;

  function rand(min, max) { return min + Math.random() * (max - min); }

  function walkOnce() {
    var vw = window.innerWidth;
    var dir = Math.random() < 0.5 ? 1 : -1;   // 1 = left→right, -1 = right→left
    flip.style.transform = dir === 1 ? "scaleX(1)" : "scaleX(-1)";

    var startX = dir === 1 ? -CAT_W : vw;
    var endX = dir === 1 ? vw : -CAT_W;
    var duration = (Math.abs(endX - startX) / SPEED) * 1000;

    walker.style.opacity = "1";
    anim = walker.animate(
      [
        { transform: "translateX(" + startX + "px)" },
        { transform: "translateX(" + endX + "px)" }
      ],
      { duration: duration, easing: "linear", fill: "forwards" }
    );
    anim.onfinish = function () {
      walker.style.opacity = "0";
      schedule(rand(25000, 70000));          // reappear in 25–70s
    };
  }

  function schedule(ms) { window.setTimeout(walkOnce, ms); }

  function start() {
    document.body.appendChild(walker);
    schedule(rand(4000, 9000));              // first stroll after a short beat
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
