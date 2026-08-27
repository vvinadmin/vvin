// JavaScript for V VIN Public Landing Page
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Hamburger Menu Toggle
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            // Basic inline toggle helper
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = '';
                mobileNavToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '60px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.backgroundColor = 'rgba(7, 7, 15, 0.98)';
                navMenu.style.padding = '24px';
                navMenu.style.borderBottom = '1px solid var(--border-color)';
                navMenu.style.zIndex = '1001';
                mobileNavToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            }
        });
    }

    // 2. FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            // If it wasn't active, expand it
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 3. Scroll spy - active nav-link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = 'hero';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. Testimonials Rotation System with Indian Names
    const testimonials = [
        {
            initial: "R",
            name: "Rajesh Kumar",
            location: "Mumbai",
            badge: "PREMIUM MEMBER",
            text: "V VIN has completely changed my life! I upgraded from the Standard plan to Premium and now I easily make over ₹2,400 every single month just for submitting basic campaign screenshots! Best decision ever."
        },
        {
            initial: "S",
            name: "Sunita Sharma",
            location: "Delhi",
            badge: "ADVANCED MEMBER",
            text: "Maine standard package ₹100 se start kiya aur fir advanced ₹599 par upgrade kiya. Task submit karna bahut asaan hai aur balance direct bank account me cashout ho jata hai. Sachi me trusted platform hai!"
        },
        {
            initial: "V",
            name: "Vikram Singh",
            location: "Jaipur",
            badge: "EXCLUSIVE MEMBER",
            text: "Unbelievable results! Mera Active Direct count abhi 25 ho gaya hai aur mujhe daily salary bonus mil raha hai. Levels 1 to 8 recursively commissions se income multiply ho rahi hai!"
        },
        {
            initial: "P",
            name: "Priya Patel",
            location: "Ahmedabad",
            badge: "EXCLUSIVE MEMBER",
            text: "Exclusive package ₹1,799 wala liya hai aur daily ₹150 directly tasks se earning ho rahi hai. Gifting system to sabse badiya hai, mere downlines ko main direct wallet balance se activate kar deti hoon!"
        },
        {
            initial: "A",
            name: "Amit Verma",
            location: "Bangalore",
            badge: "ADVANCED MEMBER",
            text: "I was skeptical about community tasks initially, but V VIN's transparent transaction records and instant payouts proved me wrong. Highly polished Android app interface and amazing support!"
        },
        {
            initial: "N",
            name: "Neha Gupta",
            location: "Kolkata",
            badge: "PREMIUM MEMBER",
            text: "Mujhe V VIN me sabsay acchi baat level network management lagti hai. Pure teams ka data clearly level-wise separated hai jisse transparent networking easy aur reliable ban jati hai!"
        }
    ];

    const cardContainer = document.getElementById('review-card-container');
    const dotsContainer = document.getElementById('review-dots');
    const prevBtn = document.getElementById('prev-review');
    const nextBtn = document.getElementById('next-review');

    if (cardContainer && dotsContainer) {
        let currentIndex = 0;
        
        // Render Dots
        testimonials.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.className = `review-indicator-dot ${idx === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => showReview(idx));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.review-indicator-dot');

        function showReview(index) {
            if (index >= testimonials.length) index = 0;
            if (index < 0) index = testimonials.length - 1;
            
            currentIndex = index;
            const item = testimonials[currentIndex];

            cardContainer.innerHTML = `
                <div class="review-card active">
                    <div class="review-stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <p class="review-text">"${item.text}"</p>
                    <div class="reviewer-meta">
                        <div class="reviewer-avatar">${item.initial}</div>
                        <div class="reviewer-details">
                            <h4>${item.name}</h4>
                            <p class="reviewer-status"><span class="badge-gold">${item.badge}</span> • ${item.location}</p>
                        </div>
                    </div>
                </div>
            `;

            dots.forEach((dot, idx) => {
                dot.className = `review-indicator-dot ${idx === currentIndex ? 'active' : ''}`;
            });
        }

        // Initialize First Card
        showReview(0);

        // Buttons
        if (prevBtn) prevBtn.addEventListener('click', () => showReview(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => showReview(currentIndex + 1));

        // Auto Rotate Testimonials every 5 seconds
        setInterval(() => {
            showReview(currentIndex + 1);
        }, 5000);
    }

    // 5. Playbook Interactive Tab Switching
    const playbookTabs = document.querySelectorAll('.playbook-tab-btn');
    const playbookPanes = document.querySelectorAll('.playbook-pane');

    if (playbookTabs.length > 0 && playbookPanes.length > 0) {
        playbookTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetPaneId = tab.getAttribute('data-tab');

                // Deactivate all tabs & panes
                playbookTabs.forEach(t => t.classList.remove('active'));
                playbookPanes.forEach(p => p.classList.remove('active'));

                // Activate clicked tab & corresponding pane
                tab.classList.add('active');
                const targetPane = document.getElementById(`pane-${targetPaneId}`);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // 6. Connect Website directly to Firebase Firestore to load live App Version & APK details!
    const firebaseConfig = {
        apiKey: "AIzaSyAaxbPoPe7-_ndJ_WFnzH5MsVoDkICil_o",
        projectId: "v-win-official",
        storageBucket: "v-win-official.firebasestorage.app",
        appId: "1:656798852078:android:3ec6f9640c666293b064ff"
    };

    try {
        if (typeof firebase !== 'undefined') {
            firebase.initializeApp(firebaseConfig);
            const db = firebase.firestore();

            // Fetch app_config/version document live from Firestore
            db.collection("app_config").doc("version")
                .onSnapshot((doc) => {
                    if (doc && doc.exists) {
                        const data = doc.data();
                        const versionName = data.versionName || "2.0";
                        let apkUrl = data.apkUrl || "https://github.com/vvinadmin/vvin/releases/latest/download/Vvin.apk";
                        if (apkUrl.includes("vwin.asia")) {
                            apkUrl = apkUrl.replace("vwin.asia", "vvin.fun");
                        }
                        if (apkUrl.endsWith("/app.apk")) {
                            apkUrl = apkUrl.replace("/app.apk", "/Vvin.apk");
                        }

                        // Update Version Badge on Hero
                        const versionBadge = document.getElementById("live-version-badge");
                        if (versionBadge) {
                            versionBadge.innerText = `V VIN Android App V${versionName} Live`;
                        }

                        // Update APK download links
                        const apkLink = document.getElementById("apk-download-link");
                        if (apkLink) {
                            apkLink.setAttribute("href", apkUrl);
                        }
                    }
                }, (error) => {
                    console.error("Error fetching live app version:", error);
                });
        }
    } catch (err) {
        console.error("Firebase init failed on landing page:", err);
    }
});
