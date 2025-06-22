    window.onbeforeunload = function() {
  return "Are you sure you want to leave? Any unsaved data will be lost.";
}

      let startTime = new Date();
      let timecodeList = [];

      let timezoneOffsets = {
    "UTC": 0,
    "UTC-12": -12,
    "UTC-11": -11,
    "UTC-10": -10,
    "UTC-9": -9,
    "UTC-8": -8,
    "UTC-7": -7,
    "UTC-6": -6,
    "UTC-5": -5,
    "UTC-4": -4,
    "UTC-3": -3,
    "UTC-2": -2,
    "UTC-1": -1,
    "UTC+1": 1,
    "UTC+2": 2,
    "UTC+3": 3,
    "UTC+4": 4,
    "UTC+5": 5,
    "UTC+6": 6,
    "UTC+7": 7,
    "UTC+8": 8,
    "UTC+9": 9,
    "UTC+10": 10,
    "UTC+11": 11,
    "UTC+12": 12
}


    let framerates = {
        "24": 24,
        "30": 30,
        "50": 50,
        "60": 60,
        "120":120,
        "25": 25
    }

function updateTime() {
    let selectedTimezone = document.getElementById("timezone-selector").value;
    let offset = timezoneOffsets[selectedTimezone];
    let selectedFramerate = document.getElementById("framerate-selector").value;
    let framerate = framerates[selectedFramerate];
    let latency = document.getElementById("latency-input").value;
    let currentTime = new Date();
    currentTime.setMilliseconds(currentTime.getMilliseconds() + parseInt(latency));
    let hours = (currentTime.getUTCHours() + offset) % 24;
    if (hours < 0) {
       hours += 24;
    }
    let minutes = currentTime.getUTCMinutes();
    let seconds = currentTime.getUTCSeconds();
    let milliseconds = currentTime.getUTCMilliseconds();
    let timecode = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}:${formatNumber(Math.round(milliseconds / 1000 * framerate))}`;
    document.getElementById("timer").innerHTML = timecode;
}



      function formatNumber(n) {
        return n.toString().padStart(2, "0");
      }
      function formatNumberThree(n) {
        return n.toString().padStart(3, "0");
      }
function sync() {
  let beep = new Audio("sfx/beepsound.mp3"); 
  beep.play();
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "Syncpoint", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
}


function addComment() {
  let comment = prompt("Enter your comment:");
  let timecode = document.getElementById("timer").innerHTML;
  let commentItem = {timecode: timecode, comment: comment, id: Date.now()};
  timecodeList.unshift(commentItem);
  saveProject();

  // Get the project title from the textbox
  let projectTitle = document.getElementById("project-title").value;
  let edlFileName = `${projectTitle}.edl`;
  // Use the edlFileName variable as the filename for the EDL file
}



      function addOuttake() {
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "Outtake", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
      }

      function addStart() {
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "Start", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
      }

      function addCut() {
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "Cut", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
      }

      function addContinue() {
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "Continue", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
      }


      function addEnd() {
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "End", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
      }

      function addAgain() {
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "Again", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
      }

      function addCheckforerror() {
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "Check this part for an Error", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
      }
      
      function addCloseup() {
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "Close-up", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
      }      
      
      function addSlomo() {
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "Slow motion or timelapse", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
      }      

                      
      function addTransition() {
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "Transition", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
      }                   
      function addVFX() {
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "Visual effects or SFX/Music", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
      }      

                      
      function addBesttake() {
        let timecode = document.getElementById("timer").innerHTML;
        let commentItem = {timecode: timecode, comment: "Best Take", id: Date.now()};
        timecodeList.push(commentItem);
        saveProject();
      }                   





   // Add animation classes in the correct places
   

function renderList() {
    timecodeList.sort((a, b) => b.id - a.id);
    let listHTML = "";
    timecodeList.forEach(({ timecode, comment, id, color }, index) => {
        let colorCode = color || getColorForComment(comment);
        listHTML += `<li id="item_${id}" ${index === 0 ? "class='new-entry'" : ""}>
            <div 
              id="colorbox_${id}"
              onclick="changeColor(${id})"
              style="width: 16px; height: 16px; margin-right: 5px; background-color: ${resolveColorToHex(colorCode)}; cursor: pointer; border: 1px solid black;"
              title="Click to change color"
            ></div>
            <input style="width: 110px" type="text" value="${timecode}" id="timecode_${id}" onblur="editComment(${id})">
            <input style="width: 70%" type="text" value="${comment}" id="comment_${id}" onblur="editComment(${id})">
            <button style="width: 10px" onclick="deleteComment(${id})">x</button>
        </li>`;
    });
    document.getElementById("comment-list").innerHTML = listHTML;
}


    
    
    
    function deleteComment(id) {
        document.getElementById(`item_${id}`).classList.add("deleted-entry");
        setTimeout(() => {
            timecodeList = timecodeList.filter((item) => item.id !== id);
            saveProject();
        }, 500);
    }
      
      function editComment(id) {
        let timecode = document.getElementById(`timecode_${id}`).value;
        let comment = document.getElementById(`comment_${id}`).value;
        let commentToEdit = timecodeList.find(item => item.id === id);
        commentToEdit.timecode = timecode;
        commentToEdit.comment = comment;
        saveProject();
      }

    


function downloadList() {
  let currentDate = new Date();
  let date = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString().padStart(2, "0") + "-" + currentDate.getDate().toString().padStart(2, "0");
  let time = currentDate.getHours().toString().padStart(2, "0") + "-" + currentDate.getMinutes().toString().padStart(2, "0") + "-" + currentDate.getSeconds().toString().padStart(2, "0");

  let projectTitle = document.getElementById("project-title").value.trim();
  if (projectTitle === "") {
    projectTitle = "UntitledProject";
  }

  if (timecodeList.length === 0) {
    alert("No markers found. Add at least one marker before downloading the EDL.");
    return;
  }

  let edlFileName = `${date}_${time}_${projectTitle.replace(/ä/g,"ae").replace(/ü/g,"ue").replace(/ö/g,"oe").replace(/[^a-zA-Z0-9]/g, "_")}.edl`;

  let commentNr = "1";
  let listString = `TITLE: ${projectTitle} | created in edl webapp by PHANTOMCREW.DE
