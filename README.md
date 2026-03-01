# AI Studio — Image & Text Generation

A high-performance AI prototype supporting **text-to-image** and **image-to-variation** workflows, built with React and Vercel Serverless Functions.

---

## 🔑 OpenAI API Key Required

This project requires an OpenAI API key for full functionality. API keys are **NOT** included in this repository for security and billing reasons.

### To Enable AI Features:

1. **Get your API Key**: Visit [OpenAI Platform](https://platform.openai.com/api-keys) to create one.
2. **Local Testing**:
   - Create a `.env` file in the root directory.
   - Add your key: `OPENAI_API_KEY=sk-xxxx...`
3. **Vercel Deployment**:
   - Go to your **Vercel Dashboard**.
   - Open **Project Settings** → **Environment Variables**.
   - Add a new variable: `OPENAI_API_KEY` with your key as the value.
   - **Redeploy** the project to apply changes.

Once the key is configured, both workflows will function end-to-end.

---

## 🛠️ Security Statement

This project follows industry best practices by never committing sensitive API keys to the repository. All credentials must be securely configured via environment variables to prevent unauthorized access and billing charges.

---

## 🚀 Setup Instructions

1. **Clone & Install**:
   ```bash
   git clone <repo-url>
   cd ai-studio
   npm install
   ```

2. **Configure Environment**:
   Create a `.env` file in the root:
   ```env
   OPENAI_API_KEY=your_actual_key_here
   ```

3. **Run Locally**:
   ```bash
   npm run dev
   ```

4. **Run with API support** (Using Vercel CLI):
   ```bash
   npx vercel dev
   ```

---

## 📖 Features

### 1. Image Generator (Text Workflow)
- Input a simple text prompt.
- **Enhance Prompt**: Uses `gpt-4o-mini` to turn your idea into a detailed, artist-level prompt.
- **Generate**: Uses `dall-e-3` to create a high-fidelity 1024x1024 image.

### 2. Image Variation (Image Workflow)
- **Upload**: Select any local image.
- **Analyze**: Uses `gpt-4o-mini` Vision to understand the subject, style, and mood.
- **Variation**: Uses the analysis to generate a creative variation via `dall-e-3`.

### 3. Style Selector
- Apply specific artistic styles (Cinematic, Anime, Watercolor, etc.) to any generation with one click.

---

## 🏗️ Tech Stack

- **Frontend**: React (Vite), CSS-in-JS (Vanillin), Axios
- **Backend**: Vercel Serverless Functions
- **AI Models**: 
  - `gpt-4o-mini`: Prompt Enhancement & Vision Analysis
  - `dall-e-3`: High-quality Image Generation

---

## 📜 License

MIT
