import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function WalletDetails() {
  const width = Dimensions.get('screen').width;
    const [modal, setModal] = React.useState(false);
    const [value, setValue] = React.useState(4);
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8', paddingHorizontal: 10 }}>
      <ImageBackground source={require('../assets/images/homeTopBg.png')} style={{ borderRadius: 10, elevation: 5, height: width / 2.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 15, marginTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '500', }}>Wallet Ballance</Text>
          <TouchableOpacity><Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400', borderBottomColor: '#ffffff', borderBottomWidth: 1 }}>View details</Text></TouchableOpacity>
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
          <TouchableOpacity style={{ backgroundColor: '#ffffff00', borderColor: '#ffffff', borderWidth: 1, borderRadius: 10, paddingVertical: 7.5, paddingHorizontal: 10, marginLeft: 10 }}>
                        <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '400' }}>WITHDRAW</Text>
                    </TouchableOpacity>
        </View>
      </ImageBackground>
      <Text style={{ fontSize: 18, color: '#000000', marginVertical: 10 }}>20-27 December 2021</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10, backgroundColor: '#ffffff', borderRadius: 10 }}>
          
          
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 10, marginTop: 5, borderBottomColor: '#DCEBF7', borderBottomWidth: 1 }}>
            <Image source={require('../assets/images/wdg.png')} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ color: '#000000', fontSize: 15 }}>Amount added to wallet</Text>
              <Text style={{ color: '#707070', fontSize: 13 }}>12 Sep 2021</Text>
            </View>
            <View>
              <Text style={{ color: '#48B162', fontSize: 25, fontWeight: '600   ' }}>+200</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 10, marginTop: 5, borderBottomColor: '#DCEBF7', borderBottomWidth: 1 }}>
            <Image source={require('../assets/images/wdr.png')} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ color: '#000000', fontSize: 15 }}>HV Pay (BH2908769)</Text>
              <Text style={{ color: '#707070', fontSize: 13 }}>12 Sep 2021</Text>
            </View>
            <View>
              <Text style={{ color: '#F82D2D', fontSize: 25, fontWeight: '600   ' }}>+200</Text>
            </View>
          </View>

          
          
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 10, marginTop: 5, borderBottomColor: '#DCEBF7', borderBottomWidth: 1 }}>
            <Image source={require('../assets/images/wdg.png')} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ color: '#000000', fontSize: 15 }}>Amount added to wallet</Text>
              <Text style={{ color: '#707070', fontSize: 13 }}>12 Sep 2021</Text>
            </View>
            <View>
              <Text style={{ color: '#48B162', fontSize: 25, fontWeight: '600   ' }}>+200</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 10, marginTop: 5, borderBottomColor: '#DCEBF7', borderBottomWidth: 1 }}>
            <Image source={require('../assets/images/wdr.png')} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ color: '#000000', fontSize: 15 }}>HV Pay (BH2908769)</Text>
              <Text style={{ color: '#707070', fontSize: 13 }}>12 Sep 2021</Text>
            </View>
            <View>
              <Text style={{ color: '#F82D2D', fontSize: 25, fontWeight: '600   ' }}>+200</Text>
            </View>
          </View>

          
          
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 10, marginTop: 5, borderBottomColor: '#DCEBF7', borderBottomWidth: 1 }}>
            <Image source={require('../assets/images/wdg.png')} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ color: '#000000', fontSize: 15 }}>Amount added to wallet</Text>
              <Text style={{ color: '#707070', fontSize: 13 }}>12 Sep 2021</Text>
            </View>
            <View>
              <Text style={{ color: '#48B162', fontSize: 25, fontWeight: '600   ' }}>+200</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 10, marginTop: 5, borderBottomColor: '#DCEBF7', borderBottomWidth: 1 }}>
            <Image source={require('../assets/images/wdr.png')} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ color: '#000000', fontSize: 15 }}>HV Pay (BH2908769)</Text>
              <Text style={{ color: '#707070', fontSize: 13 }}>12 Sep 2021</Text>
            </View>
            <View>
              <Text style={{ color: '#F82D2D', fontSize: 25, fontWeight: '600   ' }}>+200</Text>
            </View>
          </View>

          
          
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 10, marginTop: 5, borderBottomColor: '#DCEBF7', borderBottomWidth: 1 }}>
            <Image source={require('../assets/images/wdg.png')} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ color: '#000000', fontSize: 15 }}>Amount added to wallet</Text>
              <Text style={{ color: '#707070', fontSize: 13 }}>12 Sep 2021</Text>
            </View>
            <View>
              <Text style={{ color: '#48B162', fontSize: 25, fontWeight: '600   ' }}>+200</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 10, marginTop: 5, borderBottomColor: '#DCEBF7', borderBottomWidth: 1 }}>
            <Image source={require('../assets/images/wdr.png')} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ color: '#000000', fontSize: 15 }}>HV Pay (BH2908769)</Text>
              <Text style={{ color: '#707070', fontSize: 13 }}>12 Sep 2021</Text>
            </View>
            <View>
              <Text style={{ color: '#F82D2D', fontSize: 25, fontWeight: '600   ' }}>+200</Text>
            </View>
          </View>

          
          
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 10, marginTop: 5, borderBottomColor: '#DCEBF7', borderBottomWidth: 1 }}>
            <Image source={require('../assets/images/wdg.png')} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ color: '#000000', fontSize: 15 }}>Amount added to wallet</Text>
              <Text style={{ color: '#707070', fontSize: 13 }}>12 Sep 2021</Text>
            </View>
            <View>
              <Text style={{ color: '#48B162', fontSize: 25, fontWeight: '600   ' }}>+200</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 5, paddingBottom: 10, marginTop: 5, borderBottomColor: '#DCEBF7', borderBottomWidth: 1 }}>
            <Image source={require('../assets/images/wdr.png')} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ color: '#000000', fontSize: 15 }}>HV Pay (BH2908769)</Text>
              <Text style={{ color: '#707070', fontSize: 13 }}>12 Sep 2021</Text>
            </View>
            <View>
              <Text style={{ color: '#F82D2D', fontSize: 25, fontWeight: '600   ' }}>+200</Text>
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

            <Button onPress={() => { setModal(false) }}
              style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5, width: '60%', alignSelf: 'center' }}
              mode="contained">
              <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Buy {value * 500} coins</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}
