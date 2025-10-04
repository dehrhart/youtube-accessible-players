[README.md](https://github.com/user-attachments/files/22704269/README.md)
# YouTube Accessible Players

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/dehrhart/youtube-accessible-players/blob/main/LICENSE)

Accessible, browser-based YouTube players designed for assistive technology users.  
Created to support switch-access, eye-gaze, and choice-making activities in AAC and AT contexts.

## Live Versions

| Mode | Description | Link |
|------|--------------|------|
| **Hub Page** | Entry point for both player modes. | [Open Hub](https://dehrhart.github.io/youtube-accessible-players/) |
| **Single Player** | Hover to play, move away to pause. Accepts any YouTube video or playlist. | [Open Single Player](https://dehrhart.github.io/youtube-accessible-players/youtube-player-2/) |
| **Quad Player** | Four-corner choice-making grid with dwell activation and buffer controls. | [Open Quad Launcher](https://dehrhart.github.io/youtube-accessible-players/youtube-quad-player/quad-launcher.html) |

## Features

### Common to Both
- Autoplay with caregiver unlock (fullscreen + audio permissions)
- Hover-based playback (no click required after unlock)
- Supports YouTube playlists (shuffle and loop enabled)
- Compatible with keyboard and switch input
- Clean layout and fullscreen video support

### Single Player
- Simple centered player for individual viewing
- Splash page accepts URLs or playlist IDs
- Graceful fallback for non-embeddable videos

### Quad Player
- 2×2 interactive grid for choice-making or engagement training
- Visual dwell progress rings with adjustable activation delay (0.0–1.0 s)
- Buffer slider adjusts spacing and scaling dynamically
- Accepts both single videos and playlists for each quadrant

## Repository Structure

```
youtube-accessible-players/
│
├─ index.html                  # Hub selector page
├─ README.md
├─ LICENSE
│
├─ youtube-player-2/           # Single-player build
│  ├─ index.html
│  ├─ player.html
│  ├─ styles/
│  └─ scripts/
│
└─ youtube-quad-player/        # Quad-player build
   ├─ quad-launcher.html
   ├─ quad.html
   ├─ styles/
   └─ scripts/
```

## Hosting Instructions

1. Push this repository to your GitHub account.  
2. Go to **Settings → Pages**.  
3. Under **Build and Deployment**, set:
   - Source: **Deploy from branch**
   - Branch: **main**
   - Folder: **/(root)**  
4. Save, then visit:  
   `https://dehrhart.github.io/youtube-accessible-players/`

## Educational Use
- Early cause-and-effect exploration
- Switch-access or eye-gaze scanning training
- Choice-making and preference assessment
- Motivational breaks and self-directed activities

## Screenshots
| Hub | Single Player | Quad Player |
|------|---------------|-------------|
| ![Hub Screenshot](docs/hub.png) | ![Single Player Screenshot](docs/single.png) | ![Quad Player Screenshot](docs/quad.png) |

*(Save screenshots into a `/docs` folder using the filenames above.)*

## Credits

Developed by **Dale Ehrhart** in collaboration with **ChatGPT (OpenAI)**  
as part of ongoing assistive technology accessibility projects.

Licensed under the [MIT License](https://github.com/dehrhart/youtube-accessible-players/blob/main/LICENSE).
