import {Container} from '~/components';

import {Schema} from './PieroSection.schema';
import type {PieroSectionProps} from './PieroSection.types';

export function PieroSection({cms}: {cms: PieroSectionProps}) {
  return (
    <Container container={cms.container}>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius,
        blanditiis?
      </p>
    </Container>
  );
}

PieroSection.displayName = 'PieroSection';
PieroSection.Schema = Schema;