FCM: NON-DROP FRAME

`;
  timecodeList.forEach((item) => {
    let {timecode, comment, color} = item;
    let colorCode = color || getColorForComment(comment);
    listString += `${formatNumberThree(commentNr)}  001      V     C        ${timecode} ${timecode} ${timecode} ${timecode} 
 |C:${colorCode} |M:${comment} |D:1

`;
    commentNr++;
  });

  let a = document.createElement("a");
  let file = new Blob([listString], {type: "text/plain"});
  a.href = URL.createObjectURL(file);
  a.download = edlFileName;
  a.click();
}


// Save the list of timecodes and comments with the project name in a cookie
function saveProject() {
    let projectName = document.getElementById("project-title").value;
    if(projectName === "") {
        projectName = "Autosave";
    }
    let timecodeListJson = JSON.stringify(timecodeList);
    document.cookie = `${projectName}=${timecodeListJson}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    populateDropdown();
    let dropdown = document.getElementById("project-dropdown");
    let selected = dropdown.options[dropdown.selectedIndex].text;
    if (projectName !== "" && projectName !== selected) {
        let option = document.createElement("option");
        option.text = projectName;
        dropdown.add(option);
        dropdown.value = projectName;
    }
    document.getElementById("project-title").value = projectName;
    dropdown.selectedIndex = dropdown.options.findIndex(x => x.value === projectName)
}

// Populate the project dropdown list with all saved project names
function populateDropdown() {
    let dropdown = document.getElementById("project-dropdown");
    dropdown.innerHTML = "";
    let cookieArray = document.cookie.split(";");
    let projectNames = new Set();
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        let cookieName = cookie.split("=")[0].trim();
        
        if (cookieName === "wordpress_test_cookie" || 
    cookieName === "wp-settings-1" || 
    cookieName === "wp-settings-time-1" || 
    cookieName === "pbid" || 
    cookieName === "pys_session_limit" || 
    cookieName === "last_pysTrafficSource" || 
    cookieName === "cookie_notice_accepted" ||
    cookieName === "pys_start_session" ||
    cookieName === "pys_first_visit" ||
    cookieName === "pysTrafficSource" ||
    cookieName === "pys_landing_page" ||
    cookieName === "last_pys_landing_page") {
        continue;
}
        if (!projectNames.has(cookieName)) {
            let option = document.createElement("option");
            option.value = cookieName;
            option.innerHTML = cookieName;
            projectNames.add(cookieName);
            dropdown.appendChild(option);
        }
    }
    dropdown.value = document.getElementById("project-title").value;
    dropdown.onchange = function() {
        document.getElementById("project-title").value = dropdown.value;
        loadProject();
    }
    renderList();
}

