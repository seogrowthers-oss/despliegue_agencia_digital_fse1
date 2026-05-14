# DEVELOPMENT STANDARDS - SEOGrowthers Hub

**Version:** 1.0  
**Last Updated:** 2026-05-14  
**Project:** SEOGrowthers Hub — Digital Agency Platform  
**Tech Stack:** React 19 + TypeScript, Vite 6, Firebase, Gemini API, TailwindCSS

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Core Rules & Constraints](#core-rules--constraints)
3. [Architecture & Structure](#architecture--structure)
4. [Development Workflow](#development-workflow)
5. [Code Standards](#code-standards)
6. [Component Patterns](#component-patterns)
7. [State Management](#state-management)
8. [Firebase Integration](#firebase-integration)
9. [Styling & Design System](#styling--design-system)
10. [Error Handling](#error-handling)
11. [Future Features Roadmap](#future-features-roadmap)
12. [Deployment & Hostinger Setup](#deployment--hostinger-setup)

---

## Project Overview

**SEOGrowthers Hub** is a digital agency platform specializing in AI solutions, web development, and educational content. The application serves:
- **End Users:** Browse services, read news/articles, access AI assistant, view case studies
- **Admin:** Manage content (news, resources, courses) via Firestore
- **Future Users:** Text editor with SEO tools, community forum with registration

**Core Offerings:**
- 🤖 AI Chat Assistant (Gemini API)
- 💻 Web Development Services (Landing Pages, Corporate Sites, E-commerce)
- 📱 Marketing Digital & Automation Services
- 📚 Educational Hub (Academy, Resources, Blog)
- 📰 Tech News & Industry Updates
- 🏆 Case Studies & Portfolio

---

## Core Rules & Constraints

### Language & Localization
- **ALL user-facing text, error messages, and UI labels MUST be in Spanish**
- Internal code comments can be English
- Error logs and debugging messages: Spanish for user context, English for technical details
- API responses and external integrations: preserve original language, translate in UI layer

### Security & Secrets
- **NEVER hardcode API keys, tokens, or secrets in source code**
- Use environment variables: `.env.local` for development, `.env.production` for production
- Firebase config (`firebase-applet-config.json`) is safe to commit (scoped API key)
- Sensitive endpoints: use Firebase Security Rules to enforce auth/permissions
- Admin operations: restricted to verified admin accounts via firestore.rules

### Browser & Environment Support
- **Target browsers:** Chrome/Edge 120+, Safari 16+, Firefox 120+
- **Mobile first:** Design for mobile, progressively enhance desktop
- **ES2022 target:** TypeScript compiles to ES2022 for modern browser features
- **Development:** Tested on `0.0.0.0:3000` for device access

### Performance Constraints
- **Bundle size:** Keep initial load <500KB gzipped
- **Image optimization:** Use OptimizedImage component, Unsplash/CDN for assets
- **Firebase:** Real-time listeners only on critical data (user, auth state)
- **No test framework configured:** Manual testing via dev server required

---

## Architecture & Structure

### Directory Organization

```
project-root/
├── App.tsx                 # Main router & layout
├── index.tsx               # React entry point
├── views/                  # Full-page components (routes)
│   ├── Home.tsx
│   ├── News.tsx
│   ├── NewsDetail.tsx
│   ├── Resources.tsx
│   ├── WebDevResource.tsx
│   ├── AIResource.tsx
│   ├── SEOResource.tsx
│   ├── AIChat.tsx
│   ├── Services.tsx
│   ├── DesarrolloWeb.tsx
│   ├── LandingPage.tsx
│   ├── CorporateSite.tsx
│   ├── TiendaOnline.tsx
│   ├── Showcase.tsx
│   ├── CaseStudyDetail.tsx
│   ├── Academy.tsx
│   ├── Profile.tsx
│   ├── Auth.tsx
│   ├── Contact.tsx
│   ├── About.tsx
│   ├── PrivacyPolicy.tsx
│   └── CookiePolicy.tsx
├── components/             # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   ├── NewsCard.tsx
│   ├── ResourceCard.tsx
│   ├── WhatsAppButton.tsx
│   ├── CookieBanner.tsx
│   ├── OptimizedImage.tsx
│   └── ServicesSection.tsx
├── contexts/               # Global state (React Context API)
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── services/               # External API integrations
│   ├── firebase.ts         # Firebase config & utilities
│   └── geminiService.ts    # Gemini AI integration
├── constants/              # Static data & config
│   └── newsData.ts
├── types.ts                # Shared TypeScript interfaces
├── index.html              # HTML entry point (CSS variables)
├── firebase-applet-config.json  # Firebase config
├── firestore.rules         # Firestore security rules
├── vite.config.ts          # Vite build config
├── tsconfig.json           # TypeScript config
├── package.json
├── .env.local              # Environment variables (dev)
└── .env.production         # Environment variables (prod)
```

### Routing Structure (HashRouter)

**Main Routes:**
- `/` — Home page
- `/news` — News listing (filterable by category)
- `/news/category/:categorySlug` — Filtered news view
- `/news/:id` — News detail page
- `/recursos` — Resources hub
- `/recursos/desarrollo-web` — Web Dev resources
- `/recursos/inteligencia-artificial` — AI resources
- `/recursos/seo` — SEO resources
- `/academia` — Academy (courses)
- `/ask-ai` — AI Chat assistant
- `/services` — Services overview
- `/desarrollo-web` — Web Dev service detail
- `/desarrollo-web/landing-page` — Landing Page solution
- `/desarrollo-web/sitio-corporativo` — Corporate Site solution
- `/desarrollo-web/tienda-online` — E-commerce solution
- `/showcase` — Portfolio & case studies
- `/casos-de-exito/:id` — Case study detail
- `/profile` — User profile (protected)
- `/login` — Authentication page
- `/contacto` — Contact form
- `/about` — About page
- `/privacy` — Privacy policy
- `/cookies` — Cookie policy

---

## Development Workflow

### Initial Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local with:
GEMINI_API_KEY=your_gemini_api_key_here

# 3. Firebase config must be present:
# src/firebase-applet-config.json (keep this file in .gitignore if it contains sensitive data)

# 4. Start development server
npm run dev
# Runs on http://localhost:3000 (accessible from any device on 0.0.0.0)
```

### Daily Workflow

1. **Pull latest code** from GitHub
2. **Run dev server:** `npm run dev`
3. **Test responsive design** on phone/tablet
4. **Build before commit:** `npm run build` (check for errors)
5. **Lint Firebase rules:** `npm run lint`
6. **Commit with descriptive messages** in English (link to issue/feature)
7. **Push to GitHub** → Hostinger auto-deploys

### Build & Deployment

```bash
# Development
npm run dev          # Full dev environment

# Staging/Preview
npm run build        # Production build
npm run preview      # Preview production locally

# Production Deployment
# Automatically triggered by GitHub push via Hostinger's deployment hook
# No manual Vercel deployment—GitHub → Hostinger only
```

---

## Code Standards

### Naming Conventions

| Category | Convention | Example |
|----------|-----------|---------|
| **Files/Components** | PascalCase | `NewsCard.tsx`, `AuthContext.tsx` |
| **Functions/Variables** | camelCase | `fetchNews`, `isLoading`, `handleClick` |
| **Constants** | UPPER_SNAKE_CASE | `API_KEY`, `MAX_RETRIES`, `DEFAULT_PAGE_SIZE` |
| **CSS Classes** | kebab-case | `card-editorial`, `text-primary` |
| **CSS Variables** | --kebab-case | `--primary`, `--bg-black`, `--text-light` |
| **Boolean variables** | is/has prefix | `isLoading`, `hasError`, `isAuthenticated` |

### TypeScript Best Practices

- **Always use types:** No `any` types without explicit `// @ts-expect-error` comment and justification
- **Interface > Type:** Use `interface` for object shapes, `type` for unions/primitives
- **Explicit returns:** All functions must have explicit return type annotations
- **Props interface:** Every component must define `interface ComponentNameProps`
- **Null checks:** Handle null/undefined cases explicitly, use optional chaining (`?.`)

```typescript
// ✅ Good
interface NewsCardProps {
  title: string;
  date: Date;
  imageUrl?: string;
  onRead?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, date, imageUrl, onRead }) => {
  return <div>{title}</div>;
};

// ❌ Bad
const NewsCard = ({ title, date, imageUrl, onRead }: any) => {
  // ...
};
```

### Code Style

- **Semicolons:** Always use semicolons at statement ends
- **Quotes:** Use single quotes for strings (unless containing single quote)
- **Line length:** Keep lines under 100 characters (wrap long chains)
- **Spacing:** 2-space indentation (configured in Prettier)
- **Comments:** Minimal; only explain *why*, not *what*. Remove old/dead code rather than commenting
- **Imports:** Group: React → external libs → local components → types

```typescript
// ✅ Good import order
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import type { NewsItem } from '@/types';
```

---

## Component Patterns

### Functional Components with Hooks

All components must be functional, using React hooks:

```typescript
import React, { useState, useEffect } from 'react';
import type { FC } from 'react';

interface MyComponentProps {
  title: string;
  onSubmit?: (data: string) => void;
}

const MyComponent: FC<MyComponentProps> = ({ title, onSubmit }) => {
  const [state, setState] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Side effects here
  }, [dependencies]);

  const handleClick = () => {
    onSubmit?.(state);
  };

  return <div>{title}</div>;
};

export default MyComponent;
```

### Page/View Components

Views are full-page components that:
- Connect to routing (via `useParams`, `useLocation`)
- Manage their own loading/error states
- Call multiple contexts or services
- Return full page layout (including Navbar padding if needed)

```typescript
const MyView: React.FC = () => {
  const { user, loading } = useAuth();
  const [data, setData] = useState<NewsItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      fetchData();
    }
  }, [loading, user]);

  const fetchData = async () => {
    try {
      // Fetch logic
    } catch (err) {
      setError('Error al cargar los datos');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return <div className="min-h-screen pt-24">Content</div>;
};
```

### Component Organization Within Files

```typescript
// 1. Imports
import React, { useState } from 'react';
import type { FC } from 'react';

// 2. Type definitions
interface ComponentProps {
  // ...
}

// 3. Helper functions (if simple)
const formatDate = (date: Date) => date.toLocaleDateString('es-ES');

// 4. Component definition
const Component: FC<ComponentProps> = (props) => {
  // State hooks
  const [state, setState] = useState<string>('');
  
  // Context hooks
  const { user } = useAuth();
  
  // Effect hooks
  useEffect(() => {
    // ...
  }, []);

  // Event handlers
  const handleClick = () => {
    // ...
  };

  // Render
  return <div>{/* JSX */}</div>;
};

// 5. Default export
export default Component;
```

---

## State Management

### Context API (Preferred for Global State)

**AuthContext:** User authentication & Firestore user data
```typescript
const { user, loading, userData } = useAuth();
// user: Firebase Auth user object or null
// loading: boolean indicating auth check in progress
// userData: Firestore user document data (name, role, etc.)
```

**ThemeContext:** Light/dark mode toggle
```typescript
const { theme, toggleTheme, isDarkMode } = useTheme();
// theme: 'light' | 'dark'
// isDarkMode: boolean convenience flag
```

### Local State (useState)

Use `useState` for:
- Component-specific UI state (form inputs, toggles, modals)
- Temporary data (search results, filters)
- Loading/error states for async operations

### Rules for New Context

If adding new global state:
1. Define `interface ContextType` with all exposed values
2. Create context with `createContext<ContextType | undefined>(undefined)`
3. Create Provider component with `useContext` hook
4. Throw error if hook used outside Provider: `if (!context) throw new Error('...')`
5. Place in `contexts/` folder
6. Wrap children in `App.tsx`

---

## Firebase Integration

### Configuration

Firebase config is loaded from `firebase-applet-config.json`:

```json
{
  "apiKey": "...",
  "authDomain": "...",
  "projectId": "...",
  "storageBucket": "...",
  "messagingSenderId": "...",
  "appId": "...",
  "firestoreDatabaseId": "(default)" // or custom DB ID
}
```

### Authentication Flow

1. User clicks "Entra o Regístrate" → navigates to `/login` (Auth.tsx)
2. Auth.tsx handles Firebase sign-up/sign-in
3. `AuthContext` listens to `onAuthStateChanged()`
4. On successful auth, new user document auto-created at `/users/{uid}`
5. User data synced via `onSnapshot()` listener
6. Protected routes check `useAuth()` loading state

### Firestore Schema

**Collections:**
- `news` — News articles (admin-created)
- `resources` — Educational resources
- `users` — User profiles (auto-created on signup)
- `courses` — Academy courses (future)
- `caseStudies` — Portfolio case studies (future)
- `admins` — Admin whitelist (optional)

**Document Examples:**

```typescript
// news collection
{
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: Timestamp;
  category: 'Shock' | 'AI' | 'Dev' | 'Tech' | 'Hardware';
  imageUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// users collection
{
  uid: string;
  name: string;
  email: string;
  role: 'Member' | 'Moderator' | 'Admin';
  createdAt: string (ISO);
  // Future: forum posts, saved articles
}
```

### Querying Data

**Real-time Listener (preferred for reactive UI):**
```typescript
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase';

const newsRef = collection(db, 'news');
const q = query(newsRef, where('category', '==', 'AI'));

const unsubscribe = onSnapshot(q, (snapshot) => {
  const items = snapshot.docs.map(doc => doc.data());
  setNews(items);
}, (error) => {
  handleFirestoreError(error, OperationType.LIST, 'news');
});

// Cleanup on unmount
return () => unsubscribe();
```

**One-time Query (for non-reactive data):**
```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';

const snapshot = await getDocs(q);
const items = snapshot.docs.map(doc => doc.data());
```

### Writing Data

**Create:**
```typescript
import { collection, addDoc } from 'firebase/firestore';

const docRef = await addDoc(collection(db, 'news'), {
  title: 'Nuevo artículo',
  // ...
});
```

**Update:**
```typescript
import { doc, updateDoc } from 'firebase/firestore';

await updateDoc(doc(db, 'news', docId), {
  title: 'Título actualizado',
});
```

**Delete:**
```typescript
import { deleteDoc } from 'firebase/firestore';

await deleteDoc(doc(db, 'news', docId));
```

### Error Handling

**All Firestore errors must use `handleFirestoreError()`:**

```typescript
import { handleFirestoreError, OperationType } from '@/services/firebase';

try {
  const snapshot = await getDocs(query);
  // ... use snapshot
} catch (error) {
  handleFirestoreError(error, OperationType.LIST, 'news');
}
```

This logs structured error info (operation type, user auth context) to console.

---

## Styling & Design System

### CSS Variables (Define in index.html `<style>`)

Core variables for brand consistency:

```css
:root {
  /* Colors */
  --primary: #2563eb;           /* Blue */
  --primary-dark: #1e40af;      /* Dark blue */
  --bg-black: #050914;          /* Dark background */
  --bg-card: #0a0a0a;           /* Card background */
  --border: #222;               /* Border color */
  --text-main: #ffffff;         /* Primary text */
  --text-light: #e2e8f0;        /* Light text */
  --text-muted: #94a3b8;        /* Muted text */

  /* Typography */
  --font-body: 'Inter', sans-serif;
  --font-mono: 'Fira Code', monospace;
  
  /* Spacing (use Tailwind utilities)*/
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
}
```

### Tailwind CSS

- **Via CDN in index.html** (loaded in `<head>`)
- Use for **layout, spacing, and quick utilities**
- Preferred utilities: flex, grid, gap, px, py, mt, mb, text-*, bg-*
- Avoid: custom borders, complex shadows (use vanilla CSS instead)

### Vanilla CSS (Editorial Design)

Define complex styles in `index.html` `<style>` tag:

```css
.heading-editorial {
  font-weight: 900;
  font-style: italic;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  font-family: 'Inter', sans-serif;
}

.card-editorial {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.25rem; /* Minimal rounded corners */
  padding: var(--spacing-lg);
  transition: all 0.3s ease;
}

.card-editorial:hover {
  border-color: var(--primary);
  box-shadow: 0 0 1px var(--primary);
}
```

### Animation

Use **Motion library** (`motion/react`) for animations:

```typescript
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  Animated content
</motion.div>
```

### Light Mode Support

ThemeContext applies `light-mode` class to `<html>` and `<body>`. Define light-mode overrides:

```css
html.light-mode {
  --bg-black: #ffffff;
  --text-main: #0a0a0a;
  --border: #e0e0e0;
}

html.light-mode .card-editorial {
  background: #f5f5f5;
}
```

### Image Optimization

Use `OptimizedImage` component for lazy loading:

```typescript
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="https://images.unsplash.com/photo-..."
  alt="Description"
  width={800}
  height={600}
/>
```

---

## Error Handling

### User-Facing Errors (Spanish)

Always catch errors and display user-friendly messages in Spanish:

```typescript
const [error, setError] = useState<string | null>(null);

try {
  await fetchData();
} catch (err) {
  setError('Hubo un error al cargar los datos. Por favor, intenta más tarde.');
  console.error(err);
}

return error ? <div className="text-red-500">{error}</div> : null;
```

### Firebase/API Errors

Wrap with `handleFirestoreError()`:

```typescript
import { handleFirestoreError, OperationType } from '@/services/firebase';

try {
  // Firebase operation
} catch (error) {
  handleFirestoreError(error, OperationType.GET, 'news/doc-id');
}
```

### React Error Boundaries (Future)

For unhandled component errors, consider adding an ErrorBoundary component:

```typescript
// To be implemented as needed
```

---

## Future Features Roadmap

### Phase 2: Text Editor with SEO Tools

**Requirements:**
- WYSIWYG editor for writing/editing articles and resources
- Real-time SEO analysis: keyword density, readability, meta preview
- Word count, estimated reading time
- Auto-save to Firestore drafts

**Implementation:**
- Create `views/Editor.tsx` component
- Use library: Slate or ProseMirror (research needed)
- Add `documents` collection to Firestore
- Extend AuthContext roles: Author, Editor, Publisher
- Security rules: users can edit own documents, editors/admins can edit all

**Folder structure:**
```
components/
├── Editor/
│   ├── EditorMain.tsx
│   ├── SEOAnalysis.tsx
│   ├── MetaPreview.tsx
│   └── EditorToolbar.tsx
services/
├── editorService.ts  # Firestore document operations
```

### Phase 3: User Forum with Registration

**Requirements:**
- User registration & profile completion
- Thread creation & replies
- Forum categories (Q&A, Discussions, Announcements)
- Moderation tools for admins
- Real-time notifications (future)

**Implementation:**
- Extend Auth flow: registration with profile fields
- Create Firestore schema: `forums` → `threads` → `posts`
- Update firestore.rules for forum permissions
- Create components: ThreadList, ThreadDetail, PostForm
- User roles: Member, Moderator, Admin

**Folder structure:**
```
views/
├── Forum.tsx
├── ThreadDetail.tsx
components/
├── Forum/
│   ├── ThreadCard.tsx
│   ├── PostCard.tsx
│   ├── NewThreadForm.tsx
│   └── NewPostForm.tsx
services/
├── forumService.ts  # Forum/thread/post operations
```

**Firestore Schema:**
```typescript
// forums collection (categories)
{
  id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: Timestamp;
}

// threads subcollection
{
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  category: 'Q&A' | 'Discussion' | 'Announcement';
  views: number;
  replies: number;
  pinned: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// posts subcollection (replies)
{
  id: string;
  threadId: string;
  content: string;
  authorId: string;
  authorName: string;
  isAnswer: boolean;    // For Q&A threads
  likes: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## Deployment & Hostinger Setup

### GitHub → Hostinger Integration

**Configuration:**
1. GitHub repository: `despliegue_agencia_digital_fse1-main`
2. Hostinger deployment tool: Connected to GitHub
3. Auto-deployment on push to main branch
4. **No Vercel:** Hostinger handles all deployments

**Deployment Process:**
1. Local: `git push origin main`
2. GitHub webhook → Hostinger
3. Hostinger runs: `npm install`, `npm run build`
4. Output: `dist/` folder deployed to hosting server
5. Live immediately at domain

### Pre-Deployment Checklist

Before pushing to main (production):

```bash
# 1. Run build to check for errors
npm run build

# 2. Preview production build locally
npm run preview

# 3. Test all features manually on preview
# - Login/auth flow
# - News filtering and search
# - AI chat functionality
# - Form submissions
# - Mobile responsiveness

# 4. Check browser console for errors
# - No 404 on static assets
# - No Firebase auth errors
# - No console.error() calls (except expected ones)

# 5. Lint Firestore rules
npm run lint

# 6. Verify environment variables
# - GEMINI_API_KEY is set in Hostinger environment
# - Firebase config file exists

# 7. Commit & push
git add .
git commit -m 'feat: description'
git push origin main
```

### Environment Variables (Hostinger)

Set in Hostinger control panel:

```
GEMINI_API_KEY=sk-...
NODE_ENV=production
```

These are injected during build via Vite `define` config.

### Rollback Strategy

If production has issues:

1. Revert commit: `git revert <commit-hash>`
2. Push to main: `git push origin main`
3. Hostinger auto-redeploys previous version
4. Investigate issue on dev branch
5. Fix and push new commit

---

## Maintenance & Monitoring

### Regular Tasks

| Task | Frequency | Owner |
|------|-----------|-------|
| Update dependencies | Monthly | Dev Lead |
| Review Firestore rules | Quarterly | Admin |
| Audit Firebase costs | Monthly | Project Manager |
| Check broken links | Monthly | QA |
| Analyze page speed (Lighthouse) | Quarterly | Dev Lead |
| Update content (news, resources) | Weekly | Content Team |

### Known Issues & Workarounds

- **Theme context:** Light mode not fully styled; design is dark-mode-first
- **Mobile menu:** Closes on every navigation; consider state persistence if UX issue
- **Search:** Client-side only; consider Firestore indexing if performance issues

### Useful Commands Reference

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint Firebase rules
```

---

## Questions & Support

- **Code style questions:** Refer to "Code Standards" section
- **Architecture questions:** Refer to "Architecture & Structure" section
- **Firebase questions:** Refer to "Firebase Integration" section
- **Component patterns:** Refer to "Component Patterns" section

**This document is living:** Update when:
- New patterns are established
- Rules change
- Future features are implemented
- Major refactors occur
