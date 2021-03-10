/**
 * SettingContent custom Component
 */
class SettingContent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: "open"});

        // Session length and Volume variables
        const defaultAlarmVolume = localStorage.getItem("alarmVolume") || 100;
        const defaultCafeVolume = localStorage.getItem("cafeVolume") || 100;
        const focusTime = localStorage.getItem("focusTime") || 25;
        const shortBreakTime = localStorage.getItem("shortBreakTime") || 5;
        const longBreakTime = localStorage.getItem("longBreakTime") || 15;

        // Update the localStorage to default session length
        localStorage.setItem("cafeVolume", defaultCafeVolume);
        localStorage.setItem("alarmVolume", defaultAlarmVolume);
        localStorage.setItem("focusTime", focusTime);
        localStorage.setItem("shortBreakTime", shortBreakTime);
        localStorage.setItem("longBreakTime", longBreakTime);
        let cafeSounds = document.querySelector("#cafeSounds");
        cafeSounds.volume = defaultCafeVolume / 100;
        
        // The Setting content component
        shadow.innerHTML = `
          <div class="settingContent"> 
            <div id="focusContainer">
              <label class="inputLabel">Focus: </label>
              <input class="textInputBox" id="focusNumber" type="number" min=".1" max="60"
              value="${focusTime}">
              <label class="inputLabel"> min</label>
              <span id="invalidFocusMessage" class="invalidMessage"> </span>
            </div>
            
            <div id="shortBreakContainer">
              <label class="inputLabel">Short Break: </label>
              <input class="textInputBox" id="shortBreakNumber" type="number" min=".1" max="20"
              value="${shortBreakTime}">
              <label class="inputLabel"> min</label>
              <span id="invalidShortBreakMessage" class="invalidMessage"> </span>
            </div>
            
            <div id="longBreakContainer">
              <label class="inputLabel">Long Break: </label>
              <input class="textInputBox" id="longBreakNumber" type="number" min=".1" max="40"
              value="${longBreakTime}">
              <label class="inputLabel"> min</label>
              <span id="invalidLongBreakMessage" class="invalidMessage"> </span>
            </div>
            <hr class="sectionBreak">
            
            <div id="cafeVolumeContainer">
              <label class="inputLabel">Cafe Volume: </label>
              <div class = "space" style="display:inline-block; width:2%;"></div>
              <input id="cafeVolumeSlider" name="volumeSlider" type="range" min="0" max="100" value=${defaultCafeVolume}>
              <label class="inputLabel" id="cafeVolumeNumber">${defaultCafeVolume}</label>
            </div>
            <div id="alarmVolumeContainer">
              <label class="inputLabel">Alarm Volume: </label>
              <input id="alarmVolumeSlider" name="alarmVolumeSlider" type="range" min="0" max="100" value=${defaultAlarmVolume}>
              <label class="inputLabel" id="alarmVolumeNumber">${defaultAlarmVolume}</label>
            </div>
          </div>
          `;

        const style = document.createElement("style");

        // Settings Commponent styles
        style.textContent = `
          .settingContent {
            margin-left: 3vw;
            margin-bottom: 1vw;
            color: white;
            font-size: 1.2vw;
            font-family: 'Open Sans', sans-serif
          }
          .sectionBreak {
            visibility: hidden;
          }
          .inputLabel {
            color:white;
            font-size: 1.2vw;
            font-family: 'Open Sans', sans-serif
          }
          #alarmVolumeSlider {
            vertical-align: middle;
            display:inline-block;
            width: 45%;
            margin-bottom:10px;
          }
          .textInputBox {
            border-style: solid;
            border-width: 0px 0px 1px 0px;
            background-color: #181d28;
            color: white;
            outline: none;
            font-size: 1.2vw;
            font-family: 'Open Sans', sans-serif
          }
          #focusNumber {
            margin-left: 14%;
          }
          #longBreakNumber{
            margin-left: 0.9%;
          }
          #cafeVolumeSlider {
            display:inline-block;
            width: 45%;
          }
        `;
        
        shadow.appendChild(style);
    }
}

customElements.define("setting-content", SettingContent);