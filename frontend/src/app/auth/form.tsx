import { TouchableOpacity, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Checkbox  from 'expo-checkbox'
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebaseConfig'

export default function Form() {
    const params: any = useLocalSearchParams();

    const { name, email, password } = params;
    const [age, setAge] = useState('')
    const [hasAsthma, setHasAsthma] = useState(false);
    const [hasCOPD, setHasCOPD] = useState(false);
    const [hasBronchitis, setHasBronchitis] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        setLoading(true);
        try{
            const diseases = [];
            if(hasBronchitis) diseases.push('Bronchitis');
            if(hasAsthma)     diseases.push('Asthma');
            if(hasCOPD)       diseases.push('COPD');
            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const uid = response.user.uid;
            const token = await response.user.getIdToken();

            await axios.post(`http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}/users/create-preferences`, {
                name,
                age,
                diseases,
                uid,
                email
            }, { headers: {
                authorization: token
            }});

            return router.replace({pathname: '/Home', params: {isLoggedIn: 1, uid: uid}});
        }catch(error){
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
            <View>
                <Text style={styles.title}> Medical Form  </Text>
                
                <TextInput value={age} onChangeText={text => setAge(text)}
                placeholder='Age'
                            placeholderTextColor='grey' style={{
                                height: 50,
                                width: 322,
                                borderColor: "#737373",
                                borderRadius: 16,
                                borderWidth: 0.5,
                                marginTop: 50,
                                marginLeft: 35,
                                paddingLeft: 15,
                                fontSize: 18,
                            }}>
                </TextInput>

                <Text style={styles.text22}>Please check any of the following conditions that apply to you</Text>

                <View style={styles.view2}>
                    <Checkbox style={styles.checkbox} value={hasAsthma} onValueChange={setHasAsthma}>  </Checkbox>
                    <Text style={styles.text3}> Asthma </Text>
                </View>
                <View style={styles.view2}>
                    <Checkbox style={styles.checkbox} value={hasCOPD} onValueChange={setHasCOPD}>  </Checkbox>
                    <Text style={styles.text3}> COPD </Text>
                </View>
                <View style={styles.view2}>
                    <Checkbox style={styles.checkbox} value={hasBronchitis} onValueChange={setHasBronchitis}>  </Checkbox>
                    <Text style={styles.text3}> Bronchitis </Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                     <Text style={{color: "#FFF", fontWeight: 'bold', textAlign: 'center', fontSize: 18,shadowOffset: {
                                    width: 0,
                                    height: 2,
                    } }}>Finish</Text>
                    </TouchableOpacity>
                )}
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
        marginTop: 40,
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
        borderColor: 'grey',
        borderRadius: 16,
        borderWidth: 0.5,
        marginTop: 20,
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
        marginTop: 40,
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
    text22: {
        fontWeight: '600', //bit bolder
        fontSize: 16,
        color: '#484848',
        marginRight: 20,
        marginLeft: 35,
        marginTop: 40
    },
    text3: {
        fontWeight: '500', //500 medium sized
        fontSize: 16,
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
        paddingHorizontal: -5, 
        direction: "ltr"
    }

})