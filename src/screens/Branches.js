import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
}
    from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import branchesName from '../api/food_bank.json';

import Button from '../components/Button'
import * as Location from 'expo-location'
import Constants from 'expo-constants';
import { findNearest } from 'geolib';

export default function Branches({ navigation }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coords, setCoords] = useState([]);
    useEffect(() => {
        getLocation()
        for (const item of branchesName) {
            coords.push({
                longitude: item.longitude,
                latitude: item.latitude
            })
            setCoords(coords)
            // console.log(coords)
        }

    }, []);
    const getLocation = async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
                'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
            );
            return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        //   console.log(location)
    }
    return (
        <View style={styles.container}>

            {location && <MapView region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
            }} style={styles.map}>
                {branchesName &&
                    branchesName?.map((v, i) => (
                        <Marker
                            key={i}
                            coordinate={{
                                latitude: v.latitude,
                                longitude: v.longitude,
                            }}
                            title={v?.branch_name}
                        />
                    ))}
                <Marker icon={require('../assets/mylocation.png')} style={{
                    width: 16
                }} title='Your Location' coordinate={{
                    latitude: location && location?.coords?.latitude,
                    longitude: location.coords.longitude
                }} />
            </MapView>}
            <View
                style={{
                    position: 'absolute',
                    bottom: -10
                }}
            >
                <Button
                    mode="contained"
                    style={{ width: 390 }}
                    onPress={() => {
                        let point = findNearest({ latitude: location.coords.latitude, longitude: location.coords.longitude }, coords);
                        console.log(point)
                        let branch;
                        branchesName.map((v,i)=> {
                            if(v.latitude == point.latitude && v.longitude == point.longitude){
                                branch = v.branch_name
                            }
                        })
                        console.log(branch)
                        navigation.navigate("FoodApply", {
                            location: branch
                        })
                    }}
                >
                    Click to proceed
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    button: {
        backgroundColor: '#28b351'
    }
})
