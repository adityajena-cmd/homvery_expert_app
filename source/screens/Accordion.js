import { TouchableOpacity, View, Image, Dimensions, Text, ToastAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { copyClipboard, getFullAddress, openMaps, openPhone } from '../config/Utils';
import moment from 'moment';
import React from 'react';
import { Button } from 'react-native-paper';


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
                        <Button onPress={() => { openPhone(data?.bookingid?.address?.phoneNumber) }}
                            style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5 }}
                            mode="contained"
                        >
                            <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '400' }}><MaterialCommunityIcons size={13} name='phone' color={'#ffffff'} /> Call Customer</Text>
                        </Button>


                        <TouchableOpacity onPress={() => {
                            data?.bookingid?.address?.latitude ? openMaps(data?.bookingid?.address?.latitude, data?.bookingid?.address?.latitude, getFullAddress(data.bookingid?.address)) :
                            ToastAndroid.show('Locaiton Not Provide!', ToastAndroid.SHORT);
                        }} style={{ backgroundColor: '#ffffff', borderColor: '#05194E', borderWidth: 1, borderRadius: 10, paddingVertical: 8.5, paddingHorizontal: 10, marginLeft: 10 }}>
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
