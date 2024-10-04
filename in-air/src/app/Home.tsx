import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';

import chart from '../icons/chart.png';

import cursor from '../icons/cursor.png';
import search from '../icons/search.png';
import profile from '../icons/profile.png';
import more from '../icons/more.png';
import { Link, router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants';

const DateDisplay = () => {
  const currentDate = new Date();
  const options = { month: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

  return <Text style={styles.date}>{formattedDate}</Text>;
};


export default function Home() {

  const params: any = useLocalSearchParams();

  const [greeting, setGreeting] = useState('');
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
  const [customMessage, setCustomMessage] = useState('Please create an account to get a custom message.');


  useEffect(() => {
    const fetchAqiData = async () => {
      try {
        const { isLoggedIn, uid } = params;
        console.log('is logged in '+ isLoggedIn);

        let response;

        if(Number(isLoggedIn) !== 0) {
          console.log('uid home aq' + uid);
          response = await axios.post(`http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}/air-quality/custom`, {
            latitude: '-22.970703372613546',
            longitude: '-47.13962670674579',
            uid: uid
          });

          setCustomMessage(response.data.message);
        } else {
          response = await axios.post(`http://${Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8000')}/air-quality/`, {
            latitude: '-22.970703372613546',
            longitude: '-47.13962670674579'
          })
        }
        

        const globalIndex = response.data.globalIndex;
        // const globalIndex = 250;
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

    const updateGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Night');
      }
    };

    updateGreeting(); // Initial update
    const intervalId = setInterval(updateGreeting, 60 * 1000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const getAqiMessage = () => {
    const aqiLevel = Number(aqiData.aqi);
  
    if (isNaN(aqiLevel)) {
      return "Unable to determine air quality information."; // Default message for non-numeric or undefined values
    }
  
    if (aqiLevel >= 0 && aqiLevel <= 49) {
      return "Air quality is good. Enjoy the fresh air!";
    } else if (aqiLevel >= 50 && aqiLevel <= 99) {
      return "Moderate air quality. It's generally acceptable, but there may be some pollutants.";
    } else if (aqiLevel >= 100 && aqiLevel <= 149) {
      return "Unhealthy for Sensitive Groups. People with respiratory or heart conditions, children, and older adults may be more affected. ";
    } else if (aqiLevel >= 150 && aqiLevel <= 199) {
      return "Unhealthy air quality. Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
    } else if (aqiLevel >= 200 && aqiLevel <= 299) {
      return "Very Unhealthy air quality. Health alert: everyone may experience more serious health effects.";
    } else if (aqiLevel >= 300) {
      return "Hazardous air quality. Health warnings of emergency conditions; the entire population is more likely to be affected.";
    } else {
      return "Unable to determine air quality information."; // Default message for unknown values
    }
  };

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
    <View style={styles.container}>
      <Text style={styles.title}>{greeting}</Text>
      <Text style={styles.date}>
        Today is {DateDisplay()}
      </Text>
      <Text style={styles.text}> Air quality in <Text style={styles.loc}>Campinas - SP</Text></Text>
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

          {/* <Image style={styles.index} source={Group_167} /> */}
          <Text style={{    
            fontSize: 15,
            fontWeight: 'regular',
            marginTop: 30,
            marginLeft: 20,
            alignSelf: 'center'
            }}>
                {customMessage}
          </Text>
          <View style={{ ...styles.messagetest, backgroundColor: getAqiTextColor() }}>
            
          <Text style={{ ...styles.messagetext }}>
  {getAqiMessage()}
</Text>
          </View>
        </>
      )}

      <View style={{

      }}>
        <View style={{
              flexDirection: 'row',
              alignItems:'center',
              justifyContent: 'space-between',
              gap: 30,
              backgroundColor: '#2A3654',
              borderRadius: 20,
              marginTop:30,
              marginHorizontal: 20,
              paddingHorizontal:20
        }}>
          <AntDesign style={styles.iconStyle} onPress={() => router.push({pathname: '/Profile', params: {isLoggedIn: params.isLoggedIn}})} name="user" size={30} color="white"/>

          <AntDesign style={styles.iconStyle} onPress={() => router.push({pathname: '/Search', params: {isLoggedIn: params.isLoggedIn}})} name="search1" size={30} color="white"/>

          <Octicons style={styles.iconStyle} onPress={() => console.log('More pressed')} name="three-bars" size={30} color="white" />

        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  iconStyle: {
    padding: 20,
    paddingHorizontal:25
  },
  container: {
    flex: 1,
    marginTop: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: -50,
    marginBottom: 10,
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
    padding: 5,
    paddingHorizontal: 20
  },
  IconBehave2: {
    marginTop: 6,
    marginLeft: 5,
  },
});