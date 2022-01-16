import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { Accord } from './ShareQuotation';
export const Switch = () => {
    const [state, setState]=React.useState(false)
    return (
        <TouchableOpacity onPress={() => { setState(!state) }} style={{
            flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center',
            backgroundColor: state ? '#102457' : '#F7F7F7', borderRadius: 100   ,
            borderColor: state ? '#102457' : '#c6c6c6', borderWidth: state ? 1 : 1,
        }}>
            {state && <Text style={{ color: '#ffffff', fontSize: 15, width: 25, textAlign: 'center' }}></Text>}
            <View style={{ width: 20, height: 20, borderRadius: 100, backgroundColor: state ? '#ffffff' : '#102457', borderRadius: 100 }} />
            {!state && <Text style={{ color: '#C6C6C6', fontSize: 15, width: 25, textAlign: 'center' }}></Text>}
        </TouchableOpacity>
    );
}
export default function ServiceComplete({navigation}) {
    const width = Dimensions.get('screen').width
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', paddingHorizontal: 20, }}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                        <Image style={{ width: width / 4, height: width / 4, }} source={require('../assets/images/paid.png')} />
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
                            <Switch />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Text style={{ color: '#05194E', fontSize: 20, marginBottom: 10, textAlign: 'center' }}>Slider Button</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <Button onPress={() => { navigation.popToTop()}}
                    style={{ width: '50%',backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5 }}
                    mode="contained">
                    <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: '400' }}>Service Completed</Text>
                </Button>


                <TouchableOpacity onPress={() => { navigation.navigate('Home')}} style={{ width: '50%',backgroundColor: '#ffffff', borderColor: '#05194E', borderWidth: 1, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 10, marginLeft: 10 }}>
                    <Text style={{ color: '#05194E', fontSize: 12, fontWeight: '400', textAlign: 'center' }}>REVIST</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
