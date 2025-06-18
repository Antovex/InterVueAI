# InterVueAI

InterVueAI is an AI-powered platform for practicing mock interviews and receiving instant feedback. Built with Next.js, React, TypeScript, and Firebase, it provides a modern, interactive experience for users to prepare for technical interviews.

---

## Features

- **AI-Powered Mock Interviews:** Practice interviews for various roles and tech stacks.
- **Instant Feedback:** Get scores and assessments after each interview (planned).
- **Tech Stack Icons:** Visual representation of technologies involved in each interview.
- **Authentication:** Sign up and sign in with secure forms.
- **Responsive UI:** Styled with Tailwind CSS and custom gradients.
- **Firebase Integration:** User authentication and data storage.

---

## Project Structure

```
ai_interviewer_intervueai/
├── app/                # Next.js app directory (routing, layouts, pages)
├── components/         # React components (UI, forms, interview cards, etc.)
├── constants/          # Static data and mappings
├── firebase/           # Firebase client and admin setup
├── lib/                # Utility functions (e.g., tech icon mapping)
├── public/             # Static assets (images, SVGs, etc.)
├── types/              # TypeScript type definitions
├── .env.local          # Environment variables (not committed)
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.mjs  # PostCSS configuration
├── tsconfig.json       # TypeScript configuration
└── Readme.md           # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Yarn or npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/InterVueAI.git
   cd ai_interviewer_intervueai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in your Firebase credentials and other secrets.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Scripts

- `dev` - Start the development server
- `build` - Build the application for production
- `start` - Start the production server
- `lint` - Run ESLint
- `lint:fix` - Run ESLint and fix issues

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Firebase (Auth, Firestore)
- **UI Components:** shadcn/ui, Radix UI, Lucide Icons
- **Form Validation:** React Hook Form, Zod
- **Notifications:** Sonner

---

## Folder Highlights

- **`components/InterviewCard.tsx`**  
  Displays interview details, tech stack icons, and feedback status.

- **`components/AuthForm.tsx`**  
  Handles user authentication (sign-in/sign-up) with validation.

- **`components/DisplayTechIcons.tsx`**  
  Dynamically fetches and displays tech stack icons.

- **`lib/utils.ts`**  
  Utility functions for class names, tech icon mapping, and random cover selection.

- **`firebase/`**  
  Firebase client and admin initialization.

- **`constants/index.ts`**  
  Static data for interviews, tech mappings, and covers.

---

## Customization

- **Add new interview covers:**  
  Place new images in `public/covers/` and update the `interviewCovers` array in `constants/index.ts`.

- **Add new tech mappings:**  
  Update the `mappings` object in `constants/index.ts` for new technologies.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)