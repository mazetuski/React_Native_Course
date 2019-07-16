import { InputState, InputStateObject } from './InputState';

/**
 * Function for validate if one string is not empty
 * @param value
 */
const validateRequired = (value: string) => {
  return value !== '';
};

/**
 * Function for validate a string is a valid email
 * @param value
 */
const validateEmail = (value: string) => {
  const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return expression.test(value.toLowerCase());
};

/**
 * Function for validate that a string have a min length
 * @param value
 * @param limit
 */
const validateMinLength = (value: string, limit: number = 1) => {
  return value.length >= limit;
};

/**
 * Function for validate that a twi string are equals
 * @param password
 * @param confirmPassword
 */
const validateConfirmPass = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

/**
 * Function for validate all rules inside InputState
 * @param input
 * @param form
 */
const validation = (input: InputState, form: InputStateObject) => {
  let valid = true;
  for(const rule in input.rules) {
    switch (rule) {
      case "isRequired":
        valid = valid && validateRequired(input.value);
        break;
      case "isEmail":
        valid = validateEmail(input.value);
        break;
      case "minLength":
        valid = validateMinLength(input.value, input.rules[rule]);
        break;
      case "confirmPass":
        const confirmPassword = input.rules[rule];
        if (!confirmPassword) {
          break;
        }
        valid = validateConfirmPass(input.value, form[confirmPassword].value);
        break;
    }
  }
  return valid;
};

export default validation;
