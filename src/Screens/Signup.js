import { Image, ImageBackground, TouchableOpacity, Button, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../constants/colors'
import email from '../icons/email.png'
import hide from '../icons/hide.png'
import padlock from '../icons/padlock.png'
import Checkbox from 'expo-checkbox'
import { FIREBASE_AUTH } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Signup = ({navigation}) => {

    /*const onPress = () => { //teste -> login
        navigation.navigate('Login');
    };*/

    const onPress2 = () => { //ja tem conta -> login
        navigation.navigate('Login');
    };


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const handleSignUp = async () => {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            navigation.navigate('Login');
        }catch(error){
            alert('Sign up failed' + error.message)
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


  return (
    <View>
        <Text style={styles.title}> Create an account  </Text>

        <TextInput placeholder='Name'
                    placeholderTextColor={COLORS.mediumgray} style={{
                        height: 50,
                        width: 322,
                        borderColor: "#737373",
                        borderRadius: 16,
                        borderWidth: 0.5,
                        marginTop: 80,
                        marginLeft: 35,
                        paddingLeft: 15,
                        fontSize: 18,
                    }}>
        </TextInput>
        <TextInput value={email} KeyboardType="email-address" onChangeText={text => setEmail(text)}
                    placeholder='email@example.com'
                    placeholderTextColor={COLORS.mediumgray} style={{
                        height: 50,
                        width: 322,
                        borderColor: "#737373",
                        borderRadius: 16,
                        borderWidth: 0.5,
                        marginTop: 20,
                        marginLeft: 35,
                        paddingLeft: 15,
                        fontSize: 18,
                    }}> 
        </TextInput>
        <TextInput value={password} placeholder='Password' secureTextEntry onChangeText={text => setPassword(text)}
                    placeholderTextColor={COLORS.mediumgray} style={{
                        height: 50,
                        width: 322,
                        borderColor: "#737373",
                        borderRadius: 16,
                        borderWidth: 0.5,
                        marginTop: 20,
                        marginLeft: 35,
                        paddingLeft: 15,
                        fontSize: 18,
                    }}>
        </TextInput>
        <TextInput placeholder='Confirm password' secureTextEntry
                    placeholderTextColor={COLORS.mediumgray} style={{
                        height: 50,
                        width: 322,
                        borderColor: "#737373",
                        borderRadius: 16,
                        borderWidth: 0.5,
                        marginTop: 20,
                        marginLeft: 35,
                        paddingLeft: 15,
                        fontSize: 18,
                    }}>
        </TextInput>
        
        <View style={styles.view2}>
            <Checkbox style={styles.checkbox}>  </Checkbox>
            <Text style={styles.text3}> By signing up, you agree with the </Text>
            <Text style={styles.text4}> Terms of Service </Text>
        </View>
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : (
            <>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
             <Text style={{color: "#FFF", fontWeight: 'bold', textAlign: 'center', fontSize: 18,shadowOffset: {
                            width: 0,
                            height: 2,
            } }}>Sign up</Text>
            </TouchableOpacity>
            </>
        )}

        <View style={styles.view2}>
            <Text style={styles.text}> Already have an account? </Text>
            <Text onPress={onPress2} style={styles.text2}> Sign in </Text>
        </View>
    </View>

  )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 32,
        marginTop: 128,
        shadowColor: '#000',
            shadowOffset: {
            width: 0,
            height: 2,
            },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    input: {
        height: 45,
        width: 322,
        borderColor: COLORS.gray,
        borderRadius: 16,
        borderWidth: 0.5,
        marginTop: 34,
        marginLeft: 246,
    },
    emailicon: {        
        position: 'relative',
        marginLeft: 20, // Adjust the left position to align the icon
        width: 20,
        height: 20,
    },
    button:{
        backgroundColor: '#494969',
        borderRadius: 14,
        textAlign: 'center',
        marginTop: 30,
        marginLeft: 35, 
        width: 322, 
        height: 55,
        textAlign: 'center',
        paddingTop: 17,
        shadowColor: '#000',
            shadowOffset: {
            width: 0,
            height: 2,
            },
    },
    checkbox: {
        width: 25, 
        height: 25,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 0,
        borderColor: "#737373",
        borderRadius: 6.5,
        borderWidth: 0.5,
    },
    text: {
        fontWeight: '500', //500 medium sized
        fontSize: 16,
        color: '#737373',
        marginLeft: 35,
        marginRight: 0,
        marginTop: 10,
    },
    text2: {
        fontWeight: '600', //bit bolder
        fontSize: 16,
        color: '#0A1B47',
        marginRight: 170,
        marginLeft: -5,
        marginTop: 10
    },
    text3: {
        fontWeight: '500', //500 medium sized
        fontSize: 12.5,
        color: '#737373',
        marginLeft: 5,
        marginRight: 0,
        marginTop: 25,
    },
    text4: {
        fontWeight: '600', //700 a bit bolder
        fontSize: 12.5,
        color: '#0A1B47',
        marginRight: 160,
        marginLeft: -5,
        marginTop: 25,
        textDecorationLine: 'underline',

    },
    view2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: -5, 
    }

})