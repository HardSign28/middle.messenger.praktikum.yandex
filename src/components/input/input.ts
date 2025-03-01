import Block from '@/core/block';

type InputProps = {
  label?: string;
  className?: string,
  onChange?: () => void;
  onBlur?: () => void;
  events?: object,
  type?: string;
  id?: string;
};
export default class Input extends Block {
  constructor(props: InputProps) {
    super('input', {
      ...props,
      attrs: {
        placeholder: '',
        ...(props.id ? { id: props.id } : {}),
        ...(props.type ? { type: props.type } : {}),
      },
    });
  }
}
