# General

This is the source-code behind General, a curated visual experience powered by Pexels API.

## Overview

General is a web application for browsing and discovering high-quality photos and videos from Pexels. It features a clean, dark interface with smooth animations and intuitive navigation.

## Features

General includes a photo gallery with curated photos from Pexels, a video collection featuring trending videos, search functionality to find specific content, download capability for saving favorite images and videos, responsive design that works seamlessly on all devices, a dark theme that is easy on the eyes, floating search for quick access when scrolling, scroll to top button for easy navigation, and preferences to customize your experience.

## Tech Stack

The project uses React as the UI library, TypeScript for type safety, Vite as the build tool, Tailwind CSS for styling, Framer Motion for animations, and Pexels API as the content source.

## Dependencies

- react
- react-dom
- react-router-dom
- framer-motion
- lucide-react
- pexels
- dotenv
- @types/node
- @types/react-router-dom

## Dev Dependencies

- vite
- @vitejs/plugin-react
- typescript
- tailwindcss
- postcss
- autoprefixer
- eslint
- @eslint/js
- typescript-eslint
- @types/react
- @types/react-dom
- @tailwindcss/forms
- @tailwindcss/typography
- vite-plugin-node-polyfills
- terser
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- globals

## Running the Project

Make sure you have Node.js 18+ and npm installed, then follow these steps:

- Install dependencies:
```bash
npm install
```

- Create environment file with your Pexels API key:
```bash
# Add VITE_PEXELS_API_KEY=your_api_key to .env
```

- Start the development server:
```bash
npm run dev
```

- Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/     # React components
├── pages/          # Page components
├── hooks/          # Custom hooks
├── context/        # React context
└── types/          # TypeScript types
```

## License

This project uses content from Pexels. Please review Pexels' [terms of service](https://www.pexels.com/license/) for usage guidelines.