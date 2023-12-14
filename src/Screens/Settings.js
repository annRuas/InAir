import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Settings = () => {
  return (
    <View style={styles.container}>
        <View> 
            <text> Name </text>
        </View>

        <View>
        <TouchableOpacity style={styles.title2 && styles.frufru} > Notifications </TouchableOpacity>
        <TouchableOpacity style={styles.title2}> Information Sources </TouchableOpacity>
        <TouchableOpacity style={styles.title2}> About Us </TouchableOpacity>
         </View>

    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    title2:{
        paddingLeft: 30 ,
        fontWeight: 500,
        fontSize: 18,
    },
    frufru:{
        width: 330,
        height: 65,
        borderRadius: 16,
        borderWidth: 0.5,
        backgroundColor: "#f5f5f5",
        shadowColor: '#000',
            shadowOffset: {
            width: 0,
            height: 2,
            },
    },
    logout: {

    }
})