// product-item.js
class SettingContent extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    
    const defaultVolume = localStorage.getItem('volume') || 100; 
    const focusTime = localStorage.getItem('focusTime') || 25;
    const shortBreakTime = localStorage.getItem('shortBreakTime') || 5;
    const longBreakTime = localStorage.getItem('longBreakTime') || 15;

    shadow.innerHTML = `
    <div class="settingContent">

      <span class="closeSetting" onclick=closeSettingButton() >&times;</span>
      <h2>Setting</h2>
      
      <hr>
      
      <div id="focusContainer">
        <label>Focus: </label>
        <input id="focusNumber" name="shortBreakNumber" type="number" min="15" max="60"
        value="${focusTime}">
        <label> min</label>
      </div>
      
      <div id="shortBreakContainer">
        <label>Short Break: </label>
        <input id="shortBreakNumber" name="shortBreakNumber" type="number" min="5" max="20"
        value="${shortBreakTime}">
        <label> min</label>
      </div>
      
      <div id="longBreakContainer">
        <label>Long Break: </label>
        <input id="longBreakNumber" name="longBreakNumber" type="number" min="10" max="40"
        value="${longBreakTime}">
        <label> min</label>
      </div>

      <hr>
      
      <div id="volumeContainer">
        <label>Volume: </label>
        <input id="volumeSlider" name="volumeSlider" type="range" min="0" max="100" value=${defaultVolume}>
        <label id="volumeNumber">${defaultVolume}</label>
      </div>

    </div>
    `
    const style = document.createElement('style')
    style.textContent = `
      .settingContent {
        background-color: #1A120F; 
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        min-width: 300px;
        display: inline-block;
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

      h2 {
        color: white;
      }

      p {
        color: white;
      }

      label {
        color:white;
      }

      #volumeSlider {
        vertical-align: middle;
      }

      input[type='number'] {
        max-width: 2.5em;
      }
    `
    shadow.appendChild(style)
  }
}

customElements.define('setting-content', SettingContent)

