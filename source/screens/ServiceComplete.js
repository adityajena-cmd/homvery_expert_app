import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, RefreshControl } from 'react-native';
import { Button } from 'react-native-paper';
import { block } from 'react-native-reanimated';
import { CompleteBooking, GetBillingDetails, GetBookingStatus } from '../config/apis/BookingApis';
import { Accord } from './Accordion';
// import { Accord } from './ShareQuotation';
export const Switch = ({ onChange, value }) => {
    const [state, setState] = React.useState(value)
    return (
        <TouchableOpacity onPress={() => { onChange(!state); setState(!state); }} style={{
            flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center',
            backgroundColor: state ? '#102457' : '#F7F7F7', borderRadius: 100,
            borderColor: state ? '#102457' : '#c6c6c6', borderWidth: state ? 1 : 1,
        }}>
            {state && <Text style={{ color: '#ffffff', fontSize: 15, width: 25, textAlign: 'center' }}></Text>}
            <View style={{ width: 20, height: 20, borderRadius: 100, backgroundColor: state ? '#ffffff' : '#102457', borderRadius: 100 }} />
            {!state && <Text style={{ color: '#C6C6C6', fontSize: 15, width: 25, textAlign: 'center' }}></Text>}
        </TouchableOpacity>
    );
}
export default function ServiceComplete({ navigation, route }) {
    const width = Dimensions.get('screen').width
    const [isRefresh, setRefresh] = React.useState(false);
    const [isPayment, setPayment] = React.useState(false);
    const [byCash, setCash] = React.useState(false);
    const [token, setToken] = React.useState(route?.params?.token)
    const [userId, setUserId] = React.useState(route?.params?.user)
    const [itemChange, setItemChange] = React.useState(0)
    const [load, setLoad] = React.useState(0);
    const [totalPrice, setTotalPrice] = React.useState(route?.params?.total ? route?.params?.total : 0)

    const [quotationList, setQuotationList] = React.useState(route?.params?.data ? route?.params?.data : [])
    let booking = route?.params?.booking
    console.log("BOOKINGID", booking)
    const onRefresh = () => {
        setLoad(load + 1)
    }
    useEffect(() => {
        let total = 0;
        if (quotationList !== undefined && quotationList.length > 0) {

            quotationList.forEach(item => {
                total = total + (item.cost);
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

                    setItemChange(itemChange + 1)
                }
            }).catch(err => {
                console.log(err.response.data)
            })

    }


    useEffect(() => {
        setRefresh(true)
        GetBookingStatus(booking.bookingid?.id, token)
            .then(res => {
                GetBilling()
                setRefresh(false)
                if (res.status === 200 && res.data.length > 0) {
                    if (res.data[0].bookingstatusid?.name === 'QUOTATION_APPROVED') {

                        setPayment(false)
                    } else if (res.data[0].bookingstatusid?.name === 'PAYMENT_COMPLETED') {

                        setPayment(true)
                    }
                    else {

                        setPayment(false)
                    }
                    console.log(res.data[0])
                }
            }).catch(err => {
                setRefresh(false)
                console.log("STATUS", err)
            })

    }, [load]);

    const serviceCompleted = () => {
        setRefresh(true)
        let body = {
            bookingId: booking?.bookingid?.id,
            byCash: byCash

        }
        console.log("BOOOOOKKK0000000000000000000000",body)
        CompleteBooking(token, body)
        .then(res => {
            setRefresh(false)
            if (res.status === 200) {
                setPayment(true)
                alert('Booking Complete')
                navigation.replace('Home')
            }
        }).catch(err => {
            setRefresh(false)
            console.log(err.response.data)
        })
    }





    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', paddingHorizontal: 20, }}>
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefresh}
                        onRefresh={onRefresh} />
                }>
                <Accord data={route?.params?.booking} />
                <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 20, marginTop: 0, marginBottom: 20 }}>
                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center', fontWeight: '600' }}>Quotation</Text>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10, marginBottom: 10 }} />
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}> */}

                    {quotationList.length > 0 && quotationList.map((item, index) => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: '#000000', fontSize: 14 }}>{item.name}</Text>
                                </View>

                                <View style={{ marginTop: 10 }}>

                                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>{'₹ ' + item.cost.toString()}</Text>
                                </View>
                                {
                                    index == 0 && isPayment ?
                                        <Image style={{ marginLeft: width / 3, position: 'absolute', width: width / 4, height: width / 4 }} source={require('../assets/images/paid.png')} />
                                        : <></>

                                }
                            </View>)
                    })}
                    {/* <Image style={{ width: width / 4, height: width / 4}} source={require('../assets/images/paid.png')} /> */}

                    {/* </View> */}
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center', fontWeight: '600' }}>Billing amount payed by customer</Text>
                    <Text style={{ color: '#4E53C8', fontSize: 40, textAlign: 'center', fontWeight: '600' }}>₹1400</Text>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/cashHand.png')} />
                        <View>
                            <Text style={{ color: '#05194E', fontSize: 20, marginBottom: 10 }}>Cash by hand!</Text>
                            <Text style={{ color: '#707070', fontSize: 15 }}>Cash Collected</Text>
                        </View>
                        <View>
                            <Switch value={byCash} onChange={(val) => { setCash(val) }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            {!isPayment ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <Button onPress={() => { serviceCompleted() }}
                    disabled={!byCash}
                    color='#05194E'
                    style={{ width: '50%', borderRadius: 10, paddingVertical: .5 }}
                    mode="contained">
                    <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: '400' }}>Service Completed</Text>
                </Button>


                <TouchableOpacity onPress={() => { navigation.navigate('Home') }} style={{ width: '50%', backgroundColor: '#ffffff', borderColor: '#05194E', borderWidth: 1, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 10, marginLeft: 10 }}>
                    <Text style={{ color: '#05194E', fontSize: 12, fontWeight: '400', textAlign: 'center' }}>REVIST</Text>
                </TouchableOpacity>
            </View> : <Button
                onPress={() => { serviceCompleted()}}
                style={{ width: '75%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                mode="contained">
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Service Completed</Text>
            </Button>}
        </View>
    );
}
