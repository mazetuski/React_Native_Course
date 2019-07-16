import * as types from "./types";

const initialState = {
  user: {},
};

interface Action {
  type: string
  payload: any
}

const reducers = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.SIGN_IN:
    case types.SIGN_UP:
      return { ...state, user: action.payload };
    case types.AUTO_SIGN_IN:
      return {
        ...state, user: {
          idToken: action.payload.id_token,
          localId: action.payload.user_id,
          refreshToken: action.payload.refresh_token,
          expiresIn: action.payload.expires_in,
          kind: action.payload.kind,
        }
      };
    default:
      return state;
  }
};

export default reducers;
