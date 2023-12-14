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
    um100: undefined,
    aqi: undefined,
  });
  const [loading, setLoading] = useState(true);

  const aqiImages = [
    good,
    moderate,
    unhealthy,
    sg_unhealthy,
    very_unhealthy,
    hazardous,
  ]

  useEffect(() => {
    const fetchAqiData = async () => {
      try {
        const url = `https://api.waqi.info/feed/campinas/?token=demo`; // Replace 8645 with the actual location ID
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            // Add other headers if needed
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Received data from OpenAQ API:');

          if (data) {
            // const measurement = data.results[0].measurements[0];
            // console.log(measurement.value);
            setAqiData({
              // pm25: measurement.parameter === 'pm25' ? measurement.value : undefined,
              // ozone: measurement.parameter === 'o3' ? measurement.value : undefined,
              // um100: measurement.parameter === 'um100' ? measurement.value : undefined,
              aqi: data.data.aqi,
            });
          } else {
            console.error('No results or empty results array.');
          }
        } else {
          console.error('Error fetching data. HTTP Status:', response.status);
        }
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
  

  const getAqiImage = () => {
    const aqiLevel = Number(aqiData.aqi);

    if (isNaN(aqiLevel)) {
      return good; // Default image for non-numeric or undefined values
    }

    if (aqiLevel >= 0 && aqiLevel <= 49) {
      return aqiImages[0]; // Good
    } else if (aqiLevel >= 50 && aqiLevel <= 99) {
      return aqiImages[1]; // Moderate
    } else if (aqiLevel >= 100 && aqiLevel <= 149) {
      return aqiImages[3]; // Unhealthy for Sensitive Groups
    } else if (aqiLevel >= 150 && aqiLevel <= 199) {
      return aqiImages[2]; // Unhealthy
    } else if (aqiLevel >= 200 && aqiLevel <= 299) {
      return aqiImages[4]; // Very Unhealthy
    } else if (aqiLevel >= 300) {
      return aqiImages[5]; // Hazardous
    } else {
      return good; // Default image for unknown values
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
          <Image style={styles.chart} source={getAqiImage()} />
          {/* <Image style={styles.index} source={Group_167} /> */}
          <View style={{ ...styles.messagetest, backgroundColor: getAqiTextColor() }}>
          <Text style={{ ...styles.messagetext }}>
  {getAqiMessage()}
</Text>
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
            <Image source={more} style={styles.IconBehave2} />
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
    marginLeft: 10,
  },
  IconBehave2: {
    marginTop: 6,
    marginLeft: 5,
  },
});

export default HomeAq;
