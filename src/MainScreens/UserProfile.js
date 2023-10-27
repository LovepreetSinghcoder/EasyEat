import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
// import { ReactNativeFirebase } from '@react-native-firebase/app';
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';



const UserProfile = () => {
    const { data1 } = useContext(AuthContext);

    console.log('context Data', data1)

    const handleData = async () => {
        // const docref = firebase.firestore().collection('UserProfiles')
        const docref = firebase.firestore().collection('UserProfiles');
        const doc1 = await docref.get();

        // if (!doc.empty) {
        //     console.log('ok Done 1')


        // }
        if (!doc1.empty) {
            doc1.forEach((doc) => {
                const data = doc.data();
                // console.log('ok Done 1', data);
                // You can access the fields in 'data' now.
            });
        } else {
            console.log('No documents found.');
        }


    }

    useEffect(() => {
        handleData()
    }, [])


    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#FF3F00', paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>
                <Text style={{ color: 'white' }}>My Profile</Text>
            </View>


            <View style={styles.container_Inputfield}>
                <FontAwesome5 name="user-alt" size={20} color="#ccc" style={{ paddingLeft: 5, paddingTop: 7 }} />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    value={'PNF'}
                    editable={false}
                />
            </View>

            <View style={styles.container_Inputfield}>
                <Entypo name="email" size={21} color="#ccc" style={{ paddingLeft: 3, paddingTop: 7 }} />

                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={'PNF@gmail.com'}
                    editable={false}
                />
            </View>

            <View style={styles.container_Inputfield}>
                <Entypo name="address" size={21} color="#ccc" style={{ paddingLeft: 3, paddingTop: 7 }} />
                <TextInput
                    style={styles.input}
                    placeholder='Address'
                    value={'New PNF Address'}
                    editable={false}
                />
            </View>

            <View style={styles.container_Inputfield}>
                <FontAwesome5 name="phone" size={20} color="#ccc" style={{ paddingLeft: 5, paddingTop: 7 }} />
                <TextInput
                    style={styles.input}
                    placeholder='Phone'
                    value={'9876543210'}
                    editable={false}
                />
            </View>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonTxt}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
        backgroundColor: '#fff'
    },
    container_In: {
        backgroundColor: '#FF3F00',
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginTop: 30
    },
    container_Inputfield: {
        flexDirection: 'row',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginTop: 10,
        marginHorizontal: 16
    },
    input: {
        paddingLeft: 7
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
    }
})