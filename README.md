# My Portfolio

A single-page personal portfolio built with vanilla HTML, CSS, and JavaScript. Just open `index.html` or deploy the folder as-is.


## Features

- Responsive layout with a sticky nav and mobile hamburger menu
- Sections for interests, skills, and projects (rendered from a simple JS config)
- **Live Codeforces stats** — handle, rating, rank, and a rating-history chart, pulled from the public Codeforces API
- **Live GitHub stats** — public repo count, followers, and most-used languages, pulled from the GitHub API
- Client-side validated contact form (no backend, ready to connect to Formspree, EmailJS, or your own API)
- Scroll-reveal animations and an active-section nav highlight
- Accessible: skip link, semantic HTML, `aria` labels, and reduced-motion support

## Tech stack

- HTML5 + semantic markup
- CSS3 (custom properties, no framework)
- Vanilla JavaScript (ES6+)
- [Codeforces API](https://codeforces.com/apiHelp) and [GitHub REST API](https://docs.github.com/en/rest) for live stats

## Project structure

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── profile.jpg
    └── project-images/
```







Works in all modern evergreen browsers (Chrome, Firefox, Edge, Safari). Falls back gracefully where `IntersectionObserver` isn't available.



## Acknowledgements

- Fonts: [Sora, Inter, JetBrains Mono](https://fonts.google.com/)
- Stats powered by the [Codeforces API](https://codeforces.com/apiHelp) and [GitHub REST API](https://docs.github.com/en/rest)
