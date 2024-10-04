import { View, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants/colors';
import Checkbox from "expo-checkbox"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../firebaseConfig'
import { router } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants';


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const handleSignIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);

            const uid = response.user.uid;
            const token = await response.user.getIdToken();

            const hasPreferences = await axios.post(`http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}/users/hasPreferences`, {
                uid: response.user.uid
            });

            if(hasPreferences.data.message === 'found') {
                return router.replace({pathname: '/Home', params: {isLoggedIn: 1, uid: response.user.uid}});
            } 
            return router.replace({pathname: '/Form', params: { token: token, uid: uid }});
        }catch(error){
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return(
        <View>
        <Text style={styles.title}> Log in </Text>

        <TextInput keyboardType="email-address" placeholder='email@example.com' onChangeText={text => setEmail(text)}
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
        <TextInput placeholder='Password' secureTextEntry onChangeText={text => setPassword(text)}
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
            <Text style={styles.text}> Remember me </Text>
        </View>

        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : (
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
             <Text style={{color: "#FFF", fontWeight: 'bold', textAlign: 'center', fontSize: 18,shadowOffset: {
                            width: 0,
                            height: 2,
            } }}>Log in</Text>
            </TouchableOpacity>
        )}

        
        <View style={styles.view2}>
         <Text style={styles.text3}> Already have an account? </Text>
         <Text style={styles.text2}> Sign up </Text>
         </View>

    </View>
    )
}



    

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
        borderColor: "#737373",
        borderRadius: 6.5,
        borderWidth: 0.5,
    },
    text: {
        fontWeight: '400', //500 medium sized
        fontSize: 16,
        color: '#737373',
        marginLeft: 0,
        marginTop: 23,
        marginRight: 217,
    },
    text2: {
        fontWeight: '700', //700 a bit bolder
        fontSize: 16,
        color: '#0A1B47',
        marginRight: 205,
        marginTop: 10
    },
    text3: {
        fontWeight: '500', 
        fontSize: 16,
        color: '#737373',
        marginRight: 0,
        marginLeft: 35,
        marginTop: 10
    },
    view2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: -5, 
    },
})