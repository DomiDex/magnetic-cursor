import HeroSection from '@/components/HeroSection';
import BentoGrid from '@/components/BentoGrid';
import VideoSection from '@/components/VideoSection';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main className="bg-black text-white">
      <HeroSection />
      <BentoGrid />
      <VideoSection />
      <CTASection />
    </main>
  );
}
