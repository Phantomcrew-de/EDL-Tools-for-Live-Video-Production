import * as Y from 'https://cdn.jsdelivr.net/npm/yjs@13/+esm';
import { WebrtcProvider } from 'https://cdn.jsdelivr.net/npm/y-webrtc@10/+esm';

const $ = id => document.getElementById(id);

let ydoc = null;
let provider = null;
let yTitle, yCuts;
let remoteSync = false;

/**
 * Generate a random **6-digit hexadecimal** string (e.g. "a1b2c3").
 * Uses `crypto.getRandomValues` for better randomness than `Math.random()`.
 */
function generateRandomHex(){
  return [...crypto.getRandomValues(new Uint8Array(3))]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function setStatus(text, color = 'gray', durationMs = 0){
  const el = $('p2p-status');
  if(el){
    el.textContent = text;
    el.style.color = color;
    if(durationMs > 0){
      setTimeout(()=>{ el.textContent = '🟢 verbunden'; el.style.color = 'green'; }, durationMs);
    }
  }
}

function updatePeerCount(count){
  const el = $('peer-count');
  if(el){
    el.style.display = 'inline';
    el.textContent = '👥 '+count;
  }
}

function logDebug(msg){
  const el = $('debug-log');
  if(el){
    const ts = new Date().toLocaleTimeString();
    el.value += `[${ts}] ${msg}\n`;
    el.scrollTop = el.scrollHeight;
  }
  console.debug(msg);
}

function copyLink(){
  const room = $('p2p-room')?.value.trim();
  let link = location.href;
  if(room && !link.includes('?room=')){
    link = location.origin + location.pathname + '?room=' + encodeURIComponent(room);
  }
  navigator.clipboard.writeText(link).then(()=>{
    setStatus('📋 Link kopiert', 'blue', 1500);
  }).catch(()=>{
    prompt('Link kopieren:', link);
  });
}


function pushLocalToPeers(){
  if (!provider || !yCuts || remoteSync) return;

  remoteSync = true;
  ydoc.transact(() => {
    // 1. Remove cuts that no longer exist locally
    const localKeys = new Set(window.timecodeList.map(e => String(e.id)));
    for (const key of Array.from(yCuts.keys())) {
      if(!localKeys.has(key)){
        yCuts.delete(key);
      }
    }
    // 2. Add or update all local entries
    for (const entry of window.timecodeList) {
      const key = String(entry.id);
      const existing = yCuts.get(key);
      if (!existing || existing.id < entry.id) {
        yCuts.set(key, entry);
      }
    }
  });
  logDebug("🗂 pushLocalToPeers(): " + JSON.stringify(Object.fromEntries(yCuts.entries())));
  remoteSync = false;
}


function connectRoom(room){
  if(!room) return;

  if(history.replaceState){
    history.replaceState(null,'',location.pathname+'?room='+encodeURIComponent(room));
  }

  logDebug(`connectRoom("${room}")`);

  provider?.destroy();
  ydoc?.destroy();

ydoc = new Y.Doc(); 
provider = new WebrtcProvider(room, ydoc, {
  signaling: [
    'wss://signaling.yjs.dev',
    'wss://y-webrtc-signaling-eu.herokuapp.com',
    'wss://y-webrtc-signaling-us.herokuapp.com'
  ],
  peerOpts: {
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        {
          urls: 'turn:openrelay.metered.ca:80',
          username: 'openrelayproject',
          credential: 'openrelayproject'
        }
      ]
    }
  },
  maxConns: 20,
  filterBcConns: false
});

  logDebug('WebRTC-Provider erzeugt, warte auf Status …');
  updatePeerCount(1);

  yTitle = ydoc.getText('title');
  yCuts  = ydoc.getMap('cuts'); // Map-refactor

  // clear any stale data and send a fresh full list on (re)connect
  yCuts.clear();

  setStatus('🔄 connecting','orange');
  provider.on('status', evt=>{
    logDebug(`status event: ${JSON.stringify(evt)}`);
    if(evt.status === 'connected'){
      setStatus('🟢 verbunden','green');
    }else{
      setStatus('🔄 warten…','orange');
    }
  });

  provider.awareness.on('update',()=>{
    const peers = [...provider.awareness.getStates().keys()].length;
    updatePeerCount(peers);
    logDebug(`awareness update – peers: ${peers}`);
  });

  yTitle.observe(()=>{
    if(remoteSync) return;
    const txt = yTitle.toString();
    const field = $('project-title');
    if(field && field.value !== txt) field.value = txt;
  });

  yCuts.observeDeep(()=>{
    if(remoteSync) return;
    remoteSync = true;
    const newList = Array.from(yCuts.values()).sort((a, b) => a.id - b.id);
    window.timecodeList = newList;
    if (typeof renderList === 'function') renderList();
    remoteSync = false;
    logDebug("📥 remoteSync: timecodeList aktualisiert – data: " + JSON.stringify(window.timecodeList));
  });

  yCuts.clear();
  // pushLocalToPeers(); // disabled to avoid re-adding deleted items
}

window.connectRoom = connectRoom;
window.pushLocalToPeers = pushLocalToPeers;

// Ab jetzt: alle Änderungen an timecodeList manuell pushen
window.syncTimecodeList = function(){
  saveProject();
  // pushLocalToPeers(); // disabled to avoid re-adding deleted items
}

// -----------------
// DOM READY
// -----------------

document.addEventListener('DOMContentLoaded', ()=>{
  // ---- Debug Log Toggle (text with arrow) ----
  const debugLog = $('debug-log');
  if(debugLog){
    debugLog.style.display = 'none';
    const toggle = document.createElement('span');
    toggle.id = 'debug-toggle';
    toggle.textContent = '▶ Debug anzeigen';
    toggle.style.cursor = 'pointer';
    toggle.style.userSelect = 'none';
    toggle.style.display = 'inline-block';
    toggle.style.margin = '.5em 0';
    toggle.addEventListener('click', ()=>{
      const visible = debugLog.style.display !== 'none';
      debugLog.style.display = visible ? 'none' : 'block';
      toggle.textContent = visible ? '▶ Debug anzeigen' : '▼ Debug verbergen';
    });
    debugLog.parentNode.insertBefore(toggle, debugLog);
  }

  const btnConnect = $('p2p-connect');
  if(btnConnect){
    btnConnect.addEventListener('click', ()=>{
      const room = $('p2p-room')?.value.trim();
      connectRoom(room);
    });
  }

  const btnShare = $('p2p-share');
  if(btnShare){
    btnShare.addEventListener('click', copyLink);
  }

  const titleField = $('project-title');
  if(titleField){
    titleField.addEventListener('input', ()=>{
      if(remoteSync) return;
      if(yTitle){
        remoteSync = true;
        yTitle.delete(0, yTitle.length);
        yTitle.insert(0, titleField.value);
        remoteSync = false;
      }
    });
  }

  // ----------------------------------------------------
  // Auto-fill the room field with a random HEX if none is
  // provided via URL.
  // ----------------------------------------------------
  const params = new URLSearchParams(location.search);
  const roomParam = params.get('room');
  if(roomParam){
    $('p2p-room').value = roomParam;
    connectRoom(roomParam);
  }else{
    const randomHex = generateRandomHex();
    $('p2p-room').value = randomHex;
    // Optionally auto-connect here; kept disabled so user can still edit.
    // connectRoom(randomHex);
    logDebug(`🔑 room prefilled with random HEX: ${randomHex}`);
  }
});
