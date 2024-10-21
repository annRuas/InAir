import React from 'react';
import { Text, View } from 'react-native';
import { AirQualityHeaderMessageProps } from '../types/AirQualityHeaderMessageProps';


export function AirQualityHeaderMessage(props: AirQualityHeaderMessageProps) {
    const { locationName, aqiColor, aqiClassification, aqiClassificationSubMessage } = props;
    const alignItems = props.alignItems ?? 'flex-start';

    return (
        <View style={{padding: 20, alignItems: alignItems}}>
            <Text style={{
                fontSize: 20
            }}>
                Air quality in <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                }}>{locationName.split(',')[0]} </Text>
            </Text>


            <View style={{ flexDirection: 'row' }}>
                <Text style={{
                    fontSize: 26,
                }}>The Air Quality is </Text>
                <View style={{ alignItems: 'center', alignContent: 'center'}}>
                    <Text style={{
                        fontSize: 26,
                        fontWeight: 'bold',
                        color: aqiColor
                    }}>{aqiClassification || 'N/A'}  </Text>
                    {aqiClassificationSubMessage ? (<Text style={{ textAlign: 'center', fontStyle: 'italic' }}>
                        {aqiClassificationSubMessage}
                    </Text>) : null }
                </View>
            </View>
        </View>
    )
}