import React from 'react';
import { View, Text, ScrollView, Dimensions, Image, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

export const FormTextInput = (props) => {
    const { label, placeholder, ...def } = props;
    return (
        <View style={{ marginBottom: 10, zIndex: 1, flex: 1 }}>
            {
                label && <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>{label}</Text>
            }
            <TextInput
                {...def}
                
                placeholder={placeholder}
                placeholderTextColor={'#D8D8D8'}
                style={{ borderWidth: 2, borderColor: '#4A4FBE', borderRadius: 10, padding: 10, }}
            />
        </View>
    )
}

export default function PersonalDetails() {
    const width = Dimensions.get('screen').width
  return (
    
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ paddingHorizontal: 20, paddingTop: 10, }}>
                  <Image source={require('../assets/images/EP.png')} style={{ width: width * 0.5, height: width * 0.5, marginBottom: 10, alignSelf: 'center' }} />
                  <View style={{ flexDirection: 'row' }}>
                      <View style={{paddingRight: 10, flex: 1 }}>
                          <FormTextInput label="First Name" placeholder="First Name" editable = {false}/>
                      </View>
                      <View style={{paddingLeft: 10, flex: 1}}>
                          <FormTextInput label="Last Name" placeholder="Last Name" editable = {false}/>
                      </View>
                  </View>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>What is your DOB?</Text>
                  <View style={{ flexDirection: 'row' }}>
                      <View style={{paddingRight: 10, flex: 1 }}>
                          <FormTextInput label="Day" placeholder="DD" maxLength={2} keyboardType="numeric"/>
                      </View>
                      <View style={{paddingRight: 10, flex: 1}}>
                          <FormTextInput label="Month" placeholder="MM" maxLength={2} keyboardType="numeric"/>
                      </View>
                      <View style={{ flex: 1}}>
                          <FormTextInput label="Year" placeholder="YYYY" maxLength={4} keyboardType="numeric"/>
                      </View>
                  </View>
                  <FormTextInput label="Expirence" placeholder="Expirence(Years)" keyboardType="numeric"/>
                  <FormTextInput label="Bood Group" placeholder="Blood Group" />

                  <FormTextInput label="Alternate Phone No" placeholder="Alternate phone number" maxLength={10} keyboardType={'phone-pad'}/>
                  <FormTextInput label="Family Member Name" placeholder="Family Member Name" />
                  <FormTextInput label="Relationship" placeholder="Relationship" />
                  <FormTextInput label="Family member contact" placeholder="Family member contact" maxLength={10} keyboardType={'phone-pad'}/>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>Bank Details </Text>

                  <FormTextInput label="Account Number" placeholder="Account Number" keyboardType={'numeric'}/>
                  <FormTextInput label="Bank Name" placeholder="Bank Name" />
                  <FormTextInput label="IFSC code" placeholder="IFSC code" />
              </View>

          </ScrollView>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 100, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                <Button onPress={() => {
                    
                }}
                    style={{ width: '50%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Save</Text></Button>
            </View>
        {/* </View> */}
      </View>
  );
}
