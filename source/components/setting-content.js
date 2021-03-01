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

        shadow.innerHTML = `
        <div class="settingContent">
          <!--
          <span class="closeSetting" onclick=closeSettingButton() >&times;</span>
          -->
          <h2 id="settingHeader">SETTINGS</h2>
          
          <div id="focusContainer">
            <label class="inputLabel">Focus: </label>
            <input class="textInputBox" id="focusNumber" name="shortBreakNumber" type="number" min="15" max="60"
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
      /*style.textContent = `
      #settingHeader {
        text-align: center;
        color: white;
      }
      .settingContent {
        background-color: #181d28; 
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        min-width: 300px;
        display: inline-block;
        text-align: left;
      }

      .closeSetting {
        color: white;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }

      .closeSetting:hover,
      .closeSetting:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }

      .sectionBreak {
        visibility: hidden;
      }

      .inputLabel {
        color:white;
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
      }

      #focusNumber {
        margin-left: 35px;
      }

      #cafeVolumeSlider {
        margin-left: 9px;
      }
    `;*/
    
    //change style
    style.textContent = `
      /*
      #settingHeader {
        text-align: center;
        color: white;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 0px;
        font-size: 3.5vw;
      } */

      .settingContent {
        //background-color: #181d28; 
        margin: auto;
        padding: 20px;
        //border: 1px solid #888;
        min-width: 300px;
        display: inline-block;
        text-align: left;
      }

      .sectionBreak {
        visibility: hidden;
      }

      .inputLabel {
        color:white;
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
      }

      #focusNumber {
        margin-left: 35px;
      }

      #cafeVolumeSlider {
        margin-left: 9px;
      }
    `;
    
    shadow.appendChild(style);
    }
}

customElements.define("setting-content", SettingContent);