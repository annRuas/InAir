import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  Stack, useLocalSearchParams } from 'expo-router'
import axios from 'axios';
import Constants from 'expo-constants';

export default function UserPrefereces() {
    const params: any = useLocalSearchParams();
    const { uid } = params
    const [name, setName] = useState('');
    const [diseases, setDiseases] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [pageLoaded, setPageLoaded] = useState(false);

    
    useEffect(() => {
        const getUserPreferences = async () => {
            const userDataResponse = await axios.post(`http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}/users/getPreferences`, {
                uid
            });

            const userData = userDataResponse.data;

            setName(userData.name);
            setDiseases(userData.diseases.join(', '));
            setAge(userData.age);
            setEmail(userData.email);
            setPageLoaded(true);
        }

        getUserPreferences();

    }, [])

    if(!pageLoaded) {
        return null;
    }

    return (
        <View style={{alignContent: 'center', alignItems: 'center', gap: 30, marginTop: 30}}>
            <Stack.Screen
                options={{
                title: 'Profile',
            }}/>
            <Image source={require('../../icons/profile-picture.png')} />
            <Text style={{
                ...textBold(32).conditionalStyle, 
                textShadowColor: 'rgba(0, 0, 0, 0.40)',
                textShadowOffset: {width: 0, height:3},
                textShadowRadius: 10
            }}> 
                {name} 
            </Text>
            <View style={{gap: 20}}>
                <View style={styles.box}>
                    <Text style={textBold(20).conditionalStyle}> RESIDENCE </Text>
                    <Text style={styles.smallText}> Address </Text>
                </View>
                <View style={{flexDirection: 'row', gap: 20}}>
                    <View style={styles.box}>
                        <Text style={textBold(20).conditionalStyle}> NOTE </Text>
                        <Text style={textBold(20).conditionalStyle}> Bearer of disease</Text>
                        <Text style={styles.smallText}> {diseases} </Text>
                    </View>
                    <View style={styles.box}> 
                        <Text style={textBold(20).conditionalStyle}> AGE </Text>
                        <Text style={{fontSize: 26, textAlign: 'center', paddingLeft: -2}}> {age} </Text>
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={textBold(20).conditionalStyle}> Email: </Text>
                    <Text style={styles.smallText}> {email} </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button}>
                        <Text style={{
                            color: "#FFF", fontWeight: 'bold', textAlign: 'center', fontSize: 18, shadowOffset: {
                                width: 0,
                                height: 2,
                            }
                        }}>Edit</Text>
            </TouchableOpacity>
        </View>
    )
}

const textBold = (fontSize: number) => StyleSheet.create({
    conditionalStyle: {
        fontWeight: 'bold', 
        fontSize
    }
})

const styles = StyleSheet.create({
    box: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: '#F2F2F2',
        borderColor: 'black', 
        borderWidth: 0.5, 
        borderRadius: 14, 
        padding: 10,
    },
    button: {
        backgroundColor: '#494969',
        borderRadius: 14,
        textAlign: 'center',
        width: 300,
        height: 50,
        padding: 13,
    },
    smallText: {
        fontSize: 18,
        fontWeight: 'regular'
    }

})