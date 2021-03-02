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

      //change min of first txtInputBox back to 15
      shadow.innerHTML = `
      <div class="settingContent"> 
        <div id="focusContainer">
          <label class="inputLabel">Focus: </label>
          <input class="textInputBox" id="focusNumber" name="shortBreakNumber" type="number" min=".1" max="60"
          value="${focusTime}">
          <label class="inputLabel"> min</label>
        </div>
        
        <div id="shortBreakContainer">
          <label class="inputLabel">Short Break: </label>
          <input class="textInputBox" id="shortBreakNumber" name="shortBreakNumber" type="number" min="5" max="20"
          value="${shortBreakTime}">
          <label class="inputLabel"> min</label>
        </div>
        
        <div id="longBreakContainer">
          <label class="inputLabel">Long Break: </label>
          <input class="textInputBox" id="longBreakNumber" name="longBreakNumber" type="number" min="10" max="40"
          value="${longBreakTime}">
          <label class="inputLabel"> min</label>
        </div>

        <hr class="sectionBreak">
        
        <div id="cafeVolumeContainer">
          <label class="inputLabel">Cafe Volume: </label>
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
  
    style.textContent = `
      .settingContent {
        margin-left: 3vw;
        margin-bottom: 1vw;
        color: white;
        font-size: 100%;
        font-family: 'Open Sans', sans-serif
      }

      .sectionBreak {
        visibility: hidden;
      }

      .inputLabel {
        color:white;
        font-size: 100%;
        font-family: 'Open Sans', sans-serif
      }

      #alarmVolumeSlider {
        vertical-align: middle;
      }

      .textInputBox {
        border-style: solid;
        border-width: 0px 0px 1px 0px;
        background-color: #181d28;
        color: white;
        outline: none;
        font-size: 100%;
        font-family: 'Open Sans', sans-serif
      }

      #focusNumber {
        margin-left: 35px;
      }

      #cafeVolumeSlider {
        margin-left: 16px;
      }
    `;
    
    shadow.appendChild(style);
  }
}

customElements.define("setting-content", SettingContent);