---
name: Vibe Coding Studio
version: 1.1.0
description: Design tokens and editorial design rationale for Thiago Camargo's modern portfolio & landing page studio
colors:
  canvas: "#070709"
  surface-1: "#0e0e13"
  surface-2: "#14141c"
  surface-3: "#1b1b26"
  border-subtle: "rgba(255, 255, 255, 0.08)"
  border-emerald: "rgba(16, 185, 129, 0.3)"
  border-hover: "rgba(16, 185, 129, 0.5)"
  primary: "#10b981"
  primary-glow: "rgba(16, 185, 129, 0.35)"
  accent-emerald: "#10b981"
  accent-emerald-light: "#34d399"
  accent-emerald-dark: "#059669"
  text-primary: "#fafafa"
  text-secondary: "#a1a1aa"
  text-muted: "#71717a"
  text-emerald: "#34d399"
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
