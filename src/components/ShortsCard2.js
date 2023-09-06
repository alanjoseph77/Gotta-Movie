import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../Constants/thems';
import Cast from '../Screens/Cast';
import { HeartIcon, ChevronLeftIcon } from 'react-native-heroicons/solid';
import PersonScreen from '../Screens/PersonScreen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TMDb_API_KEY = '1f430fbcf6e155460852bed7dade2bcc';

const ShortCard2 = ({ route }) => {
  const { item, } = route.params;
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoadingCast, setIsLoadingCast] = useState(true);
  const [isLoadingSimilarMovies, setIsLoadingSimilarMovies] = useState(true);
 
  const addToFavorites = async () => {
    const data = {
      media_type: 'movie',
      media_id: item.id,
      favorite: true
    };
    
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/20283404/favorite?api_key=${TMDb_API_KEY}`,
        data,
        {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjQzMGZiY2Y2ZTE1NTQ2MDg1MmJlZDdkYWRlMmJjYyIsInN1YiI6IjY0ZDQ4MDM0MDM3MjY0MDBmZmZkMDUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LWFyKgLfcT8-1vRDh_OqEE-U4gw1J_bhNT25vNtNcyw',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
  
      if (response.data.status_code === 12) {
        setIsFavourite(true);
  
        // Update AsyncStorage
        const storedFavorites = await AsyncStorage.getItem('favoriteMovies');
        const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        const updatedFavorites = [...parsedFavorites, item];
        await AsyncStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  
        Alert.alert('Movie Added to Favorites', '', [
          { text: 'OK', onPress: () => navigation.navigate('FavoritesScreen') }
        ]);
      } else {
        Alert.alert('Error adding movie to favorites');
      }
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
      console.log('Response data:', error.response.data);
      Alert.alert('Error adding movie to favorites. Please try again later.');
    }
  };
  const removeFromFavorites = async () => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/20283404/favorite?api_key=${TMDb_API_KEY}`,
        {
          media_type: 'movie',
          media_id: item.id,
          favorite: false, // Set favorite to false to remove from favorites
        },
        {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjQzMGZiY2Y2ZTE1NTQ2MDg1MmJlZDdkYWRlMmJjYyIsInN1YiI6IjY0ZDQ4MDM0MDM3MjY0MDBmZmZkMDUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LWFyKgLfcT8-1vRDh_OqEE-U4gw1J_bhNT25vNtNcyw',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      if (response.data.status_code === 13) {
        setIsFavourite(false);

        // Update AsyncStorage
        const storedFavorites = await AsyncStorage.getItem('favoriteMovies');
        const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        const updatedFavorites = parsedFavorites.filter((movie) => movie.id !== item.id);
        await AsyncStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));

        Alert.alert('Movie Removed from Favorites', '', [
          { text: 'OK', onPress: () => navigation.navigate('FavoritesScreen') },
        ]);
      } else {
        Alert.alert('Error removing movie from favorites');
      }
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
      console.log('Response data:', error.response.data);
      Alert.alert('Error removing movie from favorites. Please try again later.');
    }
  };

  const handleHeartIconPress = async () => {
    if (isFavourite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };
  



  const imageUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://via.placeholder.com/150';

  const openVideoLink = (videoKey) => {
    const youtubeURL = `https://www.youtube.com/watch?v=${videoKey}`;
    Linking.openURL(youtubeURL);
  };

  const watchTrailer = () => {
    if (item.video && item.video.key) {
      openVideoLink(item.video.key);
    } else {
      console.log('No trailer available for this movie');
      Alert.alert('Trailer Not Available');
    }
  };

  // Fetch cast data when the component mounts
  useEffect(() => {
    const fetchCastData = async () => {
      try {
        const apiKey = '1f430fbcf6e155460852bed7dade2bcc';
        const response = await fetch(`https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${apiKey}`);
        // https://api.themoviedb.org/3/person/{person_id}/movie_credits
        
        const data = await response.json();
        setCast(data.cast);
        setIsLoadingCast(false);
        console.log('Person', cast);
      } catch (error) {
        console.error('Error fetching cast details:', error);
        setIsLoadingCast(false);
      }
    };

    fetchCastData(); // Fetch cast data
  }, [item.id]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const apiKey = '1f430fbcf6e155460852bed7dade2bcc';
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${item.id}/similar?api_key=${apiKey}`
        );
        const data = await response.json();
        setSimilarMovies(data.results);
        setIsLoadingSimilarMovies(false);
        console.log('Similar Movies:', similarMovies);
      } catch (error) {
        console.error('Error fetching similar movies:', error);
        setIsLoadingSimilarMovies(false);
      }
    };

    fetchSimilarMovies(); // Fetch similar movies data
  }, [item.id]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingTop: 16,
          }}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon width={24} height={24} color={COLORS.gold} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHeartIconPress}>
            <HeartIcon
              width={24}
              height={24}
              color={isFavourite ? COLORS.red : COLORS.gold}
            />
          </TouchableOpacity>
        </View>

        <View style={{ padding: 16, alignItems: 'center' }}>
       
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: 200,
              height: 300,
              borderRadius: 8,
              marginBottom: 10,
              borderWidth: 2,
              borderColor: COLORS.gold,
            }}
          />
          <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 8, color: COLORS.gold }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 8 ,color: COLORS.gold}}>{item.overview}</Text>
          <Text style={{ fontSize: 14, marginBottom: 8 }}></Text>

          {/* Cast section */}
          {isLoadingCast ? (
            <ActivityIndicator size="large" color={COLORS.gold} />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}>
              {cast.map((castMember, index) => (
                <TouchableOpacity onPress={() => navigation.push('PersonScreen',{ person: castMember })}
                key={index} style={{ marginRight: 16, alignSelf: 'center' }}>
                  <View
                    style={{
                      overflow: 'hidden',
                      borderRadius: 10,
                      height: 100,
                      width: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: 'gray',
                    }}>
                    <Image
                      source={{
                        uri: castMember.profile_path
                          ? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
                          : 'https://via.placeholder.com/100', // Default image URL
                      }}
                      style={{
                        borderRadius: 100,
                        height: 96,
                        width: 80,
                        borderWidth:2,
                        borderColor:COLORS.gold
                      }}
                    />
                  </View>
                  <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{ marginTop: 2, fontSize: 12, fontWeight:"bold", color:COLORS.gold }}>
                      {castMember.character && castMember.character.length > 10 ? `${castMember.character.slice(0, 10)}...` : castMember.character}
                    </Text>
                    <Text style={{ color: 'grey', marginTop: 1, fontSize: 12 , color:COLORS.gold}}>
                      ({castMember.original_name && castMember.original_name.length > 14 ? `${castMember.original_name.slice(0, 14)}...` : castMember.original_name})
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
              
            </ScrollView>
          )}

          
        </View>
        <Cast item={item} navigation={navigation} />
        
      </ScrollView>
      
      <View style={{ alignItems: 'center', marginBottom: 6, backgroundColor: COLORS.gold }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.gold,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignItems: 'center',
          }}
          onPress={watchTrailer}>
          <Text
            style={{ color: 'white', fontSize: 16, fontWeight: 'bold', backgroundColor: COLORS.gold }}>
            Watch Trailer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default ShortCard2;
