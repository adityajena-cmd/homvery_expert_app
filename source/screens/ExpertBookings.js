import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Tab = createMaterialTopTabNavigator();

function Screen1({navigation}) {
    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8', borderRadius: 10, padding: 10 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={()=>{navigation.navigate('BookingDetails')}} style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#4E53C8', fontSize: 18, fontWeight: '600' }}>AC Repair</Text>
                        <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10 }} />
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>14-Sep-2021</Text>
                                        <Text style={{ fontSize: 10, color: '#9d9d9d', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                    </View>
                                </View>
                        <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600', textAlign: 'right', marginTop: -20 }}>View Details</Text>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('BookingDetails')}} style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#4E53C8', fontSize: 18, fontWeight: '600' }}>AC Repair</Text>
                        <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10 }} />
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>14-Sep-2021</Text>
                                        <Text style={{ fontSize: 10, color: '#9d9d9d', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                    </View>
                                </View>
                        <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600', textAlign: 'right', marginTop: -20 }}>View Details</Text>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=>{navigation.navigate('BookingDetails')}} style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#4E53C8', fontSize: 18, fontWeight: '600' }}>AC Repair</Text>
                        <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10 }} />
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>14-Sep-2021</Text>
                                        <Text style={{ fontSize: 10, color: '#9d9d9d', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                    </View>
                                </View>
                        <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600', textAlign: 'right', marginTop: -20 }}>View Details</Text>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('BookingDetails')}} style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#4E53C8', fontSize: 18, fontWeight: '600' }}>AC Repair</Text>
                        <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10 }} />
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>14-Sep-2021</Text>
                                        <Text style={{ fontSize: 10, color: '#9d9d9d', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                    </View>
                                </View>
                        <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600', textAlign: 'right', marginTop: -20 }}>View Details</Text>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}
function Screen2({navigation}) {
    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8', borderRadius: 10, padding: 10 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={()=>{navigation.navigate('OngoingBooking')}} style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#4E53C8', fontSize: 18, fontWeight: '600' }}>AC Repair</Text>
                        <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10 }} />
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>14-Sep-2021</Text>
                                        <Text style={{ fontSize: 10, color: '#9d9d9d', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                    </View>
                                </View>
                        <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600', textAlign: 'right', marginTop: -20 }}>View Details</Text>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('OngoingBooking')}} style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#4E53C8', fontSize: 18, fontWeight: '600' }}>AC Repair</Text>
                        <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10 }} />
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>14-Sep-2021</Text>
                                        <Text style={{ fontSize: 10, color: '#9d9d9d', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                    </View>
                                </View>
                        <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600', textAlign: 'right', marginTop: -20 }}>View Details</Text>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=>{navigation.navigate('OngoingBooking')}} style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#4E53C8', fontSize: 18, fontWeight: '600' }}>AC Repair</Text>
                        <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10 }} />
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>14-Sep-2021</Text>
                                        <Text style={{ fontSize: 10, color: '#9d9d9d', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                    </View>
                                </View>
                        <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600', textAlign: 'right', marginTop: -20 }}>View Details</Text>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('OngoingBooking')}} style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#4E53C8', fontSize: 18, fontWeight: '600' }}>AC Repair</Text>
                        <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10 }} />
                    <View style={{ paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>14-Sep-2021</Text>
                                        <Text style={{ fontSize: 10, color: '#9d9d9d', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                    </View>
                                </View>
                        <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600', textAlign: 'right', marginTop: -20 }}>View Details</Text>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}
function Screen3() {
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 10 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#f8f8f8', borderRadius: 10,padding: 10}}>
                <TouchableOpacity onPress={() => { }} style={{ backgroundColor: '#ffffff', elevation: 5,  borderRadius: 10,margin: 5, marginBottom: 10 }}>
                    <ImageBackground style={{borderRadius: 10,paddingHorizontal: 20, paddingVertical: 10,}} source={require('../assets/images/grg.png')} resizeMode='cover'>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#26A245', fontSize: 18, fontWeight: '600' }}>AC Repair</Text>
                            <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#26A245', marginTop: 10, opacity: 0.3  }} />
                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600' }}>14-Sep-2021</Text>
                                            <Text style={{ fontSize: 10, color: '#000000', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 20, color: '#26A245', fontWeight: '600', textAlign: 'right', position: 'absolute', right: 0, top: 10}}>Completed</Text>
                                    <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600', textAlign: 'right', marginTop: -20, textDecorationLine:'underline' }}>View Details</Text>

                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                   
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={{ backgroundColor: '#ffffff', elevation: 5,  borderRadius: 10,margin: 5, marginBottom: 10 }}>
                    <ImageBackground style={{borderRadius: 10,paddingHorizontal: 20, paddingVertical: 10,}} source={require('../assets/images/gre.png')} resizeMode='cover'>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#A22634', fontSize: 18, fontWeight: '600' }}>AC Repair</Text>
                            <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#A22634', marginTop: 10, opacity: 0.3 }} />
                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600' }}>14-Sep-2021</Text>
                                            <Text style={{ fontSize: 10, color: '#000000', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 20, color: '#A22634', fontWeight: '600', textAlign: 'right', position: 'absolute', right: 0, top: 10}}>Cancelled</Text>
                                    <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600', textAlign: 'right', marginTop: -20, textDecorationLine:'underline' }}>View Details</Text>

                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                   
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={{ backgroundColor: '#ffffff', elevation: 5,  borderRadius: 10,margin: 5, marginBottom: 10 }}>
                    <ImageBackground style={{borderRadius: 10,paddingHorizontal: 20, paddingVertical: 10,}} source={require('../assets/images/grg.png')} resizeMode='cover'>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#26A245', fontSize: 18, fontWeight: '600' }}>AC Repair</Text>
                            <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#26A245', marginTop: 10, opacity: 0.3  }} />
                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600' }}>14-Sep-2021</Text>
                                            <Text style={{ fontSize: 10, color: '#000000', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 20, color: '#26A245', fontWeight: '600', textAlign: 'right', position: 'absolute', right: 0, top: 10}}>Completed</Text>
                                    <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600', textAlign: 'right', marginTop: -20, textDecorationLine:'underline' }}>View Details</Text>

                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                   
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }} style={{ backgroundColor: '#ffffff', elevation: 5,  borderRadius: 10,margin: 5, marginBottom: 10 }}>
                    <ImageBackground style={{borderRadius: 10,paddingHorizontal: 20, paddingVertical: 10,}} source={require('../assets/images/grg.png')} resizeMode='cover'>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#26A245', fontSize: 18, fontWeight: '600' }}>AC Repair</Text>
                            <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500' }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#26A245', marginTop: 10, opacity: 0.3  }} />
                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600' }}>14-Sep-2021</Text>
                                            <Text style={{ fontSize: 10, color: '#000000', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 20, color: '#26A245', fontWeight: '600', textAlign: 'right', position: 'absolute', right: 0, top: 10}}>Completed</Text>
                                    <Text style={{ fontSize: 12, color: '#000000', fontWeight: '600', textAlign: 'right', marginTop: -20, textDecorationLine:'underline' }}>View Details</Text>

                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                   
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
 }

