import { View } from 'react-native'
import React, { useState } from 'react'
import Checkbox from "expo-checkbox"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { Link, router } from 'expo-router';
import { TitleText } from '../../components/TitleText';
import { TextInputImage } from '../../components/TextInputImage';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { TextParagraph } from '../../components/TextParagraph'
import { Button } from '../../components/Button'
import { TextHighlighted } from '../../components/TextHighlighted'
import { SeparatorText } from '../../components/SeparatorText'
import { GoogleButton } from '../../components/auth/GoogleButton'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const auth = FIREBASE_AUTH;

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            const uid = response.user.uid;

            return router.replace({ pathname: '/Home', params: { isLoggedIn: 1, uid } });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <View className='flex-1 mb-20 justify-center gap-y-4'>
            <TitleText className='ml-7'>
                Log In
            </TitleText>
            <View className='mx-7 gap-y-4'>
                <TextInputImage placeholder='email@example.com'>
                    <FontAwesome name="envelope" size={18} color="black" />
                </TextInputImage>
                <TextInputImage placeholder='Password'>
                    <FontAwesome name="lock" size={24} color="black" />
                </TextInputImage>
                <View className='flex-row items-center justify-start'>
                    <Checkbox className='mx-2' value={rememberMe} onValueChange={setRememberMe} />
                    <TextParagraph small>
                        Remember me
                    </TextParagraph>
                </View>
            </View>

            <View className='my-5' />
            <Button large> Sign In</Button>
            <TextParagraph small>
                Don't have an account?
                <Link href="/auth/signup">
                    <TextHighlighted> Sign Up</TextHighlighted>
                </Link>
            </TextParagraph>

            <SeparatorText>or</SeparatorText>

            <GoogleButton login />
        </View>
    )
}