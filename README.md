# CraveSeat — Next.js + TypeScript + MongoDB

A modern full-stack web application built with **Next.js**, **TypeScript**, and **MongoDB**.  
Implements authentication (NextAuth with Credentials), secure user registration, and structured API endpoints for managing cravings.

## 🚀 Features

- **Next.js 14 App Router** for a modern, server-first architecture
- **TypeScript** for type safety and maintainability
- **MongoDB** with Mongoose for flexible data modeling
- **NextAuth.js** Credentials authentication
- **Secure password hashing** with `bcrypt-ts`
- Modular, refactored API endpoints (`/register`, `/api/user/[id]`, etc.)
- Dockerized MongoDB setup with `restart: unless-stopped` and health checks

---

## 🛠 Prerequisites

Make sure you have the following installed:

- [Node.js 18+](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/), npm, yarn, or bun
- [Docker](https://www.docker.com/) (for local MongoDB)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/craveseat.git
cd craveseat
````

### 2. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
# or
bun install
```

### 3. Start MongoDB (Docker)

```bash
docker compose up -d
```

This uses the included `docker-compose.yml`:

- **MongoDB** runs with `restart: unless-stopped`
- Root username & password are set via environment variables
- Persistent volume `mongodb_data` stores your database data
- Built-in health check ensures MongoDB is ready before use

### 4. Create `.env.local`

```env
MONGODB_URI=mongodb://root:password@localhost:27017/myapp?authSource=admin
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 5. Run the development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Now visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔐 Authentication

This project uses **NextAuth.js** with **CredentialsProvider**:

- Username + Password login
- Password hashing via `bcrypt-ts`
- Secure session management

---

## 📜 Scripts

```bash
pnpm dev       # Start dev server
pnpm build     # Build production bundle
pnpm start     # Start production server
pnpm lint      # Run ESLint
docker compose up -d   # Start MongoDB
docker compose down    # Stop MongoDB
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

## 🚀 Deployment

Deploy easily on [Vercel](https://vercel.com/) or your preferred Node hosting.
If using Vercel, set your environment variables in the **Vercel Dashboard**.
