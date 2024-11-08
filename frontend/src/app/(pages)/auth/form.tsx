import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Dimensions, View } from 'react-native'
import { FirstPage } from '../../../components/auth/form/FirstPage'
import { SecondPage } from '../../../components/auth/form/SecondPage'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ThirdPage } from '../../../components/auth/form/ThirdPage';
import { FourthPage } from '../../../components/auth/form/FourthPage';
import { FifthPage } from '../../../components/auth/form/FifthPage';
import { useNavigation } from 'expo-router';

const { width } = Dimensions.get('screen');

export default function Form() {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const scrollViewRef: any = useRef(null); // I don't know how to type this.
    const [pageIndex, setPageIndex] = useState(0);
    const progressWidth = useSharedValue(0);

    const progressStyle = useAnimatedStyle(() => ({
        width: `${interpolate(progressWidth.value, [0, 5], [0, 100])}%`
    }))

    const toNextPage = () => {
        setPageIndex(pageIndex + 1)
        scrollViewRef.current?.scrollTo({ x: width * (pageIndex + 1), animated: true })
        progressWidth.value = withTiming(progressWidth.value + 1)
    }
    const handlePageChange = (e: { nativeEvent: { contentOffset: any; }; }) => {
        const offset = e.nativeEvent.contentOffset;
        if (offset) {
            const page = Math.round(offset.x / width);
            progressWidth.value = withTiming(page, {
                duration: 300
            })
            setPageIndex(page);
        }
    }
    return (
        <View className='flex-1 justify-center items-center'>
            <View className='bg-gray-200 mt-20 mb-5 h-1 w-10/12'>
                <Animated.View className='bg-gray-900 h-full' style={[progressStyle]} />
            </View>
            <ScrollView onMomentumScrollEnd={handlePageChange} nestedScrollEnabled ref={scrollViewRef} showsHorizontalScrollIndicator={false} pagingEnabled horizontal>
                <FirstPage changePage={toNextPage} />
                <SecondPage changePage={toNextPage} />
                <ThirdPage changePage={toNextPage} />
                <FourthPage changePage={toNextPage} />
                <FifthPage />
            </ScrollView>
        </View>
    )
}