export default function ExpertBookings({navigation}) {
    const width = Dimensions.get('screen').width;
    const [modal, setModal] = React.useState(false);
    const [value, setValue] = React.useState(4);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
            <TouchableOpacity style={{ position: 'absolute', zIndex: 99, elevation: 5, width: Dimensions.get('screen').width / 7, height: Dimensions.get('screen').width / 7, backgroundColor: '#4E53C8', borderRadius: 1000, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', bottom: 20, right: 20 }}>
                <Icon name="call" size={Dimensions.get('screen').width / 15} color={'#ffffff'} />
            </TouchableOpacity>
            <ImageBackground source={require('../assets/images/homeTopBg.png')} style={{ borderRadius: 10, elevation: 5, height: width / 2.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '500', }}>Wallet balence</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('WalletDetails') }}><Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400', borderBottomColor: '#ffffff', borderBottomWidth: 1 }}>View details</Text></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center' }}>
                    <Image resizeMode='cover' style={{ height: 35, width: 35, marginTop: 5 }} source={require('../assets/images/HomeCoin.png')} />
                    <Text style={{ color: '#ffffff', fontSize: 40, fontWeight: '600', marginLeft: 10 }}>10000</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center' }}>
                    <Button onPress={() => { setModal(true) }}
                        style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5 }}
                        mode="contained">
                        <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Recharge</Text>
                    </Button>
                    <TouchableOpacity style={{ backgroundColor: '#ffffff00', borderColor: '#ffffff', borderWidth: 1, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 10, marginLeft: 10 }}>
                        <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>WITHDRAW</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarItemStyle: { width: Dimensions.get('screen').width / 3 - 3.33 },
                    tabBarStyle: { backgroundColor: '#ffffff00', elevation: 0 },
                    tabBarActiveTintColor: '#4E53C8',
                    tabBarInactiveTintColor: '#000000',
                    tabBarIndicatorStyle: { backgroundColor: '#4E53C8' }
                }}
            >
                <Tab.Screen name="New" component={Screen1} />
                <Tab.Screen name="Ongoing" component={Screen2} />
                <Tab.Screen name="Complete" component={Screen3} />

            </Tab.Navigator>
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
                <View style={{ backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 20, borderRadius: 15, display: 'flex', alignContent: 'center', alignItems: 'center', }}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#635E5E', textAlign: 'center', fontSize: 16, fontWeight: '500', marginBottom: 10 }}></Text>
                        <TouchableOpacity onPress={() => { setModal(false) }}>
                            <Ionicons name="close" size={30} color={'#000000'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%' }}>
                        <Text style={{ color: '#000000', textAlign: 'center', fontSize: 18 }}>Quantity</Text>
                        <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { value > 1 && setValue(value - 1) }} style={{ backgroundColor: '#05194E', borderRadius: 100, height: 35, width: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="minus" size={20} color={'#ffffff'} />
                            </TouchableOpacity>
                                
                            <Text style={{ textAlign: 'center', minWidth: 30, borderColor: '#05194E', borderWidth: 1, padding: 2, borderRadius: 5, marginHorizontal: 10, color: '#707070', fontSize: 15 }}>
                                {value}
                            </Text>

                            <TouchableOpacity onPress={() => { setValue(value + 1) }} style={{ backgroundColor: '#05194E', borderRadius: 100, height: 35, width: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="plus" size={20} color={'#ffffff'} />
                            </TouchableOpacity>

                            <Text style={{ color: '#707070', fontSize: 15, marginLeft: 10 }}>* 500</Text>
                            <View style={{ width: '40%', flex: 1 }}>
                                <Text style={{ textAlign: 'right', color: '#707070', fontSize: 20, marginLeft: 10 }}>=  {value * 500}</Text>

                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'left', color: '#707070', fontSize: 15, }}>* 18% GST </Text>
                            <Text style={{ textAlign: 'right', color: '#707070', fontSize: 15, }}>{value * 500 * .18}</Text>

                        </View>

                        <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                        
                        
                        <Text style={{ textAlign: 'center', color: '#000000', fontSize: 15,marginTop: 10 }}>Amount</Text>
                        <Text style={{ textAlign: 'center', color: '#4E53C8', fontSize: 30, marginVertical: 10 }}>₹{value * 500 * .18 + (value * 500)}</Text>

                        <Button onPress={() => { setModal(false) }}
                            style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5, width: '60%', alignSelf: 'center' }}
                            mode="contained">
                            <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Buy {value*500} coins</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
