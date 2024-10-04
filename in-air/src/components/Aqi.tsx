import React, { useState } from 'react'
import { Graph } from '../components/Graph';
import { TouchableOpacity, View, Text, Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';

export function Aqi(props: any) {
    const [isModalActive, setIsModalActive] = useState(false);
    const coordinates = props.coordinates;
    const locationMessage = props.locationMessage;
    
  return (
    <View>
        <Graph coordinates={coordinates} locationMessage={locationMessage}/>
        <Modal visible={isModalActive} transparent animationType='fade'>
            <View style={{ position: 'absolute', 
                    top: 0, left: 0, 
                    right: 0, bottom: 0, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}>
                <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 14, marginHorizontal: 20}}>
                    <View style={{flexDirection: 'row', justifyContent:'center'}}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', verticalAlign: 'middle',  textAlign: 'center' }}> Create an account </Text>
                        <AntDesign
                        onPress={() => setIsModalActive(false)}
                        style={{position: 'absolute', right: 0}}
                                    name={'closecircle'}
                                    color={'#CF0000'}
                                    size={25}
                        />
                    </View>
                <Text style={{ fontSize: 18, color: '#737373', padding: 20, textAlign: 'center' }}>

                    To save a location, you must <Text style={{textDecorationLine: 'underline'} } onPress={() => router.push({pathname: "/Signup"})}>create one</Text> or <Text onPress={() => router.push({pathname: "/Login"})} style={{textDecorationLine: 'underline'}}>log in</Text> your account.
                </Text>
                </View>
            </View>
        </Modal>
        <View style={{alignItems:'center'}}>
            <TouchableOpacity 
                onPress={() => setIsModalActive(true)}
            style={{
            backgroundColor: '#494969',
            borderRadius: 14,
            marginTop: 30,
            width: 274,
            height: 50,
            padding: 15,
            }}>
            <Text style={{
                color: "#FFF", fontWeight: 'bold', textAlign: 'center', fontSize: 18, shadowOffset: {
                    width: 0,
                    height: 2,
                }
            }}>Save Location</Text>
          </TouchableOpacity>
        </View>

      </View>
  );
}
