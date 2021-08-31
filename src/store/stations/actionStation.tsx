import * as typeStation from "./typeStation";
import axios from "axios";
import { Environments } from "../../config/environment";
/**
 * Differents actions
 * @returns
 */

const returnApiLoading = () => {
  return {
    type: typeStation.STATION_LOADING,
  };
};

const returnApiSuccess = (stations: Station) => {
  return {
    type: typeStation.STATION_SUCCESS,
    payload: stations,
  };
};

const returnApiError = (error: StationAction) => {
  return {
    type: typeStation.STATION_ERROR,
    payload: error.payload,
  };
};

export const callApiStation = () => {
  return (dispatch: DispatchType) => {
    dispatch(returnApiLoading());
    axios
      .get<Station>(Environments.development.STATIONS, {
        params: {
          timeout: 1000, 
          apiKey: Environments.development.API_KEY,
          _limit: 10
        },
      })
      .then((res) => {
        dispatch(returnApiSuccess(res.data));
      })
      .catch((err: StationAction) => {
        dispatch(returnApiError(err));
      });
  };
};
