// youtube-quad-player/scripts/quad.js
const qs = new URLSearchParams(location.search);

function paramFor(i, key) {
  return qs.get(`${key}${i+1}`) || qs.get(key) || "";
}

const wraps = Array.from(document.querySelectorAll(".wrap"));
const players = [null, null, null, null];

let audioArmed = false;
let dwellMs = 0; // 0..1000 from slider
let dwellTimers = [null, null, null, null];
let hovering = [false, false, false, false];

// Progress ring state
const RING_CIRC = 188.495; // 2 * PI * r for r=30
const rings = [0,1,2,3].map(i => ({
  el: document.getElementById("ring"+i),
  fg: document.querySelector("#ring"+i+" .fg"),
  raf: null,
  start: 0
}));

const dwellInput = document.getElementById("dwell");
const dwellVal = document.getElementById("dwellVal");
function updateDwellLabel() {
  dwellVal.textContent = (dwellMs / 1000).toFixed(1) + "s";
}
dwellInput.addEventListener("input", () => {
  dwellMs = Number(dwellInput.value);
  updateDwellLabel();

// Buffer slider: reduces inner gap and slightly increases player scale when moved down
const bufferInput = document.getElementById("buffer");
const bufferVal = document.getElementById("bufferVal");
function applyBuffer(b){
  // b in [0..100]; 0 = tight (small gaps, bigger video), 100 = roomy (big gaps, smaller video)
  const t = b/100; // 0..1
  const padV = (4.5 + 1.0 * t).toFixed(2) + "vh";  // 4.5..5.5
  const padH = (4.5 + 1.0 * t).toFixed(2) + "vw";  // 4.5..5.5
  const gapV = (1.5 + 3.0 * t).toFixed(2) + "vh";  // 1.5..4.5
  const gapH = (1.5 + 3.0 * t).toFixed(2) + "vw";  // 1.5..4.5
  const scale = (0.78 - 0.12 * t).toFixed(3);      // 0.78..0.66
  const root = document.documentElement.style;
  root.setProperty("--padV", padV);
  root.setProperty("--padH", padH);
  root.setProperty("--gapV", gapV);
  root.setProperty("--gapH", gapH);
  root.setProperty("--scale", scale);
}
function updateBufferLabel(b){ bufferVal.textContent = b + "%"; }
if (bufferInput){
  bufferInput.addEventListener("input", (e)=>{
    const b = Number(e.target.value)||0;
    updateBufferLabel(b);
    applyBuffer(b);
  });
  // init
  updateBufferLabel(Number(bufferInput.value)||0);
  applyBuffer(Number(bufferInput.value)||0);
}

});
updateDwellLabel();

// Buffer slider: reduces inner gap and slightly increases player scale when moved down
const bufferInput = document.getElementById("buffer");
const bufferVal = document.getElementById("bufferVal");
function applyBuffer(b){
  // b in [0..100]; 0 = tight (small gaps, bigger video), 100 = roomy (big gaps, smaller video)
  const t = b/100; // 0..1
  const padV = (4.5 + 1.0 * t).toFixed(2) + "vh";  // 4.5..5.5
  const padH = (4.5 + 1.0 * t).toFixed(2) + "vw";  // 4.5..5.5
  const gapV = (1.5 + 3.0 * t).toFixed(2) + "vh";  // 1.5..4.5
  const gapH = (1.5 + 3.0 * t).toFixed(2) + "vw";  // 1.5..4.5
  const scale = (0.78 - 0.12 * t).toFixed(3);      // 0.78..0.66
  const root = document.documentElement.style;
  root.setProperty("--padV", padV);
  root.setProperty("--padH", padH);
  root.setProperty("--gapV", gapV);
  root.setProperty("--gapH", gapH);
  root.setProperty("--scale", scale);
}
function updateBufferLabel(b){ bufferVal.textContent = b + "%"; }
if (bufferInput){
  bufferInput.addEventListener("input", (e)=>{
    const b = Number(e.target.value)||0;
    updateBufferLabel(b);
    applyBuffer(b);
  });
  // init
  updateBufferLabel(Number(bufferInput.value)||0);
  applyBuffer(Number(bufferInput.value)||0);
}


// Fullscreen on the single caregiver click
async function goFullscreen() {
  const el = document.documentElement;
  if (!document.fullscreenElement && el?.requestFullscreen) {
    try { await el.requestFullscreen({ navigationUI: "hide" }); } catch {}
  }
}

