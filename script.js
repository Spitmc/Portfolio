function majDate() {
    const date = new Date();
    document.getElementById("dateHour").textContent = date.toLocaleString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('index.html')
        .then(response => response.text())
        .then(code => {
            const escaped = code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

            new Typed('#typed-code', {
                strings: [escaped],
                typeSpeed: 10,
                showCursor: true,
                cursorChar: '|',
                loop: true,
                backSpeed: 5,
                backDelay: 2000,
            });
        });
});

const levels = {
    cpp: "55%",
    html: "85%",
    css: "80%",
    js: "75%",
    react: "70%",
    symfony: "85%",
    php: "75%",
    python: "80%",
    sql: "70%",
    dart: "30%",
    flutter: "30%",
    oracledb: "40%",
    docker: "75%",
    git: "85%",
    planner: "70%",
    apiplatform: "50%",
    linux: "75%",
    apache: "45%",
    reseau: "70%",
    redac: "80%",
    ue: "2%",
    godot: "35%",
    mcbuild: "75%"
};

function openSkillPopup(skill) {
    const lang = document.querySelector('.lang-switch button.active')
                         .getAttribute('onclick')
                         .includes('fr') ? 'fr' : 'en';
    // Remplir le titre et l'icône
    document.getElementById('popup-skill-title').textContent = content[lang][`skill-${skill}-title`];
    document.getElementById('popup-skill-purchase').textContent = content[lang][`skill-${skill}-acquisition`];
    document.getElementById('popup-skill-detail').textContent = content[lang][`skill-${skill}-detail`];
    document.getElementById('popup-skill-span').textContent = content[lang][`skill-${skill}-level`];
    const iconEl = document.querySelector('.popup-skill-icon');
    iconEl.className = 'popup-skill-icon ' + content[lang][`skill-${skill}-icon`];

    // Animer la barre de progression
    const bar = document.getElementById('popup-progress');
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = levels[skill]; }, 100);

    const skillLink = document.getElementById('popup-skill-link');
    const link = content[lang][`skill-${skill}-link`];
    if (link) {
        skillLink.href = link;
        skillLink.style.display = 'flex';
    } else {
        skillLink.style.display = 'none';  // caché pour les skills sans lien
    }

    // Afficher la popup
    document.getElementById('popup').classList.add('active');
}


function fermerPopup() {
    document.getElementById('popup').classList.remove('active');
}

majDate();
setInterval(majDate, 1000);

let content = {};

async function loadTranslations() {
    try {
        const response = await fetch('content.json');
        content = await response.json();

        setLanguage('fr');
    } catch (error) {
        console.error("Erreur lors du chargement des traductions :", error);
    }
}

function setLanguage(lang) {
    if (Object.keys(content).length === 0) return;

    const elements = document.querySelectorAll('[data-i18n]');

    document.getElementById('input-mail').placeholder = content[lang]['placeholder-mail'];
    document.getElementById('input-object').placeholder = content[lang]['placeholder-object'];
    document.getElementById('input-message').placeholder = content[lang]['placeholder-message'];

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (content[lang] && content[lang][key]) {
            element.textContent = content[lang][key];
        }
    });

    document.querySelectorAll('.lang-switch button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.lang-switch button[onclick="setLanguage('${lang}')"]`);
    if(activeBtn) activeBtn.classList.add('active');

    const cvLink = document.getElementById('cv-link');
    if (cvLink) {
        if (lang === 'fr') {
            cvLink.href = "CV_Vigne_Lucas.pdf";
            cvLink.download = "CV_Vigne_Lucas.pdf";
        } else {
            cvLink.href = "CV_Vigne_Lucas.pdf";
            cvLink.download = "Resume_Vigne_Lucas.pdf";
        }
    }
}

function openProjectPopup(project) {
    const lang = document.querySelector('.lang-switch button.active')
                         .getAttribute('onclick')
                         .includes('fr') ? 'fr' : 'en';

    document.getElementById('popup-project-title').textContent = content[lang][`project-${project}-title`];
    document.getElementById('popup-project-details').textContent = content[lang][`project-${project}-detail`];

    // Lien GitHub dynamique
    const githubLink = document.getElementById('popup-project-github');
    if (githubLink) {
        githubLink.href = content[lang][`project-${project}-github`] || '#';
    }

    // Date
    document.querySelector('.project-date').textContent = content[lang][`project-${project}-date`] || '';

    // Technos dynamiques
    const technosContainer = document.getElementById('popup-project-technos');
    technosContainer.innerHTML = '';
    const technos = content[lang][`project-${project}-technos`] || [];
    technos.forEach(techno => {
        const span = document.createElement('span');
        span.classList.add('badge');
        span.textContent = techno;
        technosContainer.appendChild(span);
    });

    document.querySelector('.popup-project').classList.add('active');
}

function fermerProjectPopup() {
    document.querySelector('.popup-project').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    
    // Skills
    document.querySelectorAll('.skill').forEach(skill => {
        skill.addEventListener('click', () => {
            openSkillPopup(skill.getAttribute('data-skill'));
        });
    });

    // Projets
    document.querySelectorAll('.project').forEach((project, index) => {
        project.addEventListener('click', () => {
            openProjectPopup(index + 1);
        });
    });
});