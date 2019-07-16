import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import InputTypes from '../utils/form/InputTypes';
import Input from '../utils/form/input';
import { InputStateObject } from '../utils/form/InputState';
import ValidationRules from '../utils/form/validation';
import { connect } from 'react-redux';
import { userOperations } from '../../store/user';
import { setTokens } from '../../misc';

const Form = (props) => {
  const [type, setType] = useState('Login');
  const [action, setAction] = useState('Login');
  const [actionMode, setActionMode] = useState('I want to register');
  const [hasErrors, setHasErrors] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [inputs, setInputs] = useState<InputStateObject>({
    email: {
      value: "",
      valid: false,
      type: InputTypes.TextInput,
      rules: {
        isRequired: true,
        isEmail: true,
      },
    },
    password: {
      value: "",
      valid: false,
      type: InputTypes.TextInput,
      rules: {
        isRequired: true,
        minLength: 6,
      },
    },
    confirmPassword: {
      value: "",
      valid: false,
      type: InputTypes.TextInput,
      rules: {
        confirmPass: 'password',
      },
    }
  });

  useEffect(() => {
    manageAccess();
  }, [wasSubmitted]);

  const updateInput = (inputName: string, value: string) => {
    // Validation
    const newInput = inputs[inputName];
    newInput.value = value;
    const valid = ValidationRules(newInput, inputs);
    setInputs({
      ...inputs,
      [inputName]: {
        ...newInput,
        valid,
      }
    });
  };

  const confirmPassword = () => (
    type === 'Register' ?
      <Input
        placeholder="Confirm password"
        placeholderTextColor="#cecece"
        autoCapitalize="none"
        type={inputs.confirmPassword.type}
        value={inputs.confirmPassword.value}
        onChangeText={value => updateInput('confirmPassword', value)}
        secureTextEntry
      />
      : null
  );

  const formHasErrors = () => (
    hasErrors ?
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>Oops, checks your inputs</Text>
      </View>
      : null
  );

  const manageAccess = () => {
    if (!wasSubmitted) {
      return;
    }
    if (!props.User.localId) {
      setWasSubmitted(false);
      return setHasErrors(true);
    }
    setTokens(props.User, () => {
      setHasErrors(false);
      props.goNext();
    });
  };

  const submitUser = async () => {
    let isFormValid = true;
    const formToSubmit: any = {};
    for (const key in inputs) {

      // Not confirm password in login
      if (type === 'Login' && key === 'confirmPassword') {
        continue;
      }
      isFormValid = isFormValid && inputs[key].valid;

      if (!isFormValid) {
        break;
      }

      formToSubmit[key] = inputs[key].value;
    }
    if(!isFormValid) {
      setHasErrors(true);
      return;
    }
    setHasErrors(false);

    if (type === 'Login') {
      await props.signIn(inputs['email'].value, inputs['password'].value);
      setWasSubmitted(true);
      return;
    }

    await props.signUp(inputs['email'].value, inputs['password'].value);
    setWasSubmitted(true);
  };

  // Toggle between login and register
  const changeFormType = () => {
    setType(type === 'Login' ? 'Register' : 'Login');
    setAction(action === 'Login' ? 'Register' : 'Login');
    setActionMode(type === 'Login' ? 'I want to login' : 'I want to register')
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.form}>
        <Input
          placeholder="Enter email"
          placeholderTextColor="#cecece"
          autoCapitalize="none"
          type={inputs.email.type}
          value={inputs.email.value}
          keyboardType={"email-address"}
          onChangeText={value => updateInput('email', value)}
        />
        <Input
          placeholder="Enter password"
          placeholderTextColor="#cecece"
          autoCapitalize="none"
          type={inputs.password.type}
          value={inputs.password.value}
          onChangeText={value => updateInput('password', value)}
          secureTextEntry
        />

        {confirmPassword()}
        {formHasErrors()}
      </View>
      <View style={styles.button}>
        <Button
          title={type}
          onPress={() => submitUser()}
        />
      </View>
      <View style={styles.button}>
        <Button
          title={actionMode}
          onPress={() => changeFormType()}
        />
      </View>
      <View style={styles.button}>
        <Button
          title={"I'll do it later"}
          onPress={() => props.goNext()}
        />
      </View>
    </View>
  );
};

// STYLES
const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  form: {
    marginBottom: 15,
    width: '100%'
  },
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f44336',
  },
  errorLabel: {
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  button: {
    ...Platform.select({
      ios: {
        marginTop: 0,
      },
      android: {
        marginTop: 10,
      },
    }),
    width: '100%',
  },
});

const mapStateToProps = (state: any) => ({
  User: state.userStore.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  signIn: (email: string, password: string) => dispatch(userOperations.signIn(email, password)),
  signUp: (email: string, password: string) => dispatch(userOperations.signUp(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
