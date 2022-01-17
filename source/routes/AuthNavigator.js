import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getFocusedRouteNameFromRoute, useNavigation,useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Modal from 'react-native-modal'


import SplashScreenComponent from '../screens/SplashScreen';
import Login from '../screens/Login';
import OtpVerification from '../screens/OtpVerification';
import ProfileUploader from '../screens/ProfileUploader';
import ExpertProfile from '../screens/ExpertProfile';
import ExpertBookings from '../screens/ExpertBookings';
import EditProfile from '../screens/EditProfile';
import BookingDetails from '../screens/BookingDetails';
import OngoingBooking from '../screens/OngoingBooking';
import ShareQuotation from '../screens/ShareQuotation';
import CreateQuotation from '../screens/CreateQuotation';
import ServiceComplete from '../screens/ServiceComplete';
import WalletDetails from '../screens/WalletDetails';

const Stack = createNativeStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();
// const Drawer = createDrawerNavigator();

function Screen() {
  return (
    <View style={{flex: 1, backgroundColor:'#ffffff', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#cccccc'}}>Page Under Construction</Text>
    </View>
  )
}
// export function DrawerNav() {
//   return (
//       <Drawer.Navigator initialRouteName="Homedrawer">
//         <Drawer.Screen name="Homedrawer" component={Bottomtabs} />
//       </Drawer.Navigator>
//   );
// }
function Bottomtabs() {
    return (
        <BottomTab.Navigator
      initialRouteName='Bookings'
      barStyle={{ backgroundColor: '#ffffff', elevation: 50 }}
      activeColor="#4E53C8"
      inactiveColor="#ccc"
    >
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-clock" color={color} size={24} />
          ),
        }}
        name="Bookings"
        component={ExpertBookings} />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Payout',
            tabBarIcon: ({ color, focused }) => (
              focused ? <Image source={require('../assets/images/payoutActive.png')} resizeMode='cover'/>
                : <Image source={require('../assets/images/payout.png')} resizeMode='cover'/>
            // <MaterialCommunityIcons name="bitcoin" color={color} size={24} />
          ),
        }}
        name="Payout"
        component={Screen} />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Ranking',
          tabBarIcon: ({ color, focused }) => (
              focused ? <Image source={require('../assets/images/rankingActive.png')} resizeMode='cover'/>
                : <Image source={require('../assets/images/ranking.png')} resizeMode='cover'/>
            // <MaterialCommunityIcons name="bitcoin" color={color} size={24} />
          ),
        }}
        name="Ranking"
        component={Screen} />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-box-outline" color={color} size={24} />
          ),
        }}
        name="My Profile"
        component={ExpertProfile} />
    </BottomTab.Navigator>
    )
};
const AuthNavigator = () => {
  const [online, setOnline] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const navigation = useNavigation();
  
  return (
    <>
      <Stack.Navigator initialRouteName="ShareQuotation">
        <Stack.Screen
          name="Splash"
          component={SplashScreenComponent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OtpVerification"
          component={OtpVerification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileUploader"
          component={ProfileUploader}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Bottomtabs}
          options={({ route, navigation }) => ({
            headerLeft: () => (<TouchableOpacity onPress={() => { getFocusedRouteNameFromRoute(route) === "My Profile" ? navigation.goBack() : setModal(true) }}>
              <MaterialCommunityIcons name={getFocusedRouteNameFromRoute(route) === "My Profile" ? "arrow-left" : "menu"} color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
            </TouchableOpacity>),
            headerTitleAlign: 'center',
            headerTitle: () => (getFocusedRouteNameFromRoute(route) === "My Profile" && <Text style={{ color: '#000000', fontWeight: '500', fontSize: 15 }}>My Profile</Text>),
            headerRight: () => (getFocusedRouteNameFromRoute(route) !== "My Profile" &&
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { }}>
                  <MaterialCommunityIcons name="bell-outline" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setOnline(!online) }} style={{
                  flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center',
                  backgroundColor: online ? '#0D9F31' : '#ffffff', borderRadius: 100, paddingHorizontal: 5, paddingVertical: 2.5,
                  borderColor: online ? '#FFFFFF00' : '#c6c6c6', borderWidth: online ? 0 : 0.5,
                }}>
                  {online && <Text style={{ color: '#ffffff', fontSize: 15, width: 60, textAlign: 'center' }}>Online</Text>}
                  <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: online ? '#ffffff' : '#C6C6C6', borderRadius: 100 }} />
                  {!online && <Text style={{ color: '#C6C6C6', fontSize: 15, width: 60, textAlign: 'center' }}>Offline</Text>}
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: 'Personal Details',
            headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
              <MaterialCommunityIcons name={"arrow-left"} color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
            </TouchableOpacity>),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="BookingDetails"
          component={BookingDetails}
          options={{
            title: 'Booking Details',
            headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
              <MaterialCommunityIcons name={"arrow-left"} color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
            </TouchableOpacity>),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="OngoingBooking"
          component={OngoingBooking}
          options={{
            title: 'Ongoing Booking',
            headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
              <MaterialCommunityIcons name={"arrow-left"} color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
            </TouchableOpacity>),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ShareQuotation"
          component={ShareQuotation}
          options={{
            title: 'Quotation details',
            headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
              <MaterialCommunityIcons name={"arrow-left"} color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
            </TouchableOpacity>),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CreateQuotation"
          component={CreateQuotation}
          options={{
            title: 'Quotation details',
            headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
              <MaterialCommunityIcons name={"arrow-left"} color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
            </TouchableOpacity>),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ServiceComplete"
          component={ServiceComplete}
          options={{
            title: 'Service Completion',
            headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
              <MaterialCommunityIcons name={"arrow-left"} color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
            </TouchableOpacity>),
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="WalletDetails"
          component={WalletDetails}
          options={{
            title: 'Wallet Details',
            headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
              <MaterialCommunityIcons name={"arrow-left"} color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
            </TouchableOpacity>),
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
      <Modal
        isVisible={modal}
        hasBackdrop={true}
        backdropOpacity={0.3}
        backdropColor={"#000000"}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        swipeDirection={['down', "up", "left", "right"]}
        onSwipeComplete={() => { setModal(false) }}
        onBackdropPress={() => { setModal(false) }}
        style={{ margin: 0, justifyContent: "flex-start", }}>
        <View style={{
          backgroundColor: '#ffffff',
          paddingHorizontal: 20,
          paddingVertical: 20,
          display: 'flex',
          alignContent: 'flex-start',
          alignItems: 'flex-start',
          flex: 1,
          width: Dimensions.get('screen').width / 1.5
        }}>

        </View>
      </Modal>
    </>
  )
};

export default AuthNavigator;