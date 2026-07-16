
import { loadScript } from "./helpers/loaders.js";



export function loadSmoothScroll() {

    // lenis
    loadScript("https://unpkg.com/lenis@1.1.20/dist/lenis.min.js", () => {

        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    });

}