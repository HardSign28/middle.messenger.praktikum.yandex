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

const pages: Record<string, { name: string; template: string; context?: Record<string, unknown> }> = {
  login: { name: "Логин", template: Pages.LoginPage },
  register: { name: "Регистрация", template: Pages.RegisterPage },
  profile: { name: "Профиль", template: Pages.ProfilePage, context: { img: avatar, cat1 } },
  chat: {
    name: "Чат",
    template: Pages.ChatPage,
    context: {
      cats: [
        { name: "cat-1", avatar: cat1 },
        { name: "cat-2", avatar: cat2, active: true },
        { name: "cat-3", avatar: cat3 },
      ],
      showDialog: false
    }
  },
  list: {
    name: "Список",
    template: Pages.ListPage,
    context: {
      cats: [
        { name: "cat-1", avatar: cat1 },
        { name: "cat-2", avatar: cat2, active: true },
        { name: "cat-3", avatar: cat3 },
      ],
      showDialog: true
    }
  },
  404: { name: "404 Страница не найдена", template: Pages.NotFoundPage },
  500: { name: "500 Ошибка сервера", template: Pages.ServerErrorPage },
  nav: { name: "Навигация", template: Pages.NavigatePage }
};

Object.entries(Components).forEach(([ name, template ]) => {
  Handlebars.registerPartial(name, template);
});

function navigate(page: keyof typeof pages) {
  const { template, context, name } = pages[page];
  const container = document.getElementById("app")!;

  // Добавляем список страниц в контекст, включая их имена
  const fullContext = { ...context, pages, currentPage: name };

  const templatingFunction = Handlebars.compile(template);
  container.innerHTML = templatingFunction(fullContext);
}

document.addEventListener('DOMContentLoaded', () => navigate('chat'));

document.addEventListener('click', e => {
  const target = e.target as HTMLElement | null;

  if (target && target.hasAttribute('page')) {
    const page = target.getAttribute('page') as keyof typeof pages;

    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});



