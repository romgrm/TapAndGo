/**
 * Typing of station data received
 */
interface Station {
  number: number;
  contractName: string;
  address: string;
  position: {
    latitude: number;
    longitude: number;
  };
  banking: boolean;
  status: string;
  totalStands: {
    availabilities: {
      bikes: number;
      stands: number;
      mechanicalBikes: number;
      electricalBikes: number;
      electricalInternalBatteryBikes: number;
      electricalRemovableBatteryBikes: number;
    };
    capacity: number;
  };
  mainStands: {
    availabilities: {
      bikes: number;
      stands: number;
      mechanicalBikes: number;
      electricalBikes: number;
      electricalInternalBatteryBikes: number;
      electricalRemovableBatteryBikes: number;
    };
    capacity: number;
  };
}

/**
 * Typing of global state
 */
type StationState = {
  isLoading: boolean;
  stations: Station[];
  error: string;
};

/**
 * Typing of action for global state
 */
type StationAction = {
  type: string;
  payload?: Station | Error;
};

type DispatchType = (args: StationAction) => StationAction;

/**
 * Typing for our screens with react-navigation route params
 */
type RootNavigationParamsList = {
  MapScreen: Station;
  InfosScreen: Station;
};
