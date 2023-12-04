import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Headerbar from '../Components/Headerbar'
import { AntDesign } from '@expo/vector-icons';
import Categories from '../Components/Categories';
import OfferSlider from '../Components/OfferSlider';
import CardSlider from '../Components/CardSlider';
import { firebase } from '../Firebase/FirebaseConfig'
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {


    const [foodData, setFoodData] = useState([])

    const foodDataQry = firebase.firestore().collection('FoodData')

    useEffect(() => {
        foodDataQry.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    // console.log('ye hai food Data', foodData)


    const requestLocationPermission = async () => {
       
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        // Permission granted, continue with obtaining the location
        getLocation()

    };

    useEffect(() => {
        requestLocationPermission()
    },[])

    const getLocation = async () => {
        try {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
     
          console.log('This is the real name of the location,', getLocationName(latitude,longitude) )

          // Do something with the latitude and longitude values
        } catch (error) {
          console.log('Error getting location:', error);
        }
      };



      const getLocationName = async (latitude, longitude) => {
        try {
          const geocode = await Location.reverseGeocodeAsync({
            latitude,
            longitude
          });
    
          if (geocode.length > 0) {
            const { city, country } = geocode[0];
            const locationName = `${city}, ${country}`;
            console.log('dekh veere', city)
            // setLocationName(city);
          
            return locationName;
          }
        } catch (error) {
          console.log('Error fetching location name:', error);
        }
    
        return null;
      };

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={'#FF3F00'} />

            <Headerbar />

            <TouchableOpacity style={styles.searchbox}>
                <AntDesign name="search1" size={24} color="black" style={{ color: '#FF3F00' }} />
                <Text style={styles.input}>Search</Text>
            </TouchableOpacity>

            <Categories />
            <OfferSlider />



            <CardSlider navigation={navigation} data={foodData} />

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: '100%'

    },
    searchbox: {
        flexDirection: 'row',
        width: '95%',
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        borderRadius: 20, //30
        alignSelf: 'center',
        elevation: 2
    },
    input: {
        marginLeft: 10,
        width: '90%',
        fontSize: 16,
        color: '#c4c4c4',
    }
})