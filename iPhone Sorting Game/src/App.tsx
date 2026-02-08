import { SortingGame } from './components/SortingGame';
import { DesktopWrapper } from './components/DesktopWrapper';
import { useIsMobile } from './components/ui/use-mobile';
import backgroundImage from 'figma:asset/1f22bdcb2745e396fc162020210c99932aaea2e9.png';

export default function App() {
  const isMobile = useIsMobile();

  const game = (
    <div
      className="h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <SortingGame />
    </div>
  );

  if (isMobile) {
    return <div className="min-h-screen">{game}</div>;
  }

  return <DesktopWrapper>{game}</DesktopWrapper>;
}
