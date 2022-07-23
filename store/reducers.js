import { ACTIONS } from "./actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case ACTIONS.AUTH:
      return {
        ...state,
        user: action.payload,
      };
    // case ACTIONS.GLOBAL_LOADING:
    //   return {
    //     ...state,
    //     globalLoading: action.payload,
    //   };
    case ACTIONS.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIONS.SIDEPANEL:
      return {
        ...state,
        sidepanel: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
