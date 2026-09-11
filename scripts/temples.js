const mainNav = document.querySelector('.navigation');
const hamburgerButton = document.querySelector('#menu');

hamburgerButton.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    hamburgerButton.classList.toggle('open');
});

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;