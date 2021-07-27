class DevButton extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    })
    this.styleSheet = document.createElement('link')
    this.styleSheet.setAttribute('rel', 'stylesheet')
    this.styleSheet.setAttribute('href', '/src/css/components/button.css')

    this.button = document.createElement('button')
    this.button.classList.add('button')
  }

  connectedCallback() {
    this.shadowRoot.prepend(this.styleSheet)
    this.shadowRoot.append(this.button)
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
      if (newValue === 'button') return
      this.button.classList.remove(oldValue)
      this.button.classList.add(newValue)
    }
  }
}
customElements.define('dev-button', DevButton)
