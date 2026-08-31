# Site guide — adding pages & blog posts

A hand-written static site (no build step, no framework). It's plain HTML + one
CSS file, served as-is by GitHub Pages. To publish, just commit and push to
`main`.

The look is **warm & playful, light theme only**: cream paper, egg-yolk yellow,
clay/rust links. Snoopy is the favicon and brand mark on every page; the egg is
now reserved for the Egg Rating on blog posts. Keep it simple and readable.

---

## Project structure

```
index.html                      Home (name, links, bio, updates, portrait hero)
blog/
  index.html                    Blog landing — one card per post
  review_system/
    index.html                  A blog post (folder name = its URL slug)
static/
  css/style.css                 The entire stylesheet (all pages share it)
  img/snoopy_head.svg           Snoopy head — favicon + brand mark, all pages
  img/egg_filled.svg            Yolk egg  — ratings
  img/egg_shell.svg             Empty egg — the "unfilled" half of a rating
  img/profile_pic.jpeg          Portrait — the home page hero
  files/cv.pdf
GUIDE.md                        This file
```

Each page lives in its own folder as `index.html` so the URL is clean
(`/blog/review_system/`, not `/blog/review_system.html`).

## Preview locally

From the repo root:

```bash
python -m http.server 8010
```

Then open <http://localhost:8010/>. (This is also wired up in
`.claude/launch.json` as the "site" config.)

## Design tokens

All colours, fonts, and shapes are CSS variables at the top of
`static/css/style.css` under `:root`. Change them there and every page updates.
Highlights:

| Token        | Value     | Use                         |
|--------------|-----------|-----------------------------|
| `--paper`    | `#fdf7ee` | page background             |
| `--ink`      | `#2b2620` | headings / strong text      |
| `--ink-2`    | `#4c4438` | body text                   |
| `--accent`   | `#b5430d` | links (clay/rust)           |
| `--accent-2` | `#97380a` | hover / nav-current / text on honey tints |
| `--honey`    | `#f4b73e` | egg yolk / decorative       |

