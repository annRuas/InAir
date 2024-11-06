import React, { useRef, useState } from 'react'
import { ScrollView, Dimensions, View } from 'react-native'
import { FirstPage } from '../../components/auth/form/FirstPage'
import { SecondPage } from '../../components/auth/form/SecondPage'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('screen');

export default function Form() {
    const scrollViewRef: any = useRef(null); // I don't know how to type this.
    const [pageIndex, setPageIndex] = useState(0);
    const progressWidth = useSharedValue(1);

    const progressStyle = useAnimatedStyle(() => ({
        width: `${interpolate(progressWidth.value, [0, 5], [0, 100])}%`
    }))

    const toNextPage = () => {
        setPageIndex(pageIndex + 1)
        scrollViewRef.current?.scrollTo({ x: width * pageIndex, animated: true })
        progressWidth.value = withTiming(progressWidth.value + 1)
    }

    return (
        <View className='flex-1 justify-center items-center'>
            <View className='bg-gray-200 mt-20 h-1 w-10/12'> 
                <Animated.View className='bg-gray-900 h-full' style={[progressStyle]}/>
            </View>
            <ScrollView ref={scrollViewRef} showsHorizontalScrollIndicator={false} pagingEnabled horizontal>
                <FirstPage changePage={toNextPage} />
                <SecondPage />
            </ScrollView>
        </View>
    )
}
