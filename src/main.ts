import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import './style.scss';

import cat1 from './assets/01.jpg'
import cat2 from './assets/02.jpg'
import cat3 from './assets/03.jpg'
import avatar from './assets/icons/avatar.svg?raw';

Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('defaultAvatar', () => avatar);
const pages: Record<string, [string, Record<string, unknown>?]> = {
  login: [Pages.LoginPage],
  register: [Pages.RegisterPage],
  profile: [Pages.ProfilePage, { img: avatar, cat1 }],
  list: [Pages.ListPage, {
    cats: [
      { name: 'cat-1', avatar: cat1 },
      { name: 'cat-2', avatar: cat2, active: true },
      { name: 'cat-3', avatar: cat3 },
    ],
    showDialog: true
  }],
  404: [Pages.NotFoundPage],
  500: [Pages.ServerErrorPage],
  nav: [Pages.NavigatePage]
};

Object.entries(Components).forEach(([ name, template ]) => {
  Handlebars.registerPartial(name, template);
});

function navigate(page: keyof typeof pages) {

  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;

  // Добавляем список страниц в контекст
  const fullContext = { ...context, pages };

  const templatingFunction = Handlebars.compile(source);
  container.innerHTML = templatingFunction(fullContext);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  const target = e.target as HTMLElement | null;

  if (target && target.hasAttribute('page')) {
    const page = target.getAttribute('page') as keyof typeof pages;

    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});



