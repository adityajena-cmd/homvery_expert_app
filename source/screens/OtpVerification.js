import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Button } from 'react-native-paper'

const OtpVerification = ({navigation, route}) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}><Fontisto name="arrow-left-l" color={'#8A8A8A'} size={20} /></TouchableOpacity>
                <Text style={{ fontSize: 20, color: '#8A8A8A' }}>OTP Verification</Text>
                <Fontisto name="arrow-left" color={'#FFFFFF00'} size={20} />
            </View>
            <View style={{ }}>
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/images/otpImg1.png')} style={{ resizeMode: 'contain', height: 150, width: 250, marginVertical: 40 }} />
                    <Text style={{ color: '#05194E', fontSize: 20, fontWeight: '500' }}>We have sent a verification code to</Text>
                    <Text style={{ color: '#05194E', fontSize: 30, fontWeight: '500', marginTop: 20 }}>{route?.params.num}</Text>
                    <OTPTextInput
                        tintColor={'#00B0EB'}
                        offTintColor={'#00B0EB'}
                        textInputStyle={{ borderRadius: 10, borderWidth: 2, borderColor: '#00B0EB', marginVertical: 20, borderBottomWidth: 2 }}
                    />
                    <TouchableOpacity onPress={() => {
                        navigation.replace('ProfileUploader')
                    }}><Text style={{ color: '#8A8A8A', fontSize: 20, fontWeight: '500', marginTop: 10 }}>If you don't receive a OTP!<Text style={{ color: '#05194E', fontSize: 20, fontWeight: '500', }}>   Resend</Text></Text></TouchableOpacity>
                    <Button onPress={() => {
                        navigation.replace('ProfileUploader')
                    }}
                        style={{ marginTop: 30, width: '60%', fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 5 }}
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
