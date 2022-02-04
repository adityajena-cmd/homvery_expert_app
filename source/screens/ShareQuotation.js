import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, RefreshControl, BackHandler } from 'react-native';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import { requestLocationPermission } from '../config/LocaitonProvider';
import Geolocation from '@react-native-community/geolocation';
import { CreateNewQuotation, GetBillingDetails, GetBookingStatus } from '../config/apis/BookingApis';

import { useRoute } from '@react-navigation/native';
import { Accord } from './Accordion';
import Slider from '../components/Slider';

const config = {
    enableHighAccuracy: false,
    timeout: 2000,
    maximumAge: 3600000,
};

export default function ShareQuotation({ navigation, route }) {
    const width = Dimensions.get('screen').width;
    const [isSubmitted, setSubmitted] = React.useState(false);
    const [isBilled, setBilled] = React.useState(false);
    const [token, setToken] = React.useState(route?.params?.token)
    const [userId, setUserId] = React.useState(route?.params?.user)
    const [totalPrice, setTotalPrice] = React.useState(route?.params?.total ? route?.params?.total : 0)
    const [quotationList, setQuotationList] = React.useState(route?.params?.data ? route?.params?.data : [])
    const [loc, setLoc] = React.useState([]);
    const [itemChange, setItemChange] = React.useState(0)
    const [isRefresh, setRefresh] = React.useState(false);
    const [load, setLoad] = React.useState(0);

    const [isApproved, setApproved] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    let booking = route?.params?.booking
    let routeNav = useRoute()

    const onRefresh = () => {
        setLoad(load + 1)
    }
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
        let total = 0;
        if (quotationList !== undefined && quotationList.length > 0) {

            quotationList.forEach(item => {
                if (isBilled) {
                    total = total + (item.cost);
                } else {
                    total = total + (item.item_price * item.item_unit);
                }

            })
        } else {
            total = 0
        }
        setTotalPrice(total)
    }, [itemChange]);


    const GetBilling = () => {
        GetBillingDetails(token, booking.bookingid?.id)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    setQuotationList(res.data)
                    setBilled(true)
                    setItemChange(itemChange + 1)
                }
            }).catch(err => {
                console.log(err.response.data)
            })

    }

    const backAction = () => {
        navigation.replace("Home")
        return true;
    }
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();

    }, []);

    useEffect(() => {
        setRefresh(true)
        console.log("99999999999999999",booking.bookingid?.id)
        GetBookingStatus(booking.bookingid?.id, token)
            .then(res => {
                setRefresh(false)
                if (res.status === 200 && res.data.length > 0) {
                    if ((res.data[0].bookingstatusid?.name === 'QUOTATION_APPROVED' || res.data[0].bookingstatusid?.name === 'PAYMENT_COMPLETED') && routeNav.name === 'ShareQuotation') {
                        setApproved(true)
                    } else if (res.data[0].bookingstatusid?.name === 'QUOTATION_CREATED') {
                        setSubmitted(true)
                        GetBilling()
                    }
                    else if (res.data[0].bookingstatusid?.name === 'QUOTATION_REJECTED') {
                        setSubmitted(true)
                        navigation.goBack()
                        // navigation.navigate('ServiceComplete', { data: booking, token: token, user, user: userId })
                    } else {
                        setApproved(false)
                    }
                    console.log(res.data[0])
                }
            }).catch(err => {
                setRefresh(false)
                console.log("STATUS", err)
            })

    }, [load]);


    const shareQuotation = () => {
        setLoading(true)
        quotationList.forEach(item => {
            delete item['key']
        })
        console.log(body)
        let body = {
            items: quotationList,
            bookingId: booking.bookingid?.id,
            latitude: loc[0],
            longitude: loc[1]
        }
        console.log(body, token)

        CreateNewQuotation(token, body)
            .then(res => {
                setLoading(false)
                if (res.status === 200) {
                    setSubmitted(true)
                }
                console.log(res.status)
            }).catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', paddingHorizontal: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 10 }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefresh}
                        onRefresh={onRefresh} />
                }
            >
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
                                    <Text style={{ color: '#000000', fontSize: 14 }}>{isBilled ? item.name : item.item_name}</Text>
                                </View>
                                <View style={{ marginTop: 10 }}>

                                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>{isBilled ? '₹ ' + item.cost.toString() : '₹ ' + (parseInt(item.item_price) * item.item_unit).toString()}</Text>
                                </View>
                            </View>)
                    })}
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center', fontWeight: '600' }}>Billing amount to be payed by customer</Text>
                    <Text style={{ color: '#4E53C8', fontSize: 40, textAlign: 'center', fontWeight: '600' }}>{'₹' + totalPrice.toString()}</Text>
                </View>
            </ScrollView>
            {!isSubmitted && <View style={{ marginBottom: 30 }}>
                <Slider disable={loading} title="Share Quotation" onSwipe={() => { shareQuotation() }} />
            </View>
            }
            {/* {!isSubmitted && <Button onPress={() => { shareQuotation() }}
                loading={loading}
                disabled={loading}
                color='#05194E'
                style={{ marginVertical: 10, width: '100%', borderRadius: 10, paddingVertical: .5 }}
                mode="contained">
                <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Service Completed Page</Text>
            </Button>} */}
            <Modal
                isVisible={isApproved}
                hasBackdrop={true}
                backdropOpacity={0.3}
                backdropColor={"#000000"}
                animationType="fadeIn"
                swipeDirection={[]}
                onSwipeComplete={() => { setApproved(false) }}
                style={{ margin: 30, justifyContent: "center", }}>
                <View style={{ backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 40, borderRadius: 15, display: 'flex', alignContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../assets/images/quot3.png')} style={{ width: Dimensions.get('screen').width / 2, height: Dimensions.get('screen').width / 2 }} />
                    <Text style={{ color: '#635E5E', textAlign: 'center', fontSize: 18, marginVertical: 10, fontWeight: '600', width: '80%' }}>Quotation has been accepted by the customer</Text>
                    <Button
                        onPress={() => { setApproved(false); navigation.navigate('ServiceComplete', { booking: booking, token: token, user: userId }) }}
                        style={{ width: '75%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                        mode="contained">
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Start service</Text>
                    </Button>
                </View>
            </Modal>
        </View>
    );
}
