const wrapper = document.getElementById('main-wrapper');
const scenes = document.querySelectorAll('.scene');
const cursor = document.querySelector('.cursor');
const isMobile = window.matchMedia("(pointer: coarse)").matches;

const scrollSound = new Audio('book_flip1.wav'); 
const zoomSound = new Audio('book_flip2.wav');   
const hoverSound = new Audio('book_flip3.wav');  

function playSfx(audio) {
    audio.currentTime = 0;
    audio.play().catch(err => {
        console.warn("Audio playback delayed until user interaction.");
    });
}

let currentScene = 0;

function goToScene(index) {
    currentScene = index;
    const yOffset = index * 100;
    wrapper.style.transform = `translateY(-${yOffset}vh)`;
    
    setTimeout(() => {
        playSfx(scrollSound);
    }, 1000);

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
    playSfx(zoomSound);
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    
    const imgObj = element.querySelector('img');
    
    lightboxImg.src = imgObj.src;
    lightboxTitle.innerText = imgObj.alt;
    lightboxDesc.innerText = imgObj.getAttribute('data-description');
    
    lightbox.style.display = 'flex';
}

function closeLightbox(event) {
    document.getElementById('lightbox').style.display = 'none';

    setTimeout(() => {
        playSfx(scrollSound);
    }, 10);
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!isMobile) {
            playSfx(hoverSound);
        }
    });
});

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