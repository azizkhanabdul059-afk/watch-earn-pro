# Aziz Creative Studio — Portfolio & Live Brief Studio

A high-converting, editorial web application for Aziz Creative Studio featuring an interactive graphic design showcase, live device case study inspector, dynamic project scope estimator, and a real-time creative brief generator.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Based on your selections in Phase 1, here are the foundational decisions governing the implementation:

- **Confirmed Brand Identity**: **Aziz Creative Studio** (headed by Aziz with 3+ years of professional graphic design experience across Photoshop, Illustrator, and Canva Pro).
- **Confirmed Architecture & Layout**: Creative studio showcase with high-impact editorial typography, full 1440px desktop baseline, interactive case studies, and live mockup inspection.
- **Confirmed Core Feature**: **Project Requirement Submission Form & Live Brief Generator** — allowing prospective clients to dynamically build, preview, score, and export structured design briefs (ready for immediate email or WhatsApp delivery).
- **Service Taxonomy**: Fully covers all 6 gig services: Social Media Post Design, Logo Design & Brand Identity, YouTube Thumbnails & Banners, Flyers/Posters/Brochures, Business Cards & Stationery, and E-commerce/Ad Creatives.

---

### 1. Overview & Core Concept

**What It Does**:
Aziz Creative Studio turns a standard freelance graphic design gig into an interactive, premium client-acquisition experience. Prospective clients can explore detailed visual case studies across six key disciplines, test design mockups in live interactive viewports (social media feed, mobile app, billboard/poster, and packaging mockups), calculate exact delivery timelines and file requirements, and generate a standardized "Creative Brief" document with one click.

**Target Audience / Persona**:
- Content creators & YouTubers needing high-CTR thumbnails and branding.
- E-commerce brand owners needing high-converting ad creatives and Amazon/Shopify banners.
- Startups and local businesses needing logo marks, stationery, and comprehensive visual identity kits.
- Marketing managers seeking dependable on-time delivery with HD source files (AI, PSD, PDF, PNG).

**Key Value**:
Eliminates back-and-forth ambiguity by letting clients generate a complete, structured brief with design specs, color preferences, references, and deadline constraints, while showcasing proof of craft through interactive case studies.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Hero & Studio Introduction**:
   - Split-screen editorial hero with typographic statement, experience counter (3+ Years Experience, 100% Original Design), software suite badges (Adobe Photoshop, Illustrator, Canva Pro), and direct CTAs to "Launch Brief Builder" or "Explore Works".
   - 4-metric proof strip below the hero: 100% Original Work · 24-48h Draft Speed · Unlimited Revisions · Full HD & Source Files.
2. **Interactive Case Studies & Mockup Inspector**:
   - Segmented interactive discipline switcher (All, Social Media, Branding, YouTube & Ads, Print & Editorial).
   - Case study cards with real project context (Client goal, typographic hierarchy, color palette swatch, deliverables delivered).
   - Interactive Live Demo Modal: View designs inside responsive mockups (Instagram post preview with like/save overlays, YouTube desktop video card with title/views preview, and billboard poster frame).
3. **Live Creative Brief Generator & Requirement Submission**:
   - Step 1: Service Selection (multiselect with visual icons and deliverable badges).
   - Step 2: Brand & Visual Direction (brand name, niche, desired mood: Bold & Energetic, Clean & Minimalist, Luxury & Refined, Vibrant & Playful).
   - Step 3: Deliverables & Asset Specs (dimensions: 1080x1350 Instagram, 1920x1080 YouTube, 300 DPI CMYK Print; source files needed: AI, PSD, PDF, PNG).
   - Step 4: Live Brief Preview: Real-time rendered A4-style creative document showing generated brief score, executive summary, and project checklist.
   - Actions: "Copy Formatted Brief", "Download Brief (.txt / markdown)", and "Direct Send to Aziz via WhatsApp / Email".
4. **The 4-Step Working Process**:
   - Visual step-by-step pipeline: 01 Requirements & Brief → 02 First Draft Review → 03 Collaborative Revisions → 04 HD Final Package Delivery.
5. **Pricing & Package Calculator**:
   - Transparent tier comparison (Starter Brand Pack, Growth Social Suite, Complete Brand Identity) with custom add-on toggles (Express 24h delivery, additional source files, 3D mockups).
6. **Client FAQ & Direct Contact Bar**:
   - Accordion answering common questions (file formats, revisions policy, commercial usage rights, communication channels).

#### Visual Identity & Theme
- **Aesthetic Direction**: Contemporary Creative Studio — high-contrast dark slate and pure white canvas, geometric architectural sans typography, subtle gridlines, and restrained vibrant electric cobalt accent (`#2563EB`) without visual slop or neon clichés.
- **Zero-Pill Discipline**:
  - Tags, categories, and timestamps formatted as unboxed text with typographic bullet separators (`Social Media · 1080×1350 · Adobe Photoshop`).
  - Interactive filter controls styled as clean segmented buttons, never candy badges.
