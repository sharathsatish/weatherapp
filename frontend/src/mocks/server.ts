import { setupServer } from '@mswjs/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers); 