Fonts (loaded from Google Fonts in each page's `<head>`): **Fraunces** for
headings, **Figtree** for body, **JetBrains Mono** for code/dates. The home
page's font URL omits JetBrains Mono; the two blog templates add
`&family=JetBrains+Mono:wght@300..600` to their Google Fonts URL because they
use `.code` / `.date`.

---

## Add a new top-level page

1. Make a folder and an `index.html` inside it, e.g. `notes/index.html`.
2. Paste the skeleton below. **Fix the relative paths for the folder depth:**
   one level deep (like `blog/`) uses `../`; the root `index.html` uses `./`.
3. Add a link to it in the `<nav>` of every page that should point to it, and
   mark the current page with `aria-current="page"`.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Notes &middot; Ansh Poonia</title>
    <meta name="description" content="Short description for search engines and social cards.">
    <link rel="canonical" href="https://anshpoonia.github.io/notes/">
    <link rel="icon" href="../static/img/snoopy_head.svg" type="image/svg+xml">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400..700;1,400..600&family=Fraunces:ital,opsz,wght@0,9..144,500..700;1,9..144,500..600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../static/css/style.css">
</head>
<body>
<a href="#main" class="skip">Skip to content</a>

<header class="site-head">
    <div class="site-head__inner">
        <a href="../" class="brand" aria-label="Ansh Poonia — home">
            <img src="../static/img/snoopy_head.svg" alt="" class="brand__mark">
            <span>Ansh Poonia</span>
        </a>
        <nav class="nav" aria-label="Primary">
            <a href="../">Home</a>
            <a href="../blog/">Blog</a>
            <a href="./" aria-current="page">Notes</a>
        </nav>
    </div>
</header>

<main id="main" class="wrap">
    <h1>Notes</h1>
    <p>Your content…</p>

    <footer class="site-footer">
        <a href="../">&larr; Back home</a>
    </footer>
</main>
</body>
</html>
```

---

## Add a new blog post

### 1. Create the folder

`blog/<slug>/index.html` — the folder name becomes the URL, so use lowercase
with underscores or hyphens (e.g. `blog/attention_heads/`).

### 2. Paste the post template

Paths go up **two** levels from a post (`../../` to the root, `../` to the
blog index). Fill in the title, description, date, egg rating, and verdict.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>POST TITLE &middot; Ansh Poonia</title>
    <meta name="description" content="One-sentence summary of the post.">
    <link rel="canonical" href="https://anshpoonia.github.io/blog/SLUG/">
    <link rel="icon" href="../../static/img/snoopy_head.svg" type="image/svg+xml">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400..700;1,400..600&family=Fraunces:ital,opsz,wght@0,9..144,500..700;1,9..144,500..600&family=JetBrains+Mono:wght@300..600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../static/css/style.css">
</head>
<body>
<a href="#main" class="skip">Skip to content</a>

<header class="site-head">
    <div class="site-head__inner">
        <a href="../../" class="brand" aria-label="Ansh Poonia — home">
            <img src="../../static/img/snoopy_head.svg" alt="" class="brand__mark">
            <span>Ansh Poonia</span>
        </a>
        <nav class="nav" aria-label="Primary">
            <a href="../../">Home</a>
            <a href="../">Blog</a>
        </nav>
    </div>
</header>

<main id="main" class="wrap">
    <article class="post">
        <nav class="crumbs" aria-label="Breadcrumb">
            <a href="../../">Home</a><span class="sep">/</span><a href="../">Blog</a><span class="sep">/</span>POST TITLE
        </nav>

        <h1>POST TITLE</h1>

        <div class="post-meta">
            <time class="date" datetime="YYYY-MM-DD">DD.MM.YY</time>
            <span class="dot">&bull;</span>
            <!-- egg rating: see the rating section below -->
            <span class="egg-rating" role="img" aria-label="Egg rating: 4.0 out of 5" title="4.0/5">
                <img src="../../static/img/egg_filled.svg" class="egg-icon" alt="">
                <img src="../../static/img/egg_filled.svg" class="egg-icon" alt="">
                <img src="../../static/img/egg_filled.svg" class="egg-icon" alt="">
                <img src="../../static/img/egg_filled.svg" class="egg-icon" alt="">
                <img src="../../static/img/egg_shell.svg" class="egg-icon" alt="">
            </span>
        </div>

        <p class="verdict">&ldquo;The one-line verdict note.&rdquo; <strong>~Model</strong></p>

        <p>Opening paragraph…</p>

        <h2>A section</h2>
        <p>More writing…</p>

        <!-- building blocks you can use: -->
        <pre class="code">A verbatim prompt or model transcript.
Whitespace and line breaks are preserved.</pre>

        <div class="callout">A soft highlighted aside.</div>

        <p class="indent"><em>&ldquo;An indented pull-quote.&rdquo; ~Someone</em></p>

        <p class="center">* * *</p>

        <h2>Ratings</h2>
        <table class="ratings">
            <thead>
                <tr><th scope="col">Category</th><th scope="col">Score</th></tr>
            </thead>
            <tbody>
                <tr><th scope="row">Novelty</th><td>6</td></tr>
                <tr><th scope="row">Will I learn something interesting?</th><td>8</td></tr>
                <tr><th scope="row">Excitement</th><td>7</td></tr>
                <tr><th scope="row">Pragmatism</th><td>9</td></tr>
                <tr><th scope="row">Self Score</th><td>8</td></tr>
            </tbody>
        </table>
    </article>

    <footer class="site-footer">
        <a href="../">&larr; Back to blog</a>
    </footer>
</main>
</body>
</html>
```

### 3. Add a card to `blog/index.html`

Drop this just inside `<main>`, **above** older cards (newest first). Paths use
a single `../` here:

```html
<a href="./SLUG/" class="blog-card-link">
    <article class="blog-card">
        <h3 class="blog-card__title">POST TITLE</h3>
        <div class="blog-card__meta">
            <time class="date" datetime="YYYY-MM-DD">DD.MM.YY</time>
            <span class="dot">&bull;</span>
            <span class="egg-rating" role="img" aria-label="Egg rating: 4.0 out of 5" title="4.0/5">
                <img src="../static/img/egg_filled.svg" class="egg-icon" alt="">
                <img src="../static/img/egg_filled.svg" class="egg-icon" alt="">
                <img src="../static/img/egg_filled.svg" class="egg-icon" alt="">
                <img src="../static/img/egg_filled.svg" class="egg-icon" alt="">
                <img src="../static/img/egg_shell.svg" class="egg-icon" alt="">
            </span>
        </div>
        <p class="blog-card__desc">One-line description for the card.</p>
        <p class="blog-card__review">&ldquo;The verdict note.&rdquo; <strong>~Model</strong></p>
    </article>
</a>
```

### 4. Announce it on the home page

Add a line to the `<ul class="updates">` in `index.html`:

```html
<li>New blog: <a href="./blog/SLUG/">POST TITLE</a>.</li>
```

---

## The Egg Rating

A blog's score, from 1 to 5 eggs. It's the **mean of five categories**, each
scored **1–10** (the first four by an anti-sycophantic LLM prompt, plus your own
*Self Score*), then halved onto the 1–5 scale:

```
eggs = (Novelty + Learn + Excitement + Pragmatism + SelfScore) / 5 / 2
```

Example: `(6 + 8 + 7 + 9 + 8) / 5 = 7.6`, then `7.6 / 2 = 3.8` → **3.8 / 5**.

**Rendering:** show 5 egg images. Use `egg_filled.svg` for each whole egg
(round to the nearest whole — 3.8 → 4 filled) and `egg_shell.svg` for the rest,
so the row always totals 5. Put the *exact* decimal in both `title` and
`aria-label` for accuracy:

```html
<span class="egg-rating" role="img" aria-label="Egg rating: 3.8 out of 5" title="3.8/5">
    …4× egg_filled.svg, then 1× egg_shell.svg…
</span>
```

The eggs give a little wiggle when their blog card is hovered — that's automatic
via CSS. Always include the full ratings table in the post's closing **Ratings**
section.

---

## Before you publish — quick checklist

- [ ] Exactly **one `<h1>`** per page; sections use `<h2>`/`<h3>` in order.
- [ ] Every meaningful `<img>` has `alt` text; decorative ones use `alt=""`.
- [ ] Updated `<title>`, `<meta name="description">`, and `<link rel="canonical">`.
- [ ] Relative paths match the folder depth (`./`, `../`, or `../../`).
- [ ] Egg rating `aria-label`/`title` show the exact score.
- [ ] Looks right from ~320px up to a wide desktop (resize the window).
- [ ] No hard-coded colours in the HTML — use the CSS variables / classes.

Don't add a dark mode, heavy JavaScript, or new frameworks — keeping it a plain,
warm, static site is the point. Animations already respect
`prefers-reduced-motion`.
