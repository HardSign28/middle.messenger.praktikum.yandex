import {ChatSearch, ListContacts} from '@/components';
import Block from '@/core/block';
import chatImg1 from '@/assets/01.webp';
import chatImg2 from '@/assets/02.webp';
import chatImg3 from '@/assets/03.webp';
import chatImg4 from '@/assets/04.webp';
import chatImg5 from '@/assets/05.webp';
import chatImg6 from '@/assets/06.webp';
import chatImg7 from '@/assets/07.webp';
import chatImg8 from '@/assets/08.webp';
import chatImg9 from '@/assets/09.webp';

export default class ChatPage extends Block {
	constructor(props) {
		super('main', {
			...props,
			formState: {
				login: '',
				password: '',
			},
			errors: {
				login: '',
				password: '',
			},
			className: 'page-chat',
			ChatSearch: new ChatSearch({
				label: 'Зарегистрироваться',
				type: 'outline-primary',
			}),
			ListContacts: new ListContacts({
				contacts: [
					{
						name: 'Андрей',
						avatar: chatImg1,
						date: '10:49',
						unread: 2,
						text: 'изображение',
					},
					{
						name: 'Киноклуб',
						avatar: chatImg2,
						date: '12:00',
						you: true,
						text: 'стикер',
					},
					{
						name: 'Илья',
						avatar: chatImg3,
						date: '15:12',
						unread: 4,
						text: 'В своём стремлении улучшить пользовательский опыт мы упускаем, что представители современных социальных резервов являются только методом политического участия и объективно рассмотрены соответствующими инстанциями.',
					},
					{
						name: 'Вадим',
						avatar: chatImg4,
						date: 'Пт',
						you: true,
						active: true,
						text: 'Предварительные выводы неутешительны: семантический разбор внешних противодействий говорит',
					},
					{
						name: 'тет-а-теты',
						avatar: chatImg5,
						date: 'Ср',
						text: 'И Human Interface Guidelines и Material Design рекомендуют...',
					},
					{
						name: '1, 2, 3',
						avatar: chatImg6,
						date: 'Пн',
						text: 'Миллионы россиян ежедневно проводят десятки часов свое...',
					},
					{
						name: 'Design Destroyer',
						avatar: chatImg7,
						date: 'Пн',
						text: 'В 2008 году художник Jon Rafman начал собирать...',
					},
					{
						name: 'Day.',
						avatar: chatImg8,
						date: '1 Мая 2020',
						text: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
					},
					{
						name: 'Стас Рогозин',
						avatar: chatImg9,
						date: '12 Апр 2020',
						text: 'Можно или сегодня или завтра вечером.',
					},
				],
			}),
		});
	}

	public render(): string {
		return `
		<section class="chat">
			<aside class="chat__list">
				{{{ ChatSearch }}}
				{{{ ListContacts }}}
			</aside>
			<section class="chat__content {{#if chatGroups }}chat__content_bg{{/if }}">
				{{#if chatGroups }}
				{{> ChatHeader }}
			<section class="chat__messages">
			<time class="chat__messages-date">
				{{ conversationDate }}
			</time>
				{{> ChatMessages }}
			</section>
				{{> ChatFooter }}
				{{ else }}
			<div class="chat__content-empty">Выберите чат чтобы отправить сообщение</div>
				{{/if}}
			</section>
		</section>
		{{#if (eq showDialog "remove") }}
		{{> DialogRemove userName="Вадим" }}
		{{/if}}
		{{#if (eq showDialog "add") }}
		{{> DialogAdd }}
		{{/if}}
    	`;
	}
}
