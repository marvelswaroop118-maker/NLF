import { StructureExtras } from '../components/StandaloneExtras.jsx';
import Structure from '../home/structure/Structure.jsx';

export default function StructurePage({ embedded = false }) {
  return (
    <>
      <Structure embedded={embedded} />
      {!embedded && <StructureExtras />}
    </>
  );
}
