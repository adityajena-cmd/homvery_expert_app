import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, TextInput, TouchableOpacity, ToastAndroid, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { Button } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestLocationPermission } from '../config/LocaitonProvider';
import Geolocation from '@react-native-community/geolocation';
import { GetInventory } from '../config/apis/BookingApis';
import uuid from 'uuid-random';
import { parse } from '@babel/core';
import Slider from '../components/Slider';


const AddInventoryModal = ({ item, modal, setModal, onModalSubmit }) => {


    const [qty, setqty] = useState(1);
    console.log(item.item_price)
    const [priceText, setPriceText] = useState(item?.item_price?.toString());
    useEffect(() => {
        if (item.item_price !== undefined) {
            setPriceText(item.item_price.toString())

        }
    }
        , [item])
    console.log(item)
    return (

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
                    <Text style={{ color: '#4E53C8', textAlign: 'left', fontSize: 18 }}>{item?.item_name}</Text>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#000000', textAlign: 'left', fontSize: 18 }}>Price</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#4E53C8', textAlign: 'left', fontSize: 30 }}>₹</Text>
                            <TextInput keyboardType='numeric' onChangeText={(text) => { setPriceText(text) }} value={priceText} style={{ textAlign: 'center', minWidth: 70, borderColor: '#05194E', borderWidth: 1, padding: 2, borderRadius: 5, marginHorizontal: 10, color: '#707070', fontSize: 15 }} />
                        </View>
                    </View>
                    {item?.item_type !== 'SERVICECHARGE' && <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />}
                    {item?.item_type !== 'SERVICECHARGE' && <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#000000', textAlign: 'left', fontSize: 18 }}>Unit</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>

                            <TouchableOpacity onPress={() => { qty > 1 && setqty(qty - 1) }} style={{ backgroundColor: '#ffffff', borderRadius: 100, height: 35, width: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="minus" size={20} color={'#4E53C8'} />
                            </TouchableOpacity>

                            <Text style={{ textAlign: 'center', minWidth: 30, borderColor: '#05194E', borderWidth: 1, padding: 2, borderRadius: 5, marginHorizontal: 10, color: '#707070', fontSize: 15 }}>
                                {qty}
                            </Text>

                            <TouchableOpacity onPress={() => { setqty(qty + 1) }} style={{ backgroundColor: '#ffffff', borderRadius: 100, height: 35, width: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="plus" size={20} color={'#4E53C8'} />
                            </TouchableOpacity>
                        </View>
                    </View>}
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginVertical: 30 }}>
                        <TouchableOpacity onPress={() => { setModal(false) }} style={{ width: '45%', backgroundColor: '#ffffff', borderColor: '#05194E', borderWidth: 1, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 10, marginLeft: 10 }}>
                            <Text style={{ color: '#05194E', fontSize: 12, fontWeight: '400', textAlign: 'center' }}>CANCEL</Text>
                        </TouchableOpacity>
                        <Button onPress={() => {
                            setqty(1)
                            onModalSubmit(qty, parseInt(priceText), item)
                        }}

                            color='#05194E'
                            style={{ width: '45%', borderRadius: 10, paddingVertical: .5 }}
                            mode="contained">
                            <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: '400' }}>ADD</Text>
                        </Button>



                    </View>
                </View>
            </View>
        </Modal>

    );
};



