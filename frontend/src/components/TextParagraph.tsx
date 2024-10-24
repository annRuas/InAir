import clsx from 'clsx';
import { Text } from 'react-native';


type TextParagraphProps = {
    children?: React.ReactNode;
    className?: string;
    small?: boolean;
  }

export const TextParagraph: React.FC<TextParagraphProps> = ({ className, small, children, ...props}) => {
	
    return (
		<Text className={clsx('text-center text-zinc-500', small ? 'text-sm' : 'text-xl', className)} {...props}>
			{children}
		</Text>
	)
}