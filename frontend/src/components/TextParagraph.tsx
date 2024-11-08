import clsx from 'clsx';
import { Text } from 'react-native';


type TextParagraphProps = {
    children?: React.ReactNode;
    className?: string;
    small?: boolean;
    notCentered?: boolean
  }

export const TextParagraph: React.FC<TextParagraphProps> = ({ className, small, children, notCentered, ...props}) => {
	
    return (
		<Text className={clsx('text-zinc-500', small ? 'text-sm' : 'text-xl', !notCentered && 'text-center', className)} {...props}>
			{children}
		</Text>
	)
}