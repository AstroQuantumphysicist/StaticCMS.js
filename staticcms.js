/**
 * StaticCMS.js - A customizable web component to display text from a .txt file.
 * 
 * This script enables the use of a custom tag <static-text src="file.txt"></static-text>
 * to load and display text content dynamically with full customization options.
 * 
 * License: MIT
 * Developed by: AstroQuantumphysicist 🚀
 */

class StaticText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.textContainer = document.createElement("div");
        this.shadowRoot.appendChild(this.textContainer);
    }

    connectedCallback() {
        this.updateStyles();
        const src = this.getAttribute("src");
        if (src) {
            this.loadText(src);
        }
    }

    async loadText(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load: ${url}`);
            }
            const text = await response.text();
            this.textContainer.textContent = text;
        } catch (error) {
            this.textContainer.textContent = `Error loading text: ${error.message}`;
        }
    }

    static get observedAttributes() {
        return ["src", "color", "font-size", "background", "padding", "text-align"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === "src") {
                this.loadText(newValue);
            } else {
                this.updateStyles();
            }
        }
    }

    updateStyles() {
        this.textContainer.style.color = this.getAttribute("color") || "black";
        this.textContainer.style.fontSize = this.getAttribute("font-size") || "16px";
        this.textContainer.style.background = this.getAttribute("background") || "transparent";
        this.textContainer.style.padding = this.getAttribute("padding") || "0";
        this.textContainer.style.textAlign = this.getAttribute("text-align") || "left";
    }
}

customElements.define("static-text", StaticText);
