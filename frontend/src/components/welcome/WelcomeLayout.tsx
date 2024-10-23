import clsx from 'clsx';
import { ImageBackground, Text } from 'react-native';

type WelcomeLayoutProps = {
  marginBottomSmall?: boolean
  children?: React.ReactNode
}

export const WelcomeLayout: React.FC<WelcomeLayoutProps> = ({ children, marginBottomSmall }) => {
  return (
		<ImageBackground className='flex-1' source={require('../../icons/InAir_logobg.png')}>
        <Text className={clsx("font-bold text-4xl text-center mt-36", marginBottomSmall ? 'mb-5' : 'mb-10')}> Hello </Text>
        {children}
    </ImageBackground>
  );
}