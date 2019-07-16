import * as types from "./types";

const initialState = {
  games: [],
};

interface Action {
  type: string
  payload: any
}

const reducers = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.GET_GAMES:
      return {...state, games: action.payload};
    default:
      return state;
  }
};

export default reducers;
