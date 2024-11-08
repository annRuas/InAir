import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../constants/colors'
import { Link } from 'expo-router'

export default function UserPrefereces() {
    return (


        <View style={{ paddingTop: 40, paddingLeft: 20}}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, paddingTop: 30, paddingLeft: -20}}>
                <View style={{ backgroundColor: 'grey', width: 50, height: 50, borderRadius: 50, marginTop: -40 }}></View>
                <Text style={{ fontSize: 28, fontWeight: 'bold', verticalAlign: 'middle',  textAlign: 'center', marginTop: -32, }}>Guest</Text>
            </View>
            <View style= {{alignItems: 'center', display: 'flex'}}>
                <Text style={{ fontSize: 20, color: '#737373', marginTop: 70, marginLeft: -30, width: 310, height: 118, textAlign: 'center' }}>
                    To have and personalize a profile, you must create one or log in your account.
                </Text>

                <Link href="/Login" asChild>

                    <TouchableOpacity style={styles.button}>
                        <Text style={{
                            color: "#FFF", fontWeight: 'bold', textAlign: 'center', fontSize: 18, shadowOffset: {
                                width: 0,
                                height: 2,
                            }
                        }}>Log In</Text>
                    </TouchableOpacity>
                </Link>

                <Link href="/Signup" asChild>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{
                            color: "#FFF", fontWeight: 'bold', textAlign: 'center', fontSize: 18, shadowOffset: {
                                width: 0,
                                height: 2,
                            }
                        }}>Create Account</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#494969',
        borderRadius: 14,
        textAlign: 'center',
        marginTop: 15,
        marginLeft: -30,
        width: 300,
        height: 50,
        padding: 13,
    }
})