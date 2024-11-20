import React, { useState, useEffect, useContext } from 'react';
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
import { AirCustomMessage, AirInfo, AirInfoGraph, AirInfoHeader, AirInfoMessage } from '../../components/AirInfo';
import { AuthContext, Location } from '../../components/SessionProvider';
import { LinearGradient } from 'expo-linear-gradient';

const DateDisplay = () => {
	return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(new Date());
};

const { width } = Dimensions.get('screen');
export default function Home() {
	const authContext = useContext(AuthContext);


	const params: any = useLocalSearchParams();
	let { isLoggedIn, uid } = params;
	isLoggedIn = Boolean(Number(isLoggedIn))
	const navigation = useNavigation()
	const [isFocused, setIsFocused] = useState(navigation.isFocused())
	navigation.addListener('focus', () => { setIsFocused(!isFocused) })

	const [greeting, setGreeting] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [aqiInfos, setAqiInfos] = useState([{
		locationName: 'Campinas - SP',
		latitude: '-22.970703372613546',
		longitude: '-47.13962670674579'
	}])

	useEffect(() => {
		const fetchAqiData = async () => {
			try {
				if (isLoggedIn) {
					const userDataResponse = await axios.post(`http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}/users/getPreferences`, {
						uid
					});
					if (userDataResponse.data.locations !== undefined) {
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
		return (
			<View>
				<FlatList showsHorizontalScrollIndicator={false} pagingEnabled horizontal data={aqiInfos} renderItem={({ item, index }) => <GraphModel locationName={item.locationName} latitude={item.latitude} longitude={item.longitude} index={index}></GraphModel>} />
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
		const { latitude, longitude, locationName } = props
		useEffect(() => {
			const fetchAqiData = async () => {
				try {
					if (isLoggedIn) {
						const aqiInfo = await getAqiLevelCustom(latitude, longitude, uid);
						setGlobalIndex(aqiInfo.globalIndex);
						setCustomMessage(aqiInfo.message);
					} else {
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
			<View style={{ width: width }}>
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
		<View className='flex-1 mx-6 justify-between my-5'>
			<Text className='text-3xl font-bold'>{greeting}</Text>
			<View>

				<Text className='text-sm'>
					Today is {DateDisplay()}
				</Text>
				<AirInfo uid={authContext.session} location={authContext?.locations?.[0] as Location}>
					<AirInfoHeader/>
					<View className='my-2'/>
					<View className='justify-center items-center'>
						<AirInfoGraph width={300} />
						<View className='my-2'/>
						<AirInfoMessage className='m-0' />
					</View>
					{authContext.session !== null ? (<AirCustomMessage />) : null}
				</AirInfo>
			</View>

			<LinearGradient className='flex-row py-4 items-center self-center justify-around w-10/12 rounded-2xl'
				start={[0, 1]} end={[1, 0]} colors={['rgb(8 47 73)', 'rgb(12 74 110)']}>
				<AntDesign onPress={() => router.push('/user/profile')} name="user" size={30} color="white" />

				<AntDesign onPress={() => router.push({ pathname: '/Search', params: { isLoggedIn: params.isLoggedIn, uid } })} name="search1" size={30} color="white" />

				<Octicons onPress={() => console.log('More pressed')} name="three-bars" size={30} color="white" />

			</LinearGradient>
		</View>
	)
}