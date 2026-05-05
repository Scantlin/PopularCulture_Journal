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
                            
                            // Reset to first date tab in the active term
                            setTimeout(() => {
                                const activeTerm = document.querySelector('.term-content.active');
                                if (activeTerm) {
                                    const firstDateTab = activeTerm.querySelector('.date-tab');
                                    if (firstDateTab) {
                                        firstDateTab.click();
                                    }
                                }
                            }, 100);
                        }
                    });
                });
            }

            // ============================================
            // DATE TAB SWITCHING (Handles both Prelim and Midterm)
            // ============================================
            function initDateTabs() {
                // Get all date tabs
                const dateTabs = document.querySelectorAll('.date-tab');
                
                dateTabs.forEach(tab => {
                    tab.addEventListener('click', function() {
                        // Get the parent term content
                        const parentTerm = this.closest('.term-content');
                        if (!parentTerm) return;
                        
                        // Remove active class from all date tabs in this term only
                        const termDateTabs = parentTerm.querySelectorAll('.date-tab');
                        termDateTabs.forEach(t => {
                            t.classList.remove('active');
                        });
                        
                        // Add active class to clicked tab
                        this.classList.add('active');
                        
                        // Get the date ID from data attribute
                        const dateId = this.getAttribute('data-date');
                        
                        // Hide all journal entries in this term only
                        const termEntries = parentTerm.querySelectorAll('.journal-entry');
                        termEntries.forEach(entry => {
                            entry.classList.remove('active');
                        });
                        
                        // Show selected journal entry
                        const targetEntry = parentTerm.querySelector(`#journal-${dateId}`);
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
                    isVideo: true
                },
                '2': {
                    title: 'Being reminded',
                    description: 'Message of Ms. Gornez to us, for reminders',
                    imageSrc: 'Jan26.jpeg',
                },
                '3': {
                    title: 'Establishing Plan',
                    description: 'We conducted online meeting to build our flow.',
                    imageSrc: 'Jan29.jpeg',
                },
                '4': {
                    title: 'Result of our Performance',
                    description: 'The result gave us all goosebumps.',
                    imageSrc: 'Jan29(1).jpeg',
                },
                '5': {
                    title: 'Sneak Peek',
                    description: 'Highlights from the day.',
                    imageSrc: 'Feb2.jpeg',
                },
                '6': {
                    title: 'Sneak Peek',
                    description: 'Highlights from the day.',
                    imageSrc: 'feb2(1).jpeg',
                },
                '7': {
                    title: 'Sneak Peek',
                    description: 'Captured: hard work + heart.',
                    imageSrc: 'feb2(2).jpeg',
                },
                '8':{
                    title: 'Question I got',
                    description: 'This is what I got.',
                    imageSrc: 'Feb12.jpeg'
                },
                '9':{
                    title: 'I arrived that early',
                    description: 'Talagang inagahan ko, pambawi sa late ko nong previous meeting',
                    imageSrc: 'feb16.jpeg'
                },
                '10':{
                    title: 'Choices',
                    description: 'Thankful kay ma\'am Gornez for this.',
                    imageSrc: 'feb16(1).jpeg'
                },
                '11':{
                    title: 'Mistakes',
                    description: 'Sayangg talaga to e, but babawi next time.',
                    imageSrc: 'feb16(2).jpeg'
                },
                '12':{
                    title: 'The Frozen Frame',
                    description: 'Our Tableau depicting Filipino bravery against corruption',
                    imageSrc: 'mid1-1.jpeg' // Update with your actual image filename
                },
                '13':{
                    title: 'The Frozen Frame',
                    description: 'Our Tableau depicting Filipino bravery against corruption',
                    imageSrc: 'mid1-2.jpeg' // Update with your actual image filename
                },
                '14':{
                    title: 'The Frozen Frame',
                    description: 'Our Tableau depicting Filipino bravery against corruption',
                    imageSrc: 'mid2-1.jpeg' // Update with your actual image filename
                },
                '15':{
                    title: 'The Frozen Frame',
                    description: 'Our Tableau depicting Filipino bravery against corruption',
                    imageSrc: 'mid2-2.jpeg' // Update with your actual image filename
                },
                '16':{
                    title: 'The Frozen Frame',
                    description: 'Our Tableau depicting Filipino bravery against corruption',
                    imageSrc: 'mid2-3.jpeg' // Update with your actual image filename
                }, 
                '17':{
                   title: 'The Frozen Frame',
                    description: 'Our Tableau depicting Filipino bravery against corruption',
                    imageSrc: 'Mid4-1.png' // Update with your actual image filename 
                },
                '18':{
                    imageSrc: 'prefinal1-1.jpg'
                },
                '19':{
                    imageSrc: 'prefinal1-2.jpg'
                },
                '20':{
                    imageSrc: 'prefinal1-3.jpg'
                },
                '21':{
                    imageSrc: 'prefinal1-4.jpg'
                },
                '22':{
                    imageSrc: 'Sportsfest1.mp4',
                    isVideo: true
                },
                '23':{
                    imageSrc: 'Sportsfest2.jpg'
                },
                '24':{
                    imageSrc: 'Sportsfest3.jpg'
                },
                '25':{
                    imageSrc: 'Sportsfest4.jpg'
                },
                '26':{
                    imageSrc: 'prefinal3-1.jpg'
                },
                '27':{
                    imageSrc: 'prefinal4-1.jpg'
                },
                '28':{
                    imageSrc: 'prefinal4-2.jpg'
                },
                '29':{
                    imageSrc: 'prefinal5-1.jpg'
                },
                '30':{
                    imageSrc: 'prefinal6-1.jpg'
                },
                '31':{
                    imageSrc: 'prefinal6-2.jpg'
                },
                '32':{
                    imageSrc: 'prefinal7-1.jpg'
                },
                '33':{
                    imageSrc: 'prefinal7-2.jpg'
                },
                '34':{
                    imageSrc: 'prefinal7-3.png'
                },
                '35':{
                    imageSrc: 'prefinal8-1.png'
                },
            };

            // Create modal overlay if it doesn't exist
            let modalOverlay = document.querySelector('.image-modal-overlay');
            if (!modalOverlay) {
                modalOverlay = document.createElement('div');
                modalOverlay.className = 'image-modal-overlay';
                document.body.appendChild(modalOverlay);
            }

            // Function to open modal
            window.openImageModal = function(imageId) {
                console.log('Opening modal for ID:', imageId);
                
                const details = imageDetails[imageId];
                if (!details) {
                    console.error('No details found for ID:', imageId);
                    return;
                }
                
                const mediaSrc = details.imageSrc;
                const fallbackSrc = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800';
                
                let mediaHTML = '';
                
                // Check if it's a video
                if (details.isVideo || mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm') || mediaSrc.endsWith('.mov')) {
                    mediaHTML = `
                        <video class="modal-expanded-video" controls autoplay loop>
                            <source src="${mediaSrc}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;
                } else {
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
            
            // Automatically activate first date tab of active term on page load
            const activeTerm = document.querySelector('.term-content.active');
            if (activeTerm) {
                const firstDateTab = activeTerm.querySelector('.date-tab');
                if (firstDateTab) {
                    firstDateTab.click();
                }
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