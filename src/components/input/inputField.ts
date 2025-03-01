import Block from '@/core/block';
import Input from './input';

type InputFieldProps = {
  label: string;
  class?: string;
  error?: string;
  readonly?: boolean;
  onChange?: () => void;
  onBlur?: () => void;
  id?: string;
  type?: string;
};
export default class InputField extends Block {
  constructor(props: InputFieldProps) {
    super('div', {
      ...props,
      Input: new Input({
        ...props,
        className: 'float-input__element',
        // id: props.id,
        events: {
          blur: props.onChange,
        },
      }),
    });
  }

  getClassName(): string {
    return [
      'float-input',
      this.props.class,
      this.props.readonly ? 'float-input_readonly' : '',
      this.props.error ? 'float-input_error' : '',
    ]
        .filter(Boolean)
        .join(' ');
  }

  public render(): string {
    this.element.className = this.getClassName();
    return `
        {{{ Input }}}
        <label class="float-input__label" for="{{ id }}">{{ label }}</label>
        <div class="float-input__error">{{ error }}</div>
    `;
  }
}
