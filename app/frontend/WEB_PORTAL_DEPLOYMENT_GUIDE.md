# SUNITE ENTERPRISE WEB PORTAL - DEPLOYMENT GUIDE (PHASE 12)

## Executive Summary
The Sunite Enterprise Web Portal is built using **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, and **TanStack Query**. It connects seamlessly to the NestJS Backend Version 1.0 via REST APIs, JWT authentication, and WebSockets.

---

## 1. Prerequisites & Environment Setup
- Node.js 20+
- npm or pnpm
- Running NestJS Backend Service on `http://localhost:3000`

```bash
# Navigate to web portal directory
cd /app/frontend

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
```

---

## 2. Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` or `http://localhost:3001` in your browser.

---

## 3. Production Build & Docker Deployment
```bash
# Build optimized static and server outputs
npm run build

# Start production server
npm start
```

### Docker Containerization
```dockerfile
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 4. Vercel Cloud Deployment
1. Connect GitHub repository to Vercel.
2. Set Environment Variables:
   - `NEXT_PUBLIC_API_URL`: `https://api.sunite.com/api/v1`
   - `NEXT_PUBLIC_WEBSOCKET_URL`: `wss://api.sunite.com/ws`
3. Click **Deploy**.
