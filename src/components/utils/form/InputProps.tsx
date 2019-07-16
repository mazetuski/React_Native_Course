import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps{
  type: string
  overrideStyle?: string
}

export default InputProps;
