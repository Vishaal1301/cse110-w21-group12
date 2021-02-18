// product-item.js
class SettingContent extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode: 'open'})
        shadow.innerHTML = `
        <div class="setting-content">

            <span class="close-setting">&times;</span>
            <h2>Setting</h2>
            <p>_________________________</p>
            <p>Focus: 25 min</p>
            <p>Short Break: 5 min</p>
            <p>Long Break: 30 min</p>
            <p>_________________________</p>
            <p>Volume</p>

        </div>
        `
      const style = document.createElement('style')  
      style.textContent = `
      .setting-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        }

        .close-setting {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        }

        .close-setting:hover,
        .close-setting:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
        }
      `
      shadow.appendChild(style)
    }
  }
  
  customElements.define('setting-content', SettingContent)
  
  