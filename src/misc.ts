import Config from "react-native-config/index";
import { AsyncStorage } from "react-native";

export const FIREBASE_SIGN_UP_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${Config.API_KEY}`;
export const FIREBASE_SIGN_IN_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${Config.API_KEY}`;
export const FIREBASE_REFRESH_URL = `https://securetoken.googleapis.com/v1/token?key=${Config.API_KEY}`;
export const FIREBASE_URL = Config.FIREBASE_URL;

export const setTokens = async (values, cb) => {

  await AsyncStorage.multiSet([
    ['@nba_app@token', values.idToken],
    ['@nba_app@refreshToken', values.refreshToken],
    ['@nba_app@expiresIn', values.expiresIn],
    ['@nba_app@uid', values.localId],
  ]);

  return cb();
};

export const getTokens = async (cb) => {
  const tokens = await AsyncStorage.multiGet([
    '@nba_app@token',
    '@nba_app@refreshToken',
    '@nba_app@expiresIn',
    '@nba_app@uid',
  ]);
  return cb(tokens);
};

export const convertFirebase = (data) => {
  const dataFormatted = [];
  for (const key in data) {
    dataFormatted.push({
      ...data[key],
      id: key,
    })
  }
  return dataFormatted;
};

export const findTeamData = (teamId, teams) => {
  return teams.find((team) => {
    return team.id === teamId;
  });

};
