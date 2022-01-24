import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Homevery App',
                'message': 'Homevery App access to your Location '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
            return true
        } else {
            console.log("location permission denied")
            return false

        }
    } catch (err) {
        console.warn("Warn", err)
    }
}
async function requestCameraPermisiion() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                'title': 'Homevery App',
                'message': 'Homevery App access to your Camera '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera")
            return true
        } else {
            console.log("camera permission denied")
            return false

        }
    } catch (err) {
        console.warn("Warn", err)
    }
}

async function requestStoragePermisiion() {
    try {
        const granted = await PermissionsAndroid.requestMultiple(
           [ PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],
            {
                'title': 'Homevery App',
                'message': 'Homevery App access to your Files '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera")
            return true
        } else {
            console.log("camera permission denied")
            return false

        }
    } catch (err) {
        console.warn("Warn", err)
    }
}

export {
    
    requestLocationPermission,
    requestCameraPermisiion,
    requestStoragePermisiion
}
