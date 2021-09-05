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

type StationState = {
  isLoading: boolean;
  stations: Station[];
  error: string;
};

type StationAction = {
  type: string;
  payload?: Station | Error;
};

type DispatchType = (args: StationAction) => StationAction;

type RootNavigationParamsList = {
  MapScreen : Station;
  InfosScreen: Station; 
}