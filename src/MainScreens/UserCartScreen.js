import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { firebase } from '../Firebase/FirebaseConfig'

const UserCartScreen = ({ navigation }) => {
    const { userloggeduid } = useContext(AuthContext)

    const [cartdata, setCartdata] = useState(null)
    const [cartAlldata, setCartAlldata] = useState(null)
    const [foodDataAll, setFoodDataAll] = useState([])




    const cardDataHandler = async () => {

        const docref = firebase.firestore().collection('UserCart').doc(userloggeduid);

        try {
            await docref.get().then((doc) => {
                if (doc.exists) {
                    setCartdata(doc.data())
                    setCartAlldata(doc.data().cartItems)
                }
                else {
                    console.log('there is no data')
                }
            })
        } catch (error) {
            console.log('Ye hai bo Error', error)
        }
    }

    useEffect(() => {
        cardDataHandler()
    }, [])

    const FoodDataHandler = async () => {


        const foodRef = firebase.firestore().collection('FoodData');

        foodRef.onSnapshot(snapshot => {
            setFoodDataAll(snapshot.docs.map(doc => doc.data()))
        }
        )

    }

    useEffect(() => {
        FoodDataHandler()
    }, [])

    // console.log('Ye hai Data bro', foodDataAll)

    return (
        <View style={styles.mainContainer}>
            <View style={{ backgroundColor: '#FF3F00', paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>

                <TouchableOpacity>
                    <Text style={{ fontSize: 16, color: 'white' }}>Close</Text>
                </TouchableOpacity>

            </View>


            <View style={styles.container}>
                <ScrollView>


                    <Text style={styles.containerHead}>My Cart</Text>


                    <View style={styles.cartout}>
                        {
                            cartAlldata === null ?
                                <Text>Your Cart is Empty!</Text>


                                :
                                <FlatList style={styles.FlatListCont} data={cartAlldata}
                                    renderItem={

                                        ({ item }) => {

                                            const nData = foodDataAll.filter((items) => items.id === item.item_id)
                                            // console.log('ye hai food data console', item)
                                            return (
                                                <View style={styles.containerCardList}>
                                                    <View style={styles.containerCard}>
                                                        <Image source={{uri: nData[0].FoodImageUrl}} style={styles.cardimage} />
                                                        <View style={styles.containerCard_in}>
                                                            <View style={styles.containerCard_in1}>
                                                                <Text >Mera Dhabha</Text>
                                                            </View>

                                                            <View style={styles.containerCard_in2}>
                                                                <Text style={styles.containerCard_in2_itemName}>{nData[0].FoodName}</Text>
                                                                <Text style={styles.containerCard_in2_itemPrice}>{nData[0].FoodPrice}₹ for one</Text>
                                                                <Text style={styles.containerCard_in2_itemQty}>Quantity: {item.FoodQuantity}</Text>

                                                            </View>

                                                            <View style={styles.containerCard_in3}>
                                                                <TouchableOpacity style={styles.containerCard_in3_btn}>
                                                                    <Text style={styles.containerCard_in3_btn_txt}>Delete</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        }
                                    }
                                />


                        }


                    </View>
                </ScrollView>


            </View>
        </View>
    )
}

export default UserCartScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#edeef0',
        width: '100%',
    },
    containerHead: {
        fontSize: 25,
        fontWeight: '600',
        marginVertical: 5,
        marginLeft: 5,
        paddingHorizontal: 10,
    },
    containerCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 25,
        width: '95%',
        alignSelf: 'center',
        elevation: 2,
        alignItems: 'center',
    },
    cardimage: {
        width: 100,
        height: '100%',
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25
    },
    containerCard_in: {
        flexDirection: 'column',
        margin: 5,
        width: '69%',
        alignItems: 'flex-end',
    },
    containerCard_in1: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 3,
        paddingVertical: 2,
        borderBottomWidth: 1,
    },
    containerCard_in2: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 3,
        paddingVertical: 2,
    },
    containerCard_in3: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 100,
        borderRadius: 20,
        backgroundColor: '#edeef0',
        marginVertical: 5,
        padding: 5,
        elevation: 2
    },
    containerCard_in2_itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3
    },
    containerCard_in2_itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2
    },
    containerCard_in3_btn_txt: {
        fontSize: 16,
        fontWeight: 'bold',
    }

})