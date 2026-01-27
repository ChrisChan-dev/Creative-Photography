const wrapper = document.getElementById('main-wrapper');
const scenes = document.querySelectorAll('.scene');
const cursor = document.querySelector('.cursor');
const isMobile = window.matchMedia("(pointer: coarse)").matches;

let currentScene = 0;

function goToScene(index) {
    currentScene = index;
    const yOffset = index * 100;
    wrapper.style.transform = `translateY(-${yOffset}vh)`;
    
    scenes.forEach((scene, i) => {
        const content = scene.querySelector('.content');
        if (i === index) {
            setTimeout(() => {
                content.classList.add('active');
                if (scene.id === 'story') {
                    animateStoryLines(scene);
                }
            }, 500);
        } else {
            content.classList.remove('active');
        }
    });
}

function animateStoryLines(scene) {
    const lines = scene.querySelectorAll('.line');
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = "1";
            line.style.transform = "translateY(0)";
        }, index * 300);
    });
}

function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = element.querySelector('img').src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

if (!isMobile && cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
} else if (cursor) {
    cursor.style.display = 'none';
}

document.addEventListener('wheel', (e) => {
    if (!e.target.closest('.gallery-container')) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', (e) => {
    if (!e.target.closest('.gallery-container')) {
        e.preventDefault();
    }
}, { passive: false });

window.onload = () => {
    goToScene(0);
};