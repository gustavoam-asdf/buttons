{
  let root
  class DevButton extends HTMLElement {
    constructor() {
      super()
      root = this.attachShadow({
        mode: 'closed'
      })
      this.styleSheet = document.createElement('link')
      this.styleSheet.setAttribute('rel', 'stylesheet')
      this.styleSheet.setAttribute('href', './css/components/button.css')

      this.button = document.createElement('button')
      this.initialHTML = document.createElement('div')
      this.initialHTML.insertAdjacentHTML('afterbegin', this.innerHTML)
    }

    connectedCallback() {
      this.button.textContent = this.initialHTML.textContent
      root.prepend(this.styleSheet)
      root.append(this.button)
      this.innerHTML = ''
    }

    static get observedAttributes() {
      return ['box-shadow', 'variant', 'size', 'disabled']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      console.log({ attr, oldValue, newValue })
      if (attr === 'box-shadow') {
        newValue === ''
          ? this.button.classList.add('box-shadow')
          : this.button.classList.remove('box-shadow')
      } else if (attr === 'variant') {
        this.button.classList.remove(`variant-${oldValue}`)
        this.button.classList.add(`variant-${newValue}`)
      } else if (attr === 'size') {
        this.button.classList.remove(`size-${oldValue}`)
        this.button.classList.add(`size-${newValue}`)
      } else if (attr === 'disabled') {
        this.button.setAttribute(attr, newValue)
      }
    }
  }
  customElements.define('dev-button', DevButton)
}
