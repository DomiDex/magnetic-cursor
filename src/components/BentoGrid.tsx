'use client';

import Image from 'next/image';
import MagneticWrapper from '@/components/cursor/MagneticWrapper';

export default function BentoGrid() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop",
      alt: "Featured luxury landscape",
      className: "relative md:row-span-2 h-[400px] md:h-[600px]",
      strength: 0.05, // Even more subtle for large image
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop",
      alt: "Scenic mountain view",
      className: "relative h-[300px] md:h-[290px]",
      strength: 0.04, // Very subtle for smaller images
    },
    {
      src: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&h=400&fit=crop",
      alt: "Minimalist architecture",
      className: "relative h-[300px] md:h-[290px]",
      strength: 0.04, // Very subtle for smaller images
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {images.map((image, index) => (
            <MagneticWrapper 
              key={index}
              strength={image.strength} 
              edgeOnly={true}
              edgeThreshold={40}
              className={image.className}
              growCursor={true}
            >
              <div 
                className="relative w-full h-full overflow-hidden group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </MagneticWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}