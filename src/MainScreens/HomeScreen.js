import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Headerbar from '../Components/Headerbar'

const HomeScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={'#FF3F00'} />

            <Headerbar/>

            <View style={{ height: 40, borderWidth: .6, borderColor: 'red', borderRadius: 25 }}>
                <Text>Search Bar</Text>
            </View>

            <View>
                <Text>Categories</Text>
                <View>
                    <Text>All Categories</Text>
                </View>
            </View>

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

    }
})