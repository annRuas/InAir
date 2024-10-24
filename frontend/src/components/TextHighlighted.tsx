import clsx from 'clsx';
import { Text } from 'react-native';


type TextHighlightedProps = {
    children?: React.ReactNode
	underline?: boolean
  }

export const TextHighlighted: React.FC<TextHighlightedProps> = ({underline, children}) => {
	return (
		<Text className={clsx('text-blue-950 font-bold', underline ? 'underline' : null)}>
			{children}
		</Text>
	)
}