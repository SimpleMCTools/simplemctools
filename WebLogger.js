export class WebLogger {
    constructor(elementId) {
        this.container = document.getElementById(elementId);
    }

    #writeToScreen(type, text) {
        const timestamp = new Date().toLocaleTimeString();

        // creating a new line for the log
        const logLine = document.createElement('div');
        logLine.style.marginBottom = '5px';

        // styling stuff
        if (type === 'error') logLine.style.color = '#ff6b6b';
        else if (type === 'warn') logLine.style.color = '#fcca46';
        else logLine.style.color = '#a2d2ff';

        // Formating the text output
        logLine.textContent = `[${timestamp}] [${type.toUpperCase()}] - ${text}`;

        // appending to container and auto scrolling to the bottom
        if (this.container) {
            this.container.appendChild(logLine);
            this.container.scrollTop = this.container.scrollHeight;
        }

        // logging to console as well
        console.log(`[${timestamp}] [${type.toUpperCase()}] - ${text}`);
    }

    info(text) { this.#writeToScreen('info', text); }
    warn(text) { this.#writeToScreen('warn', text); }
    error(text) { this.#writeToScreen('error', text); }

    clear() {
        if (this.container) {
            this.container.innerHTML = '<h2 color="white">Logger</h2>';
        }
    }
}
