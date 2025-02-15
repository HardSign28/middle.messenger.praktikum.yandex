import Handlebars from 'handlebars';
import avatar from '@/assets/icons/avatar.svg?raw';

Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('defaultAvatar', () => avatar);
