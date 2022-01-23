import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Dimensions, ScrollView, RefreshControl, ToastAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetWalletTransaction } from '../config/apis/BookingApis';
import moment from 'moment';
import uuid from 'uuid-random';
import { CreateTransaction, GetTaxToken, UpdateWallet, WithDrawCoin } from '../config/apis/TransactionAPI';
import urlConfig from '../config/config.json';
import AllInOneSDKManager from 'paytm_allinone_react-native';




export default function WalletDetails({ navigation, route }) {
  const width = Dimensions.get('screen').width;
  const [modal, setModal] = React.useState(route?.params?.modal);
  const [value, setValue] = React.useState(1);
  const [transactions, setTransactions] = React.useState([]);
  const [isRefresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [load, setLoad] = React.useState(0);
  const [token, setToken] = React.useState('');
  const [type, setType] = React.useState(route.params?.type ? route.params?.type : '');
  let userId = route.params?.user
  const [balance, setBalance] = useState(route?.params?.balance)
  const [wallet, setWallet] = React.useState(route?.params?.data);

  const updateBalance = (amount) => {
    const walletObject = {
      type: wallet.type,
      amount: wallet.amount + parseInt(amount),
      user: userId,
    };
    UpdateWallet(token, wallet.id, walletObject)
      .then(res => {
        setLoading(false)
        console.log(res.data)
        if(res.status === 200){
          setLoad(load + 1)
          setModal(false)
        }
      }).catch(err => {
        setLoading(false)
        console.log(err)

      })
  }


  const updateTransaction = (amount) => {
    setLoading(true)
    const transactionObj = {
      wallet: wallet.id,
      createdby: userId,
      type: 'DEPOSIT',
      amount: amount,
      details: 'Amount added to wallet',
    };
    CreateTransaction(token, transactionObj)
      .then(res => {
        console.log(res.data)
        if (res.status === 200) {
          updateBalance(amount)
        }
      }).catch(err => {
        setLoading(false)
        console.log(err)

      })
  }

  const IntiateTransaction = (amount) => {

    if (type === "Recharge") {
      let OrderID = userId + uuid().substring(0, 10) + 'Recharge';
      setLoading(true)
      GetTaxToken(OrderID, 1, userId)
        .then(res => {
          console.log("TRANSACTION", res.data.body.txnToken)
          let paytmPayload = {
            orderId: OrderID,
            mid: 'uHnuRf08065935005565',
            txnToken: res.data.body.txnToken,
            amount: '1',
            callbackUrl: 'https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=' + OrderID,
            isStaging: false,
            restrictAppInvoke: false

          }
          AllInOneSDKManager.startTransaction(
            paytmPayload.orderId,
            paytmPayload.mid,
            paytmPayload.txnToken,
            paytmPayload.amount,
            paytmPayload.callbackUrl,
            paytmPayload.isStaging,
            paytmPayload.restrictAppInvoke
          )
            .then((result) => {
              console.log("result", result);
              setLoading(false)
              // handle result ..
              if (result.STATUS === 'TXN_SUCCESS') {
                ToastAndroid.show('Transaction Succesfull!', ToastAndroid.SHORT);
                updateTransaction(amount)
              } else if (result.STATUS === 'TXN_SUCCESS') {
                ToastAndroid.show('Transaction Failed!', ToastAndroid.SHORT);
              }
              else {
                ToastAndroid.show('Some Error OCcured !\nTry Again.', ToastAndroid.SHORT);
              }
            })
            .catch((err) => {
              // handle error ..
              alert("Some Error OCcured !\nTry Again.")
              console.log(err)
            });
        }).catch(err => {
          console.log("TRANSACTION====ERR", err)
          setLoading(false)
          ToastAndroid.show('Recharge Cancelled!', ToastAndroid.SHORT);

        })
    } else {
      setLoading(true)
      let body = {
        coins: amount
      }
      WithDrawCoin(token, body)
        .then(res => {
          setLoading(false)
          console.log(res.data)
          if(res.status === 200){
            setLoad(load+1)
          }
        }).catch(err => {
          setLoading(false)
          console.log(err.response.data)

        })
    }

  }




  const onRefresh = () => {
    setLoad(load + 1)
  }

  useEffect(() => {
    setRefresh(true)
    setBalance(route?.params?.balance)
    setTransactions([])
    AsyncStorage.multiGet(
      ['API_TOKEN', 'USER_ID'],
      (err, items) => {
        if (err) {
          console.warn(err);
        } else {
          setToken(items[0][1])
          GetWalletTransaction(items[1][1], items[0][1])
            .then(res => {
              setRefresh(false)

              console.log(res.data)
              if (res.status === 200) {
                let data = res.data.sort(function (a, b) {
                  return a.id - b.id
                })
                setTransactions(data)
              }

            }).catch(err => {
              setRefresh(false)

              console.log(err)
            })
        }
      })
  }, [route?.params?.balance, load])

  const getWalletBG = (balance) => {
    if (balance >= 5000) {
      return require('../assets/images/walletGreenBG.png')
    } else if (balance >= 1000 && balance < 5000) {
      return require('../assets/images/walletOrangeBG.png')
    } else {
      return require('../assets/images/walletRedBG.png')
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8', paddingHorizontal: 10 }}>
      <ImageBackground source={getWalletBG(route?.params?.balance)} style={{ borderRadius: 10, elevation: 5, height: width / 2.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 15, marginTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '500', }}>Wallet Ballance</Text>
          <TouchableOpacity><Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400', borderBottomColor: '#ffffff', borderBottomWidth: 1 }}>View details</Text></TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center' }}>
          <Image resizeMode='cover' style={{ height: 35, width: 35, marginTop: 5 }} source={require('../assets/images/HomeCoin.png')} />
          <Text style={{ color: '#ffffff', fontSize: 40, fontWeight: '600', marginLeft: 10 }}>{balance}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center' }}>
          <Button onPress={() => { setType("Recharge"); setModal(true) }}
            style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5 }}
            mode="contained">
            <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Recharge</Text>
          </Button>
          <TouchableOpacity onPress={() => { setType("Withdraw"); setModal(true) }} style={{ backgroundColor: '#ffffff00', borderColor: '#ffffff', borderWidth: 1, borderRadius: 10, paddingVertical: 7.5, paddingHorizontal: 10, marginLeft: 10 }}>
            <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '400' }}>WITHDRAW</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Text style={{ fontSize: 18, color: '#000000', marginVertical: 10 }}>20-27 December 2021</Text>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={onRefresh} />
        }>
        <View style={{ padding: 10, backgroundColor: '#ffffff', borderRadius: 10 }}>

          {
            transactions.length > 0 ? transactions.map(item => {
              if (item.amount < 0) {
                return (
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 10, marginTop: 5, borderBottomColor: '#DCEBF7', borderBottomWidth: 1 }}>
                    <Image source={require('../assets/images/wdr.png')} />
                    <View style={{ flex: 1, paddingLeft: 10 }}>
                      <Text style={{ color: '#000000', fontSize: 15 }}>{item?.details ?item?.details:'Amount Withdrawn'}</Text>
                      <Text style={{ color: '#707070', fontSize: 13 }}>{moment(new Date(item?.created_at)).format('Do MMM YYYY')}</Text>
                    </View>
                    <View>
                      <Text style={{ color: '#F82D2D', fontSize: 25, fontWeight: '600   ' }}>{item?.amount}</Text>
                    </View>
                  </View>
                )
              } else {
                return (
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 10, marginTop: 5, borderBottomColor: '#DCEBF7', borderBottomWidth: 1 }}>
                    <Image source={require('../assets/images/wdg.png')} />
                    <View style={{ flex: 1, paddingLeft: 10 }}>
                      <Text style={{ color: '#000000', fontSize: 15 }}>{item?.details ?item?.details:'Amount Added'}</Text>
                      <Text style={{ color: '#707070', fontSize: 13 }}>{moment(new Date(item?.created_at)).format('Do MMM YYYY')}</Text>
                    </View>
                    <View>
                      <Text style={{ color: '#48B162', fontSize: 25, fontWeight: '600   ' }}>{item?.amount}</Text>
                    </View>
                  </View>)
              }
            }) : <></>

          }
        </View>
      </ScrollView>
      <Modal
        isVisible={modal}
        hasBackdrop={true}
        backdropOpacity={0.3}
        backdropColor={"#000000"}
        animationType="fadeIn"
        swipeDirection={['down']}
        onSwipeComplete={() => { setModal(false) }}
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


            <Text style={{ textAlign: 'center', color: '#000000', fontSize: 15, marginTop: 10 }}>Amount</Text>
            <Text style={{ textAlign: 'center', color: '#4E53C8', fontSize: 40, marginVertical: 10 }}>₹{value * 500 * .18 + (value * 500)}</Text>

            <Button onPress={() => { IntiateTransaction(value * 500) }}
              color='#05194E'
              loading={loading}
              disabled={loading}
              style={{ borderRadius: 10, paddingVertical: .5, width: '80%', alignSelf: 'center' }}
              mode="contained">
              <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>{type ? type.toUpperCase() + " " + (value * 500) + ' coins' : ""}</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}
