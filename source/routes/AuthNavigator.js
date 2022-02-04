import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Alert, NativeModules, ToastAndroid } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { CommonActions, getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { GetAllLinks, GetTechnicianDetails, UpdateTechnicianDetails } from '../config/apis/ProfileApis';
import { openBrowser } from '../config/Utils';

const Stack = createNativeStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();
// const Drawer = createDrawerNavigator();

function Screen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#cccccc' }}>Page Under Construction</Text>
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

  const [state, setState] = useState('');
  useEffect(async () => {
    let board = await AsyncStorage.getItem('ON_BOARD');
    setState(board)
  }, []);


  return (
    <BottomTab.Navigator
      initialRouteName='Bookings'
      barStyle={{ backgroundColor: '#ffffff', elevation: 50 }}
      activeColor="#4E53C8"
      inactiveColor="#ccc"
    >
      {state === 'HOME' ? <>
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
              focused ? <Image source={require('../assets/images/payoutActive.png')} resizeMode='cover' />
                : <Image source={require('../assets/images/payout.png')} resizeMode='cover' />
              // <MaterialCommunityIcons name="bitcoin" color={color} size={24} />
            ),
          }}
          name="Payout"
          component={Screen} />
      </> : <>
        <BottomTab.Screen
          options={{
            tabBarLabel: 'Bookings',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar-clock" color={color} size={24} />
            ),
          }}
          name="Bookings"
          component={ExpertProfile} />
        <BottomTab.Screen
          options={{
            tabBarLabel: 'Payout',
            tabBarIcon: ({ color, focused }) => (
              focused ? <Image source={require('../assets/images/payoutActive.png')} resizeMode='cover' />
                : <Image source={require('../assets/images/payout.png')} resizeMode='cover' />
              // <MaterialCommunityIcons name="bitcoin" color={color} size={24} />
            ),
          }}
          name="Payout"
          component={ExpertProfile} />
      </>
      }
      <BottomTab.Screen
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-box-outline" color={color} size={24} />
          ),
        }}
        name="MyProfile"
        component={ExpertProfile} />
    </BottomTab.Navigator>
  )
};
const AuthNavigator = () => {
  // let online = false;
  const [online, setOnline] = React.useState(false);
  const [detailId, setDetailId] = React.useState('');
  const [token, setToken] = React.useState('');
  const [modal, setModal] = React.useState(false);
  const [links, setLinks] = React.useState({});

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.multiGet(
      ['API_TOKEN', 'DETAILS_ID', 'USER_ID'],
      (err, items) => {
        if (err) {
          console.log("ERROR=============================", err);
        } else {
          console.log("AUTHNAV----------------------", items)
          setToken(items[0][1])
          setDetailId(items[1][1])

          GetTechnicianDetails(items[2][1], items[0][1])
            .then(res => {
              if (res.status === 200) {
                if (res.data[0].available === true) {
                  setOnline(true)
                }
              }
            }).catch(err => {
              console.log(err)
            })

          GetAllLinks(items[0][1])
            .then(res => {
              if (res.status === 200) {
                setLinks(res.data[0])
              }
            }).catch(err => {
              console.log(error)
            })
        }
      }
    )
  }, [])
  const switchAvailable = async () => {
    setOnline(!online)

    AsyncStorage.multiGet(
      ['API_TOKEN', 'DETAILS_ID', 'USER_ID'],
      (err, items) => {
        if (err) {
          console.log("ERROR=============================", err);
        } else {
          let formData = new FormData();
          formData.append('data', JSON.stringify({
            "available": !online,
          }))
          setToken(items[0][1])
          setDetailId(items[1][1])

          UpdateTechnicianDetails(items[1][1], items[0][1], formData)
            .then(res => {
              if (res.status === 200) {
                ToastAndroid.show('Status Changed!', ToastAndroid.SHORT);
              }
            }).catch(err => {
              console.log(err.response.data)
            })
        }
      })



  }


  const logout = () => {
    return Alert.alert(
      "Log Out?",
      "Are you sure you want to Logout?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {

            AsyncStorage.clear()
              .then(() => {
                navigation.dispatch(resetAction)
              })
              .catch(err => console.log("CLEAR", err));
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  }
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });

  const homeAction = CommonActions.reset({
    index: 0,
    routes: [{ name: 'Home' }],
  });

  return (
    <>
      <Stack.Navigator initialRouteName="Splash">
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
                <TouchableOpacity onPress={() => { switchAvailable() }} style={{
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
            headerLeft: () => (<TouchableOpacity onPress={() => {  navigation.goBack() }}>
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
            headerLeft: () => (<TouchableOpacity onPress={() => {  navigation.goBack() }}>
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
            headerLeft: () => (<TouchableOpacity onPress={() => {  navigation.goBack() }}>
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
        swipeDirection={["left"]}
        onSwipeComplete={() => { setModal(false) }}
        onBackdropPress={() => { setModal(false) }}
        style={{ margin: 0, justifyContent: "flex-start", }}>
        <View style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          alignContent: 'flex-start',
          alignItems: 'flex-start',
          flex: 1,
          width: Dimensions.get('screen').width / 1.5
        }}>
          <Image source={require('../assets/images/sidebarBG.png')} style={{ width: Dimensions.get('screen').width / 1.5, height: 170 }} />
          <Text onPress={() => { setModal(false); openBrowser(links?.contactusUrl) }} style={{ color: '#6F6F6F', fontWeight: '400', fontSize: 22, padding: 10, marginLeft: 10 }}>Contact Us</Text>
          <Text onPress={() => { setModal(false); openBrowser(links?.referUrl) }} style={{ color: '#6F6F6F', fontWeight: '400', fontSize: 22, padding: 10, marginLeft: 10 }}>Refer Friend</Text>
          <Text onPress={() => { setModal(false); openBrowser(links?.guidelinesUrl) }} style={{ color: '#6F6F6F', fontWeight: '400', fontSize: 22, padding: 10, marginLeft: 10 }}>Guidelines</Text>
          <Text onPress={() => { setModal(false); openBrowser(links?.termsUrl) }} style={{ color: '#6F6F6F', fontWeight: '400', fontSize: 22, padding: 10, marginLeft: 10 }}>Terms & Condition</Text>
          <Text onPress={() => { setModal(false); logout() }} style={{ color: '#6F6F6F', fontWeight: '400', fontSize: 22, padding: 10, marginLeft: 10 }}>Logout <MaterialCommunityIcons size={24} name='power' /></Text>
        </View>
      </Modal>
    </>
  )
};

export default AuthNavigator;