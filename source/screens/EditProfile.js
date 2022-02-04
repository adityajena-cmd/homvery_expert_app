import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, Image, TextInput, TouchableOpacity, Alert, Platform, ToastAndroid } from 'react-native';
import { BottomNavigation, Button } from 'react-native-paper';
import { getDate } from '../config/Utils';
import { launchCamera } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { UpdateTechnicianDetails, UpdateUser, UploadProfile } from '../config/apis/ProfileApis';
import { requestCameraPermisiion } from '../config/LocaitonProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormDropDown from '../components/FormDropDown';

const relation = [
    { label: 'FATHER', value: 'FATHER' },
    { label: 'MOTHER', value: 'MOTHER' },
    { label: 'WIFE', value: 'WIFE' },
    { label: 'BROTHER', value: 'BROTHER' },
    { label: 'SISTER', value: 'SISTER' },
];


const bloodGroup = [
    { label: 'O+ve', value: 'O+ve' },
    { label: 'B+ve', value: 'B+ve' },
    { label: 'A+ve', value: 'A+ve' },
    { label: 'AB-ve', value: 'AB-ve' },
];
const options = {
    mediaType: 'photo',
    cameraType:'front',
    quality: 0.99,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },

}

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

export default function PersonalDetails({ navigation, route }) {
    const width = Dimensions.get('screen').width
    const [token, setToken] = useState(route?.params?.token)
    const [userId, setUserId] = useState(route?.params?.user)
    const [detailsID, setDetailsID] = useState('')
    const [profile, setProfile] = useState(route?.params?.data)
    const [profilesource, setProfileSource] = useState('')

    const [day, setDay] = useState(profile.dob && getDate(profile.dob)[2])
    const [month, setmonth] = useState(profile.dob && getDate(profile.dob)[1])
    const [year, setyear] = useState(profile.dob && getDate(profile.dob)[0])
    const [expirence, setexpirence] = useState(profile.experience ? profile.experience : "NA")
    const [blood, setblood] = useState(profile.bloodgroup ? profile.bloodgroup : "NA")
    const [aadhar, setaadhar] = useState(profile.aadhar?.length == 12 ? profile.aadhar : "NA")
    const [alternateNumber, setalternateNumber] = useState(profile.technician && profile.technician?.alternatephonenumber)
    const [familyMemberName, setfamilyMemberName] = useState(profile.family_contact_name ? profile.family_contact_name : "NA")
    const [familyContact, setfamilyContact] = useState(profile.family_contact_number?.length === 10 ? profile.family_contact_number : "NA")
    const [familyRelation, setfamilyRelation] = useState(profile.family_member_relationship ? profile.family_member_relationship : "NA")
    const [accountNo, setaccountNo] = useState(profile.bank_account_number ? profile.bank_account_number : "NA")
    const [ifscCode, setifscCode] = useState(profile.ifsc ? profile.ifsc : "NA")
    const [bankName, setbankName] = useState(profile.bankname ? profile.bankname : "NA")
    const [accountHolder, setAccountHolder] = useState(profile.accountHolderName ? profile.accountHolderName : "NA")
    const [isLoading, setLoading] = useState(false)


    useEffect(() => {
        requestCameraPermisiion()

    }, []);


    const saveDetailsOnBoard = async () => {
        try {
            await AsyncStorage.setItem('ON_BOARD', "DETAILS");
            navigation.goBack()

        }
        catch (err) {
            console.log(err)

        }
    }


    const updateDeatils = (body) => {
        setLoading(true)
        AsyncStorage.multiGet(
            ['API_TOKEN', 'DETAILS_ID', 'USER_ID', 'ON_BOARD'],
            (err, items) => {
                if (err) {
                } else {
                    let fmData = new FormData()
                    fmData.append("data", JSON.stringify(body))
                    UpdateTechnicianDetails(items[1][1], items[0][1], fmData)
                        .then(res => {
                            setLoading(false)
                            if (res.status === 200) {
                                ToastAndroid.show('Profile Updated!', ToastAndroid.SHORT);
                                if (items[3][1] !== 'DETAILS') {
                                    saveDetailsOnBoard()
                                } else {
                                    navigation.goBack()
                                }

                            }
                        }).catch(err => {
                            setLoading(false)
                            console.log(err.response.data)
                        })

                }
            })



    }

    const validateData = () => {

        if (day?.length == 0 || day == null || day == undefined || day === 'NA') {
            ToastAndroid.show('Enter a Valid Date!', ToastAndroid.SHORT);
            return;
        }
        if (month?.length == 0 || month == null || month == undefined || month === 'NA') {
            ToastAndroid.show('Enter a Valid Date!', ToastAndroid.SHORT);
            return;
        }
        if (year?.length == 0 || year == null || year == undefined || year === 'NA') {
            ToastAndroid.show('Enter a Valid Date!', ToastAndroid.SHORT);
            return;
        }
        if (expirence?.length == 0 || expirence == null || expirence == undefined || expirence === 'NA') {
            ToastAndroid.show('Enter a Valid Expirence!', ToastAndroid.SHORT);
            return;
        }
        if (blood?.length == 0 || blood == null || blood == undefined || blood === 'NA') {
            ToastAndroid.show('Enter your Blood Group!', ToastAndroid.SHORT);
            return;
        }

        if (aadhar?.length == 0 || aadhar == null || aadhar == undefined || aadhar === 'NA') {
            ToastAndroid.show('Enter Aadhar Info!', ToastAndroid.SHORT);
            return;
        }

        if (alternateNumber?.length == 0 || alternateNumber == null || alternateNumber == undefined || alternateNumber === 'NA') {
            ToastAndroid.show('Enter a Alternate Number!', ToastAndroid.SHORT);
            return;
        }

        if (familyMemberName?.length == 0 || familyMemberName == null || familyMemberName == undefined || familyMemberName === 'NA') {
            ToastAndroid.show('Enter a Family Member!', ToastAndroid.SHORT);
            return;
        }

        if (familyContact?.length == 0 || familyContact == null || familyContact == undefined || familyContact === 'NA') {
            ToastAndroid.show('Enter a Family Contact!', ToastAndroid.SHORT);
            return;
        }

        if (familyRelation?.length == 0 || familyRelation == null || familyRelation == undefined || familyRelation === 'NA') {
            ToastAndroid.show('Enter the members Relation!', ToastAndroid.SHORT);
            return;
        }

        if (accountNo?.length == 0 || accountNo == null || accountNo == undefined || accountNo === 'NA') {
            ToastAndroid.show('Enter your Account No!', ToastAndroid.SHORT);
            return;
        }

        if (ifscCode?.length == 0 || ifscCode == null || ifscCode == undefined || ifscCode === 'NA') {
            ToastAndroid.show('Enter your Ifsc Code!', ToastAndroid.SHORT);
            return;
        }

        if (bankName?.length == 0 || bankName == null || bankName == undefined || bankName === 'NA') {
            ToastAndroid.show('Enter your Ifsc Code!', ToastAndroid.SHORT);
            return;
        }
        if (accountHolder?.length == 0 || accountHolder == null || accountHolder == undefined || accountHolder === 'NA') {
            ToastAndroid.show('Enter Account Holder Name!', ToastAndroid.SHORT);
            return;
        }


        const profileData = {
            "technician": userId,
            "aadhar": aadhar,
            "modified_by": userId,
            "dob": year + "-" + month + "-" + day,
            "bankname": bankName,
            "accountHolderName": accountHolder,
            "family_contact_number": familyContact,
            "family_contact_name": familyMemberName,
            "family_member_relationship": familyRelation,
            "bloodgroup": blood,
            "experience": expirence,
            "bank_account_number": accountNo,
            "ifsc": ifscCode
        }

        updateDeatils(profileData);


    }

    const UploadImage = (doc) => {
        let formData = new FormData()
        formData.append('files', doc)
        UploadProfile(token, formData)
            .then(res => {
                if (res.status === 200) {
                    console.log("response",res.data[0].id)
                    let userForm = new FormData()
                    userForm.append('profilepic', res.data[0].id)
                    UpdateUser(userId, token, userForm)
                        .then(res => {
                            console.log(res.status)
                            ToastAndroid.show('Image Uploaded!', ToastAndroid.SHORT);

                        }).catch(err => {
                            console.log("Update", err.response.data)
                        })
                }
            }).catch(err => {
                console.log("Upload", err.response.data)

            })
    }

    const askForUpload = (doc) => {
        return Alert.alert(
            "Upload Image?",
            "Are you sure you want to Update Profile Pic?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        UploadImage(doc)

                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    }


    const addImage = () => {
        console.log('YH')
        launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const { error, uri, originalRotation } = response
                console.log("ROTATTEEE------",originalRotation)
                const source = { uri: response.uri };
                setProfileSource(source)
                console.log('response', JSON.stringify(response));
                const doc = {
                    name: response.assets[0].fileName,
                    type: response.assets[0].type,
                    uri: Platform.OS === 'android' ? response.assets[0].uri : response.assets[0].uri.replace('file://', ''),
                };
                setProfileSource({ uri: doc.uri })
                askForUpload(doc)
            }
        });
    }



    return (

        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                        <Image source={profilesource ? profilesource : profile?.modified_by?.profilepic?.url ? { uri: profile?.modified_by?.profilepic?.url } : require('../assets/images/EP.png')}
                            style={{ width: 160, height: 160,borderRadius: 80, marginBottom: 10, alignSelf: 'center' }} />
                    <TouchableOpacity style={{marginTop:20}} onPress={() => {
                        requestCameraPermisiion();
                        addImage()
                    }}>
                        <Text style={{ color: '#41C461', fontWeight: '500', marginBottom: 20, fontSize: 15, marginTop: -20, textAlign: 'center' }}><MaterialCommunityIcons size={16} name='pencil' /> Edit</Text>
                    </TouchableOpacity>
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
                    <FormTextInput label="Expirence" placeholder="Expirence(Years)" onChangeText={(text) => { setexpirence(text) }} value={expirence.toString()} keyboardType="numeric" />
                    <FormDropDown label="Blood Group" items={bloodGroup} setValue={(text) => { setblood(text) }} placeholder="Blood Group" value={blood} />
                    <FormTextInput label="Aadhar Card No" placeholder="Aadhar Card No" onChangeText={(text) => { setaadhar(text) }} maxLength={12} value={aadhar} keyboardType={'numeric'} />


                    <FormTextInput label="Alternate Phone No" placeholder="Alternate phone number" onChangeText={(text) => { setalternateNumber(text) }} value={alternateNumber} maxLength={10} keyboardType={'phone-pad'} />
                    <FormTextInput label="Family Member Name" placeholder="Family Member Name" onChangeText={(text) => { setfamilyMemberName(text) }} value={familyMemberName} />
                    <FormDropDown label="Relationship" placeholder="Relationship" value={familyRelation} items={relation} setValue={(text) => { setfamilyRelation(text) }} />
                    <FormTextInput label="Family member contact" placeholder="Family member contact" maxLength={10} onChangeText={(text) => { setfamilyContact(text) }} keyboardType={'phone-pad'} value={familyContact} />
                    <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>Bank Details </Text>

                    <FormTextInput label="Account Number" placeholder="Account Number" keyboardType={'numeric'} onChangeText={(text) => { setaccountNo(text) }} value={accountNo} />
                    <FormTextInput label="Bank Name" placeholder="Bank Name" value={bankName} onChangeText={(text) => { setbankName(text) }} />
                    <FormTextInput label="IFSC code" placeholder="IFSC code" value={ifscCode} onChangeText={(text) => { setifscCode(text) }} />
                    <FormTextInput label="Account Holder Name" placeholder="Account Holder Name" value={accountHolder} onChangeText={(text) => { setAccountHolder(text) }} />
                </View>

            </ScrollView>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 100, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                <Button onPress={() => {
                    validateData()
                }}
                    disabled={isLoading}
                    loading={isLoading}
                    color='#05194E'
                    style={{ width: '50%', marginVertical: 20, fontSize: 20, borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Save</Text></Button>
            </View>
            {/* </View> */}
        </View>
    );
}
