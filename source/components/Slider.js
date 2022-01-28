import React from 'react';
import { View, Text } from 'react-native';
import SwipeButton from 'rn-swipe-button';

export default function Slider(props) {
        let forceResetLastButton = null;

    return (
        <SwipeButton
            disableResetOnTap
            forceReset={reset => {
                forceResetLastButton = reset
            }}
            containerStyles={{
                borderWidth: 0,
                backgroundColor: '#eeeeee'
            }}
            railFillBorderColor='#eeeeee'
            railBackgroundColor="#eeeeee"
            railFillBackgroundColor='#eeeeee'
            railStyles={{
                backgroundColor: '#eeeeee',
                borderColor: '#eeeeee',
                borderWidth: 0,
                elevation: 5,
            }}
            thumbIconImageSource={require('../assets/images/chright.png')}
            thumbIconBackgroundColor="#05194E"
            thumbIconStyles={{borderWidth: 5 }}
            thumbIconBorderColor='#eeeeee'
                
            title={props.title}
            onSwipeSuccess={props.onSwipe}
        />
    );
}
