import Block from '@/core/block';

type InputProps = {
  label?: string;
  className?: string,
  onChange?: () => void;
  onBlur?: () => void;
  events?: object,
};
export default class Input extends Block {
  constructor(props: InputProps) {
    super('input', {
      ...props,
      attrs: {
        placeholder: '',
      },
    });
  }
}