- **Top Bar Contract**:
  - Zone 1: Wordmark: `Aziz Creative Studio` in bold Plus Jakarta Sans.
  - Zone 2: Navigation: `Selected Works`, `Services`, `Process`, `Pricing`, `Brief Generator`.
  - Zone 3: Primary CTA: `Build Your Brief` button.
- **Color Distribution (60-30-10)**:
  - 60% Neutral Canvas: Deep modern dark theme (`#090D16` / `#0F172A`) or crisp clean light theme with warm neutral accents.
  - 30% Structural Surfaces: Card containers (`#111827` / `#1E293B`), subtle hairline borders (`rgba(255,255,255,0.08)`), and muted body text (`#94A3B8`).
  - 10% High-Intent Accent: Vibrant cobalt blue (`#2563EB`) and focused emerald confirmation accents.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Interactive Live Brief Generator vs. Static Contact Form**
  - *Chosen Approach*: Multi-step interactive brief builder with real-time markdown/document preview and instant copy/dispatch.
  - *Why*: Reduces client hesitation, prompts them for the exact information Aziz needs (dimensions, brand voice, reference links), and demonstrates studio professionalism before any money changes hands.
  - *Alternatives Considered*: Standard text message box (too vague; leads to multiple rounds of clarifying questions).

- **Decision 2: Live Device Context Previews for Case Studies**
  - *Chosen Approach*: Interactive mockup switcher allowing users to preview graphics in their natural habitat (Instagram feed preview, YouTube thumbnail card, poster frame).
  - *Why*: Clients judge graphic design by how it performs in the actual platform (CTR for thumbnails, scroll-stopping ability for social posts).

- **Decision 3: Zero-Friction Local State + Instant Direct Dispatch**
  - *Chosen Approach*: All state managed instantaneously client-side with persistent draft saving in `localStorage` and direct mailto / WhatsApp URL generation.
  - *Why*: No signup or account creation required for prospects; they can assemble their brief and send it directly in seconds.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Aziz Creative Studio UI                         │
├────────────────────────────────────────────────────────────────────────┤
│  TopBar (Zone 1: Wordmark | Zone 2: Nav Links | Zone 3: Primary CTA)  │
├────────────────────────────────────────────────────────────────────────┤
│  Hero Section (Split Screen: Headline & Value Prop + Graphic Reel)     │
│  ├── Proof Strip (4-Metric Trust Markers: Speed, Originality, Tools)   │
├────────────────────────────────────────────────────────────────────────┤
│  Works Showcase & Live Mockup Inspector                                │
│  ├── Filter Bar (Social Media | Branding | YouTube/Ads | Print)        │
│  ├── Case Study Grid (Context, Color Palette Swatches, Typography)     │
│  └── Live Mockup Modal (Device Viewports: Phone, Feed, Desktop)        │
├────────────────────────────────────────────────────────────────────────┤
│  Interactive Project Brief Generator                                   │
│  ├── Step Wizard (Service -> Brand Vibe -> Specs & Assets -> Timeline) │
│  ├── Live Document Canvas (Auto-generated Creative Brief Preview)      │
│  └── Dispatch Bar (Copy Brief | Download Markdown | Open WhatsApp/Mail)│
├────────────────────────────────────────────────────────────────────────┤
│  Pricing & Package Calculator + 4-Step Process & FAQs                  │
├────────────────────────────────────────────────────────────────────────┤
│  Footer (Copyright, Direct Links, Availability Badge, Social Channels) │
└────────────────────────────────────────────────────────────────────────┘
```

#### Core Data Entities & Types
- `ServiceItem`: id, title, category, description, defaultTurnaround, softwareTools, deliverablesList.
- `CaseStudy`: id, title, client, category, challenge, solution, dimensions, metrics, colorPalette, mockupType, imageAsset.
- `ProjectBrief`: clientName, brandName, email, contactMethod, selectedServices, visualVibe, targetAudience, requiredFormats, deadlineUrgency, projectNotes.
- `PackageTier`: id, name, price, turnaround, revisions, includesSourceFiles, features.

---

### 5. Verification & Implementation Roadmap

1. **Setup & Global Styles**: Configure typography (`Plus Jakarta Sans`), colors, and Tailwind layout containers.
2. **Components**:
   - `Navbar`: 3-zone contract, responsive navigation.
   - `Hero`: High-impact split-screen with stats and software tools.
   - `PortfolioShowcase`: Filterable case studies with live device mockups (Social feed, YouTube video card, billboard).
   - `BriefGenerator`: 4-step wizard with real-time brief scoring and formatted export.
   - `PricingCalculator`: Package comparison with custom addon calculation.
   - `WorkflowProcess` & `FAQ`: Step-by-step breakdown and common inquiries.
3. **Compilation & Linting**: Co-run `compile_applet` and `lint_applet` to verify zero TypeScript errors and pristine execution.
