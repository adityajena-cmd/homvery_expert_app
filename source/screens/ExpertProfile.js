import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetServiceArea, GetTechnicianDetails } from '../config/apis/ProfileApis';
import { useFocusEffect } from '@react-navigation/native';


export const StepperStage = ({ stage }) => {
  const width = Dimensions.get('screen').width;
  return (
    <View style={{ padding: 10, paddingTop: 30 }}>
      <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1, borderStyle: 'dashed', width: '80%', alignSelf: 'center', marginBottom: -10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
        <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 }, ![1, 2, 3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../assets/images/greenTick.png')} />
          <Image resizeMode='cover' style={[{ width: width / 6, height: width / 5, marginBottom: 20 }, ![1, 2, 3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../assets/images/stepper1.png')} />
          <Text style={{ fontWeight: '500', color: [1, 2, 3, 4, 5].includes(stage) ? '#000000' : '#d8d8d8', width: width / 6, fontSize: 12, textAlign: 'center' }}>Documents Submitted</Text>
        </View>

        <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 }, ![2, 3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../assets/images/greenTick.png')} />
          <Image resizeMode='cover' style={[{ width: width / 6, height: width / 5, marginBottom: 20 }, ![2, 3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../assets/images/stepper2.png')} />
          <Text style={{ fontWeight: '500', color: [2, 3, 4, 5].includes(stage) ? '#000000' : '#d8d8d8', width: width / 6, fontSize: 12, textAlign: 'center' }}>Details Submitted</Text>
        </View>

        <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 }, ![3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../assets/images/greenTick.png')} />
          <Image resizeMode='cover' style={[{ width: width / 7, height: width / 5, marginBottom: 20 }, ![3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../assets/images/stepper3.png')} />
          <Text style={{ fontWeight: '500', color: [3, 4, 5].includes(stage) ? '#000000' : '#d8d8d8', width: width / 6, fontSize: 12, textAlign: 'center' }}>Profile Verfied</Text>
        </View>
      </View>
    </View>
  );
}
export default function ExpertProfile({ navigation }) {
  const width = Dimensions.get('screen').width
  const [status, setstatus] = useState(1)
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')
  const [services, setServices] = useState([])
  const [profile, setProfile] = useState({})



  const getTechinician = (token, userId) => {
    GetTechnicianDetails(userId, token)
      .then(res => {
        console.log("HOHOHOHOHOHOH------------------", res.data[0])
        if (res.status === 200) {
          setProfile(res.data[0])
        }
      }).catch(err => console.log("lololo", err.response.data))
  }
  const getCities = (arr) => {
    let str = ""
    arr.forEach(i => {
      str = str + i.city.name + ", "
    })
    return str
  }
  const getServiceAreas = (token, userId) => {
    GetServiceArea(token, userId)
      .then(res => {
        console.log("-----------",res.data)
        if (res.status === 200 && res.data.length >0) {
          let entries = []
          res.data.forEach(item => {
            let service = {
              service: item.service.name,
              cities: getCities(item.service.service_locations),
              pincode: item.pincodes
            }
           
            entries.push(service)
          })
          setServices(entries)
        }
      }).catch(err => console.log("lololo", err))
  }



  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.multiGet(
        ['API_TOKEN', 'ON_BOARD', 'USER_ID'],
        (err, items) => {
          if (err) {
            console.warn(err);
          } else {
            setToken(items[0][1])
            setUserId(items[2][1])
            console.log(items[1][1])

            switch (items[1][1]) {
              case 'APPROVED':
                setstatus(3);
                break;
              case 'DOCS':
                setstatus(1)
                break;
              case 'DETAILS':
                setstatus(2)
                break;
              case 'HOME':
                setstatus(0)
                getTechinician(items[0][1], items[2][1])
                getServiceAreas(items[0][1], items[2][1])

                break;
              default:
                setstatus(1)
                break
            }
          }
        })
    }, [])
  )

  const approveTechnician = async () => {
    try {
      await AsyncStorage.setItem('ON_BOARD', "HOME");
      navigation.replace("Home")

    }
    catch (err) {
      console.log(err)

    }
  }


  return (
    <View style={{ flex: 1, paddingHorizontal: 20, }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20 }}>


        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, marginBottom: 20 }}>
          {status !== 0 &&
            <StepperStage stage={status} />
          }
          {
            status === 1 &&
            <>
              <View style={{ marginVertical: 20, backgroundColor: '#F5F5F550', height: 6 }} />

              <Text style={{ color: '#0D0D0D', fontWeight: '700', fontSize: 15, textAlign: 'center', marginVertical: 10 }}>Approval Status Pending</Text>
              <Text style={{ color: '#A1A1A1', fontWeight: '500', fontSize: 15, textAlign: 'center', marginBottom: 10 }}>Please fill all the details in my profile section</Text>

              <Button onPress={() => { navigation.navigate('EditProfile',{ data: {}, token: token, user: userId }) }}
                style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5, width: '50%', alignSelf: 'center', marginBottom: 50, marginTop: 10 }}
                mode="contained">
                <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Submit Details</Text>
              </Button>
            </>
          }

          {
            status === 2 &&
            <>
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ color: '#0D0D0D', fontWeight: '700', fontSize: 15, marginVertical: 10 }}>Profile verification status pending</Text>
                <Text style={{ color: '#A1A1A1', fontWeight: '500', fontSize: 15, marginBottom: 10 }}>Profile verification is pending from Homvery.
                  You will get notification once its approved.</Text>
              </View>
            </>
          }

          {
            status === 3 &&
            <>

              <View style={{ marginVertical: 30 }}>
                <Text style={{ color: '#0D0D0D', fontWeight: '700', fontSize: 20, textAlign: 'center', marginVertical: 10 }}>Congratulations!</Text>
                <Text style={{ color: '#A1A1A1', fontWeight: '500', fontSize: 15, textAlign: 'center', marginBottom: 10 }}>Your profile has been approved.</Text>

                <Button onPress={() => { approveTechnician() }}
                  style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5, width: '50%', alignSelf: 'center', marginBottom: 50, marginTop: 10 }}
                  mode="contained">
                  <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Lets Start</Text>
                </Button>
              </View>


            </>
          }

        </View>


        {
          status === 0 &&
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', }}>
              <Image source={profile?.modified_by?.profilepic?.url ? { uri: profile?.modified_by?.profilepic?.url } : require('../assets/images/M2.png')} style={{ width: width / 4, height: width / 4 }} />
              <View style={{ marginLeft: 30 }}>
                <Text style={{ color: '#4E53C8', fontWeight: '600', fontSize: 20 }}>{profile.technician && profile?.technician?.firstname + ' ' + profile?.technician?.lastname}</Text>
                <Text style={{ color: '#707070', fontWeight: '400', fontSize: 15 }}>{profile?.technician?.email}</Text>
                <Text style={{ color: '#707070', fontWeight: '500', fontSize: 15 }}>{profile?.technician?.phonenumber}</Text>
                {profile.technician && <TouchableOpacity onPress={() => { navigation.navigate('EditProfile', { data: profile, token: token, user: userId }) }}>
                  <Text style={{ color: '#41C461', fontWeight: '500', fontSize: 15 }}><MaterialCommunityIcons size={16} name='pencil' /> Edit</Text>
                </TouchableOpacity>}
              </View>
            </View>
            <View style={{ flex: 1, padding: 20, backgroundColor: '#ffffff', elevation: 3, borderRadius: 15, height: width, marginTop: 15, marginBottom: 20 }}>
              <Text style={{ color: '#000000', fontWeight: '500', fontSize: 20, borderBottomColor: '#000000', borderBottomWidth: 0.5, paddingBottom: 10 }}>Manage Service</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>

                <View style={{ marginTop: 10 }}>
                  {services.length > 0 && services.map(item => {
                    return <><Text style={{ color: '#000000',textDecorationLine:'underline', fontWeight: '600', marginTop: 30, fontSize: 18 }}>{`${item.service} (`  +item.cities+' )'}</Text>
                      <Text style={{ color: '#000000', marginTop: 10, fontSize: 16 }}>{"Pincodes: "+item.pincode}</Text></>
                  })}
                </View>

              </View>
            </View>
          </>
        }
      </ScrollView>
    </View>
  );
}
