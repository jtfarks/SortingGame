import { ReactNode } from 'react';
import { PhoneFrame } from './PhoneFrame';
import mapBg from '../assets/map.jpeg';

interface DesktopWrapperProps {
  children: ReactNode;
}

export function DesktopWrapper({ children }: DesktopWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${mapBg})`,
      }}
    >
      <div className="bg-white/75 rounded-2xl px-8 py-4 mb-6 text-center">
        <h1
          className="text-4xl mb-1 text-[#5c3d2e]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Anya's Bits and Bobs
        </h1>
        <p className="text-sm text-[#8b6f5e]">iPhone Mock-Up</p>
      </div>
      <PhoneFrame>
        {children}
      </PhoneFrame>
    </div>
  );
}
