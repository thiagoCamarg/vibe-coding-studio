---
name: Vibe Coding Studio
version: 1.0.0
description: Design tokens and design rationale for Vibe Coding Studio landing page & client portal
colors:
  canvas: "#0a0a0c"
  surface-1: "#121216"
  surface-2: "#18181f"
  surface-3: "#201f28"
  border-subtle: "rgba(255, 255, 255, 0.08)"
  primary: "#06b6d4"
  secondary: "#6366f1"
  accent-green: "#10b981"
  text-primary: "#e5e1e4"
  text-muted: "#94a3b8"
  text-highlight: "#acedff"
typography:
  display:
    fontFamily: Syne
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  body:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  card-surface:
    backgroundColor: "{colors.surface-1}"
    border: "1px solid {colors.border-subtle}"
    rounded: "{rounded.xl}"
---

# Vibe Coding Studio — Design Specification

## Overview
Vibe Coding Studio delivers high-velocity, production-grade software and micro-SaaS MVPs powered by AI engineering. The visual identity reflects a dark terminal-inspired, cyber-craft aesthetic with deep obsidian tones, glassmorphism, and neon cyan / indigo accents.

## Colors
- **Canvas (`#0a0a0c`)**: Deep dark foundation.
- **Surface Layers (`#121216`, `#18181f`, `#201f28`)**: Stepped elevation for cards, modals, and navigation bars.
- **Primary Accent (`#06b6d4`)**: Electric cyan used for technical tags, active state indicators, and key milestones.
- **Secondary Accent (`#6366f1`)**: Royal indigo used for primary action buttons and ambient lighting glows.
- **Success Accent (`#10b981`)**: Emerald green for WhatsApp quick links, online status, and verified deliverables.
- **Text Hierarchy (`#e5e1e4`, `#94a3b8`, `#acedff`)**: High contrast accessible reading palette.

## Typography
- **Headings**: `Syne` (Bold, modern, high impact).
- **Body & Controls**: `Geist` (Crisp, clean legibility).
- **Technical Badges & Code**: `JetBrains Mono` (Terminal aesthetic, mono-spaced tags).

## Layout & Spacing
- Centered containers constrained to `max-w-7xl` (1280px) with responsive horizontal padding (`px-4 sm:px-6 lg:px-8`).
- Vertical section cadence: `py-16` to `py-24` with subtle dividing lines (`border-white/[0.06]`).

## Elevation & Depth
- Ambient glow filters (`glow-cyan`, `glow-indigo`, `glow-emerald`).
- Glassmorphic overlays with `backdrop-blur-xl` and `bg-[#0a0a0c]/80`.

## Shapes
- Cards and modals use rounded corners (`rounded-xl`, `rounded-2xl`).
- Action pills and status chips use full pill shapes (`rounded-full`).

## Components
- **Navbar**: Sticky glassmorphic header with mono-spaced brand and direct CTA.
- **Hero**: High-contrast headline with dynamic photo cutout and quick proposal trigger.
- **Interactive Modals**: Case detail inspection and image link manager with localStorage persistence.
- **Proposal Form**: Step-by-step scope calculator connected directly to WhatsApp and clipboard.

## Do's and Don'ts
- **Do**: Maintain crisp dark mode contrast and subtle borders.
- **Do**: Keep code samples and data tags mono-spaced.
- **Don't**: Use generic unstyled colors or standard templates.
