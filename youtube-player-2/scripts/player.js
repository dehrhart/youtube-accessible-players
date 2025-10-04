// youtube-player-2/scripts/player.js
const params = new URLSearchParams(location.search);
const playlistId = params.get("list") || "";
const videoId = params.get("vid") || (playlistId ? "" : "dQw4w9WgXcQ");

let player = null;
let ready = false;
let audioArmed = false;
let insideHover = false;

async function goFullscreen() {
  const container = document.documentElement;
  if (!document.fullscreenElement && container?.requestFullscreen) {
    try { await container.requestFullscreen({ navigationUI: "hide" }); }
    catch (e) { console.warn("Fullscreen denied:", e); }
  }
}

window.onYouTubeIframeAPIReady = function () {
  const baseVars = {
    autoplay: 0, controls: 0, rel: 0, modestbranding: 1,
    fs: 0, playsinline: 1, disablekb: 1
  };
  const cfg = {
    width: "100%", height: "100%",
    playerVars: { ...baseVars },
    events: {
      onReady: (e) => {
        ready = true;
        const iframe = e.target.getIframe?.();
        if (iframe) { iframe.setAttribute("allow", "autoplay; encrypted-media; fullscreen; picture-in-picture"); }
        const wrap = document.querySelector(".wrap");
        if (wrap) { wrap.style.transform = "scale(0.8)"; wrap.style.transformOrigin = "center"; }
        if (playlistId) { try { player.setShuffle(true); player.setLoop(true); } catch {} }
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.CUED) {
          if (audioArmed && insideHover) player.playVideo(); else player.pauseVideo();
        }
        if (event.data === YT.PlayerState.ENDED) {
          if (playlistId) { try { player.nextVideo(); } catch {} }
          else { try { player.pauseVideo(); } catch {} }
        }
      }
    }
  };
  if (playlistId) { cfg.playerVars.listType = "playlist"; cfg.playerVars.list = playlistId; }
  else { cfg.videoId = videoId; }
  player = new YT.Player("player", cfg);
};

const gate = document.getElementById("gate");
gate.addEventListener("click", async () => {
  if (!ready) return;
  await goFullscreen();
  try {
    player.unMute?.(); player.setVolume?.(100);
    if (playlistId) { try { player.setShuffle(true); player.setLoop(true); } catch {} }
    await player.playVideo?.();
    audioArmed = true; gate.style.display = "none";
  } catch {
    try { player.mute?.(); await player.playVideo?.(); player.unMute?.(); audioArmed = true; gate.style.display = "none"; }
    catch (e2) { console.warn("Playback with sound blocked:", e2); }
  }
});

const hoverZone = document.getElementById("hoverZone");
hoverZone.addEventListener("mouseenter", () => { insideHover = true; if (audioArmed && ready) player.playVideo(); });
hoverZone.addEventListener("mouseleave", () => { insideHover = false; if (audioArmed && ready) player.pauseVideo(); });

document.addEventListener("visibilitychange", () => {
  if (!ready || !audioArmed) return;
  if (document.hidden) player.pauseVideo?.();
  else if (insideHover) player.playVideo?.();
});