# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static site for pair.guide - "Notes on pair-coding with AI". The site uses a custom Hugo theme located in `themes/pair.guide/`.

## Commands

### Development Server
```bash
hugo server -D
```
Run local development server with draft content enabled. The site will be available at http://localhost:1313 with live reload.

### Build
```bash
hugo
```
Build the production site. Output is generated in the `public/` directory.

### Create New Post
```bash
hugo new content/posts/post-name/index.md
```
Creates a new post in the content/posts directory using the archetype template. Posts use the page bundle format (index.md inside a directory).

## Architecture

### Hugo Theme Structure
The custom theme `pair.guide` is located in `themes/pair.guide/` and follows Hugo's standard theme structure:
- **layouts/**: HTML templates using Hugo's template syntax
  - `baseof.html`: Base template with header/main/footer structure
  - `home.html`: Homepage template that lists all regular pages
  - `_partials/`: Reusable template components (header, footer, menu, head)
- **assets/**: CSS and JS files that are processed by Hugo
  - `css/main.css`: Main stylesheet with minimal, clean styling
  - `js/main.js`: JavaScript functionality
- **content/**: Example content (actual content is in root `content/` directory)

### Content Organization
- All blog posts are in `content/posts/` using page bundles (directory with `index.md`)
- Posts use TOML front matter with `date`, `draft`, and `title` fields
- The root `hugo.toml` configures the site with base URL, permalinks structure (`/posts/:slug/`)

### Site Configuration
- Root `hugo.toml`: Main site configuration (baseURL, title, theme, permalinks)
- Theme `hugo.toml`: Theme-specific config (menu structure, Hugo version requirements)

## Hugo Version
Requires Hugo v0.146.0 or higher (currently using v0.150.1+extended).