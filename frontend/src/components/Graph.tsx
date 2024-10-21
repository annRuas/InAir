import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { getAqiInfo } from '../utils/getAqiInfo';
import { calculateCircleCursorPosition } from '../utils/calculateCircleCursorPosition';
import { getAqiLevel, getAqiLevelCustom } from '../actions/getAqiLevel';
import { useLocalSearchParams } from 'expo-router';
import { GraphProps } from '../types/GraphProps';

export function Graph(props: GraphProps) {
    const { globalIndex, aqiColor } = props;
	const { sin, cos, rotate } = calculateCircleCursorPosition(globalIndex)

	return (
		<View>
			<View>
				<Image
					source={require('../icons/cursor.png')}
					style={{ width: 15, height: 15, top: 140 - sin, left: 200 + cos, zIndex: 2, transform: [{ rotate: rotate }] }}
				/>
				<Image style={{
					height: 150,
					width: 300,
					alignSelf: 'center',
					zIndex: 1,
				}} source={require('../icons/chart.png')} />
				<View style={{ backgroundColor: aqiColor, bottom: 10, left: 120, width: 160, height: 100, position: 'absolute' }}></View>
			</View>
			<View style={{flexDirection: 'row', marginTop: 30, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
				<View style={{
					backgroundColor: aqiColor, 
					width: 30, 
					height: 30, 
					borderRadius: 5, 
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
					
					elevation: 5,
					}}/>
				<Text style={{fontSize: 20, fontWeight: 'regular'}}> {Math.round(globalIndex)} AQI </Text>
			</View>
		</View>
	)
}