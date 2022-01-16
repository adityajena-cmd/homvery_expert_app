import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native'
import { Button } from 'react-native-paper'

const LoginScreen = ({navigation}) => {
    const [value, setvalue] = useState('')
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={'#4E53C8'} barStyle={'light-content'} />
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                <View style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                    <Image resizeMode='contain' style={{ marginVertical: 30, height: Dimensions.get('screen').width / 3 }} source={require('../assets/images/LOGO.png')} />
                    <Text style={{color: '#05194E', fontSize: 15, fontWeight: '400'}}>Welcome to Homvery</Text>
                    <Text style={{color: '#05194E', fontSize: 26, fontWeight: '500', marginBottom: 30}}>Expert App</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ paddingVertical: 8, paddingHorizontal: 20, borderColor: '#00B0EB', borderWidth: 1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 20 }}>+91</Text>
                    </View>
                    <View style={{ paddingVertical: 0, paddingHorizontal: 20, borderColor: '#00B0EB', borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10, flex: 1, borderLeftWidth: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <TextInput
                            style={{ width: '100%', color: '#000000', fontSize: 20 }}
                            placeholder={'Mobile Number'}
                            value={value}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChangeText={(text) => setvalue(text)}
                            placeholderTextColor={'#8A8A8A'}
                        />
                    </View>
                </View>
                <Button onPress={() => {
                    navigation.replace('OtpVerification', {
                        num: value
                    })
                }}
                    style={{ marginTop: 20, width: '100%', fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Request OTP</Text></Button>


                <Button onPress={() => {}}
                    style={{ marginTop: 50, width: '100%', fontSize: 20,backgroundColor: '#ffffff',  borderColor: '#05194E',borderWidth: 1, borderRadius: 10, paddingVertical: 0.5 }}
                    mode="contained"
                ><Text style={{ color: '#05194E', fontSize: 20, fontWeight: '400' }}>Register as partner</Text></Button>
                
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'flex-end', alignItems: 'flex-end'}}>

                    <Image source={require('../assets/images/loginImg.png')} style={{ resizeMode: 'contain', height: Dimensions.get('screen').width/2, }} />
                </View>

            </View>
        </View>
    );
}

export default LoginScreen
