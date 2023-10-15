import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AccountAndSettings = () => {
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#FF3F00', paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>
                <Text style={{ color: 'white' }}>Account and Settings</Text>
            </View>

            <View>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonTxt}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonTxt}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={{flex: 1}} >
                <TouchableOpacity style={styles.logoutButton} >
                    <Text style={styles.logoutButtonTxt}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AccountAndSettings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
        backgroundColor: '#fff',
        
    },
    button: {
        backgroundColor: '#FF3F00',
        borderRadius: 25,
        width: '92%',
        alignSelf: 'center',
        padding: 10,
        elevation: 2,
        marginTop: 10
    },
    buttonTxt: {
        fontSize: 17,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center'
    },
    logoutButton: {

     position: 'absolute',
     bottom: 0,
     left: 0,
     padding: 15
    },
    logoutButtonTxt: {
        color: '#4E4E4E',
        fontSize: 16,
        fontWeight: 'bold'
    }
})