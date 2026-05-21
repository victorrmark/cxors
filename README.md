# Cxors — Modern URL Shortener & Link Management Platform

## Overview

**Cxors** is a modern full-stack URL shortening and link management application built with Next.js, Supabase, and Chakra UI.

The platform allows users to create shortened URLs, generate QR codes, manage links from a personalized dashboard, and track link performance through analytics.

Designed with performance, simplicity, and scalability in mind, Cxors provides a clean user experience while handling authentication, link management, and analytics in real time.

---

## Features

### URL Shortening
- Convert long URLs into short, shareable links instantly
- Fast and user-friendly shortening workflow
- Copy shortened links with one click

### Custom Aliases
- Create personalized short links
- Customize URLs to match brands, campaigns, or content

Example: cxors.vercel.app/myportfolio

---

### QR Code Generation
- Automatically generate QR codes for shortened links
- Download QR codes as images
- Share links easily across mobile and offline platforms

---

### Authentication System
- Secure authentication powered by Supabase
- Email/password authentication
- Google OAuth login
- Protected dashboard routes
- Persistent user sessions

---

### User Dashboard
- Manage all created links in one place
- View shortened URLs and original URLs
- Access analytics and engagement data
- Personalized user experience

---

### Analytics
Track the performance of shortened URLs with:
- Total click counts
- Link activity monitoring

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Chakra UI

### Backend & Database
- Supabase
- PostgreSQL
- Supabase Authentication
- Supabase Storage

### Deployment
- Vercel

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/cxors.git
cd cxors
```
### Environmental Variables
create a .env.local file

```env

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_REDIRECT_URL=your redirect url

```

### Install dependencies
```bash
npm install
```
### run development server
```bash
npm run dev
```

## Project Goals
Cxors was built to:

- Practice full-stack application development
- Explore authentication and database management with Supabase
- Build scalable modern web applications using Next.js App Router
- Improve UI/UX and state management patterns

## Future Improvements
- Advanced analytics dashboard
- Link expiration support
- Custom domains
- Team/shared workspaces
- API access for developers
- Rate limiting and abuse protection
- Password-protected links
- Link folders and organization

## Contributing

Contributions, suggestions, and feedback are welcome.

### Steps:
- Fork the repository
- Create a feature branch
- Commit changes
- Push branch
- Open a pull request