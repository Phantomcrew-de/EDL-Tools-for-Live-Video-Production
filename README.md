# 🎬 EDL Tools for Live Video Production & DaVinci Resolve

This repository provides two lightweight, browser-based web applications to support timecode-based editing and video annotation workflows, particularly for live productions and DaVinci Resolve postproduction.

---

## 🛠️ Tools Included

### 1. **EDL Marker Tool for Live Production**

File: `EDL_for_ATEM_live_production_1_1.html`

A browser-based timecode tracker tailored for live production environments (e.g., ATEM-based multicam shoots). It enables editors or live directors to mark important moments (Start, Cut, Outtake, etc.) with frame-accurate timestamps and generate `.EDL` files for import into DaVinci Resolve.

#### ✨ Features

* Real-time timecode with configurable framerate (24–120 fps)
* Timezone and latency correction
* Marker buttons with common live production tags
* Editable project list saved locally via cookies
* Export EDL files compatible with Resolve ("Timeline Markers from EDL")

---

### 2. **EDL-Enabled Video Commenting Tool for Resolve**

File: `EDL_video_player_for_resolve_1_1.html`

An HTML video player for reviewing media files and adding comments directly at specific timecodes. Designed for editors and directors to review takes collaboratively.

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
├── EDL_for_ATEM_live_production_1_1.html
├── EDL_video_player_for_resolve_1_1.html
```

---

## 📄 License

MIT License (Feel free to use, adapt, and distribute)

---

## 🤝 Author

Made with ❤️ by Julius – [julius-video.de](https://www.julius-video.de)
