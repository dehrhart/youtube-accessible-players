// youtube-quad-player/scripts/quad-launcher.js
(function(){
  function parseYouTube(input){
    const out = { videoId: "", playlistId: "" };
    if (!input) return out;
    const trimmed = input.trim();
    // raw IDs
    if (!trimmed.includes("http")){
      if (/^(PL|UU|FL|LL|OL)[A-Za-z0-9-_]{10,}$/.test(trimmed)) { out.playlistId = trimmed; return out; }
      if (/^[A-Za-z0-9_-]{6,}$/.test(trimmed)) { out.videoId = trimmed; return out; }
    }
    try {
      const url = new URL(trimmed);
      if (url.hostname.includes("youtu.be")){
        out.videoId = url.pathname.replace("/", "");
      }
      if (url.hostname.includes("youtube.com")){
        const v = url.searchParams.get("v");
        const list = url.searchParams.get("list");
        if (list) out.playlistId = list;
        if (v) out.videoId = v;
        const parts = url.pathname.split("/").filter(Boolean);
        if (!out.videoId && parts.length >= 2 && ["shorts","live","embed"].includes(parts[0])){
          out.videoId = parts[1];
        }
      }
    } catch{}
    return out;
  }

  function buildQueryForField(idx, value){
    const { videoId, playlistId } = parseYouTube(value);
    if (playlistId) return `list${idx}=`+encodeURIComponent(playlistId);
    if (videoId) return `vid${idx}=`+encodeURIComponent(videoId);
    return ""; // empty → will use shared or fallback
  }

  document.getElementById("quadForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    const values = [1,2,3,4].map(n => document.getElementById("src"+n).value);
    const parts = values.map((v,i)=>buildQueryForField(i+1, v)).filter(Boolean);
    const qs = parts.join("&");
    const url = "quad.html" + (qs ? ("?"+qs) : "");
    window.location.href = url;
  });

  // Demo button fills KidsCamp playlist in all four fields
  document.getElementById("demo").addEventListener("click", ()=>{
    const demo = "https://www.youtube.com/watch?v=XVdn2GHKKbk&list=PLbbzpd5Snicw7GlboouSiyYrs3OR4UIsS&index=1";
    for (let i=1;i<=4;i++){ document.getElementById("src"+i).value = demo; }
  });
})();