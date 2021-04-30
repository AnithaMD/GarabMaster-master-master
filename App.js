import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import ResetPassword from './components/ChangePassword';
import Home from './Screens/Home';
import Otp from './Screens/OtpScreen';

// import HomeScreen from './Screens/Home';
import Favbrand from './Screens/FavoriteBrands';
import Details from './Screens/Details';
import Global from './Screens/GlobalReport';
import profile from './Screens/Profile';
import QrCode from './Screens/OrCodeScreen';

import changepassword from './components/ChangePassword';
import EditProfile from './components/EditProfile';

import HomeCard3 from './components/HomeCard3';
import Items from './MoreItems/MapAnimatedClick';
import Notifications from './NotificationScreen/NotificationUi';

import Category from './components/Category';

import ViewAllItems from './MoreItems/Scolllist';

const StackHome = createStackNavigator();

function HomeStack({navigation, route}) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <StackHome.Navigator>
      <StackHome.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <StackHome.Screen name="My Favourite Projects" component={HomeCard3} />
      <StackHome.Screen
        name="CardItem"
        component={Items}
        options={{headerShown: false}}
      />

      <StackHome.Screen
        name="ViewAllItems"
        component={ViewAllItems}
        options={{headerShown: false}}
      />
      <StackHome.Screen name="Notifications" component={Notifications} />
      <StackHome.Screen name="Category" component={Category} />
    </StackHome.Navigator>
  );
}
const StackRBSheet = createStackNavigator();

const StackFavBrand = createStackNavigator();

function FavBrandStack({navigation, route}) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <StackFavBrand.Navigator>
      <StackFavBrand.Screen
        name="FavBrand"
        component={Favbrand}
        options={{headerShown: false}}
      />
      <StackFavBrand.Screen name="Notifications" component={Notifications} />
    </StackFavBrand.Navigator>
  );
}

const StackDetails = createStackNavigator();

function DetailsStack({navigation, route}) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <StackDetails.Navigator>
      <StackDetails.Screen
        name="Details"
        component={Details}
        options={{headerShown: false}}
      />
      <StackDetails.Screen name="Notifications" component={Notifications} />
    </StackDetails.Navigator>
  );
}

const StackGlobal = createStackNavigator();

function GlobalStack({navigation, route}) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <StackGlobal.Navigator>
      <StackGlobal.Screen
        name="Global"
        component={Global}
        options={{headerShown: false}}
      />
      <StackGlobal.Screen name="Notifications" component={Notifications} />
    </StackGlobal.Navigator>
  );
}
const StackProfile = createStackNavigator();

function ProfileStack({navigation, route}) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <StackProfile.Navigator initialRouteName="Profile">
      <StackProfile.Screen
        name="Profile"
        options={{headerShown: false}}
        component={profile}
      />
      <StackProfile.Screen name="EditProfile" component={EditProfile} />
      <StackProfile.Screen
        name="ChangeNewPassword"
        component={changepassword}
      />
      <StackGlobal.Screen name="Notifications" component={Notifications} />
    </StackProfile.Navigator>
  );
}

const StackQrCode = createStackNavigator();

function QrCodeStack({navigation, route}) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <StackQrCode.Navigator>
      <StackQrCode.Screen
        name="QrCode"
        component={QrCode}
        options={{headerShown: false}}
      />
      <StackQrCode.Screen name="Notifications" component={Notifications} />
    </StackQrCode.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={() => ({
          tabBarIcon: ({black}) => (
            <View>
              <FontAwesome style={[{color: '#000'}]} size={25} name={'home'} />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Favbrand"
        component={FavBrandStack}
        options={() => ({
          tabBarIcon: ({tintColor}) => (
            <View>
              <FontAwesome style={[{color: '#000'}]} size={23} name={'heart'} />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Details"
        component={DetailsStack}
        options={() => ({
          tabBarIcon: ({tintColor}) => (
            <View>
              <FontAwesome
                style={[{color: '#000'}]}
                size={25}
                name={'exchange'}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Global"
        component={GlobalStack}
        options={() => ({
          tabBarIcon: ({tintColor}) => (
            <View>
              <Ionicons
                style={[{color: '#000'}]}
                size={23}
                name={'bar-chart'}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={() => ({
          tabBarIcon: ({tintColor}) => (
            <View>
              <FontAwesome style={[{color: '#000'}]} size={25} name={'user'} />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="QrCode"
        component={QrCodeStack}
        options={() => ({
          tabBarIcon: ({tintColor}) => (
            <View>
              <Ionicons
                style={[{color: '#000'}]}
                size={25}
                name={'scan-sharp'}
              />
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

const MyTransition = {
  gestureDirection: 'horizontal-inverted',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['360deg', '360deg'],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 0],
          outputRange: [0, 0],
        }),
      },
    };
  },
};
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode="float">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            ...MyTransition,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Register"
          component={CreateAccount}
          options={{
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="OTP Screen"
          component={Otp}
          options={{
            ...MyTransition,
          }}
        />

        <Stack.Screen
          name="Forgotpassword"
          component={ResetPassword}
          options={{
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            ...MyTransition,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Bottom"
          component={BottomTab}
          options={{
            ...MyTransition,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
