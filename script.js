document.addEventListener('DOMContentLoaded', function() {
    initializeEffects();
    createParticleSystem();
    createGentleRain();
    addInteractiveEffects();
});

function initializeEffects() {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Create twinkling stars
    createTwinklingStars();
    
    // Add memory bubble interactions
    addMemoryBubbleEffects();
}

function createTwinklingStars() {
    const particleSystem = document.querySelector('.particle-system');
    
    // Reduced to just 15 subtle stars
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'twinkling-star';
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 4 + 3}s ease-in-out infinite alternate;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleSystem.appendChild(star);
    }
}

function createParticleSystem() {
    const particleSystem = document.querySelector('.particle-system');
    
    // Reduced to just 8 subtle particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 105, 180, 0.4);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 25 + 20}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        
        particleSystem.appendChild(particle);
    }
}

function createGentleRain() {
    const rainContainer = document.querySelector('.rain-container');
    
    // Reduced to just 5 subtle raindrops
    for (let i = 0; i < 5; i++) {
        const raindrop = document.createElement('div');
        raindrop.style.cssText = `
            position: absolute;
            width: 2px;
            height: 15px;
            background: linear-gradient(to bottom, transparent, rgba(173, 216, 230, 0.6), transparent);
            left: ${Math.random() * 100}%;
            top: -50px;
            opacity: ${Math.random() * 0.4 + 0.2};
            animation: gentleRainFall ${Math.random() * 12 + 8}s linear infinite;
            animation-delay: ${Math.random() * 15}s;
            pointer-events: none;
            border-radius: 50px;
        `;
        rainContainer.appendChild(raindrop);
    }
}

function addMemoryBubbleEffects() {
    const memoryLines = document.querySelectorAll('.memory-line');
    
    memoryLines.forEach((line, index) => {
        line.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.background = 'rgba(255, 255, 255, 0.05)';
            this.style.borderRadius = '10px';
        });
        
        line.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.background = 'transparent';
        });
    });
}

