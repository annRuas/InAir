import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import { AirQualityHeaderMessage } from '../components/AirQualityHeaderMessage';
import { Graph } from '../components/Graph';
import { InfoMessageBox } from '../components/InfoMessageBox';
import { router, useLocalSearchParams } from 'expo-router';
import { getGreeting } from '../utils/getGreeting';
import { getAqiLevel, getAqiLevelCustom } from '../actions/getAqiLevel';
import { getAqiInfo } from '../utils/getAqiInfo';

const DateDisplay = () => {
	const currentDate = new Date();
	const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric'}).format(currentDate);
	return <Text style={styles.date}>{formattedDate}</Text>;
};


export default function Home() {
	const params: any = useLocalSearchParams();
	let { isLoggedIn, uid } = params;
	isLoggedIn = Boolean(Number(isLoggedIn))
	const [greeting, setGreeting] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [globalIndex, setGlobalIndex] = useState(0);
	const [aqiColor, setAqiColor] = useState('');
	const [aqiClassification, setAqiClassification] = useState('');
	const [aqiClassificationSubMessage, setAqiClassificationMessage] = useState('');
	const [aqiMessage, setAqiMessage] = useState('');
	const [customMessage, setCustomMessage] = useState('Please create an account to get a custom message.');

	useEffect(() => {
		const fetchAqiData = async () => {
			try {
				if (isLoggedIn) {
					const aqiInfo = await getAqiLevelCustom('-22.970703372613546', '-47.13962670674579', uid);
					setGlobalIndex(aqiInfo.globalIndex);
					setCustomMessage(aqiInfo.message);
				} else {
					setGlobalIndex(await getAqiLevel('-22.970703372613546', '-47.13962670674579'));
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
		setGreeting(getGreeting());
		const intervalId = setInterval(() => setGreeting(getGreeting()), 60 * 1000);

		return () => clearInterval(intervalId);
	}, []);

	if (isLoading) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{greeting}</Text>
			<Text style={styles.date}>
				Today is {DateDisplay()}
			</Text>

			<AirQualityHeaderMessage locationName='Campinas - SP' aqiColor={aqiColor} aqiClassification={aqiClassification} aqiClassificationSubMessage={aqiClassificationSubMessage}/>
			<Graph globalIndex={globalIndex} aqiColor={aqiColor}/>
			<Text style={{
				fontSize: 15,
				fontWeight: 'regular',
				marginTop: 30,
				marginLeft: 20,
				alignSelf: 'center'
			}}>
				{customMessage}
			</Text>

			<InfoMessageBox aqiColor={aqiColor} aqiMessage={aqiMessage}/>

			<View>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 30,
					backgroundColor: '#2A3654',
					borderRadius: 20,
					marginTop: 50,
					marginHorizontal: 20,
					paddingHorizontal: 20
				}}>
					<AntDesign style={styles.iconStyle} onPress={() => router.push(isLoggedIn ? { pathname: 'ProfileLoggedIn', params: { uid } } : 'Profile')} name="user" size={30} color="white" />

					<AntDesign style={styles.iconStyle} onPress={() => router.push({ pathname: '/Search', params: { isLoggedIn: params.isLoggedIn } })} name="search1" size={30} color="white" />

					<Octicons style={styles.iconStyle} onPress={() => console.log('More pressed')} name="three-bars" size={30} color="white" />

				</View>
			</View>
		</View>
	)
}


const styles = StyleSheet.create({
	iconStyle: {
		padding: 20,
		paddingHorizontal: 25
	},
	container: {
		flex: 1,
		marginTop: 80,
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		marginLeft: 20,
		marginTop: -50,
		marginBottom: 10,
	},
	date: {
		fontSize: 18,
		fontWeight: 'regular',
		marginTop: 30,
		marginLeft: 20,
	},
});