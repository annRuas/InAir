import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Dimensions, View } from 'react-native'
import { FirstPage } from '../../../components/auth/form/FirstPage'
import { SecondPage } from '../../../components/auth/form/SecondPage'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ThirdPage } from '../../../components/auth/form/ThirdPage';
import { FourthPage } from '../../../components/auth/form/FourthPage';
import { FifthPage } from '../../../components/auth/form/FifthPage';
import { useNavigation } from 'expo-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';

const { width } = Dimensions.get('screen');

const schema = z.object({
    dateOfBirth: z.string().datetime(),
    isMale: z.boolean(),
    isFemale: z.boolean(),
    height: z.number(),
    weight: z.number(),
    q_experiences_1: z.boolean(),
    q_experiences_2: z.boolean(),
    q_experiences_3: z.boolean(),
    q_experiences_4: z.boolean(),
    q_experiences_5: z.boolean(),
    hasAsbestosis: z.boolean(),
    hasAsthma: z.boolean(),
    hasChronicBronchitis: z.boolean(),
    hasEmphysema: z.boolean(),
    hasPneumonia: z.boolean(),
    hasTuberculosis: z.boolean(),
    hasSilicosis: z.boolean(),
    hasPneumothorax: z.boolean(),
    hasLungCancer: z.boolean(),
    hasBrokenRibs: z.boolean(),
    hasChestInjuriesOrSurgeries: z.boolean(),
    hasUnknownLungProblem: z.boolean(),
    q_symptoms_1: z.boolean(),
    q_symptoms_2: z.boolean(),
    q_symptoms_3: z.boolean(),
    q_symptoms_4: z.boolean(),
    q_symptoms_5: z.boolean(),
    q_symptoms_6: z.boolean(),
    q_symptoms_7: z.boolean(),
    q_symptoms_8: z.boolean(),
    q_symptoms_9: z.boolean()
})

type FormFields = z.infer<typeof schema>


export default function Form() {

    const { control, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schema)
    });
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
