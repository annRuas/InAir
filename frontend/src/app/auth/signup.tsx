import { View } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox'
import { Link, router } from 'expo-router'
import FontAwesome from '@expo/vector-icons/build/FontAwesome'
import { TextInputImage } from '../../components/TextInputImage'
import { Button } from '../../components/Button'
import { TitleText } from '../../components/TitleText'
import { TextParagraph } from '../../components/TextParagraph'
import { TextHighlighted } from '../../components/TextHighlighted'
import { SeparatorText } from '../../components/SeparatorText'
import { GoogleButton } from '../../components/auth/GoogleButton'
import { useForm } from 'react-hook-form'

export default function Signup() {
    const { control, handleSubmit } = useForm();
    const onSubmit: any = ({email, password, name}) => {
        router.push({ pathname: "/Form", params: { email, password, name } });
    }

    const [hasAcceptedTermsOfService, setHasAcceptedTermsOfService] = useState(false);

    return (
        <View className='flex-1 mb-10 justify-center gap-y-4'>
            <TitleText className='mx-7 mt-20'>
                Create an account
            </TitleText>
            <View className='mx-7 gap-y-4'>
                <TextInputImage control={control} name='user' placeholder='Name'>
                    <FontAwesome name="user" size={22} color="black" />
                </TextInputImage>
                <TextInputImage control={control} name='email' placeholder='email@example.com'>
                    <FontAwesome name="envelope" size={18} color="black" />
                </TextInputImage>
                <TextInputImage password control={control} name='password' placeholder='Password'>
                    <FontAwesome name="lock" size={24} color="black" />
                </TextInputImage>
                <TextInputImage password control={control} name='passwordConfirm' placeholder='Confirm password'>
                    <FontAwesome name="lock" size={24} color="black" />
                </TextInputImage>

                <View className='flex-row items-center justify-center'>
                    <Checkbox className='mx-2' value={hasAcceptedTermsOfService} onValueChange={setHasAcceptedTermsOfService} />
                    <TextParagraph small>
                        By signing up, you agree with the <TextHighlighted underline>Terms of Service</TextHighlighted>
                    </TextParagraph>
                </View>
            </View>

            <View className='my-10' />
            <Button onSubmit={onSubmit} handleSubmit={handleSubmit} large> Sign Up</Button>
            <TextParagraph small>
                Already have an account?
                <Link href="/auth/login">
                    <TextHighlighted> Sign in </TextHighlighted>
                </Link>
            </TextParagraph>

            <SeparatorText>or</SeparatorText>
            <GoogleButton />
        </View>
    )
}