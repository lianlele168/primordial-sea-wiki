# Primordial Sea Wiki

Unofficial, source-first guide for the HTML5 cosmic merge puzzle **Primordial Sea** by float-u-space.

## Included

- 12 statically exported routes
- Interactive merge evolution planner
- Verified ten-stage normal evolution chain
- Hidden disk, enemy mode, item, beginner, and source-log pages
- Per-page metadata and canonical URLs
- VideoGame, WebSite, WebApplication, Article, Breadcrumb, and FAQ structured data
- Generated `sitemap.xml` and `robots.txt`
- Official gameplay screenshots with source attribution

## Local development

```powershell
npm install
npm run dev
```

## Production check

```powershell
npm run check
npm run build
```

The static export is written to `out/`.

## Deployment target

- Repository: `primordial-sea-wiki`
- Suggested subdomain: `primordialsea.robloxwikihub.com`
- GSC sitemap after deployment: `https://primordialsea.robloxwikihub.com/sitemap.xml`

Do not add the hub card or parent-site sitemap links until the deployed subdomain returns HTTP 200.
