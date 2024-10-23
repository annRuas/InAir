import { Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Button } from '../../components/Button'
import { WelcomeLayout } from '../../components/welcome/WelcomeLayout'
import { PageIndicatorDots } from '../../components/welcome/PageIndicatorDots'

export default function Welcome2() {
	return (
		<WelcomeLayout>
			<View className='flex gap-y-10 z-50'>
				<Text className="px-10 text-xl text-center text-zinc-500">
					Greetings! This is InAir. The app for you to check the air quality on your fingertips.
				</Text>

				<PageIndicatorDots/>

				<Link href="./welcome" asChild>
					<Button>Next</Button>
				</Link>
			</View>
		</WelcomeLayout>

	)
}