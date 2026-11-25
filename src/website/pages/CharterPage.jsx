import About from '../home/about/About.jsx';
import { CharterExtras } from '../components/StandaloneExtras.jsx';
export default function CharterPage({ embedded = false }) {
  return (
    <>
      <About embedded={embedded} />
      {!embedded && <CharterExtras />}
    </>
  );
}
