# Magnetic Cursor Effect

A luxury homepage with smooth magnetic cursor interactions built with Next.js 15, TypeScript, GSAP, and Tailwind CSS.

## Features

- **Magnetic Cursor**: Physics-based cursor that creates smooth attraction to interactive elements
- **Edge Detection**: Special magnetic behavior for card edges
- **Custom Cursor States**: Dynamic cursor transformations (grow, play button)
- **Smooth Animations**: 60fps GSAP-powered animations
- **Responsive Design**: Fully responsive luxury homepage layout
- **TypeScript**: Full type safety and better developer experience

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- GSAP (GreenSock Animation Platform)
- Tailwind CSS
- React Context API

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/             
│   ├── cursor/            # Magnetic cursor components
│   │   ├── MagneticCursor.tsx
│   │   └── MagneticWrapper.tsx
│   ├── BentoGrid.tsx      # Bento grid section
│   ├── CTASection.tsx     # Call-to-action section
│   ├── HeroSection.tsx    # Hero section
│   └── VideoSection.tsx   # Video showcase section
├── contexts/              # React contexts
│   └── CursorContext.tsx
├── hooks/                 # Custom React hooks
│   └── useMagneticCursor.ts
├── lib/                   # Library configurations
│   └── gsap.ts
├── providers/             # App providers
│   └── ClientProviders.tsx
└── utils/                 # Utility functions
    ├── magnetic.ts        # Magnetic physics utilities
    └── mouse.ts           # Mouse position tracking

```

## Key Components

### MagneticCursor
Main cursor component that handles:
- Magnetic physics calculations
- Smooth cursor movement
- Different cursor states (default, hover, play)
- Touch device detection

### MagneticWrapper
Wrapper component for magnetic elements:
- Normal magnetic mode
- Edge-only magnetic mode
- Configurable strength and threshold
- Cursor state management

## Customization

### Magnetic Strength
Adjust the magnetic effect strength in components:

```tsx
<MagneticWrapper strength={0.5} threshold={100}>
  <button>Magnetic Button</button>
</MagneticWrapper>
```

### Edge-Only Mode
For cards and larger elements:

```tsx
<MagneticWrapper 
  edgeOnly={true}
  edgeThreshold={40}
  growCursor={true}
>
  <div>Card Content</div>
</MagneticWrapper>
```

## Build

```bash
npm run build
```

## License

MIT License

Copyright (c) 2024

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