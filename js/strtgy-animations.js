/**
 * STRTGY AI - Animation Controller
 * 
 * Handles animated data background and slide state transitions
 * Requires: GSAP 3.x, Reveal.js
 */

(function() {
    'use strict';

    // ============================================================================
    // DATA FLOW ANIMATIONS
    // ============================================================================
    
    function initDataFlowAnimations() {
        const dataFlowPaths = document.querySelectorAll('.data-flow path');
        
        dataFlowPaths.forEach((path, i) => {
            const length = path.getTotalLength();
            
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length
            });
            
            // Continuous flowing animation
            gsap.to(path, {
                strokeDashoffset: -length,
                duration: 8 + (i * 0.5),
                ease: 'none',
                repeat: -1
            });
        });
    }

    // ============================================================================
    // DATA NODE ANIMATIONS
    // ============================================================================
    
    function initDataNodeAnimations() {
        const dataNodes = document.querySelectorAll('.data-nodes circle');
        
        dataNodes.forEach((node, i) => {
            const originalRadius = parseFloat(node.getAttribute('r'));
            
            gsap.to(node, {
                r: originalRadius * 1.5,
                opacity: 0.9,
                duration: 1.5 + (i * 0.2),
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                delay: i * 0.3
            });
        });
    }

    // ============================================================================
    // NEURAL CONNECTION ANIMATIONS
    // ============================================================================
    
    function initNeuralConnectionAnimations() {
        const neuralLines = document.querySelectorAll('.neural-connections line');
        
        neuralLines.forEach((line, i) => {
            gsap.to(line, {
                opacity: 0.6,
                strokeWidth: 1.5,
                duration: 2 + (i * 0.3),
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                delay: i * 0.4
            });
        });
    }

    // ============================================================================
    // FLOATING PARTICLES
    // ============================================================================
    
    const dataSymbols = ['01', '10', '{}', '[]', '<>', '//', '##', '::', '→', '⬡', '◇', '∞'];
    let particlesContainer;
    let particleInterval;

    function createParticle() {
        if (!particlesContainer) return;
        
        const particle = document.createElement('div');
        particle.className = 'data-particle';
        particle.textContent = dataSymbols[Math.floor(Math.random() * dataSymbols.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particlesContainer.appendChild(particle);
        
        gsap.to(particle, {
            y: -100 - Math.random() * 200,
            x: (Math.random() - 0.5) * 100,
            opacity: 0,
            duration: 5 + Math.random() * 5,
            ease: 'power1.out',
            onComplete: () => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }
        });
    }

    function initParticles() {
        particlesContainer = document.querySelector('.data-particles');
        
        if (!particlesContainer) return;
        
        // Create initial batch
        for (let i = 0; i < 15; i++) {
            setTimeout(createParticle, i * 200);
        }
        
        // Continue creating periodically
        particleInterval = setInterval(createParticle, 800);
    }

    // ============================================================================
    // SLIDE STATE MANAGEMENT
    // ============================================================================
    
    function setNormalSlideState() {
        document.body.classList.remove('slide-cover', 'slide-closing');
        
        gsap.to('#data-bg svg', {
            opacity: 0.15,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        gsap.to('#data-bg', {
            background: 'linear-gradient(135deg, #f8fafc 0%, #e8f4f8 50%, #f0f7fa 100%)',
            duration: 0.8
        });
    }

    function setCoverSlideState() {
        document.body.classList.add('slide-cover');
        document.body.classList.remove('slide-closing');
        
        gsap.to('#data-bg svg', {
            opacity: 0.5,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        gsap.to('#data-bg', {
            background: '#051d40',
            duration: 0.8
        });
    }

    function setClosingSlideState() {
        document.body.classList.add('slide-closing');
        document.body.classList.remove('slide-cover');
        
        gsap.to('#data-bg svg', {
            opacity: 0.5,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        gsap.to('#data-bg', {
            background: '#051d40',
            duration: 0.8
        });
    }

    function initSlideStateManagement() {
        // Listen for slide changes
        Reveal.on('slidechanged', event => {
            const currentState = event.currentSlide.dataset.state;
            
            if (currentState === 'cover-slide') {
                setCoverSlideState();
            } else if (currentState === 'closing-slide') {
                setClosingSlideState();
            } else {
                setNormalSlideState();
            }
        });
        
        // Also listen for state events
        Reveal.on('cover-slide', setCoverSlideState);
        Reveal.on('closing-slide', setClosingSlideState);
        
        // Initialize state based on current slide
        const indices = Reveal.getIndices();
        if (indices.h === 0 && indices.v === 0) {
            // First slide - set cover state immediately
            document.body.classList.add('slide-cover');
            gsap.set('#data-bg', { background: '#051d40' });
            gsap.set('#data-bg svg', { opacity: 0.5 });
        }
    }

    // ============================================================================
    // INITIALIZATION
    // ============================================================================
    
    function init() {
        // Check if GSAP is available
        if (typeof gsap === 'undefined') {
            console.warn('STRTGY Animations: GSAP not found. Animations disabled.');
            return;
        }
        
        // Check if Reveal is available
        if (typeof Reveal === 'undefined') {
            console.warn('STRTGY Animations: Reveal.js not found. Waiting...');
            return;
        }
        
        // Initialize all animations
        initDataFlowAnimations();
        initDataNodeAnimations();
        initNeuralConnectionAnimations();
        initParticles();
        initSlideStateManagement();
        
        console.log('STRTGY Animations: Initialized successfully');
    }

    // Wait for Reveal.js to be ready
    if (typeof Reveal !== 'undefined' && Reveal.isReady()) {
        init();
    } else {
        // Wait for ready event
        Reveal.on('ready', init);
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (particleInterval) {
            clearInterval(particleInterval);
        }
    });

})();
