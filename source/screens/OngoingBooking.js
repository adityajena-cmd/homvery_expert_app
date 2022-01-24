import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal';
import moment from 'moment';
import { GetLocation, requestLocationPermission } from '../config/LocaitonProvider';
import Geolocation from '@react-native-community/geolocation';
import { GetBookingStatus, ReachedTechinician, RescheduleBooking, StartTechinician } from '../config/apis/BookingApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { copyClipboard, getFullAddress, openMaps, openPhone } from '../config/Utils';

const config = {
    enableHighAccuracy: false,
    timeout: 2000,
    maximumAge: 3600000,
};


const data2 = [
    {
        name: 'AC not cooling'
    },
    {
        name: 'General servicing'
    },
    {
        name: 'LED Blinking'
    },
    {
        name: 'Remote not working'
    },
    {
        name: 'Remote not working'
    },
]

export function BtnGrp(props) {
    return <TouchableOpacity
        onPress={props.onPress}
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: props.active ? '#4E53C8' : '#ffffff',
            color: '#ffffff',
            borderRadius: 50,
            marginBottom: 10,
            borderColor: '#4E53C8',
            borderWidth: 1,
            width: Dimensions.get('screen').width / 2 - 30,
            alignContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingVertical: 5,
            ...props.customButtonStyle
        }}>
        <Text style={{ color: props.active ? '#ffffff' : '#4E53C8', fontSize: 11, }}>{props.name}</Text>
    </TouchableOpacity>
};

