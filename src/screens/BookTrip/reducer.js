export const SET_DATA = "SET_DATA";
export const LOADING_STATE = "LOADING_STATE";
export const SET_TRIP_DATA = "SET_TRIP_DATA";
export const DISPLAY_SUMMURY = "DISPLAY_SUMMURY";
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
    case SET_TRIP_DATA:
      return {
        ...state,
        tripData: payload,
      };
    case DISPLAY_SUMMURY:
      return {
        ...state,
        toogle: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
