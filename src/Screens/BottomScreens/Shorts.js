import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity ,ScrollView} from 'react-native';
import axios from 'axios';
import { COLORS } from '../../../Constants/thems';
import RBSheet from 'react-native-raw-bottom-sheet';

// Function to fetch TV shows currently on the air
const fetchOnAirShows = () => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/tv/on_the_air',
    params: { language: 'en-US', page: '1' },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjQzMGZiY2Y2ZTE1NTQ2MDg1MmJlZDdkYWRlMmJjYyIsInN1YiI6IjY0ZDQ4MDM0MDM3MjY0MDBmZmZkMDUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LWFyKgLfcT8-1vRDh_OqEE-U4gw1J_bhNT25vNtNcyw',
    },
  };

  return axios.request(options);
};

// Function to fetch Popular TV Shows
const fetchPopularShows = () => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/tv/popular',
    params: { language: 'en-US', page: '1' },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjQzMGZiY2Y2ZTE1NTQ2MDg1MmJlZDdkYWRlMmJjYyIsInN1YiI6IjY0ZDQ4MDM0MDM3MjY0MDBmZmZkMDUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LWFyKgLfcT8-1vRDh_OqEE-U4gw1J_bhNT25vNtNcyw',
    },
  };

  return axios.request(options);
};

// Function to fetch Top Rated TV Shows
const fetchTopRatedShows = () => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/tv/top_rated',
    params: { language: 'en-US', page: '1' },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjQzMGZiY2Y2ZTE1NTQ2MDg1MmJlZDdkYWRlMmJjYyIsInN1YiI6IjY0ZDQ4MDM0MDM3MjY0MDBmZmZkMDUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LWFyKgLfcT8-1vRDh_OqEE-U4gw1J_bhNT25vNtNcyw',
    },
  };

  return axios.request(options);
};

const Shorts = () => {
  const [showsAiringToday, setShowsAiringToday] = useState([]);
  const [showsOnAir, setShowsOnAir] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const bottomSheetRef = React.createRef();

  useEffect(() => {
    // Fetch TV shows airing today
    axios
      .get('https://api.themoviedb.org/3/tv/airing_today', {
        params: { language: 'en-US', page: '1' },
        headers: { accept: 'application/json' },
      })
      .then((response) => {
        setShowsAiringToday(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch TV shows currently on the air
    fetchOnAirShows()
      .then((response) => {
        setShowsOnAir(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch Popular TV Shows
    fetchPopularShows()
      .then((response) => {
        setPopularShows(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch Top Rated TV Shows
    fetchTopRatedShows()
      .then((response) => {
        setTopRatedShows(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const showDetails = (show) => {
    setSelectedShow(show);
    bottomSheetRef.current.open();
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: COLORS.white }}>
      <View style={{ backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: COLORS.gold, marginTop: 10 }}>
          TV Shows Airing Today
        </Text>
      </View>
      <FlatList
        data={showsAiringToday}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => showDetails(item)}>
            <View
              style={{
                marginRight: 16,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                borderWidth: 2,
                borderColor: COLORS.gold,
                marginBottom: 32,
              }}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w300${item.poster_path}` }}
                style={{
                  width: 150,
                  height: 225,
                  borderRadius: 7,
                }}
              />
              <Text
                style={{
                  padding: 8,
                  fontSize: 16,
                  color: COLORS.gold,
                }}
              >
                {item.name && item.name.length > 14 ? `${item.name.slice(0, 14)}....` : item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />

      {/* TV Shows Currently on the Air */}
      <View style={{ marginTop: 0 }}>
        <View style={{ backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: COLORS.gold, marginTop: 0 }}>
            TV Shows Currently on the Air
          </Text>
        </View>
        <FlatList
          data={showsOnAir}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showDetails(item)}>
              <View
                style={{
                  marginRight: 16,
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                  borderWidth: 2,
                  borderColor: COLORS.gold,
                  marginTop: 0,
                }}
              >
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w300${item.poster_path}` }}
                  style={{
                    width: 150,
                    height: 225,
                    borderRadius: 7,
                  }}
                />
                <Text
                  style={{
                    padding: 8,
                    fontSize: 16,
                    color: COLORS.gold,
                  }}
                >
                  {item.name && item.name.length > 14 ? `${item.name.slice(0, 14)}....` : item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
      </View>

      {/* Popular TV Shows */}
      <View style={{ marginTop: 0 }}>
        <View style={{ backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: COLORS.gold, marginTop: 0 }}>
            Popular TV Shows
          </Text>
        </View>
        <FlatList
          data={popularShows}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showDetails(item)}>
              <View
                style={{
                  marginRight: 16,
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                  borderWidth: 2,
                  borderColor: COLORS.gold,
                  marginTop: 0,
                }}
              >
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w300${item.poster_path}` }}
                  style={{
                    width: 150,
                    height: 225,
                    borderRadius: 7,
                  }}
                />
                <Text
                  style={{
                    padding: 8,
                    fontSize: 16,
                    color: COLORS.gold,
                  }}
                >
                  {item.name && item.name.length > 14 ? `${item.name.slice(0, 14)}....` : item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
      </View>

      {/* Top Rated TV Shows */}
      <View style={{ marginTop: 0 }}>
        <View style={{ backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: COLORS.gold, marginTop: 0 }}>
            Top Rated TV Shows
          </Text>
        </View>
        <FlatList
          data={topRatedShows}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showDetails(item)}>
              <View
                style={{
                  marginRight: 16,
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                  borderWidth: 2,
                  borderColor: COLORS.gold,
                  marginTop: 0,
                }}
              >
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w300${item.poster_path}` }}
                  style={{
                    width: 150,
                    height: 225,
                    borderRadius: 7,
                  }}
                />
                <Text
                  style={{
                    padding: 8,
                    fontSize: 16,
                    color: COLORS.gold,
                  }}
                >
                  {item.name && item.name.length > 14 ? `${item.name.slice(0, 14)}....` : item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
        <Text></Text>
      </View>

      {/* Bottom Sheet */}
      <RBSheet
        ref={bottomSheetRef}
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 30,
            borderWidth: 2,
            borderColor: COLORS.gold,
            backgroundColor: COLORS.black,
            height: '50%',
          },
        }}
      >
        {selectedShow && (
          <View style={{ padding: 26, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w300${selectedShow.poster_path}` }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 97,
              }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: COLORS.gold }}>
              {selectedShow.name}
            </Text>
            <Text style={{ color: COLORS.gold }}>{selectedShow.overview}</Text>
          </View>
        )}
      </RBSheet>
    </ScrollView>
  );
};

export default Shorts;
