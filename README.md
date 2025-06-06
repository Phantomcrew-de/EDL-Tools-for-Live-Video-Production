# 🎬 EDL Tools for ATEM Live Video Production & DaVinci Resolve

This repository provides two lightweight, browser-based web applications to support timecode-based editing and video annotation workflows, particularly for live productions and DaVinci Resolve postproduction.

---

## 🛠️ Tools Included

### 1. **EDL Marker Tool for Live Production**
[Example: EDL Marker Tool](https://phantomcrew-de.github.io/EDL-Tools-for-Live-Video-Production/EDL_for_ATEM_live_production_1_1_EN.html)
File: `EDL_for_ATEM_live_production_1_1_EN.html`

A browser-based timecode tracker tailored for live production environments (e.g., ATEM-based multicam shoots). It enables editors or live directors to mark important moments (Start, Cut, Outtake, etc.) with frame-accurate timestamps and generate `.EDL` files for import into DaVinci Resolve.

#### 📷 Screenshots
<table>
  <tr>
    <td align="center" width="50%">
      <img src="screenshots/screenshot_edl_marker_1_1.png" width="250px"><br>
      <strong>EDL Marker Tool</strong>
    </td>
  </tr>
</table>

#### ✨ Features

* Real-time timecode with configurable framerate (24–120 fps)
* Timezone and latency correction
* Marker buttons with common live production tags
* Editable project list saved locally via cookies
* Export EDL files compatible with Resolve ("Timeline Markers from EDL")

---

### 2. **EDL-Enabled Video Commenting Tool for Resolve**
[Example: EDL Video Player](https://phantomcrew-de.github.io/EDL-Tools-for-Live-Video-Production/EDL_video_player_for_resolve_1_1_DE.html)
File: `EDL_video_player_for_resolve_1_1_DE.html`

An HTML video player for reviewing media files and adding comments directly at specific timecodes. Designed for editors and directors to review takes collaboratively.

#### 📷 Screenshots
<table>
  <tr>
    <td align="center" width="50%">
      <img src="screenshots/screenshot_edl_videoplayer_1_1.png" width="250px"><br>
      <strong>EDL Video Player</strong>
    </td>
  </tr>
</table>

#### ✨ Features

* Import multiple local video files
* Add, edit, and delete time-stamped comments
* Import and parse `.EDL` files generated from the marker tool
* Export annotated `.EDL` files with Resolve-compatible metadata

---

## 🧩 Use Cases

* Live event direction (e.g., theater, conferences)
* Syncing postproduction notes with video material
* Collaborative feedback on rough cuts
* Nonlinear editing workflows in Resolve

---

## 📝 How to Use

1. Open either HTML file in your browser.
2. Use the interface to mark or annotate moments.
3. Export the EDL file.
4. In **DaVinci Resolve**:

   * Right-click on a timeline → `Timelines` → `Import` → `Timeline Markers from EDL`.

---

## 📦 Requirements

* A modern web browser (Chrome, Firefox, Edge, etc.)
* Local video files for the player
* No server required – everything runs client-side

---

## 📁 File Structure

```
📁 EDL-Tools-for-Live-Video-Production-main
├── 📄 EDL_for_ATEM_live_production_1_1_EN.html
├── 📄 EDL_for_ATEM_live_production_1_1_DE.html
├── 📄 EDL_video_player_for_resolve_1_1_DE.html
├── 📄 LICENSE
├── 📄 README.md
├── 📁 css
│   └── 📄 style.css
├── 📁 legacy
│   ├── 📄 EDL_for_ATEM_live_production_0_1_EN.html
│   └── 📄 style.css
└── 📁 sfx
    └── 🔊 beepsound.mp3
```

---

## 📄 License
Licensed under the GNU General Public License v3.0 (GPL-3.0) — free to use, modify, and distribute under the same terms.
This is an unofficial project and has no affiliation with Blackmagic Design.
“DaVinci Resolve” is a registered trademark of Blackmagic Design Pty Ltd.

---

## 🤝 Author

Made with ❤️ by Julius – [phantomcrew.de](https://phantomcrew.de/)
