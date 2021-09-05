// import React from "react";
// import { render } from '@testing-library/react-native'
// import MapScreen from "../src/screens/mapScreen";
// import configureStore from 'react-redux';
// import store from '../src/store/store'
// import * as ActionStation from '../src/store/stations/actionStation'
// import Provider from 'react-redux'
// import SafeAreaView from 'react-native'
// import 'react-native-gesture-handler/jestSetup';

// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');
  
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');


// jest.mock('react-navigation', () => ({
//     withNavigation: (Component: any) => (props:any) => (
//       <Component navigation={{ navigate: jest.fn() }} {...props} />
//     ),
//     SafeAreaView: ({ children }:any) => <>{children}</>,
//   }));

// describe('MapScreen', () => {
  
//   const dispatch = jest.fn();
//   store.dispatch = dispatch; 
//   const fetchData = jest.fn();
  
//   describe('render', () => {
//       beforeEach(() => {
//           jest.spyOn(ActionStation, 'callApiStation' );
//           render(
//             <Provider store={store}>
//                 <MapScreen />
//             </Provider>
//           )
//       })
//   })
// });