export default function CreateQuotation({ navigation, route }) {
    const [value, setValue] = React.useState(1);
    const [modal, setModal] = React.useState(false)
    const [token, setToken] = React.useState('')
    const [userId, setUserId] = React.useState('')
    const [totalPrice, setTotalPrice] = React.useState(0)
    const [itemChange, setItemChange] = React.useState(0)
    const [loc, setLoc] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [searchText, setSearchText] = React.useState('')
    const [inventoryList, setInventoryLsit] = React.useState([])
    const [quotationList, setQuotationList] = React.useState([])
    let booking = route?.params?.data
    console.log("SERVICEID-------------------", booking.bookingid.serviceid?.id)
    useEffect(() => {
        let total = 0;
        if (quotationList.length > 0) {

            quotationList.forEach(item => {
                total = total + (parseInt(item.item_price) * item.item_unit);
            })
        } else {
            total = 0
        }
        setTotalPrice(total)
    }, [quotationList, itemChange]);
    const backAction = () => {
        navigation.replace('Home')
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
        if (token === '') {
            getToken()
        } else {
            console.log("NEW", booking.bookingid?.address?.city)
            GetInventory(token, booking.bookingid.serviceid?.id, searchText, booking.bookingid?.address?.city)
                .then(res => {
                    console.log(res.data)
                    setInventoryLsit(res.data)
                    if (res.data.length < 1) {
                        ToastAndroid.show('No Item in Inventory!', ToastAndroid.SHORT);

                    }
                }).catch(err => {
                    console.log(err)
                })

        }


    }, [searchText])
    const onModalSubmit = (qty, price, item) => {
        if (price < 1) {
            ToastAndroid.show('Price Canot be less than 1!', ToastAndroid.SHORT);
            return;

        }
        let data = {
            key: uuid().substring(0, 14),
            item_price: price,
            item_unit: qty,
            item_name: item.item_name,
            item_description: item.item_description,
            item_type: item.item_type,
            price_mask: item.price_mask,
            commission: item.commission,
            id: item.id
        }
        if (!quotationList.find(item => item.id === data.id)) {
            quotationList.push(data)
            setQuotationList(quotationList)
            setItemChange(itemChange + 1)
            setModal(false)
        } else {
            ToastAndroid.show(data.item_name + ' Already Exsist!', ToastAndroid.SHORT);
            return
        }

    }
    const removeQuotation = (uid) => {
        let list = quotationList.filter(item => { return item.key !== uid })
        setQuotationList(list)
        setItemChange(itemChange + 2)
    }

    const getToken = () => {
        AsyncStorage.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
                if (err) {
                    console.log("ERROR===================", err);
                } else {
                    setToken(items[0][1])
                    setUserId(items[1][1])
                    GetInventory(items[0][1], booking.bookingid.serviceid?.id, searchText, booking.bookingid?.address?.city)
                        .then(res => {
                            console.log(res.data)
                            setInventoryLsit(res.data)
                            if (res.data.length < 1) {
                                ToastAndroid.show('No Item in Inventory!', ToastAndroid.SHORT);

                            }
                        }).catch(err => {
                            console.log(err)
                        })
                }
            })
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#ffffff' }}>
            {inventoryList.length > 0 && <AddInventoryModal item={currentItem} modal={modal} setModal={setModal} onModalSubmit={onModalSubmit} />}
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
                                            <Text style={{ color: '#4E53C8', fontSize: 25, fontWeight: '600' }}>{'₹' + item?.item_price}</Text>
                                            <TouchableOpacity onPress={() => { setCurrentItem(item); setModal(true) }} style={{ backgroundColor: '#4E53C8', padding: 4.5, borderRadius: 100, marginLeft: 10 }}>
                                                <MaterialCommunityIcons name="pencil" size={17} color={'#ffffff'} />
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
                    {quotationList.length > 0 && quotationList.map(item => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>

                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    <Text style={{ color: '#000000', fontSize: 14 }}>{item.item_name}</Text>
                                    <MaterialCommunityIcons name="delete" onPress={() => { removeQuotation(item.key) }} size={17} color={'#000'} style={{ marginLeft: 12 }} />
                                </View>
                                <View style={{ marginTop: 10 }}>

                                    <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>{'₹ ' + (parseInt(item.item_price) * item.item_unit)?.toString()}</Text>
                                </View>
                            </View>)
                    })}

                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginVertical: 10 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
                        <View style={{ marginVertical: 5 }}>
                            <Text style={{ color: '#000000', fontSize: 14 }}>Parts Total Amount</Text>
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>{'₹' + totalPrice}</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>

            <View style={{ marginBottom: 30 }}>
                <Slider disable={quotationList.length == 0} title="Review Quotation" onSwipe={() => { navigation.navigate('ShareQuotation', { booking: route?.params.data, token: token, user: userId, data: quotationList, total: totalPrice }) }} />
            </View>


            {/* <Button onPress={() => { }}
                color='#05194E'
                disabled={}
                style={{ borderRadius: 10, paddingVertical: .5, marginVertical: 30, alignSelf: 'center', width: '100%' }}
                mode="contained"
            >
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Review Quotation</Text>
            </Button> */}
        </View>
    );
}
