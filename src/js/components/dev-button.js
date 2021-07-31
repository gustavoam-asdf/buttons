{
  let root
  let contador = 0
  class DevButton extends HTMLElement {
    constructor() {
      super()
      root = this.attachShadow({
        mode: 'closed'
      })
      this.setupStyleSheet('./css/components/button.css')
      this.setupButton()
    }

    setupStyleSheet(url) {
      this.styleSheet = document.createElement('link')
      this.styleSheet.setAttribute('rel', 'stylesheet')
      this.styleSheet.setAttribute('href', url)
      return this.styleSheet
    }

    get defaultButton() {
      const button = document.createElement('button')
      button.innerHTML = `
        <slot name="left-icon" class="icon fas" ></slot>
        <slot name="text"></slot>
        <slot name="right-icon" class="icon fas"></slot>
        <span class="indicator disabled">Button</span>
      `
      return button
    }

    setupButton() {
      this.button = this.defaultButton
      this.indicatorMessage = this.button.querySelector('span.indicator')
      this.button.addEventListener('mouseenter', () => {
        this.indicatorMessage.classList.remove('disabled')
        this.indicatorMessage.classList.add('enabled')
      })
      this.button.addEventListener('mouseleave', () => {
        this.indicatorMessage.classList.remove('enabled')
        this.indicatorMessage.classList.add('disabled')
      })
    }

    connectedCallback() {
      root.prepend(this.styleSheet)
      root.append(this.button)
    }

    static get observedAttributes() {
      return [
        'box-shadow',
        'variant',
        'size',
        'color',
        'indicator',
        'autofocus',
        'disabled',
        'form',
        'formaction',
        'formenctype',
        'formmethod',
        'formnovalidate',
        'formtarget',
        'name',
        'type',
        'value'
      ]
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
      } else if (attr === 'indicator') {
        this.indicatorMessage.textContent = newValue
      } else {
        newValue != null
          ? this.button.setAttribute(attr, newValue)
          : this.button.removeAttribute(attr)
      }
    }
  }
  customElements.define('dev-button', DevButton)
}
