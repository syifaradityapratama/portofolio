'use client';
import { usePathname } from 'next/navigation';

export default function NoiseOverlay() {
  const pathname = usePathname();
  
  // 🔥 KILL SWITCH FOR STUDIO
  if (pathname?.startsWith('/studio')) return null;

  return <div className="noise-overlay" />;
}
