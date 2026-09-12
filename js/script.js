
const codeforcesUsername = "moneesha_a";
const githubUsername = "mone-esha";


const projects = [
  {
    name: "Personal Portfolio",
    description: "This responsive portfolio built with semantic HTML, modern CSS and vanilla JavaScript.",
    image: "./assets/image.png",
    tech: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/mone-esha",
    demo: "#home",
  },
  {
    name: "Multi-user News Management",
    description: "A python project managing users and news",
    image: "./assets/image3.png",
    tech: ["Python","SQL"],
    github: "https://github.com/mone-esha",
    
  },
  {
    name: "NirapadBazarApp",
    description: "A e-commerce app that assigns trust score to sellers to prevent fraudulant behaviours",
    image: "./assets/img.png",
    tech: ["Kotlin","REST API"],
    github: "https://github.com/mone-esha",
    
  },
  {
    name: "AI Resume Analyzer",
    description: "Analyzes resume to predict category and assign ATS score",
    image: "./assets/image2.png",
    tech: ["AI","Python", "TF-IDF"],
    github: "https://github.com/mone-esha",
    
  },
  
];


const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));


const navbar = $("#navbar");
const navLinksEl = $("#primary-nav");
const navToggle = $("#navToggle");
const navLinks = $$(".nav__link");

navToggle.addEventListener("click", () => {
  const open = navLinksEl.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
navLinks.forEach((l) =>
  l.addEventListener("click", () => {
    navLinksEl.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinksEl.classList.contains("is-open")) {
    navLinksEl.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  }
});

const toTop = $("#toTop");
const onScroll = () => {
  const y = window.scrollY;
  navbar.classList.toggle("is-scrolled", y > 24);
  toTop.classList.toggle("is-visible", y > 600);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));


const sections = $$("main section[id]");
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}


const revealables = () => $$(".reveal:not(.is-visible)");
let revealObserver = null;
if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.12 }
  );
  const observeAll = () => revealables().forEach((el) => revealObserver.observe(el));
  observeAll();
  window.__observeReveals = observeAll;
} else {
  $$(".reveal").forEach((el) => el.classList.add("is-visible"));
  window.__observeReveals = () => {};
}


const barsWrap = $("#skillBars");
if (barsWrap && "IntersectionObserver" in window) {
  const barObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        $$("i[data-level]", e.target).forEach((i, idx) => {
          setTimeout(() => (i.style.width = `${i.dataset.level}%`), idx * 90);
        });
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.3 }
  );
  barObs.observe(barsWrap);
} else {
  $$("#skillBars i[data-level]").forEach((i) => (i.style.width = `${i.dataset.level}%`));
}


function renderProjects() {
  const grid = $("#projectGrid");
  grid.innerHTML = projects
    .map(
      (p) => `
      <article class="card reveal">
        <div class="project__thumb">
          <img src="${esc(p.image)}" alt="${esc(p.name)} preview" loading="lazy" width="1024" height="640" />
        </div>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.description)}</p>
        <ul class="chips">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="project__links">
          
        </div>
      </article>`
    )
    .join("");
  window.__observeReveals();
}
renderProjects();


function statCard(label, value, grad = false) {
  return `<div class="stat"><p class="stat__label">${esc(label)}</p><p class="stat__value${grad ? " grad" : ""}">${esc(value)}</p></div>`;
}

function drawRatingChart(points) {
  const svg = $("#cfChart");
  if (!points.length) {
    svg.innerHTML = `<text x="400" y="120" fill="#9aa7c7" font-size="14" text-anchor="middle">No rated contests yet</text>`;
    return;
  }
  const W = 800, H = 240, pad = 24;
  const min = Math.min(...points) - 60;
  const max = Math.max(...points) + 60;
  const x = (i) => pad + (i * (W - pad * 2)) / Math.max(points.length - 1, 1);
  const y = (v) => H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
  const line = points.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(points.length - 1).toFixed(1)},${H - pad} L${pad},${H - pad} Z`;
  svg.innerHTML = `
    <defs>
      <linearGradient id="cfLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#5b7cfa"/><stop offset="100%" stop-color="#22d3ee"/>
      </linearGradient>
      <linearGradient id="cfFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(91,124,250,.35)"/><stop offset="100%" stop-color="rgba(91,124,250,0)"/>
      </linearGradient>
    </defs>
    <path d="${area}" fill="url(#cfFill)"/>
    <path d="${line}" fill="none" stroke="url(#cfLine)" stroke-width="2.5" vector-effect="non-scaling-stroke"/>`;
}

async function loadCodeforces() {
  const state = $("#cfState");
  const content = $("#cfContent");
  const fail = (msg) => {
    state.classList.add("is-error");
    state.innerHTML = `${esc(msg)} <a class="btn btn--ghost" style="margin-left:.6rem" href="https://codeforces.com/profile/${encodeURIComponent(cmoneesha_a)}" target="_blank" rel="noopener">Open profile</a>`;
  };
  try {
    const [infoRes, ratingRes, statusRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(moneesha_a)}`),
      fetch(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(moneesha_a)}`),
      fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(moneesha_a)}&from=1&count=200`),
    ]);
    const info = await infoRes.json();
    if (info.status !== "OK") throw new Error(info.comment || "Codeforces request failed");
    const user = info.result[0];

    const rating = await ratingRes.json().catch(() => ({ result: [] }));
    const contests = rating.status === "OK" ? rating.result : [];

    const status = await statusRes.json().catch(() => ({ result: [] }));
    const solved = new Set();
    if (status.status === "OK") {
      status.result.forEach((s) => {
        if (s.verdict === "OK" && s.problem) solved.add(`${s.problem.contestId}-${s.problem.index}`);
      });
    }

    $("#cfStats").innerHTML = [
      statCard("Handle", user.handle, true),
      statCard("Current rating", user.rating ?? "Unrated"),
      statCard("Max rating", user.maxRating ?? "—"),
      statCard("Rank", user.rank ?? "—"),
      statCard("Max rank", user.maxRank ?? "—"),
      statCard("Problems solved", solved.size || "—"),
      statCard("Contests", contests.length),
    ].join("");

    drawRatingChart(contests.map((c) => c.newRating));
    state.classList.add("hidden");
    content.classList.remove("hidden");
  } catch (err) {
    console.warn("Codeforces:", err);
    fail("Couldn't load Codeforces stats right now.");
  }
}


