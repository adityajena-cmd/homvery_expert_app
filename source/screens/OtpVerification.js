import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, ToastAndroid } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Button } from 'react-native-paper'
import { CheckOTP, Login } from '../config/apis/AuthApi'
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpVerification = ({ navigation, route }) => {

    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false);

    const [isError, setError] = useState(false)


    const saveLoginDetails = async (token, user_id, user_name = "", email = "") => {
        try {
            await AsyncStorage.setItem('API_TOKEN', token);
            await AsyncStorage.setItem('USER_EMAIL', email);
            await AsyncStorage.setItem('USER_ID', user_id.toString());
            await AsyncStorage.setItem('USER_NAME', user_name);
            navigation.replace('ProfileUploader')

        }
        catch (err) {
            console.log(err)
            alert(err)
        }

    }

    const getOTP = () => {
        setLoading(true)
        let value = route?.params.num
        if (value === '' || value === null || value.length != 10) {
            ToastAndroid.show('Enter a Valid Number!', ToastAndroid.SHORT);
        } else {
            Login({
                phonenumber: value
            }).then(res => {
                setLoading(false)
                console.log(res.data)
                if (res.status === 200) {
                    ToastAndroid.show('OTP Sent Again!', ToastAndroid.SHORT);
                }
            }).catch(err => {
                setLoading(false)

                ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
            })

        }
    }

    const validateOTP = () => {
        if (otp === '' || otp === null || otp.length != 4) {
            ToastAndroid.show('Enter a Valid OTP !', ToastAndroid.SHORT);
        } else {
            setLoading(true)
            CheckOTP(
                {
                    phonenumber: route?.params.num,
                    otp: otp
                }
            ).then(res => {
                setLoading(false)

                if (res.status === 200) {
                    saveLoginDetails(
                        res.data.jwt,
                        res.data.user.id,
                        res.data.user.username,
                        res.data.user.email,
                    );
                } else {
                    ToastAndroid.show('Enter a Valid OTP!', ToastAndroid.SHORT);
                    setError(true)
                }
                console.log(res.data, res.status)
            }).catch(err => {
                setLoading(false)


                ToastAndroid.show('Enter a Valid OTP!', ToastAndroid.SHORT);
                setError(true)

                console.log(err.response.data)
            })
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}><Fontisto name="arrow-left-l" color={'#8A8A8A'} size={20} /></TouchableOpacity>
                <Text style={{ fontSize: 20, color: '#8A8A8A' }}>OTP Verification</Text>
                <Fontisto name="arrow-left" color={'#FFFFFF00'} size={20} />
            </View>
            <View style={{}}>
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/images/otpImg1.png')} style={{ resizeMode: 'contain', height: 150, width: 250, marginVertical: 40 }} />
                    <Text style={{ color: '#05194E', fontSize: 20, fontWeight: '500' }}>We have sent a verification code to</Text>
                    <Text style={{ color: '#05194E', fontSize: 30, fontWeight: '500', marginTop: 20 }}>{'+91 - ' + route?.params.num}</Text>
                    <OTPTextInput
                        tintColor={!isError ? '#00B0EB' : '#FF0000'}
                        offTintColor={!isError ? '#00B0EB' : '#FF0000'}

                        handleTextChange={text => { setOtp(text); setError(false) }}
                        textInputStyle={{ borderRadius: 10, borderWidth: 2, borderColor: '#00B0EB', marginVertical: 20, borderBottomWidth: 2 }}
                    />
                    <TouchableOpacity onPress={()=>{
                        if(!loading){
                            getOTP()
                        }
                        }}><Text style={{ color: '#8A8A8A', fontSize: 20, fontWeight: '500', marginTop: 10 }}>If you don't receive a OTP!<Text style={{ color: '#05194E', fontSize: 20, fontWeight: '500', }}>   Resend</Text></Text></TouchableOpacity>
                    <Button onPress={validateOTP}
                        disabled={loading}
                        loading={loading}
                        color='#05194E'
                        style={{ marginTop: 30, width: '60%', fontSize: 20, borderRadius: 10, paddingVertical: 5 }}
                        mode="contained"
                    ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Verify</Text></Button>

                </View>
            </View><View style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end' }}>
                <Image source={require('../assets/images/otpImg2.png')} style={{ resizeMode: 'contain', width: Dimensions.get('screen').width, }} />
            </View>
        </View>
    );
}

export default OtpVerification
