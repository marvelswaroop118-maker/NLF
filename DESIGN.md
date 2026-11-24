# NLF visual system

Preserve the supplied institutional identity: warm cream canvas (#FAF9F6), navy (#0B192C), original gold (#C59B27), and the supplied NLF crest. Use darker gold (#866716) for readable emphasis on cream. Cormorant Garamond carries editorial headings; Inter carries forms and navigation.

The public site introduces the federation and leads to a membership application. Use generous section rhythm, serif hierarchy, restrained rules and open article layouts. The navy working-principle and portal sections provide continuity with the original source. Do not invent membership numbers, endorsements, schemes, leaders, or live features.

Motion uses the shared --ease token, CSS for hero entrances and control feedback, IntersectionObserver with WAAPI for one-time section reveals, and requestAnimationFrame for scroll-derived state. Mobile and reduced-motion visitors use direct principle tabs without pinned scrolling. Controls must remain keyboard accessible; text remains visible if reveal observation is unavailable.

Membership and portal content must clearly distinguish previews from issued credentials and live services. Application data stays in memory until the visitor chooses to open their mail client or download a copy.

Implementation: React with Vite and React Router. Each public page owns a JSX module; Home composes the same modules as an overview. Shared layout owns navigation, footer, route focus, reveal effects, and scroll progress. Interactive state belongs to React components and hooks; imperative DOM mutation must not manage tab panels or form values. The root index.html is only a document shell.

Standalone expansion: all 14 public routes retain the cream/navy/gold system. Leadership uses the supplied portrait, Resources uses a real brochure cover, and Community exposes the supplied invitation. New welfare, grievance, learning and directory pages describe the brochure’s priorities and offer local email-draft preparation. They must not imply live benefits, registrations, verified local rosters or successful case submission. Shared breadcrumbs, related pages, FAQs, editorial sections and a complete sitemap support independent page visits.
