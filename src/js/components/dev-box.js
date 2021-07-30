class Box extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({
      mode: 'open'
    })
    // StyleSheet
    this.styleSheet = document.createElement('link')
    this.styleSheet.setAttribute('rel', 'stylesheet')
    this.styleSheet.setAttribute('href', './css/components/box.css')

    this.shadowRoot.innerHTML = `
      <slot name="button"></slot>
    `
  }

  get buttonCode() {
    const buttonAllCode = this.querySelector('[slot="button"]').outerHTML
    return (
      buttonAllCode
        // Separate tags
        .split(/[\n\r\t]+/)
        // Clear tag
        .map(tag => tag.replace(/[\n\r\t ]+</, '<'))
        // Dev-button tags
        .filter(tag => /<\/?dev-button/.test(tag))
        .reduce((acc, curr) => acc + curr)
    )
  }

  connectedCallback() {
    const codeText = document.createElement('code')
    codeText.textContent = this.buttonCode
    this.shadowRoot.prepend(this.styleSheet)
    this.shadowRoot.prepend(codeText)
  }

  static get observedAttributes() {
    return []
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    console.log({ attr, oldValue, newValue })
  }
}
customElements.define('dev-box', Box)
