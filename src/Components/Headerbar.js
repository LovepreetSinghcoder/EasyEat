import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Headerbar = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ flexDirection: 'row' }}>
                <Ionicons name="ios-location" size={28} color="black" style={{ paddingVertical: 6 }} />
                <View style={{ paddingHorizontal: 5 }}>

                    <View>
                        <Text style={{paddingRight: 3, fontSize: 16, fontWeight: '700'}}>Location</Text>
                    </View>
                    <Text>Delhi</Text>
                </View>
            </TouchableOpacity>


        </View >
    )
}

export default Headerbar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
        borderBottomWidth: 1,
        borderColor: 'grey',
        justifyContent: "space-between",
        height: 60,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})