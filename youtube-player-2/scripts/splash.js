(function () {
  function parseYouTubeInput(input) {
    const result = { videoId: "", playlistId: "" };
    if (!input) return result;
    const trimmed = input.trim();
    if (!trimmed.includes("http")) {
      if (/^(PL|UU|FL|LL|OL)[A-Za-z0-9-_]{10,}$/.test(trimmed)) {
        result.playlistId = trimmed; return result;
      }
      if (/^[A-Za-z0-9_-]{6,}$/.test(trimmed)) {
        result.videoId = trimmed; return result;
      }
    }
    try {
      const url = new URL(trimmed);
      if (url.hostname.includes("youtu.be")) {
        result.videoId = url.pathname.replace("/", "");
      }
      if (url.hostname.includes("youtube.com")) {
        const v = url.searchParams.get("v");
        const list = url.searchParams.get("list");
        if (list) result.playlistId = list;
        if (v) result.videoId = v;
        const parts = url.pathname.split("/").filter(Boolean);
        if (!result.videoId && parts.length >= 2 && ["shorts", "live", "embed"].includes(parts[0])) {
          result.videoId = parts[1];
        }
      }
    } catch {}
    return result;
  }
  document.getElementById("go").addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = document.getElementById("url").value;
    const { videoId, playlistId } = parseYouTubeInput(raw);
    if (playlistId) { location.href = `player.html?list=${encodeURIComponent(playlistId)}`; return; }
    if (videoId) { location.href = `player.html?vid=${encodeURIComponent(videoId)}`; return; }
  });
})();