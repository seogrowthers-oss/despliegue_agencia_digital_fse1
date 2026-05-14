# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Commands

```bash
npm install          # Install dependencies (required first time)
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production (output in dist/)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint on Firebase rules
```

## Project Overview

**SEOGrowthers Hub** is a digital agency platform built with React 19 + TypeScript, featuring AI-powered chat, content resources, and service showcase.

### Tech Stack
- **Frontend:** React 19, TypeScript, Vite 6, TailwindCSS
- **Backend/Auth:** Firebase (Authentication, Firestore)
- **AI:** Google Generative AI (Gemini API)
- **UI:** Lucide React (icons), Motion (animations)
- **Routing:** React Router v7 (HashRouter)

### Architecture

The app follows a layered component structure:

```
views/              → Full page components (routes)
components/         → Reusable UI components
services/           → API integrations (Firebase, Gemini)
contexts/           → Global state (Auth, Theme)
constants/          → Static data
```

**Routing:** HashRouter drives the app. Routes are defined in `App.tsx` and span 20+ pages including News, Resources, AI Chat, Services, and authentication flows.

**State Management:** 
- **AuthContext** (`contexts/AuthContext.tsx`): Manages Firebase Auth state + Firestore user data. Provides `useAuth()` hook for accessing `user`, `userData`, and `loading` state.
- **ThemeContext** (`contexts/ThemeContext.tsx`): Manages light/dark mode.

**Firebase Integration:**
- Config loaded from `firebase-applet-config.json`
- `services/firebase.ts` exports `db`, `auth`, and error handling utilities (`handleFirestoreError`, `OperationType` enum)
- Auth state is listened to in `AuthContext`; new users auto-create a document in `/users/{uid}`
- Firestore rules defined in `firestore.rules`

**Gemini Integration:**
- API key from `GEMINI_API_KEY` environment variable (configured in `vite.config.ts`)
- Used in `views/AIChat.tsx` and accessed via `services/geminiService.ts`

### Design System

**Styling:**
- **Primary:** Vanilla CSS with CSS variables (defined in `index.html` styles). Key vars: `--primary`, `--bg-black`, `--text-light`
- **Layout:** TailwindCSS utilities (loaded via CDN in `index.html`)
- **Brand Aesthetic:** Editorial/tech hybrid. Fonts: Inter (body), Fira Code (code). Heavy italics, defined borders.

**Naming Conventions:**
- Components & Views: PascalCase (e.g., `NewsCard.tsx`, `AIChat.tsx`)
- Functions & Variables: camelCase (e.g., `fetchData`, `isLoading`)
- CSS classes: kebab-case

## Development Workflow

1. **Before Starting:** Set `GEMINI_API_KEY` in `.env.local` (required for AI features)
2. **Component Development:** Write components in `components/` or `views/`; use TypeScript for type safety
3. **State Changes:** Evaluate if changes need `AuthContext` or `ThemeContext`, or if a new context is warranted
4. **Firebase Queries:** Use utilities from `services/firebase.ts`; wrap errors with `handleFirestoreError()`
5. **Testing Responsive Design:** Dev server runs on all interfaces (`0.0.0.0`); test mobile via device or browser tools

## Key Implementation Details

- **Firestore Error Handling:** All Firestore operations should catch errors and call `handleFirestoreError(error, OperationType.XXX, path)` to log structured error info with auth context
- **User Onboarding:** When a user authenticates, `AuthContext` automatically creates a user document if it doesn't exist
- **Gemini API:** Exposed as `process.env.GEMINI_API_KEY` at build time via Vite's `define` config
- **Live User Data:** `onSnapshot()` in `AuthContext` keeps user data in sync in real-time
- **Language:** All user-facing text, error messages, and documentation must be in Spanish

## Important Constraints

- No test framework is currently configured; linting is Firebase rules only
- Vite alias `@/*` points to project root (e.g., `@/components/Navbar`)
- TypeScript paths configured in `tsconfig.json` with ES2022 target
