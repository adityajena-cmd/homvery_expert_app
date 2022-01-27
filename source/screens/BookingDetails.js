import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, ToastAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { GetBillingDetails } from '../config/apis/BookingApis';
import { copyClipboard, getFullAddress } from '../config/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Invoice = ({paid,data,total}) => {
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 20, marginTop: 20, marginBottom: 20 }}>
            <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center' }}>Payment Details</Text>
            <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10, marginBottom: 10 }} />
            {data.length > 0 && data.map((item, index) => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: '#000000', fontSize: 14 }}>{item.name}</Text>
                                </View>

                                <View style={{ marginTop: 10 }}>

                                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>{'₹ ' + item.cost.toString()}</Text>
                                </View>
                                {
                                    index == 0 && paid ?
                                        <Image style={{ marginLeft: width / 3, position: 'absolute', width: width / 4, height: width / 4,marginTop:30 }} source={require('../assets/images/paid.png')} />
                                        : <></>

                                }
                            </View>)
                    })}
            <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10 }} />
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <View>
                    <Text style={{ color: '#000000', fontSize: 14, fontWeight: '600', width: width / 3 }}>Amount payed by customer</Text>
                    <Text style={{ color: '#4E53C8', fontSize: 30, fontWeight: '600' }}>{'₹' + total.toString()}</Text>
                
                </View>
                <View style={{ width: 2, backgroundColor: '#DCEBF7', height: '100%' }} />
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={{ color: '#000000', fontSize: 14, fontWeight: '600',marginBottom: 10 }}>Deduction</Text>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignContent: 'center', alignSelf: 'center', marginBottom: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14, }}>HV Pay</Text>
                        <Text style={{ color: '#000000', fontSize: 14, }}>0</Text>

                    </View>
                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignContent: 'center', alignSelf: 'center' }}>
                        <Text style={{ color: '#000000', fontSize: 14, }}>Penalty</Text>
                        <Text style={{ color: '#000000', fontSize: 14, }}>0</Text>

                    </View>
                </View>
            </View>
        </View>
    );
}
export default function BookingDetails({navigation,route}) {

    const [billing, setBilling] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        AsyncStorage.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
              if (err) {
                console.log("ERROR=============================", err);
              } else {
                  GetBillingDetails(items[0][1],route?.params?.data?.bookingid?.id)
                  .then(res=>{
                      console.log(res.data)
                      if(res.status === 200 && res.data.length>0){
                          let to = 0;
                          res.data.forEach(item=>{
                            to = to+item.cost
                          })
                          setTotal(to)
                        setBilling(res.data)
                      }
                  }).catch(err=>{
                      console.log(err)
                  })
              }
            })
    }, []);
    


    console.log("route----------------",route?.params?.data?.bookingid?.id)
    let data = route?.params?.data;
    const width = Dimensions.get('screen').width
    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8', padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 5, padding: 20 }}>
                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500', paddingBottom: 10, borderBottomColor: '#000000', borderBottomWidth: 0.5, marginBottom: 10 }}>{data?.bookingid?.bookingId}  <MaterialCommunityIcons size={17} onPress={()=>{copyClipboard(data?.bookingid?.bookingId)}} name='content-copy' color={'#000000'} /></Text>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../assets/images/esc1.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Service Type</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{data?.bookingid?.serviceid?.name}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../assets/images/esc2.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Service Location</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{getFullAddress(data.bookingid?.address)} </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../assets/images/esc3.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Date & time</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{moment(new Date(data.bookingid?.fromtime)).format('Do MMM YYYY')+"  -  "+moment(new Date(data.bookingid?.fromtime)).format('hh:mm a') + " - " + moment(new Date(data.bookingid?.totime)).format('hh:mm a')}</Text>
                        </View>
                    </View>
                </View>
                <Invoice paid={route?.params?.paid} data={billing} total={total}/>



                {/* <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, paddingTop: 20, marginBottom: 20, paddingBottom: 40, paddingHorizontal: 20 }}>
                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center' }}>18-12-2021</Text>
                    <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10, marginBottom: 10 }} />
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexGrow: 2 }}>
                            <Text style={{ fontSize: 15, color: '#707070', width: width / 4 }}>Total earning of the day</Text>
                        </View>
                        <View style={{ flexGrow: 2 }}>
                            <Text style={{ fontSize: 30, color: '#4E53C8' }}>2000</Text>
                        </View>
                        <View style={{ flexGrow: 1 }}>
                            <View style={{ width: 1, height: width / 10, marginHorizontal: 10, backgroundColor: '#DCEBF7' }} />
                        </View>
                        <View style={{ flexGrow: 2 }}>
                            <Text style={{ fontSize: 15, color: '#707070', width: width / 4 }}>Booking Completed</Text>
                        </View>
                        <View style={{ flexGrow: 2 }}>
                            <Text style={{ fontSize: 30, color: '#4E53C8' }}>3</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', backgroundColor: '#DCEBF7', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, color: '#000000', fontWeight: '600' }}>Order No</Text>
                        <Text style={{ fontSize: 18, color: '#000000', fontWeight: '600' }}>Earning</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 20, marginVertical: 5, borderBottomColor: '#DCEBF7',borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 15, color: '#707070', fontWeight: '500', textDecorationLine: 'underline' }}>BH2908769</Text>
                        <Text style={{ fontSize: 16, color: '#000000', fontWeight: '600' }}>₹500</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 20, marginVertical: 5, borderBottomColor: '#DCEBF7',borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 15, color: '#707070', fontWeight: '500', textDecorationLine: 'underline' }}>BH2908769</Text>
                        <Text style={{ fontSize: 16, color: '#000000', fontWeight: '600' }}>₹500</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 20, marginVertical: 5, borderBottomColor: '#DCEBF7',borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 15, color: '#707070', fontWeight: '500', textDecorationLine: 'underline' }}>BH2908769</Text>
                        <Text style={{ fontSize: 16, color: '#000000', fontWeight: '600' }}>₹500</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 20, marginVertical: 5, borderBottomColor: '#DCEBF7',borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 15, color: '#707070', fontWeight: '500', textDecorationLine: 'underline' }}>BH2908769</Text>
                        <Text style={{ fontSize: 16, color: '#000000', fontWeight: '600' }}>₹500</Text>
                    </View>
                </View> */}
            </ScrollView>
        </View>
    );
}
