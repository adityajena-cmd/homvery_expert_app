import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';

export const Accord = () => {
    const [accordion, setAccordion] = React.useState(false);
    const width = Dimensions.get('screen').width;
    return (
        <TouchableOpacity onPress={() => { setAccordion(!accordion) }} style={{ padding: 10, backgroundColor: '#ffffff', borderRadius: 10, marginVertical: 10, elevation: 3, marginHorizontal: 3 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center',  }}>
                <Text style={{ color: '#4E53C8', fontSize: 18 }}>Booking Details</Text>
                {
                    accordion ?
                        <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>BH2908769  <MaterialCommunityIcons size={17} name='content-copy' color={'#000000'} /></Text>
                        :
                        <MaterialCommunityIcons name='chevron-down' size={25} color={'grey'} />
                }
                            
            </View>
            {
                accordion &&
                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 15, paddingTop: 10, borderTopColor: '#EAE2E2', borderTopWidth: 1 }}>
                        <Button onPress={() => { }}
                            style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5 }}
                            mode="contained"
                        >
                            <Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '400' }}><MaterialCommunityIcons size={13} name='phone' color={'#ffffff'} /> Call Customer</Text>
                        </Button>


                        <TouchableOpacity style={{ backgroundColor: '#ffffff', borderColor: '#05194E', borderWidth: 1, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 10, marginLeft: 10 }}>
                            <Text style={{ color: '#05194E', fontSize: 13, fontWeight: '400' }}><MaterialCommunityIcons size={13} name='map-marker' color={'#05194E'} /> GET DIRECTION</Text>
                        </TouchableOpacity>
                    </View>
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
                </>
            }
        </TouchableOpacity>
    )
}

export default function ShareQuotation({navigation}) {
    const width = Dimensions.get('screen').width;
    const [modal, setModal] = React.useState(true);
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', paddingHorizontal: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 10 }}>
                <Image style={{ width: width - 40, height: width / 3, marginVertical: 10, }} source={require('../assets/images/quot.png')} />
                <Accord />
                <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 20, marginTop: 0, marginBottom: 20 }}>
                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center', fontWeight: '600' }}>Quotation</Text>
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
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center', fontWeight: '600' }}>Billing amount to be payed by customer</Text>
                    <Text style={{ color: '#4E53C8', fontSize: 40, textAlign: 'center', fontWeight: '600' }}>₹1400</Text>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center', fontWeight: '600', width: '80%', alignSelf: 'center' }}>In case you want to apply coupon code, please go to customer app.</Text>
                </View>
            </ScrollView>
            <Button onPress={() => { navigation.navigate('ServiceComplete')}}
                    style={{ marginVertical: 10, width: '100%',backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5 }}
                    mode="contained">
                    <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Service Completed Page</Text>
                </Button>
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
                <View style={{ backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 40, borderRadius: 15, display: 'flex', alignContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../assets/images/quot3.png')} style={{ width: Dimensions.get('screen').width / 2, height: Dimensions.get('screen').width / 2 }} />
                    <Text style={{ color: '#635E5E', textAlign: 'center', fontSize: 20, marginVertical: 10, fontWeight: '600', width: '50%' }}>Quotation has been shared</Text>
                    <Button
                        onPress={() => { setModal(false) }}
                        style={{ width: '75%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                        mode="contained">
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Start service</Text>
                    </Button>
                </View>
            </Modal>
        </View>
    );
}
