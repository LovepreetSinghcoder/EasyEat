import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image, ScrollView, FlatList, SafeAreaView } from 'react-native'
import React from 'react'

const CardSlider = ({ navigation, data }) => {

    // console.log('Ye hai Cardslider ka Console', data)

    const openProductHandler = (item) => {
        navigation.navigate('ProductScreen', item)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.cardouthead}>
                Today's Special Food
            </Text>
            <SafeAreaView>

                <FlatList style={styles.flatliststyle}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.index} style={styles.card} onPress={() => { openProductHandler(item) }}>
                            <View>
                                <Image source={{ uri: item.FoodImageUrl }} style={styles.cardimage} />
                            </View>

                            <View style={styles.cardin1}>
                                <Text style={styles.cardin1txt}>{item.FoodName}</Text>

                                <View style={styles.cardin2}>
                                    <Text style={styles.cardin2txt1}>Fast Food</Text>
                                    <Text style={styles.cardin2txt1}>Price -
                                        <Text style={{ textDecorationLine: 'line-through' }}> Rs </Text>

                                        <Text> {item.FoodPrice}Rs</Text>
                                    </Text>
                                    <Text style={styles.cardin2txt3}>VEG</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>

        </View>
    )
}

export default CardSlider

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        // backgroundColor: 'green',
        paddingHorizontal: 5
    },
    cardouthead: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 10,
        paddingLeft: 5,
        color: '#424242'
    },
    cardimage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16 //17

    },
    card: {
        width: 300,
        height: 200,
        marginLeft: 5,
        marginTop: 10,
        borderRadius: 17, //18
        backgroundColor: '#dedede',
        // borderWidth: 1,
        // borderColor: 'grey',
        // elevation: 2

    },
    cardin1: {
        // backgroundColor: 'red',
        marginHorizontal: 3,
        marginTop: 3
    },
    cardin1txt: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 5,

    },
    cardin2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6
    },
    cardin2txt1: {
        fontSize: 12,
        marginRight: 10,
        fontWeight: '500'
    },
    cardin2txt3: {
        height: 20,
        borderRadius: 10,
        backgroundColor: 'green',
        fontSize: 10,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        paddingHorizontal: 7
    }
})