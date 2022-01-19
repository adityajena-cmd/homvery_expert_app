import React, { useEffect } from 'react';
import { View, Text, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { Button } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestLocationPermission } from '../config/LocaitonProvider';
import Geolocation from '@react-native-community/geolocation';
import { GetInventory } from '../config/apis/BookingApis';

const config = {
    enableHighAccuracy: false,
    timeout: 2000,
    maximumAge: 3600000,
};

export default function CreateQuotation({ navigation }) {
    const [value, setValue] = React.useState(4);
    const [modal, setModal] = React.useState(false)
    const [token, setToken] = React.useState('')
    const [loc, setLoc] = React.useState([]);

    const [searchText, setSearchText] = React.useState('')
    const [inventoryList, setInventoryLsit] = React.useState([])
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
        if (token === '') {
            getToken()
        }

        GetInventory(token, searchText)
            .then(res => {
                console.log(res.data)
                setInventoryLsit(res.data)
            }).catch(err => {
                console.log(err)
            })

    }, [searchText])

    const getToken = () => {
        AsyncStorage.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
                if (err) {
                    console.log("ERROR===================", err);
                } else {
                    setToken(items[0][1])
                }
            })
    }





    return (
        <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#ffffff' }}>
            <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 0,
                    paddingHorizontal: 5,
                    elevation: 5,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    marginVertical: 10,
                    marginHorizontal: 4
                }}>
                    <Icon size={20} name="search1" color='#4E53C8' />
                    <TextInput
                        style={{ width: '90%', color: '#000000', fontSize: 20, paddingLeft: 20 }}
                        placeholder={'Search Item'}
                        maxLength={50}
                        onChangeText={(text) => setSearchText(text)}
                        placeholderTextColor={'#D8D8D8'}
                    />
                </View>
                <View style={{ backgroundColor: '#ffffff', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, elevation: 5, margin: 5 }}>
                    {
                        inventoryList.length > 0 ?
                            inventoryList.map(item => {
                                return (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', borderBottomColor: '#EAE2E2', borderBottomWidth: 1, paddingVertical: 10, }}>
                                        <View>
                                            <Text style={{ color: '#4E53C8', fontSize: 15, }}>{item?.item_name}</Text>
                                            <Text style={{ color: '#707070', fontSize: 15, }}>{item?.item_description}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                            <Text style={{ color: '#4E53C8', fontSize: 25, fontWeight: '600' }}>{'₹'+item?.item_price}</Text>
                                            <TouchableOpacity onPress={() => { setModal(true) }} style={{ backgroundColor: '#4E53C8', padding: 2.5, borderRadius: 100, marginLeft: 10 }}>
                                                <MaterialCommunityIcons name="pencil" size={20} color={'#ffffff'} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>)
                            }) : <></>}


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                        <Text style={{ color: '#707070', fontSize: 18, }}>Not in the list?</Text>
                        <TouchableOpacity style={{ borderColor: '#05194E', borderWidth: 1, paddingVertical: 2.5, paddingHorizontal: 20, borderRadius: 5, }}>
                            <Text style={{ color: '#05194E', fontSize: 15, }}>Help</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ backgroundColor: '#ffffff', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, elevation: 5, margin: 5 }}>

                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center', fontWeight: '600' }}>Quotation</Text>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10, marginBottom: 10 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
                        <View>
                            <View style={{ marginTop: 10, flexDirection: 'row', }}>
                                <Text style={{ color: '#000000', fontSize: 14 }}>Base Payment</Text>
                                <MaterialCommunityIcons name="delete" size={13} color={'#000'} style={{ marginLeft: 12 }} />

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

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
                        <View style={{ marginVertical: 5 }}>
                            <Text style={{ color: '#000000', fontSize: 14 }}>Parts Total Amount</Text>
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>₹1400</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>


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
                        <Text style={{ color: '#4E53C8', textAlign: 'left', fontSize: 18 }}>Item Name</Text>
                        <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#000000', textAlign: 'left', fontSize: 18 }}>Price</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#4E53C8', textAlign: 'left', fontSize: 30 }}>₹</Text>
                                <TextInput style={{ textAlign: 'center', minWidth: 70, borderColor: '#05194E', borderWidth: 1, padding: 2, borderRadius: 5, marginHorizontal: 10, color: '#707070', fontSize: 15 }} />
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#000000', textAlign: 'left', fontSize: 18 }}>Unit</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>

                                <TouchableOpacity onPress={() => { value > 1 && setValue(value - 1) }} style={{ backgroundColor: '#ffffff', borderRadius: 100, height: 35, width: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="minus" size={20} color={'#4E53C8'} />
                                </TouchableOpacity>

                                <Text style={{ textAlign: 'center', minWidth: 30, borderColor: '#05194E', borderWidth: 1, padding: 2, borderRadius: 5, marginHorizontal: 10, color: '#707070', fontSize: 15 }}>
                                    {value}
                                </Text>

                                <TouchableOpacity onPress={() => { setValue(value + 1) }} style={{ backgroundColor: '#ffffff', borderRadius: 100, height: 35, width: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="plus" size={20} color={'#4E53C8'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginVertical: 30 }}>
                            <TouchableOpacity onPress={() => { setModal(false) }} style={{ width: '45%', backgroundColor: '#ffffff', borderColor: '#05194E', borderWidth: 1, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 10, marginLeft: 10 }}>
                                <Text style={{ color: '#05194E', fontSize: 12, fontWeight: '400', textAlign: 'center' }}>CANCEL</Text>
                            </TouchableOpacity>
                            <Button onPress={() => { setModal(false) }}
                                style={{ width: '45%', backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5 }}
                                mode="contained">
                                <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: '400' }}>ADD</Text>
                            </Button>



                        </View>
                    </View>
                </View>
            </Modal>



            <Button onPress={() => { navigation.navigate('ShareQuotation') }}
                style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5, marginVertical: 30, alignSelf: 'center', width: '100%' }}
                mode="contained"
            >
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Share Quotation</Text>
            </Button>
        </View>
    );
}
