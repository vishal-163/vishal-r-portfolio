# Vishal R - Interactive Developer Portfolio

Welcome to the source code for my interactive developer portfolio. This project serves as a showcase of my skills, projects, and experience as an aspiring Full Stack Developer, wrapped in a highly immersive and terminal-inspired design.

##  Features

- **Immersive UI/UX**: Native CSS animations, Intersection Observers, and a custom Matrix rain canvas background that reacts dynamically to user interaction.
- **AI-Powered Chat Assistant**: An integrated AI widget powered by the Groq API (Llama 3.3 70b Versatile). Visitors can chat with an AI trained specifically on my resume, skills, and background.
- **Serverless Backend Architecture**: Fully modularized API routes (`/api/chat`) designed to run seamlessly on Vercel's serverless edge network.
- **Supabase Integration**: Secure, real-time logging of chat interactions and direct client-to-storage architecture for file handling.
- **Zero-Bloat Performance**: Built strictly with native DOM APIs and pure CSS over heavy UI animation libraries, resulting in an ultra-lightweight production footprint (~51 kB gzipped).
- **Responsive Design**: Flawlessly adapts across desktop, tablet, and mobile environments.

##  Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Vanilla CSS
- **Backend / APIs**: Node.js, Vercel Serverless Functions
- **AI Integration**: Groq API (Llama 3.3)
- **Database & Storage**: Supabase (PostgreSQL)
- **Deployment**: Vercel

##  Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vishal-163/vishal-r-portfolio.git
   cd vishal-r-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add the following keys:
   ```env
   GROQ_API_KEY=your_groq_api_key
   RESEND_API_KEY=your_resend_api_key
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   *(This utilizes `concurrently` and `nodemon` to run both the Vite frontend server and the local Node.js API server perfectly in sync).*

5. Open your browser and navigate to `http://localhost:5173`.

##  Architecture Overview

The project was recently migrated from a monolithic HTML/JS structure to a scalable React 19 component architecture:
- `src/components/`: Modularized UI sections (`HeroSection`, `AboutSection`, `ProjectsSection`, etc.)
- `api/`: Vercel Serverless functions for backend operations (`chat.ts`, `logs.ts`)
- `public/script.js`: Core DOM interaction scripts, cursor tracking, and Supabase client-side storage logic.
- `api-server.js`: Local mock server to handle `/api` routes during local development.

##  License

This project is licensed under the MIT License.

```text
MIT License

Copyright (c) 2026 Vishal R

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📬 Contact

- **Name**: Vishal R
- **LinkedIn**: [Vishal R](https://www.linkedin.com/in/vishal-ravi-653a8a33b/)
- **GitHub**: [@vishal-163](https://github.com/vishal-163)
- **Email**: vishalravi163@gmail.com
