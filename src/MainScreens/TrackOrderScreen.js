import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const TrackOrderScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#FF3F00', paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>
        <TouchableOpacity>

          <Text style={{ color: 'white' }}>Close</Text>
        </TouchableOpacity>
      </View>


      <ScrollView>
        <Text style={styles.mainHeading}>My Orders</Text>
        <View style={styles.mainContainer}>
          <Text style={styles.orderId}>Order id : 4455545ad</Text>
          <Text style={styles.orderTime}>Time : 4:10 AM</Text>

          <View style={styles.orderItemContainer}>
            <View>
              <Image source={require('../Images/pizza1.jpg')} style={styles.cardimage} />
            </View>

            <View style={styles.orderItemContainer_2}>
              <View>
                <Text style={styles.orderItemName}>Pizza</Text>
                <Text style={styles.orderItemPrice} >150$</Text>
                <Text>Qty : 1 unit</Text>

              </View>
            </View>
          </View>

          <View style={styles.orderItemContainer}>
            <View>
              <Image source={require('../Images/pizza2.jpg')} style={styles.cardimage} />
            </View>

            <View style={styles.orderItemContainer_2}>
              <View>
                <Text style={styles.orderItemName}>Pizza Samosa</Text>
                <Text style={styles.orderItemPrice} >350$</Text>
                <Text>Qty : 1 unit</Text>

              </View>
            </View>
          </View>

          <View style={styles.orderItemContainer}>
            <View>
              <Image source={require('../Images/pizza3.jpg')} style={styles.cardimage} />
            </View>

            <View style={styles.orderItemContainer_2}>
              <View>
                <Text style={styles.orderItemName}>Pizza with no Pizza</Text>
                <Text style={styles.orderItemPrice} >7000$</Text>
                <Text>Qty : 1 unit</Text>

              </View>
            </View>
          </View>

          <Text style={styles.orderTotal}>Total : 300$</Text>



        </View>
      </ScrollView>
    </View>
  )
}

export default TrackOrderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainHeading: {
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontWeight: '500'
  },

  mainContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 2,
    backgroundColor: 'white',
    paddingVertical: 5,
    borderRadius: 20
  },
  orderId: {
    fontSize: 16,
    color: 'grey',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
    paddingVertical: 5
  },
  orderTime: {
    paddingHorizontal: 6,
    paddingVertical: 5
  },
  orderTotal: {
    fontSize: 17,
    textAlign: 'right',
    marginVertical: 5,
    marginRight: 20,
    fontWeight: '600'
  },
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
  orderItemContainer_2 :{
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  orderItemName :{
    fontSize: 16,
    fontWeight: '600'
  },
  orderItemPrice :{
    
  }

})