import { ImageBackground, TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../constants/colors'

const Welcome2 = ({ navigation }) => {

    const onPress = () => { //nav criar conta
        navigation.navigate('Signup');
    };

    const onPress2 = () => { //nav sem conta tela inicial
        navigation.navigate('HomeAq');
    };
    
    const onPress3 = () => { //nav p login texto inferior
        navigation.navigate('Login')
    };

  return (

    <ImageBackground
        source={require('../icons/InAir_logobg.png')}
        style={styles.backgroundImage}
      >
    <View style={styles.container}>
      <Text style={{fontSize: 28, fontWeight:'bold', marginTop:-45, textAlign: 'center'}}>Hello</Text>
        <Text style={{fontSize: 20, color: '#737373', marginTop:25, width: 310, height: 118, textAlign: 'center'}}>
        Creating an account to use InAir is not necessary. But with an account, you can personalize and adapt InAir according to your own needs.
        </Text>

        <TouchableOpacity style={styles.button} onPress={onPress}>
             <Text style={{color: "#FFF", fontWeight: 'bold', textAlign: 'center', fontSize: 18,shadowOffset: {
        width: 0,
        height: 2,
        } }}>Create account</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.button2} onPress={onPress2}>
             <Text style={{color: "#363636", fontWeight: 'bold', textAlign: 'center', fontSize: 18, shadowOffset: {
        width: 0,
        height: 2,
        } }}>Proceed without account</Text>
         </TouchableOpacity>

         <View style={styles.view2}>
         <Text style={styles.text}> Already have an account? </Text>
         <Text onPress={onPress3 }style={styles.text2}> Sign in </Text>
         </View>


    </View>
    </ImageBackground>

  )
}

export default Welcome2

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
        backgroundColor: '#494969',
        borderRadius: 14,
        textAlign: 'center',
        marginTop: 30, 
        width: 274, 
        height: 50,
        textAlign: 'center',
        padding: 15,
      },
      button2:{
        backgroundColor: '#F5F5F5',
        borderColor: '#D2D2D2',
        borderRadius: 14,
        borderWidth: 0.5,
        textAlign: 'center',
        marginTop: 30, 
        width: 274, 
        height: 50,
        textAlign: 'center',
        marginTop: 20,
        padding: 15,
        shadowColor: '#000',
            shadowOffset: {
            width: 0,
            height: 2,
            },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // Android only
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
      },
      text: {
        fontWeight: '500', //500 medium sized
        fontSize: 16,
        color: '#737373',
        marginLeft: 130,
        marginTop: 10,
    },
    text2: {
        fontWeight: '700', //700 a bit bolder
        fontSize: 16,
        color: '#0A1B47',
        marginRight: 160,
        marginTop: 10
    },
    view2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: -5, 
    }
})