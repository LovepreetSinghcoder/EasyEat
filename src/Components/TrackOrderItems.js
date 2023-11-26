import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { firebase } from '../Firebase/FirebaseConfig'
import { AuthContext } from '../Context/AuthContext';


const TrackOrderItems = ({ foodDataAll, data, navigation }) => {
    const { userloggeduid } = useContext(AuthContext);
    const [orderData, setOrderData] = useState([]);


    const [user, setUser] = useState([]);

    const getuserData = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setUser(doc.data());
            })
        }
        else {
            console.log('no user data');
        }
    }

    useEffect(() => {

        getuserData();
    }, [userloggeduid]);

    // console.log('user is ', user.totalCoin - 5)

    useEffect(() => {
        // Fetch data from Firebase
        const fetchData = async () => {
            const foodRef = firebase.firestore().collection('OrderItems').doc(data);

            foodRef.onSnapshot(doc => {
                // setOrderData(snapshot.docs.map(doc => doc.data().cartItems))

                // console.log('dekh veere',doc.data() )
                setOrderData(doc.data().cartItems)
            }
            )
        };

        fetchData();
    }, [data]);

    const getDta = (id) => {
        const nData = foodDataAll.filter((items) => items.id === id)
        return nData;
    }


 
    // console.log('ye dekh bhai222', foodDataAll)
    return (
        <View>
            {/* <Text>Ye dekh veer</Text> */}

            {orderData && orderData.map((order, index) => (
                 <View key={index} 
                //  style={{ borderRadius: 20, backgroundColor: '#f2f2f2', width: '95%', alignSelf: 'center', marginVertical: 2, elevation: 2 }}
                 >

    
                 <FlatList

                     data={getDta(order.item_id)}

                     renderItem={
                         ({ item }) => {
                             console.log('ye dekh veer23123123', item)
                             return (
                                 <View style={styles.orderItemContainer}>
                                     <View>
                                         <Image source={{ uri: item.FoodImageUrl }} style={styles.cardimage} />
                                     </View>

                                     <View style={styles.orderItemContainer_2}>
                                         <View>
                                             <Text style={styles.orderItemName}>{item.FoodName}</Text>
                                             <Text style={styles.orderItemPrice} >${item.FoodPrice}</Text>
                                             <Text>Qty : {order.FoodQuantity} unit </Text>

                                         </View>
                                     </View>
                                 </View>
                             )
                         }
                     }


                 />
             </View>
            ))}
        </View>
    )
}

export default TrackOrderItems

const styles = StyleSheet.create({
    orderItemContainer: {
        flexDirection: 'row',
        backgroundColor: 'green',
        marginVertical: 2,
        width: '95%',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: '#f2f2f2',
        elevation: 2
    },
    cardimage: {
        width: 90,
        height: 80,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20
    },
    orderItemContainer_2: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    orderItemName: {
        fontSize: 16,
        fontWeight: '600'
    },
})