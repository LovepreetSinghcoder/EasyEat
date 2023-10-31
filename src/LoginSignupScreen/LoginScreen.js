import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { userloggeduidHandler } = useContext(AuthContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const LoginHandler = async () => {
        if (email !== '' && password !== '') {
            try {
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        var user = userCredential.user.uid;
                        userloggeduidHandler(user);
                        console.log('From LoginScreen (UID)', user)
                    })
            } catch (error) {
                console.log('error....')
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#FF3F00'} />
            <View style={{ paddingVertical: 12, width: '95%', alignSelf: 'center', marginBottom: 10 }}>
                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: '700', }} >Login</Text>
            </View>

            <View style={styles.inputCont}>
                <FontAwesome name="user" size={24} color="grey" style={styles.icon} />
                <TextInput
                    placeholder='Email'
                    keyboardType='email-address'
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputCont}>
                <FontAwesome name="lock" size={24} color="grey" style={styles.icon} />
                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity style={styles.loginbutton} onPress={() => LoginHandler()}>
                <Text style={styles.loginbuttonTxt}>Login</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 15, width: '95%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ paddingLeft: 10 }}>
                    <Text>Don't have any account?</Text>
                </View>
                <View style={{
                    backgroundColor: '#FF3F00',
                    borderRadius: 25,
                    // width: '95%',
                    alignSelf: 'center',
                    padding: 10,
                    elevation: 2
                }} >
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '600',
                            color: 'white',
                            alignSelf: 'center',
                            paddingHorizontal: 10
                        }}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'green',
        width: '100%'
    },
    inputCont: {
        flexDirection: 'row',
        padding: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 10,
        width: '95%',
        alignSelf: 'center'
    },
    icon: {
        paddingHorizontal: 5
    },
    input: {
        paddingLeft: 5,
        width: '90%',
    
        // backgroundColor: 'green'

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