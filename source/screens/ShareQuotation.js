import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import { requestLocationPermission } from '../config/LocaitonProvider';
import Geolocation from '@react-native-community/geolocation';
import { CreateNewQuotation, GetBookingStatus } from '../config/apis/BookingApis';
import { copyClipboard, getFullAddress, openMaps, openPhone } from '../config/Utils';
import moment from 'moment';

const config = {
    enableHighAccuracy: false,
    timeout: 2000,
    maximumAge: 3600000,
};

export const Accord = ({ data }) => {
    const [accordion, setAccordion] = React.useState(false);
    const width = Dimensions.get('screen').width;
    return (
        <TouchableOpacity onPress={() => { setAccordion(!accordion) }} style={{ padding: 10, backgroundColor: '#ffffff', borderRadius: 10, marginVertical: 10, elevation: 3, marginHorizontal: 3 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
                <Text style={{ color: '#4E53C8', fontSize: 18 }}>Booking Details</Text>
                {
                    accordion ?
                        <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>{data?.bookingid?.bookingId}  <MaterialCommunityIcons size={17} onPress={() => { copyClipboard(data?.bookingid?.bookingId) }} name='content-copy' color={'#000000'} /></Text>
                        :
                        <MaterialCommunityIcons name='chevron-down' size={25} color={'grey'} />
                }

            </View>
            {
                accordion &&
                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 15, paddingTop: 10, borderTopColor: '#EAE2E2', borderTopWidth: 1 }}>
                        <Button onPress={() => { openPhone('9090909090') }}
                            style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5 }}
                            mode="contained"
                        >
                            <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '400' }}><MaterialCommunityIcons size={13} name='phone' color={'#ffffff'} /> Call Customer</Text>
                        </Button>


                        <TouchableOpacity onPress={() => { openMaps(20.272254943108717, 85.78341226189251, getFullAddress(data.bookingid?.address)) }} style={{ backgroundColor: '#ffffff', borderColor: '#05194E', borderWidth: 1, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 10, marginLeft: 10 }}>
                            <Text style={{ color: '#05194E', fontSize: 13, fontWeight: '400' }}><MaterialCommunityIcons size={13} name='map-marker' color={'#05194E'} /> GET DIRECTION</Text>
                        </TouchableOpacity>
                    </View>
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
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>{'Date & time'}</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{moment(new Date(data.bookingid?.fromtime)).format('Do MMM YYYY') + "  -  " + moment(new Date(data.bookingid?.fromtime)).format('hh:mm a') + " - " + moment(new Date(data.bookingid?.totime)).format('hh:mm a')}</Text>
                        </View>
                    </View>
                </>
            }
        </TouchableOpacity>
    )
}

export default function ShareQuotation({ navigation, route }) {
    const width = Dimensions.get('screen').width;
    const [isSubmitted, setSubmitted] = React.useState(false);
    const [token, setToken] = React.useState(route?.params?.token)
    const [userId, setUserId] = React.useState(route?.params?.user)
    const [totalPrice, setTotalPrice] = React.useState(route?.params?.total)
    const [quotationList, setQuotationList] = React.useState(route?.params?.data)
    const [loc, setLoc] = React.useState([]);

    const [isApproved, setApproved] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    let booking = route?.params?.booking

    useEffect(() => {
        // console.log(uuid().substring(0,12))
        requestLocationPermission()
        let watchID = Geolocation.watchPosition(
            (info) => {
                let LOC = [info.coords.latitude, info.coords.longitude]
                console.log(LOC)
                setLoc(LOC)
            },
            (error) => {
                console.log(error.message);
            },
            config
        );

        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, [])

    useEffect(() => {
        GetBookingStatus(booking.bookingid?.id,token)
        .then(res=>{
            if(res.status === 200){
                if (res.data[0].bookingstatusid?.name === 'QUOTATION_ACCEPTED'){
                    setApproved(true)
                }else{
                    setApproved(false)
                }
            }
        }).catch(err=>{

        })
     
    }, []);
    

    const shareQuotation = () => {
        setLoading(true)
        quotationList.forEach(item =>{
            delete item['key']
        })
        console.log(body)
        let body = {
            items: quotationList,
            bookingId: booking.bookingid?.id,
            latitude: loc[0],
            longitude: loc[1]
        }
        console.log(body,token)

        CreateNewQuotation(token, body)
            .then(res => {
                setLoading(false)
                if (res.status === 200) {
                    isSubmitted(true)
                }
                console.log(res.data)
            }).catch(err => {
                setLoading(false)

                console.log(err.response.data)
            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', paddingHorizontal: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 10 }}>
                {isSubmitted && <Image style={{ width: width - 40, height: width / 3, marginVertical: 10, }} source={require('../assets/images/quot.png')} />
                }
                <Accord data={booking} />
                <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 20, marginTop: 0, marginBottom: 20 }}>
                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center', fontWeight: '600' }}>Quotation</Text>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10, marginBottom: 10 }} />
                    {quotationList.length > 0 && quotationList.map(item => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: '#000000', fontSize: 14 }}>{item.item_name}</Text>
                                </View>
                                <View style={{ marginTop: 10 }}>

                                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>{'₹ ' + item.item_price}</Text>
                                </View>
                            </View>)
                    })}
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center', fontWeight: '600' }}>Billing amount to be payed by customer</Text>
                    <Text style={{ color: '#4E53C8', fontSize: 40, textAlign: 'center', fontWeight: '600' }}>{'₹' + totalPrice}</Text>
                </View>
            </ScrollView>
            <Button onPress={() => { shareQuotation()}}
                loading={loading}
                disabled={loading}
                color='#05194E'
                style={{ marginVertical: 10, width: '100%', borderRadius: 10, paddingVertical: .5 }}
                mode="contained">
                <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Service Completed Page</Text>
            </Button>
            <Modal
                isVisible={isApproved}
                hasBackdrop={true}
                backdropOpacity={0.3}
                backdropColor={"#000000"}
                animationType="fadeIn"
                swipeDirection={[]}
                onSwipeComplete={() => { setApproved(false) }}
                onBackdropPress={() => { setApproved(false) }}
                style={{ margin: 30, justifyContent: "center", }}>
                <View style={{ backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 40, borderRadius: 15, display: 'flex', alignContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../assets/images/quot3.png')} style={{ width: Dimensions.get('screen').width / 2, height: Dimensions.get('screen').width / 2 }} />
                    <Text style={{ color: '#635E5E', textAlign: 'center', fontSize: 18, marginVertical: 10, fontWeight: '600', width: '80%' }}>Quotation has been accepted by the customer</Text>
                    <Button
                        onPress={() => { navigation.navigate('ServiceComplete') }}
                        style={{ width: '75%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                        mode="contained">
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Start service</Text>
                    </Button>
                </View>
            </Modal>
        </View>
    );
}
