import React from "react";
import renderer from "react-test-renderer";
import store from "../src/store/store";
import { Provider, useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import App from "../App";
import RootNavigation from "../src/navigation/rootNavigation";
import "react-native-gesture-handler/jestSetup";
import { NavigationContainer } from "@react-navigation/native";

afterEach(cleanup);

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

// jest.mock('react-navigation', () => ({
//     withNavigation: (Component: any) => (props:any) => (
//       <Component navigation={{ navigate: jest.fn() }} {...props} />
//     ),
//     SafeAreaView: ({ children }:any) => <>{children}</>,
//   }));
describe("<App />", () => {
  // configureStore expects a list of middlewares
  const initialState = {
    isLoading: false,
    station: [
      {
        station: "nantes",
      },
      {
        station: "rennes",
      },
    ],
    error: "error",
  };
  const mockStore = configureStore([]);
  it("should render", async () => {
    const storeMock = mockStore({ station: ["fake", "fake2"] });
    // const apppTest = render(
    //   <Provider store={storeMock}>
    //     <NavigationContainer>
    //       <RootNavigation />
    //     </NavigationContainer>
    //   </Provider>
    // );
    // const tree = getByTestId('test')
    await expect(
      renderer.create(
        <Provider store={storeMock}>
          <App />
        </Provider>
      )
    ).toMatchSnapshot();
  });

  // it('should dispatch increment action', () => {
  //   const store = mockStore({count: 5});
  //   const rendered = render(
  //     <Provider store={store}><Counter /></Provider>
  //   );
  //   const buttonComponent = rendered.getByTestId('button');

  //   fireEvent(buttonComponent, 'press');

  //   // This will return all actions dispatched on this store
  //   const actions = store.getActions();
  //   expect(actions.length).toBe(1);
  //   expect(actions[0].type).toEqual('INCREMENT');
  // });
});
// describe("<App />", () => {
//   const dispatch = jest.fn();
//   store.dispatch = dispatch;
//   const fetchData = jest.fn();

//   beforeEach(() => {
//     render(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     );
//   });
//   it("has 1 child", () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree).toBe(1);
//   });
// });
