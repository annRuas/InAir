import { FlatList, ImageBackground, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../../constants/colors';
import axios from 'axios';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SearchModal } from '../../../components/SearchModal';
import { useLocalSearchParams } from 'expo-router';

export default function Search() {
    const params: any = useLocalSearchParams();

    const [input, setInput] = useState<string>("");
    const [data, setData] = useState<any>();
    const [locationModal, setLocationModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedCoordinates, setSelectedCoordinates] = useState([]);
    const searchApi = async(text: string) => {
        if(text.length > 3) {

            const search = await axios.post(`http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}/maps/get-locations`, {
                address_name: text
            })
            setData(search.data.addresses);
        }    
    }

    useEffect(() => {
        setData([]);
        const timeout = setTimeout(() => searchApi(input), 1000);
        return () => clearTimeout(timeout);
    }, [input])

    return (

        <View style={{ alignItems: 'center', gap: 20}}>
            
            <View style={{
                        height: 50,
                        width: 322,
                        borderColor: "#737373",
                        borderRadius: 16,
                        borderWidth: 0.5,
                        marginTop: 40,
                        paddingLeft: 15,
                        flexDirection: 'row',
                        alignItems:'center'
            }}>
                <MaterialIcons
                            name={'search'}
                            color={'grey'}
                            size={30}
                />
                <TextInput  placeholder='Search'
                value={input}
                onChangeText={text => setInput(text)}
                    style={{fontSize: 18}}
                    placeholderTextColor={COLORS.mediumgray}                
                />
            </View>
            <FlatList 
                data={data}
                renderItem={ ({item, index}) => (
                    <View style={{ margin: 10, marginHorizontal: 40, marginRight: 70, borderRadius: 14, padding: 20, borderStyle: 'solid', backgroundColor: '#F6F6F6', 
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOffset: {
                        width: 0,
                        height: 2,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        }}>
                        <MaterialIcons
                            name={'location-pin'}
                            color={'#CF0000'}
                            size={30}
                        />
                            <Pressable onPress={() => {
                                setSelectedAddress(item.address);
                                setSelectedCoordinates(item.coordinates);
                                setLocationModal(true);
                                
                                }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 30, verticalAlign: 'middle',  textAlign: 'center' }}> {item.address} </Text>
                            </Pressable>
                    </View>
                )}
                showsVerticalScrollIndicator={true}
            />
            <Modal
                transparent={true}
                visible={locationModal}
            >
                <View style={{flex:1 , backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style={{marginTop: 'auto', borderTopStartRadius: 14, borderTopEndRadius: 14, backgroundColor:'#FFFFFF'}}>
                        <View style={{flexDirection:'row', alignItems:'center', paddingTop: 10}}>
                            <AntDesign name="down" style={{ paddingLeft: 10}} size={40} onPress={() => setLocationModal(false)} color="black" />
                            <MaterialIcons
                                name={'location-pin'}
                                color={'#CF0000'}
                                size={40}
                            />
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingRight: 90, verticalAlign: 'middle',  textAlign: 'center' }}> {selectedAddress} </Text>
                            </View>
                        <View style={{marginBottom: 25}}></View>
                        <SearchModal isLoggedIn={params.isLoggedIn} setLocationModal={setLocationModal} uid={params.uid} coordinates={selectedCoordinates} locationName={selectedAddress}/>
                        <View style={{marginBottom: 100}}></View>
                    </View>
            </View>
            </Modal>
        </View>
    );
}