function renderContribPlaceholder() {
  const wrap = $("#ghGraph");
  let html = "";
  for (let i = 0; i < 371; i++) {
    const level = Math.random() < 0.45 ? 0 : Math.ceil(Math.random() * 4);
    html += `<i data-l="${level}"></i>`;
  }
  wrap.innerHTML = html;
}

async function loadGithub() {
  const state = $("#ghState");
  const content = $("#ghContent");
  $("#ghLink").href = `https://github.com/${mone-esha}`;
  try {
    const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(mone-esha)}`);
    if (!userRes.ok) throw new Error(`GitHub responded ${userRes.status}`);
    const user = await userRes.json();

    $("#ghStats").innerHTML = [
      statCard("Username", `@${user.login}`, true),
      statCard("Public repos", user.public_repos),
      statCard("Followers", user.followers),
      statCard("Following", user.following),
      statCard("Gists", user.public_gists ?? 0),
    ].join("");

    
    const reposRes = await fetch(`https://api.github.com/users/${encodeURIComponent(mone-esha)}/repos?per_page=100&sort=updated`);
    const repos = reposRes.ok ? await reposRes.json() : [];
    const counts = {};
    (Array.isArray(repos) ? repos : []).forEach((r) => {
      if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
    });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const total = top.reduce((sum, [, n]) => sum + n, 0) || 1;
    $("#ghLangs").innerHTML = top.length
      ? top
          .map(([lang, n]) => {
            const pct = Math.round((n / total) * 100);
            return `<div class="lang"><div class="lang__top"><span>${esc(lang)}</span><span class="mono">${pct}%</span></div><div class="lang__track"><i style="width:${pct}%"></i></div></div>`;
          })
          .join("")
      : `<p class="note">No public repository languages found yet.</p>`;

    renderContribPlaceholder();
    state.classList.add("hidden");
    content.classList.remove("hidden");
  } catch (err) {
    console.warn("GitHub:", err);
    state.classList.add("is-error");
    state.innerHTML = `Couldn't load GitHub stats right now. <a class="btn btn--ghost" style="margin-left:.6rem" href="https://github.com/${encodeURIComponent(mone-esha)}" target="_blank" rel="noopener">Open profile</a>`;
  }
}


function lazyLoadSection(id, loader) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!("IntersectionObserver" in window)) return loader();
  const obs = new IntersectionObserver(
    (entries, o) => {
      if (entries.some((e) => e.isIntersecting)) {
        o.disconnect();
        loader();
      }
    },
    { rootMargin: "600px" }
  );
  obs.observe(el);
}
lazyLoadSection("codeforces", loadCodeforces);
lazyLoadSection("github", loadGithub);


const form = $("#contactForm");
const statusEl = $("#formStatus");
const rules = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."),
  subject: (v) => (v.trim().length >= 3 ? "" : "Please add a short subject."),
  message: (v) => (v.trim().length >= 15 ? "" : "Your message should be at least 15 characters."),
};

function validateField(input) {
  const msg = rules[input.name](input.value);
  const field = input.closest(".field");
  field.classList.toggle("is-invalid", Boolean(msg));
  $(`#err-${input.name}`).textContent = msg;
  input.setAttribute("aria-invalid", msg ? "true" : "false");
  return !msg;
}

$$("#contactForm input, #contactForm textarea").forEach((input) => {
  input.addEventListener("blur", () => validateField(input));
  input.addEventListener("input", () => {
    if (input.closest(".field").classList.contains("is-invalid")) validateField(input);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = $$("#contactForm input, #contactForm textarea");
  const valid = inputs.map(validateField).every(Boolean);
  if (!valid) {
    statusEl.style.color = "var(--danger)";
    statusEl.textContent = "Please fix the highlighted fields.";
    inputs.find((i) => i.closest(".field").classList.contains("is-invalid"))?.focus();
    return;
  }
  
  statusEl.style.color = "var(--accent)";
  statusEl.textContent = "Thanks! Your message has been validated and is ready to send.";
  form.reset();
});


$("#year").textContent = String(new Date().getFullYear());
