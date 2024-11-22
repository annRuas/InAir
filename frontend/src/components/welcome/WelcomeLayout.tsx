import clsx from 'clsx';
import { ImageBackground, Text, View } from 'react-native';
import { TitleText } from '../TitleText';

type WelcomeLayoutProps = {
  marginBottomSmall?: boolean
  children?: React.ReactNode
}

export const WelcomeLayout: React.FC<WelcomeLayoutProps> = ({ children, marginBottomSmall }) => {
  return (
		<ImageBackground className='flex-1' source={require('../../icons/InAir_logobg.png')}>
      <View className='mt-40'>

        <TitleText centered className={clsx(marginBottomSmall ? 'mb-5' : 'mb-10')}> Hello </TitleText>
        {children}
      </View>
    </ImageBackground>
  );
}