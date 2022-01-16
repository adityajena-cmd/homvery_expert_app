import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper'

export default function ProfileUploader({navigation}) {
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <ScrollView showsVerticalScrollIndicator={false}>

   
                <Image source={require('../assets/images/pu.png')}
                    resizeMode='contain'
                    style={{ height: 150, width: 250, marginVertical: 40 }} />
                <Text style={{ color: '#05194E', fontSize: 18, textAlign: 'center', fontWeight: '500', marginVertical: 50 }}>
                    Please upload below mentioned documents to register as technician
                </Text>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', borderBottomColor: '#DCEBF7', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
                    <Image
                        source={require('../assets/images/pu1.png')}
                        resizeMode='contain'
                        style={{ height: Dimensions.get('screen').width / 10, width: Dimensions.get('screen').width / 10, }} />
                    <Text style={{ color: '#05194E', fontWeight: '500', fontSize: 20, marginHorizontal: 15 }}>Adhar Card</Text>
                    <Image
                        resizeMode='contain'
                        source={require('../assets/images/greenTick.png')}
                    />
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image
                            resizeMode='contain'
                            style={{ height: Dimensions.get('screen').width / 12, width: Dimensions.get('screen').width / 12 }}
                            source={require('../assets/images/uploadIcon.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', borderBottomColor: '#DCEBF7', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
                    <Image
                        source={require('../assets/images/pu2.png')}
                        resizeMode='contain'
                        style={{ height: Dimensions.get('screen').width / 10, width: Dimensions.get('screen').width / 10, }} />
                    <Text style={{ color: '#05194E', fontWeight: '500', fontSize: 20, marginHorizontal: 15 }}>Signature</Text>
                    <Image
                        resizeMode='contain'
                        source={require('../assets/images/greenTickD.png')}
                    />
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image
                            resizeMode='contain'
                            style={{ height: Dimensions.get('screen').width / 12, width: Dimensions.get('screen').width / 12 }}
                            source={require('../assets/images/uploadIcon.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', borderBottomColor: '#DCEBF7', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
                    <Image
                        source={require('../assets/images/pu3.png')}
                        resizeMode='contain'
                        style={{ height: Dimensions.get('screen').width / 10, width: Dimensions.get('screen').width / 10, }} />
                    <Text style={{ color: '#05194E', fontWeight: '500', fontSize: 20, marginHorizontal: 15 }}>Profile Picture</Text>
                    <Image
                        resizeMode='contain'
                        source={require('../assets/images/greenTickD.png')}
                    />
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image
                            resizeMode='contain'
                            style={{ height: Dimensions.get('screen').width / 12, width: Dimensions.get('screen').width / 12 }}
                            source={require('../assets/images/uploadIcon.png')}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
                    <Image
                        source={require('../assets/images/pu4.png')}
                        resizeMode='contain'
                        style={{ height: Dimensions.get('screen').width / 10, width: Dimensions.get('screen').width / 10, }} />
                    <Text style={{ color: '#05194E', fontWeight: '500', fontSize: 20, marginHorizontal: 15 }}>Covid Certificate</Text>
                    <Image
                        resizeMode='contain'
                        source={require('../assets/images/greenTickD.png')}
                    />
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image
                            resizeMode='contain'
                            style={{ height: Dimensions.get('screen').width / 12, width: Dimensions.get('screen').width / 12 }}
                            source={require('../assets/images/uploadIcon.png')}
                        />
                    </View>
                </TouchableOpacity>

                <Button onPress={() => {
                    navigation.replace('Home')
                }}
                    style={{ marginTop: 30, width: '60%', fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, alignSelf: 'center' }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Submit</Text></Button>
            </ScrollView>
        </View>
    );
}
