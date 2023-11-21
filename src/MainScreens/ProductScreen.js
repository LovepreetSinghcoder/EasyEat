import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { firebase } from '../Firebase/FirebaseConfig'

const ProductScreen = ({ navigation, route }) => {
    const { userloggeduid } = useContext(AuthContext)

    const [quantity, setQuantity] = useState('1')
    const data = route.params;


    // console.log('ye hai console, Product Screen0000', data)

    if (route.params === undefined) {
        navigation.navigate('HomeScreen')
    }



    // console.log('ye hai bhai date', date)

    const AddtoCartHandler = async () => {
        const date = new Date().getTime().toString()

        const docref = firebase.firestore().collection('UserCart').doc(userloggeduid)
        const foodData = {
            item_id: data.id,
            FoodQuantity: parseInt(quantity, 10),
            userid: userloggeduid,
            cartItemId: date + userloggeduid,
            totalFoodPrice: parseInt(data.FoodPrice) * parseInt(quantity), 
        }

        try {
            const doc = await docref.get();
            if (doc.exists) {

                const cartItems = doc.data().cartItems;

                if (Array.isArray(cartItems)) {
                    const existingItemIndex = cartItems.findIndex((item) => item.item_id === data.id);

                    if (existingItemIndex !== -1) {
                        const existingItem = cartItems[existingItemIndex];
                        const updateditem = {
                            ...existingItem,
                            FoodQuantity: existingItem.FoodQuantity + parseInt(quantity, 10)
                        };

                        cartItems[existingItemIndex] = updateditem;

                        docref.update({
                            cartItems: cartItems,
                        })
                        console.log('Updated');
                    }
                    else {
                        docref.update({
                            cartItems: firebase.firestore.FieldValue.arrayUnion(foodData),
                        });
                        console.log('Added');
                    }
                }
                else {
                    docref.set({
                        cartItems: [foodData],
                    });

                    console.log('Added');
                }
            } else {
                docref.set({
                    cartItems: [foodData],
                });

                console.log('Added');
            }

            alert('Added to cart');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const IncreaseQuantityHandler = () => {
        setQuantity((parseInt(quantity) + 1).toString())
    }
    const DescreaseQuantityHandler = () => {
        if (parseInt(quantity) > 1) {
            setQuantity((parseInt(quantity) - 1).toString())
        }
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor={'#FF3F00'} />
            <View style={{ backgroundColor: '#FF3F00', paddingVertical: 15, paddingHorizontal: 15, height: 50, marginTop: 30 }}>
                <TouchableOpacity style={{}} onPress={() => { navigation.navigate('HomeScreen') }}>
                    <Text style={{ color: 'white' }}>Close</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerIn}>
                <View style={styles.containerIn1}>
                    <Image source={{ uri: data.FoodImageUrl }} style={styles.cardimage} />
                </View>

                <View style={styles.containerIn2}>
                    <View style={styles.containerIn2_s1}>
                        <Text style={styles.containerIn2_s1_foodname}>{data.FoodName}</Text>
                        <Text style={styles.containerIn2_s1_foodprice}>{data.FoodPrice}Rs</Text>
                    </View>

                    <View style={styles.containerIn2_s2}>
                        <Text style={styles.containerIn2_s2_head}>About item</Text>
                        <Text style={styles.containerIn2_s2_description}>Best Food that is availble in our country</Text>
                        <Text style={styles.containerIn2_s2_veg}>VEG</Text>


                    </View>

                    <View style={styles.containerIn2_s3}>
                        <Text style={styles.containerIn2_s3_restaurantnameheading}>Restaurant Name</Text>
                        <Text style={styles.containerIn2_s3_restaurantname}>Baba Ka Dhabha</Text>



                    </View>


                    <View style={styles.containerIn2_s4}>
                        <Text style={styles.containerIn2_s4_heading}>Quantity</Text>

                        <View style={styles.containerIn2_s4_QuantityCont}>
                            <Text style={styles.containerIn2_s4_QuantityCont_MinusText} onPress={() => { DescreaseQuantityHandler() }}>-</Text>
                            <TextInput style={styles.containerIn2_s4_QuantityCont_TextInput} value={quantity} />
                            <Text style={styles.containerIn2_s4_QuantityCont_PlusText} onPress={() => { IncreaseQuantityHandler() }}>+</Text>
                        </View>

                    </View>


                </View>

                <View style={styles.containerIn3}>
                    <TouchableOpacity style={styles.containerIn3_buybtn} onPress={() => { AddtoCartHandler() }}>
                        <Text style={styles.containerIn3_buybtn_txt}>Add to Cart</Text>
                    </TouchableOpacity>

                </View>



            </View>


        </ScrollView>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
        width: '100%',
        height: '100%'
    },
    containerIn: {
        backgroundColor: '#ebebeb'
    },
    containerIn1: {
        width: '100%',
        height: 220,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardimage: {
        width: '100%',
        height: '100%',

    },
    containerIn2: {
        width: '100%',
        padding: 20,
        position: 'relative',
        top: -30,
        backgroundColor: '#ebebeb',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
    },
    containerIn2_s1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    containerIn2_s1_foodname: {
        fontSize: 25,
        fontWeight: '600',
        width: 220,
        marginRight: 10
    },
    containerIn2_s1_foodprice: {
        fontSize: 26,
        fontWeight: '600',
    },
    containerIn2_s2: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    containerIn2_s2_head: {
        fontSize: 18,
        fontWeight: '600',
    },
    containerIn2_s2_description: {
        paddingTop: 10,
        fontSize: 15,
    },
    containerIn2_s2_veg: {
        backgroundColor: 'green',
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10,
        width: 70,
        alignItems: 'center',
        marginTop: 5
    },
    containerIn2_s3: {
        backgroundColor: '#F2F2F2',
        width: '100%',

        padding: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
        elevation: 2,
        alignItems: 'center',
    },
    containerIn2_s3_restaurantnameheading: {
        color: 'grey',
        fontSize: 20,
        fontWeight: '600',
    },
    containerIn2_s3_restaurantname: {
        color: '#9c9c9c',
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 10,
    },
    containerIn3: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
    },
    containerIn2_s4: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center'
    },

    containerIn2_s4_heading: {
        color: 'grey',
        fontSize: 18,
        fontWeight: '600'
    },
    containerIn2_s4_QuantityCont: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    containerIn2_s4_QuantityCont_MinusText: {
        backgroundColor: '#FF3F00',

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        elevation: 2,
        padding: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerIn2_s4_QuantityCont_TextInput: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        padding: 10,
        width: 50,
        borderRadius: 20,
        marginHorizontal: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    containerIn2_s4_QuantityCont_PlusText: {
        backgroundColor: '#FF3F00',

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        elevation: 2,
        padding: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerIn3_buybtn: {
        width: '90%',
        height: 50,
        backgroundColor: '#FF3F00',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        color: 'black',
        margin: 10,
        alignSelf: 'center',
    },
    containerIn3_buybtn_txt: {
        color: '#F2F2F2',
        paddingVertical: 5,
        fontSize: 17,
        borderRadius: 10,
        // width: '90%',
        textAlign: 'center',
        fontWeight: '600',
        alignSelf: 'center'
    }

})