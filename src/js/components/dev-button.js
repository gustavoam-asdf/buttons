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
      this.styleSheet.setAttribute('href', '/src/css/components/button.css')

      this.button = document.createElement('button')
    }

    connectedCallback() {
      root.prepend(this.styleSheet)
      root.append(this.button)
    }

    static get observedAttributes() {
      return ['text', 'box-shadow', 'variant']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      console.log({ attr, oldValue, newValue })
      if (attr === 'text') {
        this.button.textContent = newValue
      } else if (attr === 'box-shadow') {
        newValue === ''
          ? this.button.classList.add('box-shadow')
          : this.button.classList.remove('box-shadow')
      } else if (attr === 'variant') {
        this.button.classList.remove(oldValue)
        this.button.classList.add(newValue)
      }
    }
  }
  customElements.define('dev-button', DevButton)
}
