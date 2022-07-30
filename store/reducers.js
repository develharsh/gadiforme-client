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
    case ACTIONS.SIDEPANEL:
      return {
        ...state,
        sidepanel: action.payload,
      };
    case ACTIONS.LOGIN_MODAL:
      return {
        ...state,
        loginModal: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
