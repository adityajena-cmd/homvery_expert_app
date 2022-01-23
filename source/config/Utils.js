import Clipboard from '@react-native-clipboard/clipboard';
import { ToastAndroid } from 'react-native';
import { Linking } from 'react-native'

const openPhone = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`)

}

const openBrowser = (link) =>{
    Linking.openURL(link)
}

const getDate = (date) => {
    let dates;
    if (date !== null || date !== undefined || date !== "") {
        dates = date.split("-")
    }else{
        dates = ["NA","NA","NA"]
    }

    return dates
}

const openMaps = (lat, lng, loclabel) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = loclabel;
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);
}

const getFullAddress = (addr) => {
    let address = ''
    if (addr === null || addr === undefined) {
        address = "NA"
    } else {
        address = addr.flat + ", " + addr.street + ", " + addr.addressline1 + "\n" + addr.landmark + ", " + addr.pincode + ", " + addr.city;
    }

    return address
}

const copyClipboard = id => {
    Clipboard.setString(id);
    ToastAndroid.show('Text Copied!', ToastAndroid.SHORT);
}

export {
    getFullAddress,
    copyClipboard,
    openPhone,
    openMaps,
    getDate,
    openBrowser
}