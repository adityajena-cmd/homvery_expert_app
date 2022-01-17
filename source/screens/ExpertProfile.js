import React from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import {Button} from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



export const StepperStage = ({stage}) => {
    const width = Dimensions.get('screen').width;
  return (
    <View style={{ padding: 10, paddingTop: 30 }}>
      <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1, borderStyle: 'dashed', width: '80%', alignSelf: 'center', marginBottom: -10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
        <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 }, ![1, 2, 3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../assets/images/greenTick.png')} />
          <Image resizeMode='cover' style={[{ width: width / 6, height: width / 5, marginBottom: 20 }, ![1, 2, 3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../assets/images/stepper1.png')} />
          <Text style={{ fontWeight: '500', color: [1, 2, 3, 4, 5].includes(stage) ? '#000000' : '#d8d8d8', width: width / 6, fontSize: 12, textAlign: 'center' }}>Documents Submitted</Text>
        </View>

        <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 }, ![2, 3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../assets/images/greenTick.png')} />
          <Image resizeMode='cover' style={[{ width: width / 6, height: width / 5, marginBottom: 20 }, ![2, 3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../assets/images/stepper2.png')} />
          <Text style={{ fontWeight: '500', color: [2, 3, 4, 5].includes(stage) ? '#000000' : '#d8d8d8', width: width / 6, fontSize: 12, textAlign: 'center' }}>Details Submitted</Text>
        </View>

        <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 }, ![3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../assets/images/greenTick.png')} />
          <Image resizeMode='cover' style={[{ width: width / 7, height: width / 5, marginBottom: 20 }, ![3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../assets/images/stepper3.png')} />
          <Text style={{ fontWeight: '500', color: [3, 4, 5].includes(stage) ? '#000000' : '#d8d8d8', width: width / 6, fontSize: 12, textAlign: 'center' }}>Quotation Shared</Text>
        </View>
      </View>
    </View>
  );
}
export default function ExpertProfile({navigation}) {
  const width = Dimensions.get('screen').width
  return (
    <View style={{ flex: 1, paddingHorizontal: 20, }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20 }}>
        
        
        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, marginBottom: 20 }}>

          <StepperStage stage={2} />
          <View style={{ marginVertical: 20, backgroundColor: '#F5F5F550', height: 6 }} />

          <Text style={{ color: '#0D0D0D', fontWeight: '700', fontSize: 15, textAlign: 'center', marginVertical: 10 }}>Approval Status Pending</Text>
          <Text style={{ color: '#A1A1A1', fontWeight: '500', fontSize: 15, textAlign: 'center', marginBottom: 10 }}>Please fill all the details in my profile section</Text>

          <Button onPress={() => { }}
            style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5, width: '50%', alignSelf: 'center', marginBottom: 50, marginTop: 10 }}
            mode="contained">
            <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Submit Details</Text>
          </Button>

          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: '#0D0D0D', fontWeight: '700', fontSize: 15, marginVertical: 10 }}>Profile verification status pending</Text>
            <Text style={{ color: '#A1A1A1', fontWeight: '500', fontSize: 15, marginBottom: 10 }}>Profile verification is pending from Homvery.
              You will get notification once its approved.</Text>
          </View>

          <View style={{ marginVertical: 30 }}>
            <Text style={{ color: '#0D0D0D', fontWeight: '700', fontSize: 20, textAlign: 'center', marginVertical: 10 }}>Congratulations!</Text>
            <Text style={{ color: '#A1A1A1', fontWeight: '500', fontSize: 15, textAlign: 'center', marginBottom: 10 }}>Your profile has been approved.</Text>

            <Button onPress={() => { }}
              style={{ backgroundColor: '#05194E', borderRadius: 10, paddingVertical: .5, width: '50%', alignSelf: 'center', marginBottom: 50, marginTop: 10 }}
              mode="contained">
              <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Lets Start</Text>
            </Button>
          </View>
        </View>



        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center',}}>
          <Image source={require('../assets/images/M2.png')} style={{width : width/4, height: width/4}}/>
          <View style={{marginLeft: 30}}>
            <Text style={{color: '#4E53C8', fontWeight: '600', fontSize: 20}}>Paresh Kumar</Text>
            <Text style={{color: '#707070', fontWeight: '400', fontSize: 15}}>pk@gmail.com</Text>
            <Text style={{color: '#707070', fontWeight: '500', fontSize: 15}}>9586856986</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('EditProfile')}}>
              <Text style={{color: '#41C461', fontWeight: '500', fontSize: 15}}><MaterialCommunityIcons size={16} name='pencil' /> edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, padding: 20, backgroundColor: '#ffffff', elevation: 3, borderRadius: 15, height: width, marginTop: 15, marginBottom: 20}}>
            <Text style={{color: '#000000', fontWeight: '500', fontSize: 20, borderBottomColor: '#000000', borderBottomWidth: 0.5, paddingBottom: 10}}>Manage Service</Text>
        </View>
      </ScrollView>
    </View>
  );
}
