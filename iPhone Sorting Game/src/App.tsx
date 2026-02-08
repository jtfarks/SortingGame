import { useState, useEffect } from 'react';
import { SortingGame } from './components/SortingGame';
import { DesktopWrapper } from './components/DesktopWrapper';
import { useIsMobile } from './components/ui/use-mobile';
import backgroundImage from 'figma:asset/1f22bdcb2745e396fc162020210c99932aaea2e9.png';

const GAME_W = 393;
const GAME_H = 852;

function ScaledGame() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const sw = window.innerWidth / GAME_W;
      const sh = window.innerHeight / GAME_H;
      setScale(Math.min(sw, sh));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="h-[100dvh] w-full flex items-center justify-center bg-black overflow-hidden">
      <div style={{ width: GAME_W * scale, height: GAME_H * scale }}>
        <div
          style={{
            width: GAME_W,
            height: GAME_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <div
            className="h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <SortingGame />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <ScaledGame />;
  }

  return (
    <DesktopWrapper>
      <div
        className="h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <SortingGame />
      </div>
    </DesktopWrapper>
  );
}
