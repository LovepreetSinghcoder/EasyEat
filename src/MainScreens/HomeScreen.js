import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Headerbar from '../Components/Headerbar'
import { AntDesign } from '@expo/vector-icons';
import Categories from '../Components/Categories';

const HomeScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={'#FF3F00'} />

            <Headerbar />

            <TouchableOpacity style={styles.searchbox}>
                <AntDesign name="search1" size={24} color="black" style={{ color: '#FF3F00' }} />
                <Text style={styles.input}>Search</Text>
            </TouchableOpacity>

            <Categories />
            {/* <View>
                <Text>Categories</Text>
                <View>
                    <Text>All Categories</Text>
                </View>
            </View> */}

            <View>
                <Text>
                    Slider (Offers for user, advertisements)
                </Text>
            </View>

            <View>
                <Text> foods</Text>
            </View>
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
        width: '92%',
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        borderRadius: 20,
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