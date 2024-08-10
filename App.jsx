/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  FlatList,
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
import {Searchbar, Card} from 'react-native-paper';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [weatherData, setWeatherData] = useState({});

  const [searchQuery, setSearchQuery] = React.useState('');

  const [filteredData, setFilteredData] = useState([]);

  //Convert the date
  const convertTheDatefromMilliseconds = seconds => {
    const milliseconds = seconds * 1000;
    const newdate = new Date(milliseconds);

    const date = newdate.getDate();
    const month = newdate.getMonth() + 1;

    return `${date}/${month}`;
  };

  //Filter the data to show only one item per date
  const filterData = data => {
    const uniqueDates = {};

    data?.list?.forEach(item => {
      const date = new Date(item.dt * 1000).getDate();

      if (!uniqueDates[date]) {
        uniqueDates[date] = item;
      }
    });

    return Object.values(uniqueDates);
  };

  useEffect(() => {
    let payload = {
      cityname: searchQuery,
    };

    getWeatherData(payload)
      .then(res => {
        setWeatherData(res);
      })
      .catch(err => {});
  }, [searchQuery]);

  useEffect(() => {
    let payload = {
      cityname: 'Visakhapatnam',
    };

    getWeatherData(payload)
      .then(res => {
        console.log('Response', res);
        const filteredData = filterData(res);
        setFilteredData(filteredData);
        setWeatherData(res);
      })
      .catch(err => {});
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <Image
          source={
            Object.keys(weatherData).length > 0 &&
            weatherData?.list[0]?.weather[0]?.main == 'Rain'
              ? require('./src/Assets/Rainy_bg.jpg')
              : require('./src/Assets/Sunny_bg.jpg')
          }
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
            Math.round(weatherData?.list[0]?.main?.temp)}
          &deg;
        </Text>
        <Text style={styles.subHeadingStyles}>
          {Object.keys(weatherData).length > 0 && weatherData?.city?.name}
        </Text>
        <Text style={styles.subHeadingStyles}>
          {Object.keys(weatherData).length > 0 &&
            weatherData?.list[0]?.weather[0]?.main}
        </Text>
      </View>

      <View style={{position: 'absolute', bottom: 0}}>
        <Text
          style={{
            fontSize: 20,
            color: '#fff',
            marginBottom: '5%',
            marginLeft: '3%',
          }}>
          Next 4 days forecast
        </Text>

        <FlatList
          horizontal={true}
          data={Object.keys(weatherData).length > 0 ? filteredData : []}
          renderItem={({item, index}) => {
            return (
              <View style={{marginHorizontal: '1%'}}>
                <Card>
                  <Image
                    source={require('./src/Assets/Sunny.png')}
                    style={{height: 80, width: 80, objectFit: 'fill'}}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#000',
                      marginTop: '2%',
                      alignSelf: 'center',
                    }}>
                    {Math.round(item?.main?.temp)}&deg;
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#000',
                      marginTop: '1%',
                      alignSelf: 'center',
                    }}>
                    {convertTheDatefromMilliseconds(item?.dt)}
                  </Text>
                </Card>
              </View>
            );
          }}
        />
      </View>
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
