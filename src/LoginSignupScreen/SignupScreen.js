import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const SignupScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#FF3F00'} />
            <View style={{ paddingVertical: 12, width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: '700', }} >Sign up</Text>
            </View>

            <TextInput
                placeholder='Email'
                keyboardType='email-address'
                style={styles.input}
            />
            <TextInput
                placeholder='Password'
                style={styles.input}
            />
            <TextInput
                placeholder='Confirm Password'
                style={styles.input}
            />

            <TouchableOpacity style={styles.loginbutton} onPress={() => alert('Account created Successfull!')}>
                <Text style={styles.loginbuttonTxt}>Sign up</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 15, width: '95%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ paddingLeft: 10 }}>
                    <Text>Already have an account?</Text>
                </View>
                <View style={{
                    backgroundColor: '#FF3F00',
                    borderRadius: 25,
                    // width: '95%',
                    alignSelf: 'center',
                    padding: 10,
                    elevation: 2
                }} >
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '600',
                            color: 'white',
                            alignSelf: 'center',
                            paddingHorizontal: 10
                        }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'green',
        width: '100%'
    },
    input: {
        padding: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 10,
        width: '95%',
        alignSelf: 'center'
    },
    loginbutton: {
        backgroundColor: '#FF3F00',
        borderRadius: 25,
        width: '95%',
        alignSelf: 'center',
        padding: 10,
        elevation: 2
    },
    loginbuttonTxt: {
        fontSize: 17,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center'
    }


})