import { SortingGame } from './components/SortingGame';
import backgroundImage from 'figma:asset/1f22bdcb2745e396fc162020210c99932aaea2e9.png';

export default function App() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <SortingGame />
    </div>
  );
}