export default function OngoingBooking({ navigation, route }) {
    let data = route?.params?.data
    const width = Dimensions.get('screen').width
    const [modal, setModal] = React.useState(false);
    const [isAssinged, setAssinged] = React.useState(false);
    const [problem, setProblem] = React.useState(0);
    const [loc, setLoc] = React.useState([]);
    const [token, setToken] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const [comments, setComments] = React.useState('');
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
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
        setLoading(true)
        console.log("STATE COULD CHANGE----", data.bookingid?.id)
        AsyncStorage.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
                if (err) {
                    console.log("ERROR===================", err);
                } else {
                    setToken(items[0][1])
                    setUserId(items[1][1])
                    GetBookingStatus(data?.bookingid?.id, items[0][1])
                        .then(res => {
                            setLoading(false)
                            console.log(res.data[0].bookingstatusid?.name)
                            if (res.data[0].bookingstatusid?.name === 'BOOKING_ASSIGNED' || res.data[0].bookingstatusid?.name === 'BOOKING_RESCHEDULED') {
                                setAssinged(true)
                            } else if (res.data[0].bookingstatusid?.name === 'QUOTATION_APPROVED') {
                                navigation.navigate('ShareQuotation', { booking: data, token: items[0][1], user: items[1][1] })
                            } 
                            else if (res.data[0].bookingstatusid?.name === 'QUOTATION_REJECTED') {
                                navigation.navigate('CreateQuotation', { data: data })
                            }else if (res.data[0].bookingstatusid?.name === 'TECHNICIAN_REACHED') {
                                navigation.navigate('CreateQuotation', { data: data })
                            }
                            else if (res.data[0].bookingstatusid?.name === 'QUOTATION_CREATED') {
                                navigation.navigate('ShareQuotation', { booking: route?.params?.data, token: items[0][1], user: items[1][1] })
                            }
                            else {
                                setAssinged(false)
                            }

                        }).catch(err => {
                            setLoading(false)

                            console.log("WHY", err.response.data)
                        })
                }
            })




    }, [])
    const technicianStarted = () => {
        setLoading(true)

        const body = {
            bookingId: data.bookingid?.id,
            latitude: loc[0],
            longitude: loc[1]
        }
        console.log(body)

        StartTechinician(token, body)
            .then(res => {
                setLoading(false)

                console.log("response----", res.data)
                if (res.status === 200) {
                    setAssinged(false)
                }
            }).catch(err => {
                setLoading(false)

                console.log(err.response.data)
            })

    }

    const technicianRescheduled = () => {
        setLoading(true)

        const body = {
            bookingId: data.bookingid?.id,
            fromTime: fromDate,
            toTime: toDate,
            comments: comments,
            latitude: loc[0],
            longitude: loc[1]
        }
        console.log(body)

        RescheduleBooking(token, body)
            .then(res => {
                setLoading(true)

                console.log("response----", res.data)
                if (res.status === 200) {
                    setAssinged(false)
                }
            }).catch(err => {
                setLoading(true)

                console.log(err.response.data)
            })

    }

    const technicianReached = () => {
        setLoading(true)

        const body = {
            bookingId: data.bookingid?.id,
            latitude: loc[0],
            longitude: loc[1]
        }

        ReachedTechinician(token, body)
            .then(res => {
                setLoading(false)

                console.log("response----", res.data)
                if (res.status === 200) {
                    navigation.navigate('CreateQuotation', { data: data })
                }
            }).catch(err => {
                setLoading(false)

                console.log(err)
            })

    }
    return (
        <View style={{ backgroundColor: '#f8f8f8', flex: 1, paddingHorizontal: 20 }}>

            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 5, padding: 20, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', borderBottomColor: '#EAE2E2', borderBottomWidth: 1, marginBottom: 20, paddingBottom: 10 }}>
                        <Text style={{ color: '#4E53C8', fontSize: 18 }}>Booking Details</Text>
                        <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500', }}>{data?.bookingid?.bookingId}<MaterialCommunityIcons size={17} onPress={() => { copyClipboard(data?.bookingid?.bookingId) }} name='content-copy' color={'#000000'} /></Text>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <Button onPress={() => { openPhone(data?.bookingid?.address?.phoneNumber) }}
                            style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5 }}
                            mode="contained"
                        >
                            <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: '400' }}><MaterialCommunityIcons size={10} name='phone' color={'#ffffff'} /> Call Customer</Text>
                        </Button>


                        <TouchableOpacity onPress={() => {data?.bookingid?.address?.latitude ? openMaps(data?.bookingid?.address?.latitude, data?.bookingid?.address?.latitude , getFullAddress(data.bookingid?.address)): ToastAndroid.show('Locaiton Not Provide!', ToastAndroid.SHORT); }}
                         style={{ backgroundColor: '#ffffff', borderColor: '#05194E', borderWidth: 1, borderRadius: 10, paddingVertical: 8.5, paddingHorizontal: 10, marginLeft: 10 }}>
                            <Text style={{ color: '#05194E', fontSize: 10, fontWeight: '400' }}><MaterialCommunityIcons size={10} name='map-marker' color={'#05194E'} /> GET DIRECTION</Text>
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
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{getFullAddress(data.bookingid?.address)}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../assets/images/esc3.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Date & time</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{moment(new Date(data.bookingid?.fromtime)).format('Do MMM YYYY') + "  -  " + moment(new Date(data.bookingid?.fromtime)).format('hh:mm a') + " - " + moment(new Date(data.bookingid?.totime)).format('hh:mm a')}</Text>
                        </View>
                    </View>
                    {!isAssinged ? <Button onPress={() => { setModal(true) }}
                        style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5, marginTop: 30, width: '60%', alignSelf: 'center' }}
                        mode="contained"
                    >
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Reschedule</Text>
                    </Button> : <></>}
                </View>
                <Image source={require('../assets/images/sfty.png')} style={{ width: width - 40, height: width / 2.7 }} resizeMode='cover' />



            </ScrollView>
            {isAssinged ? <Button onPress={() => { technicianStarted() }}
                disabled={loading}
                loading={loading}
                color='#05194E'
                style={{ borderRadius: 10, paddingVertical: .5, marginVertical: 10, alignSelf: 'center', width: '100%' }}
                mode="contained"
            >
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Accept And GO</Text>
            </Button> :
                <Button onPress={() => { technicianReached() }}
                    disabled={loading}
                    loading={loading}
                    color='#05194E'
                    style={{ borderRadius: 10, paddingVertical: .5, marginVertical: 10, alignSelf: 'center', width: '100%' }}
                    mode="contained"
                >
                    <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Reached Location</Text>
                </Button>
            }
            <Modal
                isVisible={modal}
                hasBackdrop={true}
                backdropOpacity={0.3}
                backdropColor={"#000000"}
                animationType="fadeIn"
                swipeDirection={['down', "up", "left", "right"]}
                onSwipeComplete={() => { setModal(false) }}
                onBackdropPress={() => { setModal(false) }}
                style={{ margin: 30, justifyContent: "center", }}>
                <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 15, display: 'flex', }}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#635E5E', textAlign: 'center', fontSize: 16, fontWeight: '500', marginBottom: 10 }}></Text>
                            <TouchableOpacity onPress={() => { setModal(false) }}>
                                <Ionicons name="close" size={30} color={'#000000'} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ width: '100%', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: 15 }}>On which date you want to reschedule?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <Text style={{ textAlign: 'center', color: '#000000', fontSize: 12 }}>Dec 2021</Text>
                            <Text style={{ textAlign: 'center', color: '#000000', fontSize: 12, textDecorationLine: 'underline' }}><MaterialCommunityIcons name='calendar-range' size={12} /> More Details</Text>
                        </View>

                        <View><Text style={{ marginVertical: 20, textAlign: 'center', fontSize: 30, color: '#d8d8d8' }}>CALENDAR</Text></View>


                        <View style={{ marginVertical: 20, backgroundColor: '#F5F5F550', height: 6 }} />

                        <View style={{ padding: 10 }}>
                            <Text style={{ width: '100%', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: 15 }}>Write reason for reschedule? </Text>
                            <TextInput
                                style={{ height: Dimensions.get('screen').width / 3, backgroundColor: '#ffffff', borderRadius: 10, marginTop: 10, paddingHorizontal: 15, paddingVertical: 10, borderColor: '#d8d8d8', borderWidth: 1 }}
                                multiline={true}
                                value={comments}
                                onChangeText={(text) => setComments(text)}
                                textAlignVertical='top'
                                placeholder='Please write your problem statement here'
                                placeholderTextColor={'#ddd'} />
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 20 }}>

                                {
                                    data2.map((item, index) => {
                                        return <BtnGrp
                                            key={index}
                                            index={index}
                                            onPress={() => {
                                                setProblem(index)
                                                setComments(item.name)
                                            }}

                                            name={item.name}

                                            customButtonStyle={{ width: 'auto', borderRadius: 5, marginRight: 5 }}
                                            active={problem === index} />
                                    })
                                }
                            </View>
                        </View>


                        <View style={{ marginVertical: 20, backgroundColor: '#F5F5F550', height: 6 }} />
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ width: '100%', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: 15 }}>Are you sure to reschedule?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginVertical: 15, }}>
                                <Button onPress={() => { technicianRescheduled() }}
                                    color='#05194E'
                                    disabled={loading}
                                    loading={loading}
                                    style={{ borderRadius: 10, paddingVertical: .5, width: '50%' }}
                                    mode="contained"
                                >
                                    <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Yes</Text>
                                </Button>


                                <TouchableOpacity onPress={() => { setModal(false) }} style={{ backgroundColor: '#ffffff', borderColor: '#ffffff', borderWidth: 1, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 10, marginLeft: 10, width: '50%' }}>
                                    <Text style={{ color: '#05194E', fontSize: 20, fontWeight: '400', textDecorationLine: 'underline', textAlign: 'center' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}
