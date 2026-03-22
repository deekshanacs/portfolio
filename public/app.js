function asList(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return '<p>No data yet.</p>';
  }

  return `<ul class="stack-list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function asTagList(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return '<p>No data yet.</p>';
  }

  return `<div class="tag-list">${items.map((item) => `<span class="tag">${item}</span>`).join('')}</div>`;
}

function asCards(items, mapper) {
  if (!Array.isArray(items) || items.length === 0) {
    return '<p>No data yet.</p>';
  }

  return `<div class="card-list">${items.map(mapper).join('')}</div>`;
}

async function loadContent() {
  try {
    const response = await fetch('/api/content');
    const content = await response.json();

    const hero = content.hero || {};
    const about = content.about || {};
    const skills = content.skills || {};
    const education = content.education || {};
    const contact = content.contact || {};
    const extra = content.extra || {};

    document.title = content.meta?.siteTitle || "Deekshana's World";
    document.getElementById('hero-name').textContent = hero.name || 'Deekshana C S';
    document.getElementById('hero-role').textContent = hero.role || 'AI & Full Stack Developer';
    document.getElementById('hero-headline').textContent = hero.headline || '';
    document.getElementById('hero-summary').textContent = hero.summary || '';

    document.getElementById('about-content').innerHTML = `
      <p>${about.shortBio || ''}</p>
      <p>${about.longBio || ''}</p>
      <p><strong>Mission:</strong> ${about.mission || ''}</p>
    `;

    document.getElementById('skills-content').innerHTML = `
      <h3 class="mini-title">Languages</h3>
      ${asTagList(skills.languages)}
      <h3 class="mini-title">AI/ML</h3>
      ${asTagList(skills.ai_ml)}
      <h3 class="mini-title">Data Science</h3>
      ${asTagList(skills.data_science)}
      <h3 class="mini-title">Tools</h3>
      ${asTagList(skills.tools)}
      <h3 class="mini-title">Cloud + GenAI</h3>
      ${asTagList(skills.cloud_ai)}
    `;

    document.getElementById('experience-content').innerHTML = asCards(content.experience, (item) => `
      <article class="item-card">
        <h3>${item.title || ''} - ${item.company || ''}</h3>
        <p class="muted">${item.duration || ''} | ${item.type || ''}</p>
        ${asList(item.highlights)}
      </article>
    `);

    document.getElementById('research-content').innerHTML = asCards(content.research, (item) => `
      <article class="item-card">
        <h3>${item.role || ''} - ${item.project || item.organization || ''}</h3>
        <p class="muted">${item.year || ''}</p>
        ${asList(item.impact)}
      </article>
    `);

    document.getElementById('projects-content').innerHTML = asCards(content.projects, (item) => `
      <article class="item-card">
        <h3>${item.name || ''} (${item.year || ''})</h3>
        <p>${item.description || ''}</p>
        <p class="mini-title">Impact</p>
        ${asList(item.impact)}
        <p class="mini-title">Tech</p>
        ${asTagList(item.tech)}
      </article>
    `);

    document.getElementById('education-content').innerHTML = `
      <article class="item-card">
        <h3>${education.degree || ''}</h3>
        <p>${education.college || ''}</p>
        <p class="muted">${education.year || ''}</p>
        <p><strong>CGPA:</strong> ${education.cgpa || ''}</p>
      </article>
    `;

    document.getElementById('achievements-content').innerHTML = asList(content.achievements);

    document.getElementById('extra-content').innerHTML = `
      <h3 class="mini-title">Languages</h3>
      ${asTagList(extra.languages)}
      <h3 class="mini-title">Interests</h3>
      ${asTagList(extra.interests)}
    `;

    document.getElementById('contact-content').innerHTML = `
      <p>${contact.cta || ''}</p>
      <p><strong>Email:</strong> <a href="mailto:${contact.email || ''}">${contact.email || ''}</a></p>
      <p><strong>LinkedIn:</strong> <a href="${contact.linkedin || '#'}" target="_blank" rel="noopener noreferrer">${contact.linkedin || ''}</a></p>
      <p><strong>GitHub:</strong> <a href="${contact.github || '#'}" target="_blank" rel="noopener noreferrer">${contact.github || ''}</a></p>
      <p><strong>Phone:</strong> ${hero.phone || ''}</p>
      <p><strong>Location:</strong> ${hero.location || ''}</p>
    `;
  } catch (error) {
    console.error('Failed to load content:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadContent);
