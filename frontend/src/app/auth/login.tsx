import { View } from 'react-native'
import React, { useContext } from 'react'
import { Checkbox } from '../../components/Checkbox'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, router } from 'expo-router';
import { TitleText } from '../../components/TitleText';
import { TextInputImage } from '../../components/TextInputImage';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { TextParagraph } from '../../components/TextParagraph'
import { Button } from '../../components/Button'
import { TextHighlighted } from '../../components/TextHighlighted'
import { SeparatorText } from '../../components/SeparatorText'
import { GoogleButton } from '../../components/auth/GoogleButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthContext } from '../../components/SessionProvider';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    rememberMe: z.boolean()
});

type FormFields = z.infer<typeof schema>

export default function Login() {
    const UserInfo = useContext(AuthContext);
    
    const { control, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schema)
    });


    const onSubmit: SubmitHandler<FormFields> = async ({email, password, rememberMe}) => {
        try {
            const auth = getAuth();
            const response = await signInWithEmailAndPassword(auth, email, password);

            UserInfo?.signIn(response.user.uid);
            
            router.replace('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View className='flex-1 mb-20 justify-center gap-y-4'>
            <TitleText className='ml-7'>
                Log In
            </TitleText>
            <View className='mx-7 gap-y-4'>
                <TextInputImage wrong={errors?.email !== undefined} control={control} name='email' placeholder='email@example.com'>
                    <FontAwesome name="envelope" size={18} color="black" />
                </TextInputImage>
                <TextInputImage wrong={errors?.password !== undefined} password control={control} name='password' placeholder='Password'>
                    <FontAwesome name="lock" size={24} color="black" />
                </TextInputImage>
                <View className='flex-row items-center justify-start'>
                    <Checkbox control={control} name='rememberMe' className='mr-2'/>
                    <TextParagraph small>
                        Remember me
                    </TextParagraph>
                </View>
            </View>

            <View className='my-5' />
            <Button onSubmit={onSubmit} handleSubmit={handleSubmit} large> Sign In</Button>
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