import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { firebase } from '../Firebase/FirebaseConfig'
import { useFocusEffect } from '@react-navigation/native'

const UserCartScreen = ({ navigation }) => {
    const { userloggeduid } = useContext(AuthContext)

    const [cartdata, setCartdata] = useState(null)
    const [cartAlldata, setCartAlldata] = useState(null)
    const [foodDataAll, setFoodDataAll] = useState([])
    const [ItemCost, setItemCost] = useState('0')
    const [totalCost, setTotalCost] = useState('0')
    const [deliveryCharges, setDeliveryCharges] = useState('0')

    const [paymentpage, setPaymentPage] = useState(false)





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

    const TotalPriceHandler = () => {
        if (cartdata !== null && Object.keys(cartdata).length !== 0) {

            const cartDataforTotalPrice = cartAlldata;
            let totalfoodprice = 0;

            // const foodprice = cartDataforTotalPrice.cartItems
            cartDataforTotalPrice.forEach((item) => {
                totalfoodprice += (parseInt(item.totalFoodPrice))
            })

            setItemCost(totalfoodprice.toString())
            setTotalCost(totalfoodprice.toString())

        }
    }

    useEffect(() => {
        TotalPriceHandler()
    }, [cartAlldata])

    const DeleteButtonhandler = async (item) => {

        console.log('ye hai 1')
        const docref = firebase.firestore().collection('UserCart').doc(userloggeduid);

        const docSnapshot = await docref.get();
        const cartData = docSnapshot.data();

        if (cartData && cartData.cartItems && cartData.cartItems.length === 1) {
            await docref.update({
                cartItems: firebase.firestore.FieldValue.delete()
            })
            console.log('ye hai 2')

        }
        else {
            await docref.update({
                cartItems: firebase.firestore.FieldValue.arrayRemove(item)
            })
            console.log('ye hai 3')

        }
        cardDataHandler()


    }


    // console.log('Ye hai Data braso', ItemCost, totalCost,)

    const deleteCart = async () => {
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);

        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
            await docRef.delete();
            console.log('Document successfully deleted.');
        } else {
            console.log('Document does not exist.');
        }
    };

    const [updatedCartData, setUpdatedCartData] = useState(null);

    const addingSomedata = (docid, date) => {
        if (cartdata !== null) {

            const updatedData = { ...cartdata };


            updatedData.cartItems.forEach((item) => {
                item.orderId = docid;
                item.orderDate = date;
            });

            // console.log('Updated cart data:', updatedData);

            setUpdatedCartData(updatedData);
        }

    }

    const PlaceNow = async () => {

        console.log('ye ho gya bhai')
        const cDate = new Date().getTime().toString()
        const docid = new Date().getTime().toString() + userloggeduid;

        const orderdatadoc = firebase.firestore().collection('UserOrders').doc(docid)
        const orderitemstabledoc = firebase.firestore().collection('OrderItems').doc(docid)


        await addingSomedata(docid, cDate);

        if (updatedCartData !== null) {
            try {
                await orderitemstabledoc.set({ ...updatedCartData });
                await orderdatadoc.set({
                    orderid: docid,
                    orderstatus: 'Pending',
                    ordercost: totalCost,
                    orderdate: new Date().getTime().toString(),
                    userid: userloggeduid,
                    userpayment: 'COD',
                    paymenttotal: ''
                })

                await deleteCart();
                alert('Order placed successfully.');
                navigation.navigate('HomeScreen');
            } catch (error) {
                console.log('Error placing order:', error);
                alert('Error placing order. Please try again.');
            }
        }

    }

    useFocusEffect(
        React.useCallback(() => {
            cardDataHandler();
            TotalPriceHandler()
            console.log('triggered cart')
        }, [])
    );

    if (paymentpage === true) {
        return (
            <View style={styles.mainContainer}>
                <View style={{ backgroundColor: '#FF3F00', paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>

                    <TouchableOpacity>
                        <Text style={{ fontSize: 16, color: 'white' }}>Close</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.container}>

                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 15 }}>Payment Options</Text>


                        <TouchableOpacity style={{ backgroundColor: '#FF3F00', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10 }} onPress={() => { alert('Selected') }}>
                            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Cash on Delivery</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingBottom: 30 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 15 }}>Delivery Location</Text>

                        <TouchableOpacity style={{ backgroundColor: '#FF3F00', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10 }} onPress={() => { alert('Selected') }}>
                            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Current Location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#FF3F00', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10, marginTop: 10 }} onPress={() => { alert('Selected') }}>
                            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Change Location</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingTop: 10, borderTopWidth: 1, borderColor: '#c9c9c9' }}>


                        <TouchableOpacity style={{ backgroundColor: '#FF3F00', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10, marginTop: 10, alignItems: 'center' }} onPress={() => PlaceNow() }>
                            <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{ backgroundColor: '#FF3F00', paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>

                <TouchableOpacity onPress={() => { navigation.navigate('HomeScreen') }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>Close</Text>
                </TouchableOpacity>

            </View>


            <View style={styles.container}>
                <ScrollView>


                    <Text style={styles.containerHead}>My Cart</Text>


                    <View style={styles.cartout}>
                        {
                            cartAlldata === null ?
                                <Text style={{ marginHorizontal: 16, fontSize: 17, color: 'grey' }}>Your Cart is Empty!</Text>


                                :
                                <FlatList style={styles.FlatListCont} data={cartAlldata}
                                    renderItem={

                                        ({ item }) => {

                                            const nData = foodDataAll.filter((items) => items.id === item.item_id)
                                            // console.log('ye hai food data console', item)
                                            return (
                                                <View style={styles.containerCardList}>
                                                    <View style={styles.containerCard}>
                                                        <Image source={{ uri: nData[0].FoodImageUrl }} style={styles.cardimage} />
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
                                                                <TouchableOpacity style={styles.containerCard_in3_btn} onPress={() => { DeleteButtonhandler(item) }}>
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


                    {totalCost && totalCost !== '0' ?
                        <>
                            <View style={{ marginTop: 10 }}>
                                <View style={{
                                    backgroundColor: 'white',
                                    borderColor: 'grey',
                                    borderRadius: 15,
                                    width: '95%',
                                    alignSelf: 'center',
                                    marginVertical: 5,
                                    paddingVertical: 5,
                                    elevation: 3
                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                        <Text style={{ fontWeight: '600' }}>Item Cost:</Text>
                                        <Text style={{ fontWeight: '600' }}>{ItemCost}₹</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                        <Text style={{ fontWeight: '600' }}>Delivery Charges:</Text>
                                        <Text>{deliveryCharges}₹</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                        <Text style={{ fontWeight: '500' }}>Service Charges:</Text>
                                        <Text>0₹</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={styles.btnCont}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Total:</Text>
                                    <Text style={{ fontSize: 20, fontWeight: '600', paddingLeft: 5 }}>{totalCost}₹</Text>
                                </View>
                                <TouchableOpacity style={{ backgroundColor: '#FF3F00', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }} onPress={() => setPaymentPage(true)}>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Place Order</Text>
                                </TouchableOpacity>

                            </View>
                        </>
                        :
                        null
                    }

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
    },
    btnCont: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
        marginBottom: 80,
        paddingTop: 10,
        paddingHorizontal: 15,
    }

})