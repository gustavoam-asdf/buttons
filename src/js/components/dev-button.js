{
  let root
  class DevButton extends HTMLElement {
    constructor() {
      super()
      root = this.attachShadow({
        mode: 'closed'
      })
      // StyleSheet
      this.styleSheet = document.createElement('link')
      this.styleSheet.setAttribute('rel', 'stylesheet')
      this.styleSheet.setAttribute('href', './css/components/button.css')

      this.button = document.createElement('button')
      this.button.innerHTML = `
        <slot name="left-icon" class="icon fas" ></slot>
        <slot name="text"></slot>
        <slot name="right-icon" class="icon fas"></slot>
      `
    }

    connectedCallback() {
      root.prepend(this.styleSheet)
      root.append(this.button)
    }

    static get observedAttributes() {
      return ['box-shadow', 'variant', 'size', 'color', 'disabled']
    }

    attributeChangedCallback(attr, oldValue, newValue) {
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
      } else if (attr === 'color') {
        this.button.classList.remove(`color-${oldValue}`)
        this.button.classList.add(`color-${newValue}`)
      }
    }
  }
  customElements.define('dev-button', DevButton)
}
