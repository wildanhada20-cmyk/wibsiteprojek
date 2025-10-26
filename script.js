// Theme Toggle Functionality
class BiodataApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.initializeEventListeners();
        this.animateSkills();
        this.initializeAnimations();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeToggleIcon(theme);
    }

    updateThemeToggleIcon(theme) {
        const themeIcon = document.querySelector('.theme-toggle i');
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }

    initializeEventListeners() {
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(this.currentTheme);
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add intersection observer for animations
        this.initializeIntersectionObserver();
    }

    animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            setTimeout(() => {
                bar.style.width = level + '%';
            }, 500);
        });
    }

    initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards for scroll animations
        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    initializeAnimations() {
        // Add hover effects to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateX(10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateX(0) scale(1)';
            });
        });

        // Add typing effect to tagline
        this.typeWriterEffect();
    }

    typeWriterEffect() {
        const tagline = document.querySelector('.tagline');
        if (!tagline) return;

        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }

    // Utility function to download as PDF (conceptual)
    downloadAsPDF() {
        // This would typically integrate with a PDF generation library
        console.log('PDF download functionality would be implemented here');
    }

    // Method to update profile picture
    updateProfilePicture(newImageUrl) {
        const profilePic = document.querySelector('.profile-pic');
        if (profilePic && newImageUrl) {
            profilePic.src = newImageUrl;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BiodataApp();
});

// Additional utility functions
const Utils = {
    // Format phone number
    formatPhoneNumber: (phone) => {
        return phone.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    },

    // Copy email to clipboard
    copyToClipboard: async(text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Copied to clipboard:', text);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    },

    // Get current age from birth date
    calculateAge: (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BiodataApp, Utils };
}