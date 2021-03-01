import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SongDetails from './src/features/SongDetails';
import { registerRootComponent } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import TrackPlayer from 'react-native-track-player';
import Library from './src/features/Library';
import { Platform } from 'react-native';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Library" options={{headerShown:false}} component={Library} />
    </MainStack.Navigator>
  );
};

function RootStackScreen() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none" screenOptions={{
        cardStyle: { opacity: 1 },
        animationEnabled: Platform.OS === 'ios',
      }}>
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="MyModal" component={SongDetails} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}


TrackPlayer.registerPlaybackService(() => require('./service.js'));

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(RootStackScreen);
