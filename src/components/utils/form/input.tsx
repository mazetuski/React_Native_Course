import React from 'react';
import { StyleSheet, TextInput } from "react-native";
import InputTypes from './InputTypes';
import InputProps from './InputProps';

const InputComponent = (props: InputProps) => {
  let template = null;

  const textTemplate = () => (
    <TextInput
      {...props}
      style={[styles.input, props.overrideStyle]}
    />
  );

  switch (props.type) {
    case InputTypes.TextInput:
      template = textTemplate();
  }
  return template;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    fontSize: 16,
    padding: 5,
    marginTop: 10,
    color: '#eaeaea',
  },
});

export default InputComponent;
