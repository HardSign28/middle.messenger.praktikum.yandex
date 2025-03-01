import Block from '@/core/block';

export default class Button extends Block {
  constructor(props) {
    super('button', {
      ...props,
      className: [
        'button',
        props.class,
        props.type ? `button__${props.type}` : '',
        props.size ? `button_${props.size}` : '',
      ]
          .filter(Boolean)
          .join(' '),
      events: {
        click: props.onClick,
      },
    });
  }
  public render(): string {
    return `
      {{label}}
    `;
  }
}