const gate = document.getElementById("gate");
gate.addEventListener("click", async () => {
  await goFullscreen();
  for (const p of players) { try { p?.unMute?.(); p?.setVolume?.(100); } catch {} }
  try { players[0]?.playVideo?.(); } catch {}
  setTimeout(() => { try { players[0]?.pauseVideo?.(); } catch {} }, 50);
  audioArmed = true;
  gate.style.display = "none";
});

function resetRing(i) {
  const r = rings[i];
  if (!r) return;
  r.el?.classList.remove("visible", "complete");
  if (r.raf) cancelAnimationFrame(r.raf);
  r.raf = null;
  r.start = 0;
  if (r.fg) r.fg.setAttribute("stroke-dashoffset", RING_CIRC.toString());
}

function animateRing(i) {
  const r = rings[i];
  if (!r || dwellMs <= 0) return; // No dwell → no ring
  r.el?.classList.add("visible");
  if (!r.start) r.start = performance.now();

  const step = (ts) => {
    const elapsed = ts - r.start;
    const t = Math.min(1, elapsed / dwellMs);
    const dash = RING_CIRC * (1 - t);
    if (r.fg) r.fg.setAttribute("stroke-dashoffset", dash.toString());
    if (t < 1 && hovering[i]) {
      r.raf = requestAnimationFrame(step);
    } else {
      // completion or cancelled
      if (t >= 1) r.el?.classList.add("complete");
      setTimeout(() => r.el?.classList.remove("visible", "complete"), 180);
      r.raf = null;
    }
  };
  r.raf = requestAnimationFrame(step);
}

function startDwell(i) {
  clearTimeout(dwellTimers[i]);
  resetRing(i);
  if (dwellMs > 0) {
    animateRing(i);
  }
  dwellTimers[i] = setTimeout(() => {
    if (hovering[i] && audioArmed) playOnly(i);
  }, dwellMs);
}
function cancelDwell(i) { clearTimeout(dwellTimers[i]); resetRing(i); }

function playOnly(i) {
  players.forEach((p, idx) => {
    try { if (idx === i) p?.playVideo?.(); else p?.pauseVideo?.(); } catch {}
  });
}

wraps.forEach((wrap, i) => {
  wrap.addEventListener("mouseenter", () => {
    hovering[i] = true; wrap.classList.add("hovering");
    if (!audioArmed) return;
    startDwell(i);
  });
  wrap.addEventListener("mouseleave", () => {
    hovering[i] = false; wrap.classList.remove("hovering");
    cancelDwell(i);
    try { players[i]?.pauseVideo?.(); } catch {}
  });
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    players.forEach(p => { try { p?.pauseVideo?.(); } catch {} });
  } else {
    const idx = hovering.findIndex(Boolean);
    if (idx >= 0 && audioArmed) playOnly(idx);
  }
});

window.onYouTubeIframeAPIReady = function () {
  for (let i = 0; i < 4; i++) {
    const containerId = `p${i}`;
    const list = paramFor(i, "list");
    const vid  = paramFor(i, "vid");

    const baseVars = { autoplay: 0, controls: 0, rel: 0, modestbranding: 1, fs: 0, playsinline: 1, disablekb: 1 };

    const cfg = {
      width: "100%",
      height: "100%",
      playerVars: { ...baseVars },
      events: {
        onReady: (e) => {
          const iframe = e.target.getIframe?.();
          if (iframe) iframe.setAttribute("allow", "autoplay; encrypted-media; fullscreen; picture-in-picture");
          if (list) { try { players[i].setShuffle(true); players[i].setLoop(true); } catch {} }
        },
        onStateChange: (ev) => {
          if (ev.data === YT.PlayerState.CUED) {
            if (audioArmed && hovering[i]) playOnly(i); else { try { players[i].pauseVideo?.(); } catch {} }
          }
          if (ev.data === YT.PlayerState.ENDED) {
            if (list) { try { players[i].nextVideo(); } catch {} } else { try { players[i].pauseVideo?.(); } catch {} }
          }
        }
      }
    };

    if (list) { cfg.playerVars.listType = "playlist"; cfg.playerVars.list = list; }
    else if (vid) { cfg.videoId = vid; }
    else {
      const sharedList = qs.get("list");
      if (sharedList) { cfg.playerVars.listType = "playlist"; cfg.playerVars.list = sharedList; }
      else { cfg.videoId = "dQw4w9WgXcQ"; }
    }

    players[i] = new YT.Player(containerId, cfg);
  }
};
