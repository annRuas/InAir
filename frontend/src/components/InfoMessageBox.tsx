import React from 'react';
import { Text, View } from 'react-native';
import { InfoMessageBoxProps } from '../types/InfoMessageBoxProps';

export function InfoMessageBox(props: InfoMessageBoxProps) {
    const { aqiColor, aqiMessage } = props;
    return (
        <View>
			<View style={{
				    marginTop: 30,
					justifyContent: 'center',
					alignItems: 'center',
					alignSelf: 'center',
					backgroundColor: aqiColor,
					borderRadius: 16,
					shadowColor: '#000',
					shadowOffset: {
					  width: 0,
					  height: 4,
					},
					width: 330,
					padding: 10,
			}}>			
				<Text style={{
					    fontSize: 16,
						fontWeight: '600',
						textAlign: 'center',
				}}>
					{aqiMessage}
				</Text>
			</View>
        </View>
    )
}