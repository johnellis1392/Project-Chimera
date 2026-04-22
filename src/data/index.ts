export { realm1 } from './realm1';
export { realm2 } from './realm2';
export { realm3 } from './realm3';
export { realm4 } from './realm4';
export { realm5 } from './realm5';
export { realm6 } from './realm6';
export { realm7 } from './realm7';
export { realm8 } from './realm8';

import type { Realm } from '../types';

export async function loadRealms(): Promise<Realm[]> {
  const [r1, r2, r3, r4, r5, r6, r7, r8] = await Promise.all([
    import('./realm1'),
    import('./realm2'),
    import('./realm3'),
    import('./realm4'),
    import('./realm5'),
    import('./realm6'),
    import('./realm7'),
    import('./realm8'),
  ]);
  return [r1.realm1, r2.realm2, r3.realm3, r4.realm4, r5.realm5, r6.realm6, r7.realm7, r8.realm8];
}
