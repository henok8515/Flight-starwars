export const SET_DATA = "SET_DATA";
export const LOADING_STATE = "LOADING_STATE";

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DATA:
      return {
        ...state,
        data: payload,
        loadingState: "success",
      };
    case LOADING_STATE:
      return {
        ...state,
        loadingState: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
