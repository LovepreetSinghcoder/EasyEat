import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStack from './AppStack'
import AuthStack from './AuthStack'

const AppNav = () => {
  return (
    <>
     {/* <AppStack/> */}
     <AuthStack/>
    </>
  )
}

export default AppNav

const styles = StyleSheet.create({})