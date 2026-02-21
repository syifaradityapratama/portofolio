'use client';
import { usePathname } from 'next/navigation';
import { LazyMotion, domAnimation } from 'framer-motion';
import SmoothScroll from './ui/SmoothScroll';
// import CustomCursor from './ui/CustomCursor';
import NoiseOverlay from './ui/NoiseOverlay';

export default function GodModeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  // If Studio, render RAW children (No effects, standard cursor)
  if (isStudio) {
    return <>{children}</>;
  }

  // If Website, render GOD MODE (LazyMotion, Lenis, Noise, Custom Cursor)
  return (
    <LazyMotion features={domAnimation}>
      <SmoothScroll>
        <NoiseOverlay />
        {children}
      </SmoothScroll>
    </LazyMotion>
  );
}