function createMemorySparkles(element) {
    const sparkles = ['✨', '💫', '⭐', '🌟'];
    
    for (let i = 0; i < 3; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: absolute;
            font-size: 1.2rem;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: sparkleEffect 1.5s ease-out forwards;
            z-index: 10;
        `;
        
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
}

function createHeartBurst(element) {
    const hearts = ['💜', '💕', '💖', '🍰', '☔', '🥟'];
    
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: absolute;
            font-size: 1.5rem;
            left: 50%;
            top: 50%;
            pointer-events: none;
            animation: heartBurstEffect 2s ease-out forwards;
            animation-delay: ${i * 0.1}s;
            z-index: 10;
        `;
        
        element.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

function addInteractiveEffects() {
    // Add cursor trail effect (desktop only)
    let mouseTrail = [];
    
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 768) { // Only on desktop
            mouseTrail.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            });
            
            // Keep only recent trail points
            mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
            
            // Create trail particle occasionally
            if (Math.random() < 0.1) {
                createTrailParticle(e.clientX, e.clientY);
            }
        }
    });
    
    // Add scroll effects (reduced on mobile)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.floating-elements');
        if (parallax) {
            const multiplier = window.innerWidth > 768 ? 0.5 : 0.2;
            parallax.style.transform = `translateY(${scrolled * multiplier}px)`;
        }
    });
    
    // Add touch-friendly interactions for mobile
    if (window.innerWidth <= 768) {
        const memoryLines = document.querySelectorAll('.memory-line');
        memoryLines.forEach(line => {
            line.addEventListener('touchstart', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            line.addEventListener('touchend', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    }
}

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: rgba(255, 105, 180, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: trailFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }
    
    @keyframes floatParticle {
        0% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.6;
        }
        25% {
            transform: translateY(-100px) translateX(50px) rotate(90deg);
            opacity: 1;
        }
        50% {
            transform: translateY(-50px) translateX(-30px) rotate(180deg);
            opacity: 0.8;
        }
        75% {
            transform: translateY(-150px) translateX(80px) rotate(270deg);
            opacity: 0.9;
        }
        100% { 
            transform: translateY(-200px) translateX(-20px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes gentleRainFall {
        0% { 
            transform: translateY(-50px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% { 
            transform: translateY(100vh) translateX(100px);
            opacity: 0;
        }
    }
    
    @keyframes sparkleEffect {
        0% { 
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.8;
        }
        100% { 
            transform: scale(0.3) rotate(360deg) translateY(-30px);
            opacity: 0;
        }
    }
    
    @keyframes heartBurstEffect {
        0% { 
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% { 
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0.5) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes trailFade {
        0% { 
            opacity: 0.8;
            transform: scale(1);
        }
        100% { 
            opacity: 0;
            transform: scale(0.3);
        }
    }
`;
document.head.appendChild(style);

// Old gallery function removed - using enhanced version below

// Add gallery initialization to the main init function
document.addEventListener('DOMContentLoaded', function() {
    initializeEffects();
    createParticleSystem();
    createGentleRain();
    addInteractiveEffects();
    initializeGallery();
    initializeLovebombsButton(); // Add this line
});

// Handle missing images gracefully
function handleMissingImages() {
    const images = document.querySelectorAll('.photo-frame img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder for missing images
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, rgba(255, 105, 180, 0.3), rgba(220, 20, 60, 0.3));
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                color: rgba(255, 255, 255, 0.7);
            `;
            placeholder.innerHTML = '📷';
            
            this.parentNode.replaceChild(placeholder, this);
        });
    });
}

// Initialize missing image handling
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(handleMissingImages, 1000); // Give images time to load
});

// LOVEBOMBS Button and Collapsible Gallery
function initializeLovebombsButton() {
    const lovebombsBtn = document.getElementById('lovebombsBtn');
    const memoryGallery = document.getElementById('memoryGallery');
    let isExpanded = false;
    
    console.log('LOVEBOMBS button initialized!', lovebombsBtn); // Debug log
    
    if (!lovebombsBtn || !memoryGallery) {
        console.error('LOVEBOMBS button or gallery not found!');
        return;
    }
    
    lovebombsBtn.addEventListener('click', function() {
        console.log('LOVEBOMBS clicked!'); // Debug log
        // Add clicked class for heart burst animation
        this.classList.add('clicked');
        
        // Create heart explosion around button
        createLovebombsExplosion(this);
        
        // Toggle gallery
        if (isExpanded) {
            memoryGallery.classList.remove('expanded');
            memoryGallery.classList.add('collapsed');
            this.querySelector('.button-text').textContent = 'LOVEBOMBS';
        } else {
            memoryGallery.classList.remove('collapsed');
            memoryGallery.classList.add('expanded');
            this.querySelector('.button-text').textContent = 'HIDE LOVEBOMBS';
        }
        
        isExpanded = !isExpanded;
        
        // Remove clicked class after animation
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 800);
    });
}

function createLovebombsExplosion(button) {
    const explosionHearts = ['💕', '💖', '💝', '💗', '💘', '💞', '💓', '🍰', '💜'];
    
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = explosionHearts[Math.floor(Math.random() * explosionHearts.length)];
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 1.5 + 1}rem;
            left: 50%;
            top: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: lovebombExplosion 2s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        
        button.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

// Enhanced gallery functionality for videos
function initializeGallery() {
    const mediaFrames = document.querySelectorAll('.media-frame');
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="" alt="" style="display: none;">
            <video controls style="display: none;">
                <source src="" type="video/mp4">
                <source src="" type="video/webm">
            </video>
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxVideo = lightbox.querySelector('video');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    
    // Add click handlers to media
    mediaFrames.forEach(frame => {
        frame.addEventListener('click', function() {
            if (this.classList.contains('photo-frame')) {
                const img = this.querySelector('img');
                lightboxImg.src = img.src;
                lightboxImg.style.display = 'block';
                lightboxVideo.style.display = 'none';
            } else if (this.classList.contains('video-frame')) {
                const video = this.querySelector('video');
                const source = video ? video.querySelector('source') : null;
                
                if (video && source && source.src) {
                    lightboxVideo.querySelector('source[type="video/mp4"]').src = source.src;
                    lightboxVideo.load();
                    lightboxVideo.style.display = 'block';
                    lightboxImg.style.display = 'none';
                } else {
                    console.error('Video or source not found for video frame');
                    return;
                }
            }
            
            lightboxCaption.textContent = '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Add hover effect with gentle glow
        frame.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(220, 20, 60, 0.4), 0 0 20px rgba(255, 105, 180, 0.3)';
        });
        
        frame.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Close lightbox handlers
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        // Pause video if playing
        if (lightboxVideo.style.display !== 'none') {
            lightboxVideo.pause();
        }
    }
}

// Handle missing photos gracefully
function handleMissingMedia() {
    const images = document.querySelectorAll('.photo-frame img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, rgba(255, 105, 180, 0.3), rgba(220, 20, 60, 0.3));
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                color: rgba(255, 255, 255, 0.7);
            `;
            placeholder.innerHTML = '📷';
            this.parentNode.replaceChild(placeholder, this);
        });
    });
    
    console.log('Found', images.length, 'photos - ready for display');
}

// Add CSS animations for lovebombs explosion
const lovebombsStyle = document.createElement('style');
lovebombsStyle.textContent = `
    @keyframes lovebombExplosion {
        0% { 
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        20% {
            transform: translate(-50%, -50%) scale(1.2) rotate(90deg);
            opacity: 1;
        }
        100% { 
            transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(0.3) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(lovebombsStyle);

// Initialize missing media handling
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(handleMissingMedia, 1000);
});