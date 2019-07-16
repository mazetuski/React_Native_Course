import axios from 'axios';
import * as types from './types';
import {
  FIREBASE_SIGN_UP_URL,
  FIREBASE_SIGN_IN_URL,
  FIREBASE_REFRESH_URL,
} from '../../misc';

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios({
      method: 'POST',
      url: FIREBASE_SIGN_IN_URL,
      data: {
        email,
        password,
        returnSecureToken: true,
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return {
      type: types.SIGN_IN,
      payload: response.data
    }
  } catch (e) {
    return {
      type: types.SIGN_IN_ERROR,
    }
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const response = await axios({
      method: 'POST',
      url: FIREBASE_SIGN_UP_URL,
      data: {
        email,
        password,
        returnSecureToken: true,
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return {
      type: types.SIGN_UP,
      payload: response.data
    }
  } catch (e) {
    return {
      type: types.SIGN_UP_ERROR,
    }
  }
};

export const autoSignIn = async (refreshToken: string) => {
  try {
    const response = await axios({
      method: 'POST',
      url: FIREBASE_REFRESH_URL,
      data: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    return {
      type: types.AUTO_SIGN_IN,
      payload: response.data
    }
  } catch (e) {
    return {
      type: types.SIGN_UP_ERROR,
    }
  }
};

