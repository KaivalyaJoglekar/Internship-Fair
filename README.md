# Internship Fair 2026 Website

Official Internship Fair website for MPSTME TRC, built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Run Locally

```bash
npm install
npm run dev
```

App runs on http://localhost:3000.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
app/
	components/
		Navbar.tsx
		Footer.tsx
	companies/
		page.tsx
		[id]/page.tsx
	contact/
		content.ts
		ContactCards.tsx
		FaqList.tsx
		page.tsx          # redirects to /#contact
	faq/
		page.tsx          # redirects to /#faq
	data/
		mock.ts
	globals.css
	layout.tsx
	page.tsx
public/
	IF logo without bg.png
	trclogosvg.svg
```

## Navigation Behavior

- FAQ and Contact are part of the home page, not separate user-facing pages.
- Navbar links use in-page anchors:
	- `/#faq`
	- `/#contact`
- Legacy routes `/faq` and `/contact` are retained as redirects for compatibility.

## Single Source of Content

For FAQ and Contact changes, update only:

- `app/contact/content.ts`

This avoids duplicate edits across multiple pages.

## Design Notes

- Global background uses a black base with animated grid texture.
- Brand styling and gradients are defined in `app/globals.css`.
- Favicon/logo asset is `public/trclogosvg.svg` and configured in `app/layout.tsx`.
