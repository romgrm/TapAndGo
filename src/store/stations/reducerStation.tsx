import { STATION_LOADING, STATION_SUCCESS, STATION_ERROR } from "./typeStation";

/**
 * The state will change because of differents actions (it's loading ? success ? error? )
 */

const initialStateStation: StationState = {
  isLoading: false,
  stations: [],
  error: "",
};

/**
 * The reducer returns a modified state according to the actions
 */

const stationReducer = (
  state = initialStateStation,
  action: StationAction
): StationState => {
  switch (action.type) {
    case STATION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case STATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stations: action.payload,
      };
    case STATION_ERROR:
      return {
        ...state,
        isLoading: false,
        stations: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default stationReducer;
