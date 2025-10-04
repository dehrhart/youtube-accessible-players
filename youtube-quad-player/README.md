# YouTube Quad Player

A 2×2 grid of YouTube players designed for choice-making practice with hover-based activation.

## Features
- **Global Start overlay**: one caregiver click unlocks audio and requests fullscreen.
- **Hover-to-play / move-away-to-pause** for each tile.
- **Activation delay slider (0.0–0.5s)** to add dwell before a tile begins playing.
- Each tile can play a **single video** or a **playlist** (playlists are **shuffled & looped**).
- Large spacing around and between tiles for clear targeting.

## Usage
Open `quad.html` with query parameters:

### One shared playlist for all four tiles
```
quad.html?list=PLbbzpd5Snicw7GlboouSiyYrs3OR4UIsS
```

### Different sources per tile (mix and match)
```
quad.html?list1=PLaaaFirstPlaylistID&vid2=AbCdEfG1234&list3=PLbbbSecondPlaylistID&vid4=ZyXwVuT9876
```

### Notes
- Autoplay with sound requires a **user gesture** (the Start overlay provides that).
- Some YouTube items cannot be embedded (embedding disabled, age-restricted, paid/DRM, or region-limited). Try another video or use a playlist.


## Launcher
Use `quad-launcher.html` to paste up to four sources and open `quad.html` with the right parameters. The **KidsCamp Demo** button prefills all four with your playlist.

## ✨ Final Quad Player Updates
**Version:** October 2025  

This version refines layout and usability for instructional or therapeutic settings.  

### ✅ Key Improvements
- **Compact Header:** Removed title text and reduced bar height for maximum screen space.  
- **Single-Line Controls:** Activation and Buffer sliders remain visible and neatly aligned.  
- **Dwell Activation Rings:** Smooth circular indicators show activation progress for each tile.  
- **Precise Hover Area:** Activation now triggers only when the cursor is directly over the visible video frame.  
- **Dynamic Buffer Scaling:**  
  - **Buffer 0 % (default):** Tight center spacing, larger videos.  
  - **Buffer 100 %:** Wider outer padding, smaller videos, more breathing room.  
- **Fullscreen Caregiver Gate:** First click enables audio, fullscreen, and playback rights in one step.  

### 🧭 Quick Launch
| Mode | File | Example |
|------|------|----------|
| **Launcher** | `quad-launcher.html` | Paste 4 YouTube links → click **Open Quad** |
| **Player** | `quad.html` | `quad.html?list=PLbbzpd5Snicw7GlboouSiyYrs3OR4UIsS` |

### 💡 Notes
- Dwell and buffer settings can be adjusted live without reloading.  
- Some YouTube videos may not embed due to restrictions (age, DRM, or region limits).
