// Typing Animation
const roles = [
    "Full-Stack Developer",
    "Laravel Specialist",
    "System Architect",
    "POS & HR Creator"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedSpan = document.getElementById("typing");

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typedSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2200);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 200);
        return;
    }
    const speed = isDeleting ? 60 : 100;
    setTimeout(typeEffect, speed);
}
typeEffect();

// Skill Bars Animation on Scroll
const skillValues = {
    html: document.getElementById('html-val'),
    css: document.getElementById('css-val'),
    js: document.getElementById('js-val'),
    php: document.getElementById('php-val'),
    mysql: document.getElementById('mysql-val'),
    git: document.getElementById('git-val')
};

const fillMap = {
    html: 'html-fill',
    css: 'css-fill',
    js: 'js-fill',
    php: 'php-fill',
    mysql: 'mysql-fill',
    git: 'git-fill'
};

const widths = { html: 92, css: 88, js: 78, php: 86, mysql: 84, git: 75 };
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById('skills');
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        skillsAnimated = true;
        for (let key of ['html', 'css', 'js', 'php', 'mysql', 'git']) {
            const fillDiv = document.getElementById(fillMap[key]);
            const targetWidth = widths[key];
            fillDiv.style.width = targetWidth + '%';
            let currentPercent = 0;
            const counterElem = skillValues[key];
            const interval = setInterval(() => {
                if (currentPercent < targetWidth) {
                    currentPercent += Math.ceil((targetWidth - currentPercent) / 12);
                    if (currentPercent > targetWidth) currentPercent = targetWidth;
                    counterElem.innerText = currentPercent + '%';
                } else {
                    clearInterval(interval);
                }
            }, 18);
        }
    }
}

window.addEventListener('scroll', animateSkills);
animateSkills();

// Contact Form Handler with Toast
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');

function showToast(message) {
    toast.style.opacity = '1';
    toast.textContent = message || '✨ Message sent (demo mode)';
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 2800);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const msg = document.getElementById('msgTextarea').value.trim();
    
    if (!name || !email) {
        showToast('⚠️ Please enter name and email');
        return;
    }
    if (!msg) {
        showToast('💬 Write a message before sending');
        return;
    }
    
    console.log(`Contact from ${name} <${email}>: ${msg}`);
    showToast(`✅ Thanks ${name}! I'll reply soon.`);
    form.reset();
});

// Download CV Handler
const cvBtn = document.getElementById('downloadCVbtn');
cvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const blob = new Blob([
        "Joel Mkandawire - CV\n" +
        "=====================\n" +
        "Full Stack Developer\n" +
        "Expertise: Laravel, MySQL, POS, School Systems, HRMS\n" +
        "Email: joelmkandawire4@gmail.com\n" +
        "GitHub: github.com/joelmkandawire\n" +
        "Phone: +265 990 387 256"
    ], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Joel_Mkandawire_CV.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('📄 CV downloaded');
});

// LinkedIn Mock Handler
const linkedinBtn = document.getElementById('linkedinMock');
if (linkedinBtn) {
    linkedinBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('🔗 LinkedIn profile coming soon — connect via email');
    });
}

// Navbar Background Change on Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255,255,255,0.98)';
        navbar.style.boxShadow = '0 8px 22px rgba(0,0,0,0.05)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = '0 4px 25px rgba(0,0,0,0.03)';
    }
});

// Active Navigation Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#navbar ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.borderBottom = 'none';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.borderBottom = '2px solid #2c7da0';
            link.style.paddingBottom = '5px';
        } else {
            link.style.borderBottom = 'none';
        }
    });
});

// Set initial skill bar widths to 0
setTimeout(() => {
    for (let key of ['html-fill', 'css-fill', 'js-fill', 'php-fill', 'mysql-fill', 'git-fill']) {
        const el = document.getElementById(key);
        if (el) el.style.width = '0%';
    }
    for (let k in skillValues) {
        if (skillValues[k]) skillValues[k].innerText = '0%';
    }
}, 100);