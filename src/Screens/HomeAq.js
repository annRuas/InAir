import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import good from '../charts/good.png';
import hazardous from '../charts/hazardous.png';
import moderate from '../charts/moderate.png';
import unhealthy from '../charts/unhealthy.png';
import sg_unhealthy from '../charts/sg_unhealthy.png';
import very_unhealthy from '../charts/very_unhealthy.png';

import Group_167 from '../charts/Group_167.png';
import search from '../icons/search.png';
import profile from '../icons/profile.png'; 
import more from '../icons/more.png';

const DateDisplay = () => {
  const currentDate = new Date();
  const options = { month: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

  return <Text style={styles.date}>{formattedDate}</Text>;
};

const HomeAq = () => {
  const [greeting, setGreeting] = useState('');
  const [aqiData, setAqiData] = useState({
    pm25: undefined,
    ozone: undefined,
    aqi: undefined,
  });
  const [loading, setLoading] = useState(true);

  const aqiImages = {
    '0-49': good,
    '50-99': moderate,
    '100-149': unhealthy,
    '150-199': sg_unhealthy,
    '200-299': very_unhealthy,
    '300+': hazardous,
  };

  useEffect(() => {
    const fetchAqiData = async () => {
      try {
        const url = `https://api.openaq.org/v2/latest?limit=1&city=Campinas&country_id=BR`;
        const response = await fetch(url);
        const data = await response.json();
    
        console.log('Received data from OpenAQ API:', data);
    
        if (data.results && data.results.length > 0) {
          const measurement = data.results[0].measurements[0];
          setAqiData({
            pm25: measurement.parameter === 'pm25' ? measurement.value : undefined,
            ozone: measurement.parameter === 'o3' ? measurement.value : undefined,
            aqi: data.results[0].dominantPollutantIndex,
          });
        } else {
          console.error('No results or empty results array.');
        }
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
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

  const getAqiImage = () => {
    const aqiLevel = aqiData.aqi;
    return aqiImages[aqiLevel] || good;
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
          <Text style={styles.aqi}> The Air Quality is <Text style={styles.aqititle}> {aqiData.aqi || 'N/A'} </Text> </Text>
          <Image style={styles.chart} source={getAqiImage()} />
          <Image style={styles.index} source={Group_167} />
          <View style={styles.messagetest}>
            <Text style={styles.messagetext}> Good air quality does not require any advisory whatsoever. Remember to stay hydrated.</Text>
          </View>
        </>
      )}

      <View style={styles.NavContainer}>
        <View style={styles.NavBar}>
          <Pressable onPress={() => console.log('Profile pressed')} style={styles.IconBehave}>
            <Image source={profile} style={styles.IconBehave} />
          </Pressable>

          <Pressable onPress={() => console.log('Search pressed')} style={styles.IconBehave}>
            <Image source={search} style={styles.IconBehave} />
          </Pressable>

          <Pressable onPress={() => console.log('More pressed')} style={styles.IconBehave}>
            <Image source={more} style={styles.IconBehave} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
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
    fontWeight: '300',
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
  chart: {
    marginTop: 50,
    alignSelf: 'center',
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
    marginLeft: 15,
  },
});

export default HomeAq;
