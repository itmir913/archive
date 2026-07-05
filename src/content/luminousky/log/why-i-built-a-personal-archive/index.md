---
title: "Why I Built a Personal Archive — and Why Astro + GitHub Pages"
date: "2026-07-01T00:00:00+09:00"
description: "The reasoning behind preserving a decade of engineering work, and the technology decisions that made it viable."
draft: false
---

## Context

Between 2012 and 2021, I published 657 posts on a personal technical blog (ITMir, hosted on Tistory). The posts covered Android development, Linux system administration, app experiments, and miscellaneous engineering work. The blog went dormant in 2021.

In 2026, I decided to preserve this work before the hosting platform degraded further or the content became unrecoverable. This is the story of what I built and why.

---

## Problem

The original content existed only on Tistory, a third-party Korean blogging platform. The risks were clear:

- **Platform lock-in**: Content tied to Tistory's continued operation and policy decisions.
- **Link rot**: Image CDN URLs, external references, and attachment links degrading over time.
- **No ownership**: No local copy of 9 years of technical work.
- **No structure**: No way to search, filter, or navigate the full corpus.

The goal was not to "redesign the blog." The goal was **digital preservation** — making the past readable in the future, on infrastructure I control.

---

## Alternatives Considered

### Option 1: Keep it on Tistory

Do nothing. Acceptable short-term, unacceptable long-term. Depends on a platform I don't control, and the visual degradation was already visible.

### Option 2: WordPress / Ghost / Notion

General-purpose CMS tools. They solve hosting but don't solve ownership. Content would still live inside another vendor's system or require ongoing server maintenance.

### Option 3: Static site generator + Git

Content as Markdown files in a Git repository. Full ownership, no runtime dependencies, version-controlled, portable.

This was the obvious choice. The only question was which generator.

---

## Decision: Astro + GitHub Pages

### Why Astro

I evaluated Astro, Next.js, and Gatsby.

**Next.js** was ruled out early. It is a React-centric framework primarily designed for dynamic applications with server-side rendering. Static site generation is possible but it's not the primary use case, and the bundle size and complexity overhead are not justified for a content archive.

**Gatsby** was the historical standard for Markdown-based static sites. However, it has been in decline since 2022 and the ecosystem has contracted significantly. Long-term maintenance risk.

**Astro** ships zero JavaScript by default. For a content-heavy archive with 657 posts, this matters. Pages load as static HTML. JavaScript is added only where explicitly needed (dark mode toggle, search, client-side filtering). The content collection system (`.md` → typed frontmatter → static paths) is exactly what a document archive needs.

The key Astro properties that mattered:

- **Content Collections**: Typed Markdown with Zod schema validation. Frontmatter errors are caught at build time.
- **Static output**: No server required. The entire site is `dist/` HTML files.
- **Partial hydration**: Dark mode, Pagefind search, and filter scripts run as isolated client-side islands without framework overhead.
- **Shiki syntax highlighting**: Built in. Dual-theme (light/dark) with zero runtime cost.

### Why GitHub Pages

The archive is `luminousky.com/archive` — a subdirectory of the main site, not a separate domain. GitHub Pages supports this via `base` path configuration.

The deployment model is simple:

```
main branch (source) → GitHub Actions → gh-pages branch (dist/)
```

Push to `main` → CI builds with `astro build` + `pagefind --site dist` → deploys to `gh-pages`. No manual deploy step. No server to maintain.

The `pagefind` step is critical: it generates the full-text search index as static files, placed inside `dist/archive/pagefind/`. Search runs entirely client-side with no backend.

One non-obvious constraint: Astro outputs to `dist/` root even when `base: '/archive'` is set. The `publish_dir` in the GitHub Actions workflow must point to `./dist`, not `./dist/archive`.

---

## What "Preservation" Means Here

The design principle for Chapter 1 (ITMir posts, 2012–2021):

**Do not improve the past. Preserve it.**

Posts are converted to Markdown with minimal transformation. The text is not corrected for spelling, style, or outdated technical opinions. Images are replaced with copies served from GitHub Releases (since the original CDN URLs degraded). Broken links are noted but not retroactively fixed.

The only permitted modifications:
- Markdown formatting repair (broken syntax from the import pipeline)
- Image and attachment URL restoration
- Metadata cleanup (title, category, description, tags)

This is a deliberate choice. A technical blog from 2013 reflects 2013-era thinking. Editing it through the lens of 2026 would corrupt its historical value. The point is to make it *readable*, not *correct*.

---

## Lessons Learned

**Full-text search is non-negotiable for large archives.** With 657 posts, navigation by year or category alone is insufficient. Pagefind's static index approach was the right call — it requires no backend and generates a ~2MB index for the full corpus.

**Content-as-code is the right ownership model.** The entire archive is a Git repository. Every post is a Markdown file. Adding, editing, or reverting content is a standard git workflow. No admin panel, no database migration, no vendor lock-in.

**Import pipeline investment pays off.** The 657 posts were not manually converted. A Python pipeline (`convert.py → compress_images.py → add_attachments.py → validate.py`) handled the bulk conversion. Building the tooling took longer than writing it manually would have for 50 posts, but was the only viable path for 657.

**Astro's build-time guarantees are valuable.** Zod schema validation on frontmatter catches broken content before deployment. A post with a malformed date or missing required field fails the build, not the browser.

---

## URL Structure: Slug-Based Routing

`/luminousky/` posts use slug-based URLs: `/luminousky/{project}/{slug}/`.

The initial implementation used numeric IDs (`/1/`, `/2/`). These were replaced with descriptive slugs during early development, before any external links existed.

**Why slugs for `/luminousky/` but not `/itmir/`**

`/itmir/` post numbers are the original Tistory post IDs (e.g., `/itmir/2013/300/`). Changing them would break any surviving external links and corrupt the historical record. Numeric IDs there are load-bearing.

`/luminousky/` is new content with no prior URL surface. The audience is external — these are technical notes written for sharing. A URL should carry enough signal to be readable out of context. `/luminousky/school-record-app/field-level-encryption-aes256gcm-pbkdf2/` is self-describing; `/luminousky/school-record-app/5/` is not.

**Why now**

The switch was made at 16 posts with zero known external links. Migration cost: rename 16 directories. This window closes as soon as posts get shared or indexed.

**Slug rules**

- Lowercase, words separated by hyphens
- No special characters (`.`, `()`, `/`, etc.)
- ASCII only — Korean titles get an English translation, not romanization or percent-encoding
- Directory name = slug (Astro routes by folder path, so the directory name *is* the URL)

---

## Decision Summary

**What changed?** Ten years of blog posts moved from a third-party platform into a version-controlled, self-hosted static archive.

**Why?** Platform dependency is a long-term liability. Preservation requires ownership.

**What were the alternatives?** Leaving on Tistory (unacceptable long-term), migrating to another CMS (same lock-in problem), or a self-hosted dynamic site (maintenance overhead).

**Would I make the same decision today?** Yes. Astro's content collections and zero-JS-by-default model are well-suited for this use case. GitHub Pages + Actions removes all operational overhead. The tradeoff is that content updates require a git push — acceptable for an archive that is not a live news feed.
