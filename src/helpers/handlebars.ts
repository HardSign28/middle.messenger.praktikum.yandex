import Handlebars from 'handlebars';
// eslint-disable-next-line import/no-unresolved
import avatar from '@/assets/icons/avatar.svg?raw';

Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('defaultAvatar', () => avatar);
