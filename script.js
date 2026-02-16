// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ============================================
    // TERM TAB SWITCHING
    // ============================================
    function initTermTabs() {
        const termTabs = document.querySelectorAll('.term-tab');
        
        termTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                if (this.classList.contains('locked')) {
                    // Optional: Add a subtle shake animation for locked tabs
                    this.style.animation = 'shake 0.5s ease';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 500);
                    return;
                }
                
                // Remove active class from all term tabs
                document.querySelectorAll('.term-tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all term content
                document.querySelectorAll('.term-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show selected term content
                const termId = this.getAttribute('data-term');
                const targetContent = document.getElementById(`${termId}-content`);
                if (targetContent) {
                    targetContent.classList.add('active');
                    
                    // If prelim content, reset to first date tab
                    if (termId === 'prelim') {
                        const firstDateTab = document.querySelector('.date-tab');
                        if (firstDateTab) {
                            // Trigger click on first date tab
                            setTimeout(() => {
                                firstDateTab.click();
                            }, 100);
                        }
                    }
                }
            });
        });
    }

    // ============================================
    // DATE TAB SWITCHING (for Prelim entries)
    // ============================================
    function initDateTabs() {
        const dateTabs = document.querySelectorAll('.date-tab');
        const journalEntries = document.querySelectorAll('.journal-entry');
        
        dateTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all date tabs
                dateTabs.forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get the date ID from data attribute
                const dateId = this.getAttribute('data-date');
                
                // Hide all journal entries in prelim
                journalEntries.forEach(entry => {
                    entry.classList.remove('active');
                });
                
                // Show selected journal entry
                const targetEntry = document.getElementById(`journal-${dateId}`);
                if (targetEntry) {
                    targetEntry.classList.add('active');
                    
                    // Smooth scroll to the entry
                    targetEntry.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ============================================
    // IMAGE GALLERY MODAL
    // ============================================
    // Image details database
    const imageDetails = {
        '1': {
            title: 'Isang Pangarap',
            description: 'This is me singing sa isang Pangarap',
            imageSrc: 'Jan19.mp4',
        },
        '2': {
            title: 'Being reminded',
            description: '-',
            imageSrc: 'Jan26.jpeg',
        },
        '3': {
            title: 'Establishing Plan',
            description: '-',
            imageSrc: 'Jan29.jpeg',
        },
        '4': {
            title: 'Result of our Performance',
            description: '-',
            imageSrc: 'Jan29(1).jpeg',
        },
        '5': {
            title: 'Sneak Peek',
            description: '-',
            imageSrc: 'Feb2.jpeg',
        },
        '6': {
            title: 'Sneak Peek',
            description: '-',
            imageSrc: 'feb2(1).jpeg',
        },
        '7': {
            title: 'Sneak Peek',
            description: '-',
            imageSrc: 'feb2(2).jpeg',
        },
        '8':{
            title: 'Question I got',
            description: '-',
            imageSrc: 'Feb12.jpeg'
        },
        '9':{
            title: 'I arrived that early',
            description: '-',
            imageSrc: 'feb16.jpeg'
        },
        '10':{
            title: 'Choices',
            description: '-',
            imageSrc: 'feb16(1).jpeg'
        },
        '11':{
            title: 'Mistakes',
            description: '-',
            imageSrc: 'feb16(2).jpeg'
        }
    };

    // Create modal overlay if it doesn't exist
    let modalOverlay = document.querySelector('.image-modal-overlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.className = 'image-modal-overlay';
        document.body.appendChild(modalOverlay);
    }

    // Function to open modal (make it globally accessible)
    // Function to open modal (update to handle videos)
window.openImageModal = function(imageId, isVideo = false) {
    console.log('Opening modal for ID:', imageId);
    
    const details = imageDetails[imageId];
    if (!details) {
        console.error('No details found for ID:', imageId);
        return;
    }
    
    const mediaSrc = details.imageSrc; // Can be image or video path
    const fallbackSrc = details.fallbackUrl;
    
    let mediaHTML = '';
    
    if (isVideo || mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm') || mediaSrc.endsWith('.mov')) {
        // It's a video
        mediaHTML = `
            <video class="modal-expanded-video" controls autoplay loop>
                <source src="${mediaSrc}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        // It's an image
        mediaHTML = `
            <img src="${mediaSrc}" 
                 alt="${details.title}" 
                 class="modal-expanded-image"
                 onerror="this.onerror=null; this.src='${fallbackSrc}';">
        `;
    }
    
    const modalHTML = `
        <div class="image-modal">
            <button class="modal-close-btn" id="modalCloseBtn">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-content-simple">
                <div class="modal-media-container">
                    ${mediaHTML}
                </div>
                ${details.title ? `<div class="modal-caption">${details.title}</div>` : ''}
            </div>
        </div>
    `;
    
    modalOverlay.innerHTML = modalHTML;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add event listener to the close button
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeImageModal);
    }
};

    // Function to close modal
    window.closeImageModal = function() {
        const modalOverlay = document.querySelector('.image-modal-overlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            // Clear the content after animation
            setTimeout(() => {
                modalOverlay.innerHTML = '';
            }, 300);
        }
    };

    // Add click event to each image card
    function initImageCards() {
        const imageCards = document.querySelectorAll('.image-card');
        imageCards.forEach(card => {
            // Remove any existing onclick to avoid duplicates
            card.removeAttribute('onclick');
            
            // Add click event listener
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const imageId = this.getAttribute('data-id');
                if (imageId) {
                    window.openImageModal(imageId);
                }
            });
            
            card.style.cursor = 'pointer';
            card.setAttribute('title', 'Click to expand image');
        });
    }

    // Close modal when clicking outside the image
    modalOverlay.addEventListener('click', function(e) {
        if (e.target.classList.contains('image-modal-overlay')) {
            window.closeImageModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.image-modal-overlay.active');
            if (activeModal) {
                window.closeImageModal();
            }
        }
    });

    // ============================================
    // INITIALIZE EVERYTHING
    // ============================================
    initTermTabs();
    initDateTabs();
    initImageCards();
    
    // Automatically activate first date tab on page load
    const firstDateTab = document.querySelector('.date-tab');
    if (firstDateTab) {
        firstDateTab.click();
    }
    
    console.log('All systems initialized');
});

// Add shake animation for locked tabs
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);