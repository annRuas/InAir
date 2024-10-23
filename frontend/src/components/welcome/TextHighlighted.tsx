import { Text } from 'react-native';


type TextHighlightedProps = {
    children?: React.ReactNode
  }

export const TextHighlighted: React.FC<TextHighlightedProps> = ({children}) => {
	return (
		<Text className='text-blue-950 font-bold'>
			{children}
		</Text>
	)
}