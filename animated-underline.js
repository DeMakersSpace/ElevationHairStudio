/**
 * Animated wavy underline — vanilla JS port of the 21st.dev AnimatedText component.
 * Targets any element with class `hero-underline-wrap`.
 * - Draws a wavy SVG path on load (via CSS stroke-dashoffset animation)
 * - Smoothly morphs the wave on hover using rAF interpolation
 */
(function () {
  // Control-point Y values for the two path states
  var CP1Y_DEFAULT = 0;
  var CP2Y_DEFAULT = 20;
  var CP1Y_HOVER   = 20;
  var CP2Y_HOVER   = 0;
  var MORPH_SPEED  = 0.08; // lerp factor per frame

  function buildPath(cp1y, cp2y) {
    return (
      "M 0,10 Q 75," + cp1y.toFixed(2) +
      " 150,10 Q 225," + cp2y.toFixed(2) + " 300,10"
    );
  }

  function initWrap(el) {
    // ── SVG ──────────────────────────────────────
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "hero-underline-svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "20");
    svg.setAttribute("viewBox", "0 0 300 20");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "hero-underline-path");
    path.setAttribute("d", buildPath(CP1Y_DEFAULT, CP2Y_DEFAULT));
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2.5");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("fill", "none");

    svg.appendChild(path);
    el.appendChild(svg);

    // ── Hover morph via rAF lerp ──────────────────
    var cp1y = CP1Y_DEFAULT;
    var cp2y = CP2Y_DEFAULT;
    var targetCp1y = CP1Y_DEFAULT;
    var targetCp2y = CP2Y_DEFAULT;
    var rafId = null;

    function tick() {
      var d1 = targetCp1y - cp1y;
      var d2 = targetCp2y - cp2y;
      if (Math.abs(d1) < 0.01 && Math.abs(d2) < 0.01) {
        cp1y = targetCp1y;
        cp2y = targetCp2y;
        path.setAttribute("d", buildPath(cp1y, cp2y));
        rafId = null;
        return;
      }
      cp1y += d1 * MORPH_SPEED;
      cp2y += d2 * MORPH_SPEED;
      path.setAttribute("d", buildPath(cp1y, cp2y));
      rafId = requestAnimationFrame(tick);
    }

    el.addEventListener("mouseenter", function () {
      targetCp1y = CP1Y_HOVER;
      targetCp2y = CP2Y_HOVER;
      if (!rafId) rafId = requestAnimationFrame(tick);
    });

    el.addEventListener("mouseleave", function () {
      targetCp1y = CP1Y_DEFAULT;
      targetCp2y = CP2Y_DEFAULT;
      if (!rafId) rafId = requestAnimationFrame(tick);
    });
  }

  function init() {
    document.querySelectorAll(".hero-underline-wrap").forEach(initWrap);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
