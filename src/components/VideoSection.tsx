'use client';

import { useState, useEffect, useRef } from 'react';
import { useCursor } from '@/contexts/CursorContext';

// Extend Window interface to include lastMouseX and lastMouseY
declare global {
  interface Window {
    lastMouseX?: number;
    lastMouseY?: number;
  }
}

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { setCursorState, setCursorText } = useCursor();

  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container || isPlaying) return;

    let isInsideVideo = false;

    const checkCursorPosition = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const isInside = 
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom;
      
      if (isInside && !isInsideVideo) {
        isInsideVideo = true;
        setCursorState('play');
        setCursorText('PLAY');
      } else if (!isInside && isInsideVideo) {
        isInsideVideo = false;
        setCursorState('default');
        setCursorText('');
      }
    };

    const handleScroll = () => {
      const mouseX = window.lastMouseX;
      const mouseY = window.lastMouseY;
      
      if (mouseX && mouseY) {
        checkCursorPosition(new MouseEvent('mousemove', {
          clientX: mouseX,
          clientY: mouseY
        }));
      }
    };

    window.addEventListener('mousemove', checkCursorPosition);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', checkCursorPosition);
      window.removeEventListener('scroll', handleScroll);
      if (isInsideVideo) {
        setCursorState('default');
        setCursorText('');
      }
    };
  }, [isPlaying, setCursorState, setCursorText]);

  return (
    <section className='py-20 md:py-32 px-6 md:px-12 lg:px-20'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl md:text-5xl font-light text-center mb-12'>
          Experience Excellence
        </h2>

        {/* Video Container with play button overlay */}
        <div 
          ref={videoContainerRef}
          className='relative w-full aspect-video bg-gray-900 overflow-hidden'
        >
          {!isPlaying && (
            <div 
              className='absolute inset-0 flex items-center justify-center cursor-pointer z-20'
              onClick={() => setIsPlaying(true)}
            >
              <div className='text-gray-400 hover:text-white transition-colors'>
                <svg
                  className='w-16 h-16'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M8 5v14l11-7z' />
                </svg>
              </div>
            </div>
          )}

          {/* YouTube Embed */}
          <iframe
            src={`https://www.youtube.com/embed/T2QZpy07j4s?si=ev4rUT4Ug1en0H44&rel=0&modestbranding=1${isPlaying ? '&autoplay=1' : ''}`}
            title='Luxury Experience Video'
            className='absolute top-0 left-0 w-full h-full z-10'
            loading='lazy'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
