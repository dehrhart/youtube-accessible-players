# YouTube Accessible Players

Two browser-based tools for accessible media engagement and choice-making training.

## Projects

### 1) Single Player — `youtube-player-2/`
- Splash page accepts a **video** or **playlist** URL/ID.
- Caregiver click unlocks **fullscreen** + audio (autoplay rules).
- **Hover to play / move away to pause**.
- Playlist mode supports **shuffle + loop**.
- Returns to splash on end (optional) or continuous playback.

**Open:** `youtube-player-2/index.html`

### 2) Quad Player — `youtube-quad-player/`
- 2×2 grid for **choice-making** practice.
- One-click **caregiver gate** (fullscreen + audio unlock).
- **Hover dwell** activation with **progress rings** (0.0–1.0 s).
- **Buffer** slider adjusts spacing vs. size (defaults to 0%).
- Each tile accepts a **video** or a **playlist** (playlists shuffle + loop).
- Launcher for easy setup of four sources.

**Open (launcher):** `youtube-quad-player/quad-launcher.html`  
**Open (direct):** `youtube-quad-player/quad.html?list=YOUR_PLAYLIST_ID`

## GitHub Pages (optional hosting)
1. Push this repository.
2. In **Settings → Pages**, set **Deploy from branch → `main`** and folder to **/ (root)**.
3. Visit: `https://<username>.github.io/<repo-name>/`

### Direct URLs after publishing
- Hub: `/`
- Single Player: `/youtube-player-2/`
- Quad Launcher: `/youtube-quad-player/quad-launcher.html`
- Quad Player: `/youtube-quad-player/quad.html`

## Notes
- Some YouTube items can’t be embedded (uploader-disabled embedding, age/DRM, region, or live protections).
- Tested in modern Chromium/Firefox. Autoplay with sound requires the caregiver’s initial click.
