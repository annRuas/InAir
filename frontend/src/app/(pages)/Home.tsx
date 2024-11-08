import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import { AirQualityHeaderMessage } from '../../components/AirQualityHeaderMessage';
import { Graph } from '../../components/Graph';
import { InfoMessageBox } from '../../components/InfoMessageBox';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { getGreeting } from '../../utils/getGreeting';
import { getAqiLevel, getAqiLevelCustom } from '../../actions/getAqiLevel';
import { getAqiInfo } from '../../utils/getAqiInfo';
import axios from 'axios';
import Constants from 'expo-constants';

const DateDisplay = () => {
	const currentDate = new Date();
	const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(currentDate);
	return <Text style={styles.date}>{formattedDate}</Text>;
};

const { width } = Dimensions.get('screen'); 
export default function Home() {
	const params: any = useLocalSearchParams();
	let { isLoggedIn, uid } = params;
	isLoggedIn = Boolean(Number(isLoggedIn))
	const navigation = useNavigation()
	const [isFocused, setIsFocused] = useState(navigation.isFocused())
	navigation.addListener('focus', () => {setIsFocused(!isFocused)}) 

	const [greeting, setGreeting] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [aqiInfos, setAqiInfos] = useState([{
		locationName: 'Campinas - SP',
		latitude: '-22.970703372613546',
		longitude: '-47.13962670674579'
	}])

	useEffect(() => {
		console.log(isFocused);
			const fetchAqiData = async () => {
			try {
				if (isLoggedIn) {
					const userDataResponse = await axios.post(`http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}/users/getPreferences`, {
						uid
					});
					if(userDataResponse.data.locations !== undefined) {
						setAqiInfos([aqiInfos[0]].concat(userDataResponse.data.locations));
					}
				} 

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
	}, [isFocused]);

	if (isLoading) {
		return null;
	}

	const Slider = () => {
		console.log(aqiInfos)
		return (
			<View>
				<FlatList showsHorizontalScrollIndicator={false} pagingEnabled horizontal data={aqiInfos} renderItem={({item, index}) => <GraphModel locationName={item.locationName} latitude={item.latitude} longitude={item.longitude} index={index}></GraphModel>}/>
			</View>
		)
	}

	const GraphModel = (props: any) => {
		const [globalIndex, setGlobalIndex] = useState(0);
		const [aqiColor, setAqiColor] = useState('');
		const [aqiClassification, setAqiClassification] = useState('');	
		const [aqiClassificationSubMessage, setAqiClassificationMessage] = useState('');
		const [aqiMessage, setAqiMessage] = useState('');
		const [customMessage, setCustomMessage] = useState('Please create an account to get a custom message.');
		const {latitude, longitude, locationName } = props 
		useEffect(() => {
			const fetchAqiData = async () => {
				try {
					if (isLoggedIn) {
						const aqiInfo = await getAqiLevelCustom(latitude, longitude, uid);
						setGlobalIndex(aqiInfo.globalIndex);
						setCustomMessage(aqiInfo.message);
					} else {
						console.log('here on not')
						setGlobalIndex(await getAqiLevel(latitude, longitude));
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

		return (
			<View style={{width: width}}>
				<AirQualityHeaderMessage locationName={locationName} aqiColor={aqiColor} aqiClassification={aqiClassification} aqiClassificationSubMessage={aqiClassificationSubMessage} />
				<Graph globalIndex={globalIndex} aqiColor={aqiColor} />
				<Text style={{
					fontSize: 15,
					fontWeight: 'regular',
					marginTop: 30,
					marginLeft: 20,
					alignSelf: 'center'
				}}>
					{customMessage}
				</Text>

				<InfoMessageBox aqiColor={aqiColor} aqiMessage={aqiMessage} />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{greeting}</Text>
			<Text style={styles.date}>
				Today is {DateDisplay()}
			</Text>

			<Slider/>

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

					<AntDesign style={styles.iconStyle} onPress={() => router.push({ pathname: '/Search', params: { isLoggedIn: params.isLoggedIn, uid } })} name="search1" size={30} color="white" />

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