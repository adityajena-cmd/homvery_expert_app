import React from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export const Invoice = (props) => {
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 20, marginTop: 20, marginBottom: 20 }}>
            <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center' }}>Payment Details</Text>
            <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10, marginBottom: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14 }}>Base Payment</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14 }}>Extra Amount</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14 }}>Part 1</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14 }}>Part 2</Text>
                    </View>
                </View>
                {
                    props.paid && <View>
                        <Image style={{ width: width / 4, height: width / 4, }} source={require('../assets/images/paid.png')} />
                    </View>
                }
                
                <View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>₹500</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>₹300</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>₹200</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>₹400</Text>
                    </View>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10 }} />
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <View>
                    <Text style={{ color: '#000000', fontSize: 14, fontWeight: '600', width: width / 3 }}>Amount payed by customer</Text>
                    <Text style={{ color: '#4E53C8', fontSize: 30, fontWeight: '600' }}>₹1400</Text>
                
                </View>
                <View style={{ width: 2, backgroundColor: '#DCEBF7', height: '100%' }} />
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={{ color: '#000000', fontSize: 14, fontWeight: '600',marginBottom: 10 }}>Deduction</Text>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignContent: 'center', alignSelf: 'center', marginBottom: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14, }}>HV Pay</Text>
                        <Text style={{ color: '#000000', fontSize: 14, }}>-₹200</Text>

                    </View>
                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignContent: 'center', alignSelf: 'center' }}>
                        <Text style={{ color: '#000000', fontSize: 14, }}>Penalty</Text>
                        <Text style={{ color: '#000000', fontSize: 14, }}>-₹100</Text>

                    </View>
                </View>
            </View>
        </View>
    );
}
export default function BookingDetails() {
    const width = Dimensions.get('screen').width
    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8', padding: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 5, padding: 20 }}>
                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500', paddingBottom: 10, borderBottomColor: '#000000', borderBottomWidth: 0.5, marginBottom: 10 }}>BH2908769  <MaterialCommunityIcons size={17} name='content-copy' color={'#000000'} /></Text>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../assets/images/esc1.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Service Type</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>Air Conditioner Service</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../assets/images/esc2.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Service Location</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>Lorem ipsum dolor sit amet, consetetur ipsum dolor sit amet, consetetur   </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../assets/images/esc3.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Date & time</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>12 Sep 2021    12.00 PM - 3.00 PM</Text>
                        </View>
                    </View>
                </View>
                <Invoice paid={true} />
                <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, paddingTop: 20, marginBottom: 20, paddingBottom: 40, paddingHorizontal: 20 }}>
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
                </View>
            </ScrollView>
        </View>
    );
}
