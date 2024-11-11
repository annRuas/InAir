import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native'
import { FirstPage } from '../../../components/auth/form/FirstPage'
import { SecondPage } from '../../../components/auth/form/SecondPage'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ThirdPage } from '../../../components/auth/form/ThirdPage';
import { FourthPage } from '../../../components/auth/form/FourthPage';
import { FifthPage } from '../../../components/auth/form/FifthPage';
import { useNavigation } from 'expo-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Directions, Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');

const schema = z.object({
    dateOfBirth: z.string().datetime(),
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

export type FormFields = z.infer<typeof schema>


export default function Form() {
    const flingLeft = Gesture.Fling().direction(Directions.LEFT);
    const flingRight = Gesture.Fling().direction(Directions.RIGHT);
    flingLeft.onStart(() => toNextPage());
    flingRight.onStart(() => toLastPage());
    const fling = Gesture.Exclusive(flingLeft, flingRight);

    const { control, handleSubmit, formState: { errors } } = useForm<FormFields>();
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

    const toPage = (page: number) => {
        if (Keyboard.isVisible()) {
            Keyboard.dismiss();
        }

        if (page < 0 && pageIndex === 0) {
            return;
        }

        if (page > 0 && pageIndex === 4) {
            return;
        }
        setPageIndex(pageIndex + page)
        scrollViewRef.current?.scrollTo({ x: width * (pageIndex + page), animated: true })
        progressWidth.value = withTiming(progressWidth.value + page)
    }

    const toNextPage = () => toPage(1);
    const toLastPage = () => toPage(-1);

    const onSubmit: SubmitHandler<FormFields> = async (formFields) => {
        try {
            console.log(formFields);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={50} className='flex-1 justify-center items-center'>
            <View className='bg-gray-200 mt-20 mb-5 h-1 w-10/12'>
                <Animated.View className='bg-gray-900 h-full' style={[progressStyle]} />
            </View>
            
            <GestureDetector gesture={fling}>
                    <ScrollView scrollEnabled={false} nestedScrollEnabled ref={scrollViewRef} showsHorizontalScrollIndicator={false} pagingEnabled horizontal>
                        <FirstPage changePage={toNextPage} />
                        <SecondPage control={control} changePage={toNextPage} />
                        <ThirdPage control={control} changePage={toNextPage} />
                        <FourthPage control={control} changePage={toNextPage} />
                        <FifthPage handleSubmit={handleSubmit} onSubmit={onSubmit} control={control} />
                    </ScrollView>
            </GestureDetector>
        </KeyboardAvoidingView>
    )
}
