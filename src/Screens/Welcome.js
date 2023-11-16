import { ImageBackground, TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../constants/colors'
//import { createStackNavigator } from '@react-navigation/stack';
//import { NavigationContainer } from '@react-navigation/native';
//import Button from '../../assets/components/button.js';


const Welcome = ({ navigation }) => {

    const onPress = () => {
        navigation.navigate('Welcome2');
    };

    

    return (
      <ImageBackground
        source={require('../icons/InAir_logobg.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={{fontSize: 28, fontWeight:'bold', marginTop:-35}}>Hello</Text>

          <Text style={{fontSize: 20, color: '#737373', marginTop:25, width: 310, textAlign: 'center'}}>
            Greetings! This is InAir. The app for you to check the air quality on your fingertips.
          </Text>
          
          <TouchableOpacity style={styles.button} onPress={onPress}>
             <Text style={{color: "#FFF", fontWeight: 'bold', textAlign: 'center', fontSize: 18,shadowOffset: {
        width: 0,
        height: 2,}}}>Next</Text>
         </TouchableOpacity>

        </View>
      </ImageBackground>
    );
  };

export default Welcome

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
        textAlign: 'center',
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