import { ReactNode, useState, useEffect, useRef } from 'react';

const PHONE_W = 393;
const PHONE_H = 852;

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const maxH = Math.min(window.innerHeight * 0.9, PHONE_H);
      setScale(maxH / PHONE_H);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: PHONE_W * scale,
        height: PHONE_H * scale,
      }}
    >
      <div
        className="relative"
        style={{
          width: PHONE_W,
          height: PHONE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {/* Phone body */}
        <div
          className="absolute inset-0 bg-black"
          style={{ borderRadius: 55 }}
        />

        {/* Side buttons - left (volume) */}
        <div
          className="absolute bg-[#2a2a2a]"
          style={{ left: -2, top: 160, width: 3, height: 30, borderRadius: 2 }}
        />
        <div
          className="absolute bg-[#2a2a2a]"
          style={{ left: -2, top: 200, width: 3, height: 50, borderRadius: 2 }}
        />
        <div
          className="absolute bg-[#2a2a2a]"
          style={{ left: -2, top: 260, width: 3, height: 50, borderRadius: 2 }}
        />

        {/* Side button - right (power) */}
        <div
          className="absolute bg-[#2a2a2a]"
          style={{ right: -2, top: 210, width: 3, height: 70, borderRadius: 2 }}
        />

        {/* Screen area (bezel inset) */}
        <div
          className="absolute overflow-hidden bg-white"
          style={{
            top: 3,
            left: 3,
            right: 3,
            bottom: 3,
            borderRadius: 52,
          }}
        >
          {/* Game content */}
          <div className="h-full w-full relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
