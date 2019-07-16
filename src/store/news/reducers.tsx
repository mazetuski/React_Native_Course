import * as types from "./types";

const initialState = {
  articles: [],
};

interface Action {
  type: string
  payload: any
}

const reducers = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.GET_NEWS:
      return {...state, articles: action.payload};
    default:
      return state;
  }
};

export default reducers;
