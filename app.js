const data = window.PORTFOLIO_DATA;

const elements = {
  heroName: document.querySelector("#hero-name"),
  heroRole: document.querySelector("#hero-role"),
  heroSummary: document.querySelector("#hero-summary"),
  heroActions: document.querySelector("#hero-actions"),
  heroDetails: document.querySelector("#hero-details"),
  statsGrid: document.querySelector("#stats-grid"),
  focusGrid: document.querySelector("#focus-grid"),
  profileImage: document.querySelector("#profile-image"),
  photoBadge: document.querySelector("#photo-badge"),
  photoNote: document.querySelector("#photo-note"),
  aboutSummary: document.querySelector("#about-summary"),
  availability: document.querySelector("#availability"),
  capabilityGrid: document.querySelector("#capability-grid"),
  experienceTimeline: document.querySelector("#experience-timeline"),
  projectGrid: document.querySelector("#project-grid"),
  certificationBand: document.querySelector("#certification-band"),
  certificationList: document.querySelector("#certification-list"),
  educationList: document.querySelector("#education-list"),
  contactHeadline: document.querySelector("#contact-headline"),
  contactCopy: document.querySelector("#contact-copy"),
  contactDirect: document.querySelector("#contact-direct"),
  contactActions: document.querySelector("#contact-actions"),
  footerCopy: document.querySelector("#footer-copy"),
  navToggle: document.querySelector(".nav-toggle"),
  siteNav: document.querySelector("#site-nav")
};

function renderLinks(target, links) {
  target.innerHTML = links
    .map((link) => {
      const className = link.style === "button" ? "button" : "ghost-button";
      const isExternal = link.href.startsWith("http");
      return `
        <a
          class="${className}"
          href="${link.href}"
          ${isExternal ? 'target="_blank" rel="noreferrer"' : ""}
        >
          ${link.label}
        </a>
      `;
    })
    .join("");
}

function renderDirectContacts() {
  elements.heroDetails.innerHTML = `
    <a class="contact-chip" href="mailto:${data.profile.email}">
      ${data.profile.email}
    </a>
  `;

  elements.contactDirect.innerHTML = `
    <a class="contact-line" href="mailto:${data.profile.email}">
      ${data.profile.email}
    </a>
  `;
}

function renderStats() {
  elements.statsGrid.innerHTML = data.highlights
    .map(
      (item) => `
        <article class="stat-card reveal">
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </article>
      `
    )
    .join("");
}

function renderFocusAreas() {
  elements.focusGrid.innerHTML = data.focusAreas
    .map(
      (item) => `
        <article class="focus-card reveal">
          <h3>${item.title}</h3>
          <p>${item.copy}</p>
        </article>
      `
    )
    .join("");
}

function renderCapabilities() {
  elements.capabilityGrid.innerHTML = data.capabilities
    .map(
      (item) => `
        <article class="capability-card reveal">
          <h4>${item.title}</h4>
          <p>${item.copy}</p>
        </article>
      `
    )
    .join("");
}

function renderExperience() {
  elements.experienceTimeline.innerHTML = data.experience
    .map(
      (item) => `
        <article class="timeline-card reveal">
          <div class="timeline-head">
            <div class="timeline-topline">
              <div>
                <h3>${item.role}</h3>
                <p class="timeline-company">${item.company}</p>
              </div>
              <p class="timeline-meta">${item.period}</p>
            </div>
            <p class="timeline-meta">${item.location}</p>
          </div>

          <div class="timeline-body">
            <ul class="timeline-list">
              ${item.bullets.map((bullet) => `<li><span>${bullet}</span></li>`).join("")}
            </ul>
            <div class="tag-list">
              ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderProjects() {
  elements.projectGrid.innerHTML = data.projects
    .map(
      (project) => `
        <article class="project-card reveal">
          <div class="project-head">
            <div class="project-topline">
              <div>
                <h3>${project.title}</h3>
                <p class="project-meta">${project.meta}</p>
              </div>
            </div>
            <p class="project-copy">${project.copy}</p>
          </div>

          <div class="tag-list">
            ${project.stack.map((item) => `<span class="tag">${item}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderCertificationBand() {
  elements.certificationBand.innerHTML = data.certifications
    .map(
      (item) => `
        <article class="cert-band-card reveal">
          <span class="cert-band-label">Microsoft Certified</span>
          <h3>${item.title.replace("Microsoft Certified: ", "")}</h3>
          <p>${item.detail}</p>
          <a
            class="credential-link"
            href="${item.credentialUrl}"
            target="_blank"
            rel="noreferrer"
          >
            View credential
          </a>
        </article>
      `
    )
    .join("");
}

function renderCredentials() {
  elements.certificationList.innerHTML = data.certifications
    .map(
      (item) => `
        <article class="credential-item reveal">
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
          <a
            class="credential-link"
            href="${item.credentialUrl}"
            target="_blank"
            rel="noreferrer"
          >
            View credential
          </a>
        </article>
      `
    )
    .join("");

  elements.educationList.innerHTML = data.education
    .map(
      (item) => `
        <article class="credential-item reveal">
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
          <span>${item.period}</span>
        </article>
      `
    )
    .join("");
}

function setupNavigation() {
  elements.navToggle.addEventListener("click", () => {
    const isExpanded = elements.navToggle.getAttribute("aria-expanded") === "true";
    elements.navToggle.setAttribute("aria-expanded", String(!isExpanded));
    elements.siteNav.classList.toggle("is-open");
  });

  elements.siteNav.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link) {
      return;
    }

    elements.siteNav.classList.remove("is-open");
    elements.navToggle.setAttribute("aria-expanded", "false");
  });

  const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);

      if (!visibleEntry) {
        return;
      }

      navLinks.forEach((link) => {
        const target = link.getAttribute("href");
        link.classList.toggle("is-active", target === `#${visibleEntry.target.id}`);
      });
    },
    {
      threshold: 0.45
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function observeReveals() {
  const revealItems = document.querySelectorAll(".reveal:not(.is-visible)");

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function loadProfileImage() {
  const image = new Image();
  const { primary, fallback, alt, badge, caption } = data.profile.photo;

  elements.profileImage.alt = alt;
  elements.profileImage.src = fallback;
  elements.photoBadge.textContent = badge;
  elements.photoNote.textContent = caption;

  image.onload = () => {
    elements.profileImage.src = primary;
  };

  image.src = primary;
}

function renderPage() {
  elements.heroName.textContent = data.profile.name;
  elements.heroRole.textContent = data.profile.role;
  elements.heroSummary.textContent = data.profile.summary;
  elements.aboutSummary.textContent = data.profile.about;
  elements.availability.textContent = data.profile.availability;
  elements.contactHeadline.textContent = data.contact.headline;
  elements.contactCopy.textContent = data.contact.copy;
  elements.footerCopy.textContent = data.footer;

  renderLinks(elements.heroActions, data.profile.links);
  renderDirectContacts();
  renderLinks(elements.contactActions, data.profile.contactLinks);
  renderStats();
  renderFocusAreas();
  renderCapabilities();
  renderExperience();
  renderProjects();
  renderCertificationBand();
  renderCredentials();
  loadProfileImage();
}

renderPage();
setupNavigation();
observeReveals();
