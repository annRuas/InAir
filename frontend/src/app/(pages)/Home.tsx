import React, { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import { router } from 'expo-router';
import { getGreeting } from '../../utils/getGreeting';
import { AirCustomMessage, AirInfo, AirInfoGraph, AirInfoHeader, AirInfoMessage } from '../../components/AirInfo';
import { AuthContext, Location } from '../../components/SessionProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { Directions, Gesture, GestureDetector, Pressable } from 'react-native-gesture-handler';
import clsx from 'clsx';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { SavedLocations } from '../../components/SavedLocations';

const DateDisplay = () => {
	return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(new Date());
};

const { width } = Dimensions.get('screen');

export default function Home() {
	const authContext = useContext(AuthContext);
	const [greeting, setGreeting] = useState('');
	const [locations, setLocations] = useState<Location[]>([]);
	const [loading, setLoading] = useState(true);

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const flatListRef: any = useRef(null); // I don't know how to type this.
	const [pageIndex, setPageIndex] = useState(0);

	const flingLeft = Gesture.Fling().direction(Directions.LEFT);
	const flingRight = Gesture.Fling().direction(Directions.RIGHT);
	flingLeft.onStart(() => toNextPage());
	flingRight.onStart(() => toLastPage());
	const fling = Gesture.Exclusive(flingLeft, flingRight);

	const toPage = (page: number) => {
		if (page < 0 && pageIndex === 0) {
			return;
		}

		if (page > 0 && pageIndex === (locations.length - 1)) {
			return;
		}
		setPageIndex(pageIndex + page)
		flatListRef.current?.scrollToIndex({ index: pageIndex + page, animated: true })
	}

	const toNextPage = () => toPage(1);
	const toLastPage = () => toPage(-1);
	useEffect(() => {
		setGreeting(getGreeting());
		setInterval(() => setGreeting(getGreeting()), 60 * 1000);

		if (authContext.locations?.length === 0 || authContext.locations === null) {
			setLocations([{
				name: "Campinas - SP",
				coordinates: {
					longitude: '-47.06698226928711',
					latitude: '-22.90245246887207'
				}
			}])
		} else {
			setLocations(authContext.locations);
		}
		setLoading(false);

	}, [])

	if (loading) {
		return (
			<></>
		)
	}
	return (
		<View className='w-full h-full'>
			<View className='flex-1 justify-between my-5'>
				<Text className='text-3xl font-bold mx-6'>{greeting}</Text>
				<View>
					<GestureDetector gesture={fling}>
						<FlatList scrollEnabled={false} showsHorizontalScrollIndicator={false} ref={flatListRef} pagingEnabled horizontal data={locations} renderItem={({ item, index }) =>
							<View style={{ width: width }}>
								<View className='mx-6'>
									<Text className='text-base'>
										Today is {DateDisplay()}
									</Text>
									<AirInfo uid={authContext.session} location={item as Location}>
										<AirInfoHeader />
										<View className='my-2' />
										<View className='justify-center items-center'>
											<AirInfoGraph width={300} />
											<View className='my-2' />
											<Pressable onPress={() => {
												if(authContext.locations && authContext.locations?.length > 0) {
													bottomSheetModalRef.current?.present()
												}
											}}>
												<Text className='text-green-600'>Saved Locations</Text>
											</Pressable>
											<View className='my-1' />
											{authContext.session !== null ? (<AirCustomMessage />) : null}
											<View className='my-1' />
											<AirInfoMessage className='m-0' />
										</View>
									</AirInfo>
								</View>
							</View>
						} />
					</GestureDetector>
					<View className='my-3' />
					<View className='flex-row justify-center gap-x-3'>
						{locations.map((e, i) =>
							<View key={i} className={clsx('w-3 h-3 rounded-full', i === pageIndex ? 'bg-gray-600' : 'bg-gray-400')} />
						)}
					</View>
				</View>

				<LinearGradient className='flex-row py-4 items-center self-center justify-around w-10/12 rounded-2xl'
					start={[0, 1]} end={[1, 0]} colors={['rgb(8 47 73)', 'rgb(12 74 110)']}>
					<AntDesign onPress={() => router.push('/user/profile')} name="user" size={30} color="white" />

					<AntDesign onPress={() => router.push('/user/search')} name="search1" size={30} color="white" />

					<Octicons onPress={() => {
						if (authContext.session !== null) {
							router.push('/user/more');
						} else {
							router.push('/user/profile');
						}

					}} name="three-bars" size={30} color="white" />
				</LinearGradient>
			</View>
			<SavedLocations ref={bottomSheetModalRef}></SavedLocations>
		</View>
	)
}
