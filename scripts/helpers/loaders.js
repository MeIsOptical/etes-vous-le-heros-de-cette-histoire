


// dynamically load script
export function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

// dynamically add stylesheet
export function loadCSS(href, callback) {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;

    if (callback) {
        link.onload = callback;
        link.onerror = () => console.error(`Failed to load CSS: ${href}`);
    }

    document.head.appendChild(link);
}
