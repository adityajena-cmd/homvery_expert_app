import React from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal';


const data2 = [
        {
            name: 'AC not cooling'
        },
        {
            name: 'General servicing'
        },
        {
            name: 'LED Blinking'
        },
        {
            name: 'Remote not working'
        },
        {
            name: 'Remote not working'
        },
]

export function BtnGrp(props) {
    return <TouchableOpacity
        onPress={()=>props.setPreferedTime(props.index)}
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: props.active ? '#4E53C8' : '#ffffff',
            color: '#ffffff',
            borderRadius: 50,
            marginBottom: 10,
            borderColor: '#4E53C8',
            borderWidth: 1,
            width: Dimensions.get('screen').width / 2 - 30,
            alignContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingVertical: 5,
            ...props.customButtonStyle
        }}>
        <Text style={{ color: props.active ? '#ffffff' : '#4E53C8', fontSize: 11, }}>{props.name}</Text>
    </TouchableOpacity>
};

export default function OngoingBooking({navigation}) {
    const width = Dimensions.get('screen').width
    const [modal, setModal] = React.useState(false);
    const [problem, setProblem] = React.useState(0);
    return (
        <View style={{ backgroundColor: '#f8f8f8', flex: 1, paddingHorizontal: 20 }}>
          
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 5, padding: 20, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', borderBottomColor: '#EAE2E2', borderBottomWidth: 1, marginBottom: 20, paddingBottom: 10 }}>
                        <Text style={{ color: '#4E53C8', fontSize: 18 }}>Booking Details</Text>
                        <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500', }}>BH2908769  <MaterialCommunityIcons size={17} name='content-copy' color={'#000000'} /></Text>
                            
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <Button onPress={() => { }}
                            style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5 }}
                            mode="contained"
                        >
                            <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: '400' }}><MaterialCommunityIcons size={10} name='phone' color={'#ffffff'} /> Call Customer</Text>
                        </Button>


                        <TouchableOpacity style={{ backgroundColor: '#ffffff', borderColor: '#05194E', borderWidth: 1, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 10, marginLeft: 10 }}>
                            <Text style={{ color: '#05194E', fontSize: 10, fontWeight: '400' }}><MaterialCommunityIcons size={10} name='map-marker' color={'#05194E'} /> GET DIRECTION</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../assets/images/esc1.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Service Type</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>Air Conditioner Service</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../assets/images/esc2.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Service Location</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>Lorem ipsum dolor sit amet, consetetur ipsum dolor sit amet, consetetur   </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../assets/images/esc3.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Date & time</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>12 Sep 2021    12.00 PM - 3.00 PM</Text>
                        </View>
                    </View>
                    <Button onPress={() => { setModal(true) }}
                        style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5, marginTop: 30, width: '60%', alignSelf: 'center' }}
                        mode="contained"
                    >
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Reschedule</Text>
                    </Button>
                </View>
                <Image source={require('../assets/images/sfty.png')} style={{ width: width - 40, height: width / 2.7 }} resizeMode='cover' />
            
            
               
            </ScrollView>
            <Button onPress={() => { navigation.navigate('CreateQuotation') }}
                style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5, marginVertical: 10, alignSelf: 'center', width: '100%' }}
                mode="contained"
            >
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Create Quotation Page</Text>
            </Button>
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
                <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 15, display: 'flex', }}>
                    <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#635E5E', textAlign: 'center', fontSize: 16, fontWeight: '500', marginBottom: 10 }}></Text>
                        <TouchableOpacity onPress={() => { setModal(false) }}>
                            <Ionicons name="close" size={30} color={'#000000'} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ width: '100%', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: 15 }}>On which date you want to reschedule?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginTop: 15 }}>
                        <Text style={{ textAlign: 'center', color: '#000000', fontSize: 12 }}>Dec 2021</Text>
                        <Text style={{ textAlign: 'center', color: '#000000', fontSize: 12, textDecorationLine: 'underline' }}><MaterialCommunityIcons name='calendar-range' size={12} /> More Details</Text>
                    </View>



                    <View><Text style={{ marginVertical: 20, textAlign: 'center', fontSize: 30, color: '#d8d8d8' }}>CALENDAR</Text></View>
                    

                    <View style={{ marginVertical: 20, backgroundColor: '#F5F5F550', height: 6 }} />

                    <View style={{ padding: 10 }}>
                        <Text style={{ width: '100%', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: 15 }}>Write reason for reschedule? </Text>
                        <TextInput
                            style={{ height: Dimensions.get('screen').width / 3, backgroundColor: '#ffffff', borderRadius: 10, marginTop: 10, paddingHorizontal: 15, paddingVertical: 10, borderColor: '#d8d8d8', borderWidth: 1 }}
                            multiline={true}
                            textAlignVertical='top'
                            placeholder='Please write your problem statement here'
                            placeholderTextColor={'#ddd'} />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 20 }}>

                            {
                                data2.map((item, index) => {
                                    return <BtnGrp
                                        key={index}
                                        index={index}
                                        setPreferedTime={setProblem}
                                        name={item.name}
                                        customButtonStyle={{ width: 'auto', borderRadius: 5, marginRight: 5 }}
                                        active={problem === index} />
                                })
                            }
                        </View>
                    </View>
                    

                    <View style={{ marginVertical: 20, backgroundColor: '#F5F5F550', height: 6 }} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ width: '100%', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: 15 }}>Are you sure to reschedule?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginVertical: 15, }}>
                            <Button onPress={() => { }}
                                style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5, width: '50%' }}
                                mode="contained"
                            >
                                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Yes</Text>
                            </Button>


                            <TouchableOpacity style={{ backgroundColor: '#ffffff', borderColor: '#ffffff', borderWidth: 1, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 10, marginLeft: 10, width: '50%' }}>
                                <Text style={{ color: '#05194E', fontSize: 20, fontWeight: '400', textDecorationLine: 'underline', textAlign: 'center' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}
