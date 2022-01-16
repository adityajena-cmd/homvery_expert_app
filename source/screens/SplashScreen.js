import React, { useEffect } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
            // alert('lo')
          }, 1000);
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFFFFF', alignItems: 'center', alignContent: 'center' }}>
            <View style={{flex: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
                <Image source={require('../assets/images/LOGO.png')}/>
            </View>
            <View style={{flex: 1}}>
                <Image style={{width: Dimensions.get('screen').width, height: Dimensions.get('screen').width}} resizeMode='contain' source={require('../assets/images/ON0.png')}/>
            </View>
        </View>
    )
}

export default Splash
