import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';


import chart from '../icons/chart.png';

import cursor from '../icons/cursor.png';

import { Link, router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants';




export function Graph(props: any) {
  const coordinates = props.coordinates;
  const selectedAddress = props.locationMessage
  console.log('prop coordinates' + selectedAddress);
  const params: any = useLocalSearchParams();

  const [cos, setCos] = useState(0);
  const [rotate, setRotate] = useState('');
  const [sin, setSin] = useState(0);

  const [aqiData, setAqiData] = useState({
    pm25: 0,
    ozone: 0,
    um100: 0,
    aqi: 0,
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAqiData = async () => {
      try {
        let { isLoggedIn, uid } = params;
        console.log('is logged in '+ isLoggedIn);
        isLoggedIn = false;
        let response;

        if(Number(isLoggedIn) !== 0) {
          console.log('uid home aq' + uid);
          response = await axios.post(`http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}/air-quality/custom`, {
            latitude: coordinates[1],
            longitude: coordinates[0],
            uid: uid
          });

        } else {
          response = await axios.post(`http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}/air-quality/`, {
            latitude: coordinates[1],
            longitude: coordinates[0],
          })
        }
        

        const globalIndex = response.data.globalIndex;
        setAqiData({
              pm25: 0,
              ozone:  0,
              um100: 0,
              aqi: globalIndex 
        });

        const globalIndexGraphic = globalIndex <= 200 ? globalIndex * (200/150) : globalIndex * ((200/(150 + (((globalIndex - 200)/200) * 50)) ));

        console.log('globalindex graphic ' + globalIndexGraphic)
        const globalIndexDegrees = 180 - ((globalIndexGraphic/400) * 180);
        console.log('deegres ' + globalIndexDegrees);

        const radians = globalIndexDegrees * (Math.PI/180);
        console.log('radians ' + radians);

        setCos((Math.cos(radians) * 70));
        setSin((Math.sin(radians) * 70));
        const rotateDegree = 160 - globalIndexDegrees;
        const rotateBaseline = (rotateDegree) > 360 ? rotateDegree - 360 : rotateDegree
        setRotate(rotateBaseline + 'deg');
        console.log('rotate baseline ' + rotateBaseline);
        console.log('cos ' + cos);
        console.log(sin);

      } catch (error) {
        console.error('Error fetching air quality data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAqiData();

  }, []);


  const getAqiTextColor = () => {
    const aqiLevel = Number(aqiData.aqi);

    if (isNaN(aqiLevel)) {
      return '#000000'; // Default color for non-numeric or undefined values
    }

    if (aqiLevel >= 0 && aqiLevel <= 49) {
      return '#40A43F'; // Good
    } else if (aqiLevel >= 50 && aqiLevel <= 99) {
      return '#F8B50D'; // Moderate
    } else if (aqiLevel >= 100 && aqiLevel <= 149) {
      return '#F38337'; // Unhealthy for Sensitive Groups
    } else if (aqiLevel >= 150 && aqiLevel <= 199) {
      return '#EF0009'; // Unhealthy
    } else if (aqiLevel >= 200 && aqiLevel <= 299) {
      return '#AF2AA7'; // Very Unhealthy
    } else if (aqiLevel >= 300) {
      return '#B00003'; // Hazardous
    } else {
      return '#000000'; // Default color for unknown values
    }
  };

  return (
    <View>
        <Text style={{
                fontSize: 20,
                fontWeight: 'regular',
                marginTop: 10,
                marginLeft: 15,
        }}> Air quality in <Text style={styles.loc}>{selectedAddress.split(',')[0]}</Text></Text>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <>
            <Text style={styles.aqi}>
                The Air Quality is{' '}
                <Text style={{ ...styles.aqititle, color: getAqiTextColor() }}>{aqiData.aqi || 'N/A'} </Text>
            </Text>
          <View>
          <Image
            source={cursor}
            style={{width: 15, height: 15, top: 190 - sin, left: 200 + cos, zIndex: 2, transform: [{rotate: rotate}]}}
            />
          <Image style={{
            marginTop: 50,
            height: 150,
            width: 300,
            alignSelf: 'center',
            zIndex: 1,
          }} source={chart} />
          <View style= {{backgroundColor:getAqiTextColor(), bottom: 10, left: 120, width: 160, height: 100, position: 'absolute'}}></View>
          </View>
        </>
      )}
    </View>
  )
}


const styles = StyleSheet.create({

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: 'regular',
    marginTop: 30,
    marginLeft: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'regular',
    marginTop: 10,
    marginLeft: 15,
  },
  loc: {
    fontSize: 18,
    fontWeight: '600',
  },
  aqi: {
    fontSize: 26,
    fontWeight: 'regular',
    marginTop: 3,
    marginLeft: 15,
  },
  aqititle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#40A43F',
  },
  index: {
    marginTop: 15,
    alignSelf: 'center',
  },
  messagetest: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#40A43F',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    width: 330,
    height: 84,
    padding: 10,
  },
  messagetext: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  NavContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 35,
  },
  NavBar: {
    marginLeft: 59,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 275,
    height: 65,
    backgroundColor: '#2A3654',
    borderRadius: 20,
  },
  IconBehave: {
    marginTop: 6,
    marginLeft: 10,
  },
  IconBehave2: {
    marginTop: 6,
    marginLeft: 5,
  },
});