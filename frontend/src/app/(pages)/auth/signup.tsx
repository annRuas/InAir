import { View } from 'react-native'
import React, { useContext } from 'react'
import { Link, router } from 'expo-router'
import FontAwesome from '@expo/vector-icons/build/FontAwesome'
import { TextInputImage } from '../../../components/TextInputImage'
import { Button } from '../../../components/Button'
import { TitleText } from '../../../components/TitleText'
import { TextParagraph } from '../../../components/TextParagraph'
import { TextHighlighted } from '../../../components/TextHighlighted'
import { SeparatorText } from '../../../components/SeparatorText'
import { GoogleButton } from '../../../components/auth/GoogleButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextError } from '../../../components/TextError'
import { Checkbox } from '../../../components/Checkbox'
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth'
import { AuthContext } from '../../../components/SessionProvider'
import { createData } from '../../../actions/user.actions'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(5).max(30),
    passwordConfirm: z.string().min(4),
    hasAcceptedTermsOfService: z.boolean().refine((val) => val === true, {message: 'Terms of service needs to be accepted to create an account.'})
}).refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm']
})

type FormFields = z.infer<typeof schema>


export default function Signup() {
    const UserInfo = useContext(AuthContext);

    const { control, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schema)
    });

    const  onSubmit: SubmitHandler<FormFields> = async ({email, password, name }) => {
        try {
            const auth = getAuth();
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const { uid } = response.user;

            await createData(email, name, uid);

            UserInfo?.signIn(response.user.uid);

            router.replace('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View className='flex-1 mb-10 justify-center gap-y-4'>
            <TitleText className='mx-7 mt-20'>
                Create an account
            </TitleText>
            <View className='mx-7 gap-y-1'>
                <TextInputImage control={control} name='name' placeholder='Name'>
                    <FontAwesome name="user" size={22} color="black" />
                </TextInputImage>
                <TextError> {errors?.name?.message} </TextError>

                <TextInputImage control={control} name='email' placeholder='email@example.com'>
                    <FontAwesome name="envelope" size={18} color="black" />
                </TextInputImage>
                <TextError>{errors?.email?.message}</TextError>

                <TextInputImage password control={control} name='password' placeholder='Password'>
                    <FontAwesome name="lock" size={24} color="black" />
                </TextInputImage>
                <TextError>{errors?.password?.message}</TextError>

                <TextInputImage password control={control} name='passwordConfirm' placeholder='Confirm password'>
                    <FontAwesome name="lock" size={24} color="black" />
                </TextInputImage>
                <TextError>{errors?.passwordConfirm?.message}</TextError>

                <View className='flex-row items-center justify-center'>
                    <Checkbox control={control} name='hasAcceptedTermsOfService' className='mr-2'/>
                    <TextParagraph small>
                        By signing up, you agree with the <TextHighlighted underline>Terms of Service</TextHighlighted>
                    </TextParagraph>
                </View>
                <TextError>{errors?.hasAcceptedTermsOfService?.message}</TextError>
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