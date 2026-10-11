import { drawings, sports } from '../data/site';
import Stack3D from './Stack3D';

/** "Beyond studies & developing": Drawing and Sports, each its own vertical 3D card flow. */
export default function Beyond() {
  return (
    <>
      <Stack3D
        id="drawing"
        label="Beyond studies & developing"
        title="Drawing"
        description="Pencil sketches and colour work: a creative break from code."
        items={drawings}
      />
      <Stack3D
        id="sports"
        label="Beyond studies & developing"
        title="Sports"
        description="Boxing and team sports taught me discipline, consistency and focus."
        items={sports}
        landscape
      />
    </>
  );
}
