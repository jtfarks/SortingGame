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
      <h1
        className="text-4xl mb-2 text-[#5c3d2e]"
        style={{ fontFamily: "'Architects Daughter', cursive" }}
      >
        Anya Cafe
      </h1>
      <p className="text-sm text-[#8b6f5e] mb-6">Sort the treats before time runs out!</p>
      <PhoneFrame>
        {children}
      </PhoneFrame>
    </div>
  );
}
