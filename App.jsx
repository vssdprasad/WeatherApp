/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {getCityId, getWeatherData} from './src/API/Services/WeatherServices';
import {Searchbar} from 'react-native-paper';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [weatherData, setWeatherData] = useState({});

  const [searchQuery, setSearchQuery] = React.useState('');

  // useEffect(()=>{
  //   getCityId('Visakhapatnam').then((res)=>{
  //     console.log("City Id",res)
  //   }).catch((err)=>{
  //     console.log(err)
  //   });
  // },[]);

  useEffect(() => {
    let payload = {
      cityname: searchQuery,
    };

    getWeatherData(payload)
      .then(res => {
        setWeatherData(res);
      })
      .catch(err => {
      });
  }, [searchQuery]);

  useEffect(() => {
    let payload = {
      cityname: 'Visakhapatnam',
    };

    getWeatherData(payload)
      .then(res => {
        setWeatherData(res);
      })
      .catch(err => {
      });
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <Image
          source={require('./src/Assets/Sunny_bg.jpg')}
          style={{
            objectFit: 'fill',
            height: '100%',
            width: '100%',
            opacity: 0.6,
          }}
        />
      </View>
      <View style={styles.weatherContainer}>
        <View>
          <Searchbar
            placeholder="Search City"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <Text style={styles.headingTextStyles}>Today's Weather </Text>
        <Text style={{fontSize: 60, fontWeight: 'bold', color: '#fff'}}>
          {Object.keys(weatherData).length > 0 &&
            Math.round(weatherData?.main?.temp)}
        </Text>
        <Text style={styles.subHeadingStyles}>
          {Object.keys(weatherData).length > 0 && weatherData?.name}
        </Text>
        <Text style={styles.subHeadingStyles}>
          {Object.keys(weatherData).length > 0 && weatherData?.weather[0]?.main}
        </Text>
      </View>
      {/* <View style={{position:'absolute',bottom:0}}>
          <Text style={{fontSize:20, color:'#fff',marginBottom:'5%'}}>Next 4 days forecast</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View>
            <Image source={require('./src/Assets/Sunny.png')} style={{height:80, width:80,objectFit:'fill'}}/>
            <Text style={{fontSize:20}}>30</Text>
          </View>
          </View>
        </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  weatherContainer: {
    position: 'absolute',
    top: '10%',
    left: '5%',
  },
  subHeadingStyles: {
    fontSize: 20,
    color: '#fff',
    opacity: 0.8,
  },
  headingTextStyles: {
    fontSize: 30,
    color: '#fff',
  },
});

export default App;
