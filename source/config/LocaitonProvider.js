import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Example App',
                'message': 'Example App access to your location '
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


export {
    
    requestLocationPermission
}