# National Lawyers Federation

React + Vite website with separate JSX pages, client-side routes, reusable components, responsive styles, and accessible interactions. The supplied cream, navy, gold, crest, and institutional content are preserved.

## Development

Requires Node.js 20.19+ (or a compatible newer release).

```sh
npm install
npm run dev
```

Open http://127.0.0.1:4173. `npm run build` produces `dist/`. `npm run preview` serves the production build. `npm run check` runs membership validation/email tests and the production build. `npm run format:check` checks formatting.

## Pages

Every public destination has its own JSX file in `src/website/pages/`.

| Route                | Page               |
| -------------------- | ------------------ |
| `/`                  | HomePage.jsx       |
| `/charter`           | CharterPage.jsx    |
| `/working-principle` | PrinciplePage.jsx  |
| `/structure`         | StructurePage.jsx  |
| `/leadership`        | LeadershipPage.jsx |
| `/membership`        | MembershipPage.jsx |
| `/welfare`           | WelfarePage.jsx    |
| `/grievances`        | GrievancePage.jsx  |
| `/learning`          | LearningPage.jsx   |
| `/directory`         | DirectoryPage.jsx  |
| `/resources`         | ResourcesPage.jsx  |
| `/community`         | CommunityPage.jsx  |
| `/portal`            | PortalPage.jsx     |
| `/contact`           | ContactPage.jsx    |
| Unmatched URL        | NotFoundPage.jsx   |

The original landing-page sections remain composed on Home. Standalone pages add context, next steps, related destinations and appropriate enquiry paths. The desktop Explore menu, scrollable mobile navigation and full footer expose every route. Route titles and descriptions come from `src/website/data/site.js`.

## Project structure

- `src/main.jsx`: React entry, router, stylesheet imports.
- `src/App.jsx`: route definitions.
- `src/website/pages/`: separate JSX pages.
- `src/website/components/`: shared layout, contact details, heading, fields, illustrative card, preview RSVP.
- `src/website/hooks/`: reusable accessible tab behavior.
- `src/website/data/`: states, membership tiers, validation, and email formatting.
- `src/shared/config.js`: federation details.
- `src/website/styles/`: brand styles, responsive refinements, and React route states.
- `assets/nlf-crest.webp`: original crest, bundled by Vite through CSS.
- `tests/`: membership validation and email-draft tests.

All page content is JSX. The root `index.html` is only Vite’s small document shell and mount point; it contains no page layouts. The previous HTML website files and imperative DOM scripts have been removed.

## Supplied assets and content

- `assets/founder-president.jpg`: optimised version of the supplied portrait, used on Leadership, Home, Directory and the contact component.
- `assets/brochure-cover.jpg`: preview rendered from the supplied brochure.
- `public/documents/NLF_Brochure.pdf`: unchanged four-page supplied brochure, available to read or download.
- `src/shared/config.js`: supplied WhatsApp community invitation, separate from the direct office WhatsApp contact.

The brochure is the source for the federation’s seven aims, nine objects, working principle, four committee levels, values and published Founder President details. No committee roster, programme dates, scheme entitlement or acceptance guarantee is invented. Membership preferences require confirmation by the NLF office.

## Functionality and boundaries

Tabs, membership form steps, validation errors, live card, review, editing, and local preview RSVP use React state. The form holds personal data only in memory; users choose to download the application or open an email draft. Route changes reset the application. No backend submission occurs. Welfare, grievance, learning and contact pages provide local enquiry composers with a visible email-draft review. The directory prepares a location-specific contact request. The WhatsApp invitation opens externally; the website does not join the group for the visitor.

The portal remains a sample-data preview. Authentication, OTP, membership verification, file uploads, payments, databases, and real grievance processing need backend implementation.

## Hosting

Serve `dist/` as a static SPA. The host must rewrite unknown routes to `/index.html` for direct URLs and refreshes. `public/_redirects` supplies that rule for compatible hosts; configure an equivalent fallback on other hosts. Vite’s dev and preview servers already support it. The existing `.openai/hosting.json` Site identity is preserved. Publishing requires the user’s explicit approval from the prior session.
