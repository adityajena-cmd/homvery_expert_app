import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ToastAndroid, Image, StatusBar, Dimensions, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import Carousel from 'react-native-snap-carousel'
import { Login } from '../config/apis/AuthApi'
import { openBrowser } from '../config/Utils'
import Slider from '../components/Slider'

const LoginScreen = ({navigation}) => {
    const [value, setvalue] = useState('9588754120')
    const [loading, setLoading] = useState(false);

    const getOTP =()=>{

        if(value === '' || value === null || value.length!=10){
            ToastAndroid.show('Enter a Valid Number!', ToastAndroid.SHORT);
        }else{
            setLoading(true)
            Login({
                phonenumber:value
            }).then(res=>{
                setLoading(false)
                console.log(res.data)
                if(res.status === 200){
                    ToastAndroid.show('OTP Sent!', ToastAndroid.SHORT);
                    navigation.replace('OtpVerification', {
                        num: value
                    })
                }
            }).catch(err=>{
                setLoading(false)

                ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
            })
           
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={'#4E53C8'} barStyle={'light-content'} />
            <ScrollView>
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <View style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                        <Image resizeMode='contain' style={{ marginVertical: 30, height: Dimensions.get('screen').width / 3 }} source={require('../assets/images/LOGO.png')} />
                        <Text style={{ color: '#05194E', fontSize: 15, fontWeight: '400' }}>Welcome to Homvery</Text>
                        <Text style={{ color: '#05194E', fontSize: 26, fontWeight: '500', marginBottom: 30 }}>Expert App</Text>
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
                    <Button onPress={getOTP}
                        disabled={loading}
                        loading={loading}
                        color='#05194E'
                        style={{ marginTop: 20, width: '100%', fontSize: 20, borderRadius: 10, paddingVertical: .5 }}
                        mode="contained"
                    ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Request OTP</Text></Button>


                    <Button onPress={() => { openBrowser('https://google.com') }}
                        style={{ marginTop: 50, width: '100%', fontSize: 20, backgroundColor: '#ffffff', borderColor: '#05194E', borderWidth: 1, borderRadius: 10, paddingVertical: 0.5 }}
                        mode="contained"
                    ><Text style={{ color: '#05194E', fontSize: 20, fontWeight: '400' }}>Register as partner</Text></Button>
                
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'flex-end', alignItems: 'flex-end' }}>

                        <Image source={require('../assets/images/loginImg.png')} style={{ resizeMode: 'contain', height: Dimensions.get('screen').width / 2, }} />
                    </View>

                </View>
            </ScrollView>



            <Slider title="Slide to accept and go" onSwipe={() => { alert('text') }} />



        </View>
    );
}

export default LoginScreen