// Load the list of timecodes and comments for the selected project
function loadProject() {
    let projectName = document.getElementById("project-dropdown").value;
    let cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        let cookieName = cookie.split("=")[0].trim();
        if (cookieName === projectName) {
            let timecodeListJson = cookie.split("=")[1];
            timecodeList = JSON.parse(timecodeListJson);
            renderList();
            break;
        }
    }
}

// Delete the selected project from the dropdown and cookies
function deleteProject() {
    let projectName = document.getElementById("project-dropdown").value;
    document.cookie = `${projectName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    populateDropdown();
    timecodeList = [];
    renderList();
}

window.addEventListener("load", populateDropdown);


    
function getColorForComment(comment) {
  switch (comment) {
    case "Outtake": return "ResolveColorFuchsia";
    case "Cut": return "ResolveColorPink";
    case "Start": return "ResolveColorYellow";
    case "Syncpoint": return "ResolveColorGreen";
    case "Continue": return "ResolveColorCyan";
    case "Again": return "ResolveColorSand";
    case "End": return "ResolveColorRed";
    case "Check this part for an Error": return "ResolveColorCocoa";
    case "Best Take": return "ResolveColorLavender";
    case "Slow motion or timelapse": return "ResolveColorSky";
    default: return "ResolveColorBlue";
  }
}

function resolveColorToHex(resolveColor) {
  const map = {
    "ResolveColorBlue": "#3A78C3",
    "ResolveColorFuchsia": "#D557A0",
    "ResolveColorPink": "#EC8C99",
    "ResolveColorYellow": "#F5D76E",
    "ResolveColorGreen": "#3AC36D",
    "ResolveColorCyan": "#5AD2F4",
    "ResolveColorSand": "#D6C199",
    "ResolveColorRed": "#E74C3C",
    "ResolveColorCocoa": "#9B6E5C",
    "ResolveColorLavender": "#C299FF",
    "ResolveColorSky": "#8AD3FF"
  };
  return map[resolveColor] || "#3A78C3";
}

function changeColor(id) {
  let existing = document.getElementById("color-picker");
  if (existing) existing.remove();

  const colors = [
    "ResolveColorBlue", "ResolveColorFuchsia", "ResolveColorPink", "ResolveColorYellow",
    "ResolveColorGreen", "ResolveColorCyan", "ResolveColorSand", "ResolveColorRed",
    "ResolveColorCocoa", "ResolveColorLavender", "ResolveColorSky"
  ];

  const picker = document.createElement("div");
  picker.id = "color-picker";
  picker.style.position = "absolute";
  picker.style.background = "#fff";
  picker.style.border = "1px solid #ccc";
  picker.style.padding = "5px";
  picker.style.display = "grid";
  picker.style.gridTemplateColumns = "repeat(4, 20px)";
  picker.style.gap = "4px";
  picker.style.zIndex = 1000;

  const colorBox = document.getElementById(`colorbox_${id}`);
  const rect = colorBox.getBoundingClientRect();
  picker.style.left = rect.left + "px";
  picker.style.top = (rect.bottom + window.scrollY + 4) + "px";

  colors.forEach(colorName => {
    const colorDiv = document.createElement("div");
    colorDiv.style.width = "20px";
    colorDiv.style.height = "20px";
    colorDiv.style.backgroundColor = resolveColorToHex(colorName);
    colorDiv.style.cursor = "pointer";
    colorDiv.title = colorName;
    colorDiv.onclick = () => {
      const item = timecodeList.find(item => item.id === id);
      item.color = colorName;
      document.getElementById("color-picker").remove();
      saveProject();
      renderList();
    };
    picker.appendChild(colorDiv);
  });

  document.body.appendChild(picker);

  setTimeout(() => {
    document.addEventListener("click", function removePicker(e) {
      if (!picker.contains(e.target) && !colorBox.contains(e.target)) {
        picker.remove();
        document.removeEventListener("click", removePicker);
      }
    });
  }, 0);
}

function toggleInfoBox() {
  const box = document.getElementById("info-box");
  box.style.display = box.style.display === "none" ? "block" : "none";
}



function toggleInfoBox() {
  const box = document.getElementById("info-box");
  box.style.display = (box.style.display === "block") ? "none" : "block";
}
