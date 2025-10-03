// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.policy-section');
    
    // Function to show a specific section
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show the selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Add active class to the clicked nav link
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Update URL hash without scrolling
        history.pushState(null, null, `#${sectionId}`);
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Handle initial page load with hash
    function handleInitialHash() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        } else {
            // Show first section by default
            showSection('terminos');
        }
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        }
    });
    
    // Initialize
    handleInitialHash();
    
    // Add smooth scroll behavior to internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
            }
        });
    });
    
    // Add print functionality
    function setupPrintButton() {
        const printBtn = document.getElementById('print-btn');
        if (printBtn) {
            printBtn.addEventListener('click', function() {
                window.print();
            });
        }
    }
    
    setupPrintButton();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Alt + 1-4 for quick navigation
        if (e.altKey && e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            const sectionIds = ['terminos', 'privacidad', 'uso', 'derechos'];
            const index = parseInt(e.key) - 1;
            if (sectionIds[index]) {
                showSection(sectionIds[index]);
            }
        }
    });
    
    // Add active state on scroll (for small screens)
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Only update on small screens where sections might be visible simultaneously
                if (window.innerWidth <= 768) {
                    updateActiveNavOnScroll();
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Add accessibility improvements
    navLinks.forEach(link => {
        link.setAttribute('role', 'button');
        link.setAttribute('aria-label', `Ver sección de ${link.textContent}`);
    });
    
    console.log('Web Políticas initialized successfully');
});
