---
name: Vibe Coding Studio
version: 1.1.0
description: Design tokens and editorial design rationale for Thiago Camargo's modern portfolio & landing page studio
colors:
  canvas: "#08080a"
  surface-1: "#0f0f13"
  surface-2: "#15151a"
  surface-3: "#1c1c24"
  border-subtle: "rgba(255, 255, 255, 0.07)"
  border-hover: "rgba(255, 255, 255, 0.2)"
  primary: "#10b981"
  accent-emerald: "#10b981"
  text-primary: "#f1f0f5"
  text-muted: "#8e8e99"
  text-highlight: "#ffffff"
typography:
  display:
    fontFamily: Syne
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.03em
  headline:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.02em
  body:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: 6px
  md: 10px
  lg: 14px
  xl: 18px
  2xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
---

# Thiago Camargo — Design Specification (Editorial & Modern Portfolio)

## 1. Design Direction: Swiss-Editorial Minimal Tech
Inspired by award-winning modern portfolios on Pinterest, Awwwards, and modern creative agencies:
- **No AI-Slop / No Generic Templates**: No excessive emojis, no radioactive neon purple glows, no cluttered badges.
- **High-Contrast Editorial Typography**: Clean scale with `Syne` for bold display headings, `Geist` for refined body text, and `JetBrains Mono` for precise technical indices (`01 / SERVIÇOS`, `[ DISPONÍVEL ]`).
- **Tactile Obsidian Surfaces**: Deep dark canvas (`#08080a`), hairline borders (`border-white/[0.07]`), stepped card elevation (`#0f0f13`, `#15151a`), subtle frosted glass (`backdrop-blur-md`).
- **Precision Accents**: Electric cyan (`#06b6d4`) and crisp emerald (`#10b981`) used strictly for live status, metrics, and key links.

## 2. Component Guidelines
- **Navbar**: Clean typographic identity with live availability beacon (`● Disponível para projetos`).
- **Hero**: Confident, grounded headline, seamless frameless portrait with soft bottom feather, and interactive niche simulator styled as a refined developer console.
- **Stats Bar**: Editorial horizontal metrics rail with large numbers and clean borders.
- **Cards & Case Studies**: Clean aspect ratios, authentic mockups, subtle hover transforms, and live interactive demo triggers.
- **Buttons**: Tactile buttons with crisp typography, subtle sheen, and Lucide vector icons (`ArrowRight`, `ArrowUpRight`).
- **PageSpeed Integrity**: Maintain zero layout shifts (CLS=0), eager preloaded LCP, lazy-loaded modals and below-the-fold assets, and `content-visibility: auto`.
