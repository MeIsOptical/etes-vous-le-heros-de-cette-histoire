


import { loadSmoothScroll } from "./smoothScroll.js";


async function boot() {


    //#region HANDLE HEADER


    
    const headerElement = document.getElementById("headerDiv");
    if (headerElement) {

        // set header from component file

        const headerUrl = new URL('../components/header.html', import.meta.url);
        const headerResponse = await fetch(headerUrl);
        const headerContents = await headerResponse.text();

        headerElement.innerHTML = headerContents;



        // get dynamic base path from script location
        let basePath = new URL('../', import.meta.url).pathname;
        if (basePath.endsWith('/')) {
            basePath = basePath.slice(0, -1);
        }

        // update root-relative links to include base path
        for (const link of document.querySelectorAll("a")) {
            const href = link.getAttribute("href");
            if (href && href.startsWith("/")) {
                link.setAttribute("href", basePath + href);
            }
        }


        // apply active class to current page link
        const currentPath = window.location.pathname;
        
        for (const link of headerElement.querySelectorAll("a")) {
            if (currentPath === link.pathname) {
                link.classList.add("activeLink");


                break;
            }
        }

    }




    //#endregion


    //#region SMOOTH SCROLL

    loadSmoothScroll();

    //#endregion
}




boot();





// lower main div
function updateContentOffset() {
    const header = document.getElementById('headerDiv');
    const mainContent = document.querySelector('.pageDiv');

    if (header && mainContent) {
        mainContent.style.paddingTop = `${header.offsetHeight}px`;
    }
}
window.addEventListener('load', updateContentOffset);
window.addEventListener('resize', updateContentOffset);