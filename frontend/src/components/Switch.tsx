import { Switch as NativeSwitch, useColorScheme } from 'react-native';

function Switch({
  ...props
}: React.ComponentPropsWithoutRef<typeof NativeSwitch>) {
  const thumbColor = props.thumbColor || 'hsl(0, 0%, 100%)';
  const ios_backgroundColor =
    props.ios_backgroundColor || 'hsl(0, 0%, 100%)';

  return (
    <NativeSwitch
      trackColor={{
            false: 'hsl(0, 0%, 100%)',
            true: 'hsl(222.2, 47.4%, 11.2%)',
      }}
      thumbColor={thumbColor}
      ios_backgroundColor={ios_backgroundColor}
      {...props}
    />
  );
}

export { Switch };