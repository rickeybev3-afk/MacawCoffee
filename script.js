document.addEventListener('DOMContentLoaded', () => {
    console.log('Macaw Coffee Co. site loaded successfully.');

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === 'javascript:void(0);') return; // Ignore empty anchors

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.product-card, .story-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Helper to trigger animations when visible
    window.addEventListener('scroll', () => {
        animatedElements.forEach(el => {
            if (el.classList.contains('visible')) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

    // Video Debugging
    const video = document.getElementById('heroVideo');
    if (video) {
        video.addEventListener('error', function (e) {
            console.error('Error loading video:', e);
            alert('Video failed to load. Please check the file name and format.');
        });

        // Attempt to play if autoplay fails
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started!
                console.log('Video playing');
            }).catch(error => {
                // Auto-play was prevented
                console.log('Autoplay prevented:', error);
                // Create a play button overlay
                const btn = document.createElement('button');
                btn.innerText = 'Play Video';
                btn.style.position = 'absolute';
                btn.style.top = '50%';
                btn.style.left = '50%';
                btn.style.transform = 'translate(-50%, -50%)';
                btn.style.padding = '1rem 2rem';
                btn.style.zIndex = '1000';
                btn.style.cursor = 'pointer';
                btn.onclick = () => {
                    video.play();
                    btn.remove();
                };
                document.querySelector('.hero').appendChild(btn);
            });
        }
    }
    // Gallery Expand Logic
    const expandBtn = document.getElementById('expandGalleryBtn');
    if (expandBtn) {
        expandBtn.addEventListener('click', function () {
            const hiddenItems = document.querySelectorAll('.gallery-hidden');

            hiddenItems.forEach((item, index) => {
                // Remove hidden class
                item.classList.remove('gallery-hidden');

                // Add fade-in animation with stagger
                item.style.opacity = "0";
                item.style.transform = "translateY(20px)";

                setTimeout(() => {
                    item.style.transition = "all 0.6s ease";
                    item.style.opacity = "1";
                    item.style.transform = "translateY(0)";
                }, index * 100);
            });

            // Hide or Rotate the arrow after clicking
            this.style.pointerEvents = "none";
        });
    }

    // Contact Modal Logic
    const modal = document.getElementById('contactModal');
    const openBtn = document.getElementById('openContactModal');
    const closeBtn = document.getElementById('closeContactModal');

    if (modal && openBtn && closeBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
