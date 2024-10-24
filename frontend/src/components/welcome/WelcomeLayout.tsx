import clsx from 'clsx';
import { ImageBackground, Text } from 'react-native';
import { TitleText } from '../TitleText';

type WelcomeLayoutProps = {
  marginBottomSmall?: boolean
  children?: React.ReactNode
}

export const WelcomeLayout: React.FC<WelcomeLayoutProps> = ({ children, marginBottomSmall }) => {
  return (
		<ImageBackground className='flex-1' source={require('../../icons/InAir_logobg.png')}>
        <TitleText centered className={clsx('mt-36', marginBottomSmall ? 'mb-5' : 'mb-10')}> Hello </TitleText>
        {children}
    </ImageBackground>
  );
}