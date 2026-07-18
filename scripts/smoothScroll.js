


import { loadScript } from "./helpers/loaders.js";



export function loadSmoothScroll() {

    // lenis
    loadScript("https://unpkg.com/lenis@1.1.20/dist/lenis.min.js", () => {

        const lenis = new Lenis();
        const bg = document.querySelector('.backgroundImg');
        
        let maxScroll = 0;
        let maxTranslate = 0;

        // calculate bounds
        function updateBounds() {
            if (bg) {
                maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                maxTranslate = window.innerHeight - bg.offsetHeight;
            }
        }

        // watch for page height changes
        const resizeObserver = new ResizeObserver(updateBounds);
        resizeObserver.observe(document.body);
        

        lenis.on('scroll', (e) => {
            if (bg && maxScroll > 0) {
                // clamp progress to prevent rubber-banding issues
                const progress = Math.max(0, Math.min(1, e.scroll / maxScroll));
                bg.style.transform = `translateY(${progress * maxTranslate}px)`;
            }
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);




        // smooth url movement
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // scroll to middle
                    const elementHeight = targetElement.offsetHeight;
                    const windowHeight = window.innerHeight;
                    const offset = (windowHeight / 2) - (elementHeight / 2);

                    lenis.scrollTo(targetElement, {
                        offset: -offset
                    });
                                        
                    window.history.pushState(null, null, targetId); 
                }
            });
        });
    });

}