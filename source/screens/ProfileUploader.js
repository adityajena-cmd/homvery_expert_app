import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetTechnicianDetails, UpdateTechnicianDetails, UpdateUser, UploadProfile } from '../config/apis/ProfileApis';
import DocumentPicker from 'react-native-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { requestCameraPermisiion } from '../config/LocaitonProvider';
import { launchCamera } from 'react-native-image-picker';



const options = {
    mediaType: 'photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },

}
export default function ProfileUploader({ navigation }) {

    const [token, settoken] = useState('')
    const [userId, setUserId] = useState('')
    const [count, setCount] = useState(0)
    const [profileData, setProfileData] = useState('')
    const [loading, setLoading] = useState(false);

    const [aadharDoc, setAadharDoc] = useState(null)
    const [signatureDoc, setSignatureDoc] = useState(null)
    const [covidDoc, setCovidDoc] = useState(null)
    const [profileDoc, setProfileDoc] = useState(null)


    const saveDetailsID = async (id) => {
        try {
            await AsyncStorage.setItem('DETAILS_ID', id.toString());

        }
        catch (err) {
            console.log(err)

        }
    }
    const saveDetailsOnBoard = async () => {
        try {
            await AsyncStorage.setItem('ON_BOARD', "DETAILS");
            navigation.replace("Home", { screen: "MyProfile" })

        }
        catch (err) {
            console.log(err)

        }
    }

    const saveDocOnBoard = async () => {
        try {
            await AsyncStorage.setItem('ON_BOARD', "DOCS");
            navigation.replace("Home", { screen: "MyProfile" })

        }
        catch (err) {
            console.log(err)

        }
    }

    const saveApprovedOnBoard = async () => {
        try {
            await AsyncStorage.setItem('ON_BOARD', "APPROVED");
            navigation.replace("Home", { screen: "MyProfile" })
        }
        catch (err) {
            console.log(err)

        }
    }

    const UploadImage = (doc) => {
        let formData = new FormData()
        formData.append('files', doc)
        UploadProfile(token, formData)
            .then(res => {
                if (res.status === 200) {
                    let userForm = new FormData()
                    userForm.append('profilepic', res.data[0].id)
                    UpdateUser(userId, token, userForm)
                        .then(res => {
                            ToastAndroid.show('Image Uploaded!', ToastAndroid.SHORT);

                        }).catch(err => {
                            console.log(err)
                        })
                }
            }).catch(err => {
                console.log(err)

            })
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
                const source = { uri: response.uri };
                setProfileSource(source)
                console.log('response', JSON.stringify(response));
                const doc = {
                    name: response.fileName,
                    type: response.type,
                    uri:
                        Platform.OS === 'android' ? response.uri : response.uri.replace('file://', ''),
                };
                setProfileDoc(doc)
            }
        });
    }

    useEffect(() => {
        requestCameraPermisiion()

        AsyncStorage.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
                if (err) {
                    console.warn(err);
                } else {
                    settoken(items[0][1])
                    setUserId(items[1][1])
                    console.log(items);
                    setLoading(true)
                    GetTechnicianDetails(items[1][1], items[0][1])
                        .then(res => {
                            console.log(res.data)
                            if (res.status === 200) {
                                saveDetailsID(res.data[0].id);

                                if (res.data[0]?.aadharcard_photo !== null && res.data[0]?.signature !== null
                                    && res.data[0]?.covidcertificate !== null) {
                                    if (res.data[0]?.bank_account_number != '' && res.data[0]?.experience != null) {
                                        saveDetailsOnBoard()

                                    } else {
                                        saveDocOnBoard()

                                    }
                                }
                                if (res.data[0]?.approved === true) {
                                    // navigation.replace('Home')
                                    console.log("APPPROOVED)))))))))))))))))))")
                                    saveApprovedOnBoard()
                                }
                                setLoading(false)
                                setProfileData(res.data[0])


                            }
                        }).catch(err => {
                            setLoading(false)

                            console.log(err)
                        })
                }
            }
        );
    }, [count])

    const getDocuments = (type) => {
        DocumentPicker.pickSingle({})
            .then(res => {
                console.log(res)
                const doc = {
                    name: res.name,
                    type: res.type,
                    uri:
                        Platform.OS === 'android' ? res.uri : res.uri.replace('file://', ''),
                };
                switch (type) {
                    case 'aadhar':
                        setAadharDoc(doc)
                        break;
                    case 'covid':
                        setCovidDoc(doc)
                        break;
                    case 'sign':
                        setSignatureDoc(doc)
                        break;
                    default:
                        alert('Some Error Occured');
                        break;
                }

            }).catch(err => {
                alert(err)
            })

    }

    const submitDocuments = () => {
        setLoading(true)
        UploadImage(profileDoc)
        let formData = new FormData();
        if (aadharDoc) {
            formData.append('files.aadharcard_photo', aadharDoc)
        }
        if (signatureDoc) {
            formData.append('files.signature', signatureDoc)
        }
        if (covidDoc) {
            formData.append('files.covidcertificate', covidDoc)
        }
        formData.append('data', JSON.stringify({

            "available": true,

        }))
        console.log(formData)
        UpdateTechnicianDetails(profileData.id, token, formData)
            .then(res => {
                console.log(res.data);
                setLoading(false)
                setAadharDoc(null)
                setCovidDoc(null)
                setSignatureDoc(null)
                setCount(count + 3)
                if (res.status == 200) {
                    if (profileData?.aadharcard_photo !== null && profileData?.signature !== null
                        && profileData?.covidcertificate !== null) {
                        navigation.replace('Home')
                    }
                }


            }).catch(err => {
                console.log(err.response.data)
                setLoading(false)
            })

    }
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Spinner
                    visible={loading}
                    size="small"
                    textContent={'Loading...'}
                    textStyle={{
                        color: '#fff',
                        fontSize: 14,
                        marginTop: 2,
                    }}
                />

                <Image source={require('../assets/images/pu.png')}
                    resizeMode='contain'
                    style={{ height: 150, width: 250, marginVertical: 40, alignSelf: 'center' }} />
                <Text style={{ color: '#05194E', fontSize: 18, textAlign: 'center', fontWeight: '500', marginVertical: 50 }}>
                    Please upload below mentioned documents to register as technician
                </Text>
                <TouchableOpacity
                    onPress={() => { getDocuments('aadhar') }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', borderBottomColor: '#DCEBF7', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
                    <Image
                        source={require('../assets/images/pu1.png')}
                        resizeMode='contain'
                        style={{ height: Dimensions.get('screen').width / 10, width: Dimensions.get('screen').width / 10, }} />
                    <Text style={{ color: '#05194E', fontWeight: '500', fontSize: 20, marginHorizontal: 15 }}>Aadhar Card</Text>
                    {profileData?.aadharcard_photo == null || aadharDoc === null ? <Image
                        resizeMode='contain'
                        source={aadharDoc || profileData?.aadharcard_photo ? require('../assets/images/greenTick.png') : require('../assets/images/greenTickD.png')}
                    /> : <></>}
                    {profileData?.aadharcard_photo == null|| aadharDoc === null ? <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image
                            resizeMode='contain'
                            style={{ height: Dimensions.get('screen').width / 12, width: Dimensions.get('screen').width / 12 }}
                            source={require('../assets/images/uploadIcon.png')}
                        />

                    </View> : <></>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { getDocuments('sign') }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', borderBottomColor: '#DCEBF7', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
                    <Image
                        source={require('../assets/images/pu2.png')}
                        resizeMode='contain'
                        style={{ height: Dimensions.get('screen').width / 10, width: Dimensions.get('screen').width / 10, }} />
                    <Text style={{ color: '#05194E', fontWeight: '500', fontSize: 20, marginHorizontal: 15 }}>Signature</Text>
                    {profileData?.signature == null  || signatureDoc == null?  <Image
                        resizeMode='contain'
                        source={signatureDoc || profileData?.signature ? require('../assets/images/greenTick.png') : require('../assets/images/greenTickD.png')}
                    /> : <></>}
                    {profileData?.signature == null ? <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image
                            resizeMode='contain'
                            style={{ height: Dimensions.get('screen').width / 12, width: Dimensions.get('screen').width / 12 }}
                            source={require('../assets/images/uploadIcon.png')}
                        />
                    </View> : <></>}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{addImage()}}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', borderBottomColor: '#DCEBF7', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
                    <Image
                        source={require('../assets/images/pu3.png')}
                        resizeMode='contain'
                        style={{ height: Dimensions.get('screen').width / 10, width: Dimensions.get('screen').width / 10, }} />
                    <Text style={{ color: '#05194E', fontWeight: '500', fontSize: 20, marginHorizontal: 15 }}>Profile Picture</Text>
                    {profileData?.technician?.profilepic == null ? <Image
                        resizeMode='contain'
                        source={require('../assets/images/greenTickD.png')}
                    /> : <></>}
                    {profileData?.technician?.profilepic == null ? <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image
                            resizeMode='contain'
                            style={{ height: Dimensions.get('screen').width / 12, width: Dimensions.get('screen').width / 12 }}
                            source={require('../assets/images/uploadIcon.png')}
                        />
                    </View> : <></>}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { getDocuments('covid') }} style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
                    <Image
                        source={require('../assets/images/pu4.png')}
                        resizeMode='contain'
                        style={{ height: Dimensions.get('screen').width / 10, width: Dimensions.get('screen').width / 10, }} />
                    <Text style={{ color: '#05194E', fontWeight: '500', fontSize: 20, marginHorizontal: 15 }}>Covid Certificate</Text>
                    {profileData?.covidcertificate == null || covidDoc == null ? <Image
                        resizeMode='contain'
                        source={covidDoc || profileData?.covidcertificate ? require('../assets/images/greenTick.png') : require('../assets/images/greenTickD.png')}
                    /> : <></>}
                    {profileData?.covidcertificate == null ? <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image
                            resizeMode='contain'
                            style={{ height: Dimensions.get('screen').width / 12, width: Dimensions.get('screen').width / 12 }}
                            source={require('../assets/images/uploadIcon.png')}
                        />
                    </View> : <></>}
                </TouchableOpacity>

                <Button onPress={() => {
                    submitDocuments()
                }}
                mode="contained"
                    disabled={loading || (aadharDoc && covidcertificate && signatureDoc && profileDoc)}
                    loading={ loading}
                    color='#05194E'
                    style={{ marginTop: 30, width: '60%', fontSize: 20, borderRadius: 10, alignSelf: 'center' }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Submit</Text></Button>
            </ScrollView>
        </View>
    );
}
