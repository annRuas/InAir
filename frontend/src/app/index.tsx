import { ImageBackground, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/colors'
import { Link, Stack } from 'expo-router';


export default function Welcome() {
  return (
    <ImageBackground
    source={require('../icons/InAir_logobg.png')}
    style={styles.backgroundImage}
  >
          <Stack.Screen
        options={{
          title: '',

        }}
      />
    <View style={styles.container}>
      <Text style={{fontSize: 28, fontWeight:'bold', marginTop:-35}}>Hello</Text>

      <Text style={{fontSize: 20, color: '#737373', marginTop:25, width: 310, textAlign: 'center'}}>
        Greetings! This is InAir. The app for you to check the air quality on your fingertips.
      </Text>
      <Link  href={{
          pathname: "/Welcome",
          // /* 1. Navigate to the details route with query params */
          params: { id: 86, other: "anything you want here" },
        }}
       asChild>
      <TouchableOpacity style={styles.button}>
         <Text style={{color: "#FFF", fontWeight: 'bold', textAlign: 'center', fontSize: 18,shadowOffset: {
    width: 0,
    height: 2,}}}>Next</Text>
     </TouchableOpacity>
     </Link>

    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 5,
        fontFamily: "inter_semibold"
      },
      button:{
        backgroundColor: "#494969",
        borderRadius: 14,
        textAlign: 'center',
        marginTop: 30, 
        width: 150, 
        height: 45,
        padding: 12,
        
      },
      instructions: {
        textAlign: "center",
        color: COLORS.black,
        marginBottom: 5,
        fontFamily: "inter_semibold"
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // if not the way I want it, use 'stretch' 
        justifyContent: 'center',
      }
})