import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, Image, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { getDate } from '../config/Utils';

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

export default function PersonalDetails({ route }) {
    const width = Dimensions.get('screen').width
    const [token, setToken] = useState(route?.params?.token)
    const [userId, setUserId] = useState(route?.params?.user)
    const [profile, setProfile] = useState(route?.params?.data)

    const [day, setDay] = useState(profile && getDate(profile.dob)[2])
    const [month, setmonth] = useState(profile && getDate(profile.dob)[1])
    const [year, setyear] = useState(profile && getDate(profile.dob)[0])
    const [expirence, setexpirence] = useState(profile.experience ? profile.experience : "NA")
    const [blood, setblood] = useState(profile.bloodgroup ? profile.bloodgroup : "NA")
    const [aadhar, setaadhar] = useState(profile.aadhar?.length == 12 ? profile.aadhar : "NA")
    const [alternateNumber, setalternateNumber] = useState(profile.technician && profile.technician?.alternatephonenumber)
    const [familyMemberName, setfamilyMemberName] = useState(profile.family_contact_name ? profile.family_contact_name : "NA")
    const [familyContact, setfamilyContact] = useState(profile.family_contact_number.length === 10 ? profile.family_contact_number : "NA")
    const [familyRelation, setfamilyRelation] = useState(profile.family_member_relationship ? profile.family_member_relationship : "NA")
    const [accountNo, setaccountNo] = useState(profile.bank_account_number ? profile.bank_account_number : "NA")
    const [ifscCode, setifscCode] = useState(profile.ifsc ? profile.ifsc : "NA")
    const [bankName, setbankName] = useState(profile.bankname ? profile.bankname : "NA")
    const [isLoading, setLoading] = useState(false)


    const validateData = () => {


    }



    return (

        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 20, paddingTop: 10, }}>
                    <Image source={profile?.modified_by?.profilepic?.url ? { uri: profile?.modified_by?.profilepic?.url } :require('../assets/images/EP.png')} style={{ width: width * 0.5, height: width * 0.5, marginBottom: 10, alignSelf: 'center' }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingRight: 10, flex: 1 }}>
                            <FormTextInput value={profile.technician && profile.technician?.firstname} label="First Name" placeholder="First Name" editable={false} />
                        </View>
                        <View style={{ paddingLeft: 10, flex: 1 }}>
                            <FormTextInput label="Last Name" value={profile.technician && profile.technician?.lastname} placeholder="Last Name" editable={false} />
                        </View>
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>What is your DOB?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingRight: 10, flex: 1 }}>
                            <FormTextInput label="Day" placeholder="DD" onChangeText={(text) => { setDay(text) }} value={day} maxLength={2} keyboardType="numeric" />
                        </View>
                        <View style={{ paddingRight: 10, flex: 1 }}>
                            <FormTextInput label="Month" placeholder="MM" maxLength={2} onChangeText={(text) => { setmonth(text) }} value={month} keyboardType="numeric" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <FormTextInput label="Year" placeholder="YYYY" maxLength={4} onChangeText={(text) => { setyear(text) }} value={year} keyboardType="numeric" />
                        </View>
                    </View>
                    <FormTextInput label="Expirence" placeholder="Expirence(Years)" onChangeText={(text) => { setexpirence(text) }} value={expirence} keyboardType="numeric" />
                    <FormTextInput label="Blood Group" placeholder="Blood Group" value={blood} />
                    <FormTextInput label="Aadhar Card No" placeholder="Aadhar Card No" onChangeText={(text) => { setaadhar(text) }} maxLength={12} value={aadhar} keyboardType={'numeric'} />


                    <FormTextInput label="Alternate Phone No" placeholder="Alternate phone number" onChangeText={(text) => { setalternateNumber(text) }} value={alternateNumber} maxLength={10} keyboardType={'phone-pad'} />
                    <FormTextInput label="Family Member Name" placeholder="Family Member Name" onChangeText={(text) => { setfamilyMemberName(text) }} value={familyMemberName} />
                    <FormTextInput label="Relationship" placeholder="Relationship" value={familyRelation} onChangeText={(text) => { setfamilyRelation(text) }} />
                    <FormTextInput label="Family member contact" placeholder="Family member contact" maxLength={10} onChangeText={(text) => { setfamilyContact(text) }} keyboardType={'phone-pad'} value={familyContact} />
                    <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>Bank Details </Text>

                    <FormTextInput label="Account Number" placeholder="Account Number" keyboardType={'numeric'} onChangeText={(text) => { setaccountNo(text) }} value={accountNo} />
                    <FormTextInput label="Bank Name" placeholder="Bank Name" value={bankName} onChangeText={(text) => { setbankName(text) }} />
                    <FormTextInput label="IFSC code" placeholder="IFSC code" value={ifscCode} onChangeText={(text) => { setifscCode(text) }} />
                </View>

            </ScrollView>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 100, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                <Button onPress={() => {
                    validateData()
                }}
                    style={{ width: '50%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Save</Text></Button>
            </View>
            {/* </View> */}
        </View>
    );
}
