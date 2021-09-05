import React from "react";
import renderer from "react-test-renderer";
import store from "../src/store/store";
import {Provider} from "react-redux";
import { render } from "@testing-library/react-native";
import App from "../App";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

// jest.mock('react-navigation', () => ({
//     withNavigation: (Component: any) => (props:any) => (
//       <Component navigation={{ navigate: jest.fn() }} {...props} />
//     ),
//     SafeAreaView: ({ children }:any) => <>{children}</>,
//   }));

describe("<App />", () => {
  const dispatch = jest.fn();
  store.dispatch = dispatch;
  const fetchData = jest.fn();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  it("has 1 child", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toBe(1);
  });
});
