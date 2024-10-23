import { Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Button } from '../../components/Button'
import { WelcomeLayout } from '../../components/welcome/WelcomeLayout'
import { TextHighlighted } from '../../components/welcome/TextHighlighted'
import { PageIndicatorDots } from '../../components/welcome/PageIndicatorDots'

export default function Welcome2() {
	return (
		<WelcomeLayout marginBottomSmall>
			<View className='flex gap-y-5 z-50'>
				<Text className="px-5 text-xl text-center text-zinc-500">
					Creating an account to use InAir is not necessary. But with an account,
					you can <TextHighlighted>personalize </TextHighlighted>
					and <TextHighlighted>adapt</TextHighlighted> InAir according to your own
					<TextHighlighted> needs.</TextHighlighted>
				</Text>
				<PageIndicatorDots second/>
				<Link href="/Signup" asChild>
					<Button>         Create Account         </Button>
				</Link>
				<Link href={{
					pathname: "/Home",
					params: { isLoggedIn: 0, uid: 'na' },
				}} asChild>
					<Button white>Proceed without account</Button>
				</Link>
				<Text className='text-center text-xl text-zinc-500'>
						<Text className="px-5">Already have an account?</Text>
						<Link href="/Login" asChild>
								<Text className='text-blue-950 font-bold'> Sign in</Text>
						</Link>
				</Text>
			</View>
		</WelcomeLayout>

	)
}