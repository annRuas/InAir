
import clsx from 'clsx';
import { FC } from 'react';
import { Text } from 'react-native';


type TextErrorProps = {
    children?: React.ReactNode
    hidden?: boolean
  }

export const TextError: FC<TextErrorProps> = ({ children, hidden }) => {
	return (
		<Text className={clsx('text-red-700 font-bold', hidden && 'text-transparent')}>
			{children}
		</Text>
	)
}