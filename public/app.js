const SECTION_ORDER = ['about', 'education', 'skills', 'experience', 'projects', 'certificates', 'outOfBox', 'contact', 'gallery'];

const SECTION_META = {
  about: {
    title: 'Whispering Origin',
    subtitle: 'Who I am, what I stand for, and how I build with purpose.'
  },
  education: {
    title: 'Academy Arc',
    subtitle: 'My learning journey, simplified and impact-focused.'
  },
  skills: {
    title: 'Skill Forge',
    subtitle: 'The tools I use confidently to ship real AI solutions.'
  },
  experience: {
    title: 'Expedition Log',
    subtitle: 'Hands-on work that improved systems, teams, and outcomes.'
  },
  projects: {
    title: 'Build Dungeon',
    subtitle: 'Featured projects with clear goals, execution, and results.'
  },
  certificates: {
    title: 'Trophy Vault',
    subtitle: 'Verified achievements that support my technical credibility.'
  },
  outOfBox: {
    title: 'Beyond Boundaries',
    subtitle: 'Creative strengths beyond coding that make my work stand out.'
  },
  contact: {
    title: 'Signal Tower',
    subtitle: 'Let us connect if you are building something meaningful with AI.'
  },
  gallery: {
    title: 'Memory Arcade',
    subtitle: 'A visual showcase of my process, projects, and milestones.'
  }
};

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function listHtml(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return '<p class="meta">No entries unlocked yet.</p>';
  }

  return `<ul class="timeline">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function chipsHtml(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return '<p class="meta">No tags available.</p>';
  }

  return `<div class="chip-row">${items.map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join('')}</div>`;
}

function createCard(title, body) {
  return `<article class="text-card"><h3>${escapeHtml(title)}</h3>${body}</article>`;
}

function createParticleField() {
  const layer = document.getElementById('floating-particles');
  if (!layer) {
    return;
  }

  const count = window.innerWidth > 900 ? 24 : 14;
  const dots = [];
  for (let i = 0; i < count; i += 1) {
    const size = 8 + Math.round(Math.random() * 22);
    const left = Math.round(Math.random() * 100);
    const delay = Math.round(Math.random() * 20);
    const duration = 12 + Math.round(Math.random() * 22);
    dots.push(`<span style="--size:${size}px;left:${left}%;--delay:-${delay}s;--duration:${duration}s"></span>`);
  }

  layer.innerHTML = dots.join('');
}

function initCursor() {
  if (window.matchMedia('(max-width: 960px)').matches) {
    return;
  }

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  document.body.append(dot, ring);

  window.addEventListener('mousemove', (event) => {
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    ring.style.left = `${event.clientX}px`;
    ring.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '46px';
      ring.style.height = '46px';
      ring.style.borderColor = 'rgba(69, 244, 255, 0.95)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '34px';
      ring.style.height = '34px';
      ring.style.borderColor = 'rgba(255, 95, 188, 0.9)';
    });
  });
}

function initArcadeHud() {
  if (window.matchMedia('(max-width: 960px)').matches) {
    return;
  }

  const hud = document.createElement('div');
  hud.className = 'arcade-hud';
  hud.innerHTML = '<p class="hud-label">ENGAGEMENT</p><div class="hud-track"><div class="hud-fill" id="hud-fill"></div></div>';
  document.body.appendChild(hud);

  const fill = document.getElementById('hud-fill');
  const update = () => {
    const total = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const progress = Math.min((window.scrollY / total) * 100, 100);
    fill.style.width = `${Math.max(10, progress)}%`;
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initInteractiveCards() {
  const cards = document.querySelectorAll('.zone-tile, .image-card, .list-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      if (window.matchMedia('(max-width: 960px)').matches) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 6;
      const ry = (px - 0.5) * 8;

      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.zone-tile').forEach((portal) => {
    portal.addEventListener('mouseenter', () => portal.classList.add('active-portal'));
    portal.addEventListener('mouseleave', () => portal.classList.remove('active-portal'));
  });
}

function initClickBursts() {
  document.addEventListener('click', (event) => {
    const burstCount = 10;
    for (let i = 0; i < burstCount; i += 1) {
      const dot = document.createElement('span');
      dot.className = 'click-burst';
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;

      const angle = (Math.PI * 2 * i) / burstCount;
      const radius = 18 + Math.random() * 34;
      const tx = Math.cos(angle) * radius;
      const ty = Math.sin(angle) * radius;
      dot.style.setProperty('--tx', `${tx}px`);
      dot.style.setProperty('--ty', `${ty}px`);

      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 560);
    }
  });
}

function initPageTransitions() {
  // Keep navigation instant and native; no transition overlay.
}

function updateSectionNavigation(page) {
  const prev = document.getElementById('prev-zone');
  const next = document.getElementById('next-zone');
  if (!prev || !next) {
    return;
  }

  const index = SECTION_ORDER.indexOf(page);
  const prevPage = index <= 0 ? 'map' : SECTION_ORDER[index - 1];
  const nextPage = index >= SECTION_ORDER.length - 1 ? 'map' : SECTION_ORDER[index + 1];

  prev.href = prevPage === 'map' ? '/' : `/${prevPage === 'outOfBox' ? 'out-of-box' : prevPage}.html`;
  prev.textContent = prevPage === 'map' ? 'Map' : 'Previous Area';
  next.href = nextPage === 'map' ? '/' : `/${nextPage === 'outOfBox' ? 'out-of-box' : nextPage}.html`;
  next.textContent = nextPage === 'map' ? 'Back to Map' : 'Next Area';
}

function setResumeLink(content) {
  const resumeHref = content.resume?.url || '/assets/deekshana-resume.txt';
  const resumeLinks = document.querySelectorAll('#resume-link');
  resumeLinks.forEach((link) => {
    link.href = resumeHref;
  });
}

function renderMap(content) {
  const hero = content.hero || {};
  document.title = content.meta?.siteTitle || 'Quest Map';
  const heroName = document.getElementById('hero-name');
  const heroRole = document.getElementById('hero-role');
  const heroTagline = document.getElementById('hero-tagline');
  const heroSummary = document.getElementById('hero-summary');
  const proofStrip = document.getElementById('proof-strip');
  const heroPhoto = document.getElementById('hero-photo');
  const bridgePhrase = document.getElementById('bridge-phrase-text');

  if (heroName) heroName.textContent = hero.name || 'Deekshana C S';
  if (heroRole) heroRole.textContent = hero.role || 'Budding AI Engineer | Public Speaker';
  if (heroTagline) heroTagline.textContent = hero.headline || 'I build practical AI systems that solve real problems.';
  if (heroSummary) heroSummary.textContent = hero.summary || 'From idea to deployment, I focus on clear outcomes, measurable impact, and human-centered design.';
  if (bridgePhrase) {
    bridgePhrase.textContent = content.bridgePhrase || 'I do not just map ideas. I convert them into systems people can trust and use.';
  }

  if (heroPhoto) {
    heroPhoto.src = hero.photo || '/assets/profile-photo-placeholder.svg';
    heroPhoto.onerror = () => {
      heroPhoto.src = '/assets/profile-photo-placeholder.svg';
    };
  }

  if (proofStrip) {
    const proofs = Array.isArray(content.proofPoints) ? content.proofPoints : [];
    proofStrip.innerHTML = proofs
      .slice(0, 3)
      .map((item) => `<span class="proof-pill">${escapeHtml(item)}</span>`)
      .join('');
  }
}

function renderAbout(content) {
  const about = content.about || {};
  const body = document.getElementById('zone-body');
  body.innerHTML = [
    createCard('Short Quest Log', `<p>${escapeHtml(about.shortBio || '')}</p>`),
    createCard('Long Route', `<p>${escapeHtml(about.longBio || '')}</p>`),
    createCard('Compass Line', `<p>${escapeHtml(about.mission || '')}</p>`) 
  ].join('');
}

function renderEducation(content) {
  const education = content.education || {};
  const body = document.getElementById('zone-body');
  body.innerHTML = [
    createCard(
      education.degree || 'Degree Path',
      `<p>${escapeHtml(education.college || '')}</p><p class="meta">${escapeHtml(education.year || '')} | CGPA ${escapeHtml(education.cgpa || '')}</p>`
    ),
    `<article class="list-card"><h3>Milestone Trail</h3>${listHtml(education.milestones)}</article>`
  ].join('');
}

function renderSkills(content) {
  const skills = content.skills || {};
  const groups = [
    ['Languages', skills.languages],
    ['AI and ML', skills.ai_ml],
    ['Data Science', skills.data_science],
    ['Tools', skills.tools],
    ['Cloud and GenAI', skills.cloud_ai]
  ];
  const body = document.getElementById('zone-body');
  body.innerHTML = groups
    .map(([title, list]) => `<article class="list-card"><h3>${escapeHtml(title)}</h3>${chipsHtml(list)}</article>`)
    .join('');
}

function renderExperience(content) {
  const experience = Array.isArray(content.experience) ? content.experience : [];
  const body = document.getElementById('zone-body');
  body.innerHTML = experience
    .map(
      (item) => `<article class="list-card">
        <h3>${escapeHtml(item.title || 'Role')} | ${escapeHtml(item.company || 'Organization')}</h3>
        <p class="meta">${escapeHtml(item.duration || '')} ${item.type ? `| ${escapeHtml(item.type)}` : ''}</p>
        ${listHtml(item.highlights)}
      </article>`
    )
    .join('');
}

function renderProjects(content) {
  const projects = Array.isArray(content.projects) ? content.projects : [];
  const body = document.getElementById('zone-body');
  body.innerHTML = projects
    .map(
      (item) => `<article class="list-card">
        <h3>${escapeHtml(item.name || 'Project')} ${item.year ? `(${escapeHtml(item.year)})` : ''}</h3>
        <p>${escapeHtml(item.description || '')}</p>
        <p class="meta">Impact Map</p>
        ${listHtml(item.impact)}
        <p class="meta">Tech Stack</p>
        ${chipsHtml(item.tech)}
      </article>`
    )
    .join('');
}

function renderCertificates(content) {
  const certificates = Array.isArray(content.certificates) ? content.certificates : [];
  const body = document.getElementById('zone-body');

  if (certificates.length === 0) {
    body.innerHTML = '<article class="text-card"><h3>No certificates uploaded yet</h3><p>Add certificate files in your JSON to display them here.</p></article>';
    return;
  }

  const certificateMediaHtml = (item) => {
    const file = item.file || '/assets/cert-1.svg';
    const isPdf = /\.pdf($|\?)/i.test(file);

    if (isPdf) {
      return `<object class="cert-preview-pdf" data="${escapeHtml(file)}#toolbar=0&navpanes=0" type="application/pdf" aria-label="${escapeHtml(item.title || 'Certificate')} preview">
        <div class="cert-preview-fallback">PDF Certificate Preview</div>
      </object>`;
    }

    return `<img src="${escapeHtml(file)}" alt="${escapeHtml(item.title || 'Certificate')}" loading="lazy">`;
  };

  body.innerHTML = `<div class="cert-grid">${certificates
    .map(
      (item) => `<article class="image-card">
        ${certificateMediaHtml(item)}
        <h3>${escapeHtml(item.title || '')}</h3>
        <p class="meta">${escapeHtml(item.issuer || '')} ${item.year ? `| ${escapeHtml(item.year)}` : ''}</p>
        <p>${escapeHtml(item.description || '')}</p>
        <a href="${escapeHtml(item.file || '#')}" target="_blank" rel="noopener noreferrer">View Certificate</a>
      </article>`
    )
    .join('')}</div>`;
}

function renderOutOfBox(content) {
  const extra = content.outOfBox || {};
  const artifacts = Array.isArray(extra.artifacts) ? extra.artifacts : [];
  const body = document.getElementById('zone-body');

  body.innerHTML = `
    <article class="list-card">
      <h3>Out of Box Expertise</h3>
      ${chipsHtml(extra.expertise)}
    </article>
    <div class="artifact-grid">
      ${artifacts
        .map(
          (item) => `<article class="image-card">
            <img src="${escapeHtml(item.image || '/assets/gallery-1.svg')}" alt="${escapeHtml(item.title || 'Artifact')}" loading="lazy">
            <h3>${escapeHtml(item.title || '')}</h3>
            <p>${escapeHtml(item.description || '')}</p>
          </article>`
        )
        .join('')}
    </div>
  `;
}

function renderContact(content) {
  const hero = content.hero || {};
  const contact = content.contact || {};
  const body = document.getElementById('zone-body');

  body.innerHTML = `
    <article class="contact-card">
      <h3>Signal Line</h3>
      <p>${escapeHtml(contact.cta || '')}</p>
      <p class="meta">Email: <a href="mailto:${escapeHtml(contact.email || hero.email || '')}">${escapeHtml(contact.email || hero.email || '')}</a></p>
      <p class="meta">Phone: ${escapeHtml(hero.phone || '')}</p>
      <p class="meta">Location: ${escapeHtml(hero.location || '')}</p>
      <p class="meta">LinkedIn: <a href="${escapeHtml(contact.linkedin || hero.linkedin || '#')}" target="_blank" rel="noopener noreferrer">Open profile</a></p>
      <p class="meta">GitHub: <a href="${escapeHtml(contact.github || hero.github || '#')}" target="_blank" rel="noopener noreferrer">Open repositories</a></p>
    </article>
  `;
}

function renderGallery(content) {
  const gallery = Array.isArray(content.gallery) ? content.gallery : [];
  const body = document.getElementById('zone-body');

  if (gallery.length === 0) {
    body.innerHTML = '<article class="text-card"><h3>Gallery is waiting</h3><p>Add image entries in JSON to start showcasing visuals.</p></article>';
    return;
  }

  body.innerHTML = `<div class="gallery-grid">${gallery
    .map(
      (item) => `<article class="image-card">
        <img src="${escapeHtml(item.image || '/assets/gallery-1.svg')}" alt="${escapeHtml(item.title || 'Gallery image')}" loading="lazy">
        <h3>${escapeHtml(item.title || '')}</h3>
        <p>${escapeHtml(item.caption || '')}</p>
      </article>`
    )
    .join('')}</div>`;
}

function renderSectionPage(content, page) {
  const heading = document.getElementById('zone-heading');
  const subline = document.getElementById('zone-subline');
  const meta = SECTION_META[page] || {};

  if (heading) heading.textContent = meta.title || 'Quest Area';
  if (subline) subline.textContent = meta.subtitle || '';

  updateSectionNavigation(page);

  const renderer = {
    about: renderAbout,
    education: renderEducation,
    skills: renderSkills,
    experience: renderExperience,
    projects: renderProjects,
    certificates: renderCertificates,
    outOfBox: renderOutOfBox,
    contact: renderContact,
    gallery: renderGallery
  }[page];

  if (renderer) {
    renderer(content);
  }
}

async function loadContent() {
  try {
    const response = await fetch('/api/content');
    const content = await response.json();
    const page = document.body.dataset.page || 'map';

    document.title = content.meta?.siteTitle || 'Game Portfolio';
    setResumeLink(content);
    createParticleField();
    initCursor();
    initArcadeHud();
    initClickBursts();
    initPageTransitions();

    if (page === 'map') {
      renderMap(content);
      initInteractiveCards();
      return;
    }

    renderSectionPage(content, page);
    initInteractiveCards();
  } catch (error) {
    console.error('Failed to load content:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadContent);
