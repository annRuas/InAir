import React, { useEffect, useState } from 'react'
import { Graph } from './Graph';
import { TouchableOpacity, View, Text, Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { SearchModalProps } from '../types/searchModalProps';
import { getAqiLevel, getAqiLevelCustom } from '../actions/getAqiLevel';
import { getAqiInfo } from '../utils/getAqiInfo';
import { AirQualityHeaderMessage } from './AirQualityHeaderMessage';
import { InfoMessageBox } from './InfoMessageBox';

export function SearchModal(props: SearchModalProps) {
    const {uid, isLoggedIn, coordinates, locationName} = props;
    const [longitute, latitude] = coordinates;
    const [isModalActive, setIsModalActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [globalIndex, setGlobalIndex] = useState(0);
    const [aqiColor, setAqiColor] = useState('');
    const [aqiClassification, setAqiClassification] = useState('');
	const [aqiClassificationSubMessage, setAqiClassificationMessage] = useState('');
	const [aqiMessage, setAqiMessage] = useState('');

    useEffect(() => {
		const fetchAqiData = async () => {
			try {
				if (isLoggedIn) {
					const aqiInfo = await getAqiLevelCustom(latitude, longitute, uid);
					setGlobalIndex(aqiInfo.globalIndex);
				} else {
					setGlobalIndex(await getAqiLevel(latitude, longitute));
				}

                const { color, message, classification, classificationMessage } = getAqiInfo(globalIndex);
                setAqiColor(color);
                setAqiMessage(message);
                setAqiClassification(classification);
				setAqiClassificationMessage(classificationMessage);

			} catch (error) {
				console.error('Error fetching air quality data:', error);
			} finally {
                setIsLoading(false);
            }
		};

		fetchAqiData();

	}, []);

    if(isLoading) {
        return null;
    }

    return (
        <View>
            <AirQualityHeaderMessage 
                aqiColor={aqiColor} 
                aqiClassification={aqiClassification} 
                aqiClassificationSubMessage={aqiClassificationSubMessage}
                locationName={locationName}
                alignItems='center'
            />
            <Graph globalIndex={globalIndex} aqiColor={aqiColor} />

            <InfoMessageBox aqiColor={aqiColor} aqiMessage={aqiMessage} />

            <View style={{ alignItems: 'center' }}>
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

            

            <Modal visible={isModalActive} transparent animationType='fade'>
                <View style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    right: 0, bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 14, marginHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', verticalAlign: 'middle', textAlign: 'center' }}> Create an account </Text>
                            <AntDesign
                                onPress={() => setIsModalActive(false)}
                                style={{ position: 'absolute', right: 0 }}
                                name={'closecircle'}
                                color={'#CF0000'}
                                size={25}
                            />
                        </View>
                        <Text style={{ fontSize: 18, color: '#737373', padding: 20, textAlign: 'center' }}>

                            To save a location, you must <Text style={{ textDecorationLine: 'underline' }} onPress={() => router.push({ pathname: "/Signup" })}>create one</Text> or <Text onPress={() => router.push({ pathname: "/Login" })} style={{ textDecorationLine: 'underline' }}>log in</Text> your account.
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
