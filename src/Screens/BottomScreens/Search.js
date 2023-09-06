import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity,ImageBackground } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../Constants/thems';
import { XMarkIcon } from 'react-native-heroicons/solid';

const TMDB_API_KEY = '1f430fbcf6e155460852bed7dade2bcc'; // Replace with your TMDB API key

const MovieCard = ({ movie, onPress }) => (
  
  <TouchableOpacity onPress={onPress} style={{ width: '50%', paddingHorizontal: 8, marginBottom: 16 }}>
    <View style={{ borderWidth: 2, borderColor: COLORS.gold,borderRadius:13 }}>
      <View style={{ width: '100%', aspectRatio: 2 / 3, overflow: 'hidden', }}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
          style={{ flex: 1, width: '100%', resizeMode: 'cover',borderRadius:11  }}
        />
      </View>
    </View>
    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: COLORS.gold }}>
      {movie.title &&movie.title.length>14 ?`${movie.title.slice(0,14)}...`:movie.title}
    </Text>
  </TouchableOpacity>
);

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      // Delay the API call by 500ms to avoid excessive requests during typing
      const delay = setTimeout(() => {
        handleSearch();
      }, 500);

      // Cleanup the previous timer when the input changes
      return () => clearTimeout(delay);
    } else {
      // Clear the movie list when the search query is too short
      setMovies([]);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(
      searchQuery,
    )}&api_key=${TMDB_API_KEY}`;

    axios
      .get(url)
      .then(async (response) => {
        const results = response.data.results || [];

        // Fetch trailers for each movie
        const moviesWithTrailers = await Promise.all(
          results.map(async (movie) => {
            const trailerUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}`;
            const trailerResponse = await axios.get(trailerUrl);
            const trailers = trailerResponse.data.results || [];
            return { ...movie, trailers };
          })
        );

        setMovies(moviesWithTrailers);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
    setMovies([]);
  };

  const navigateToMovieDetails = (movie) => {
    navigation.navigate('ShortsCard2', { item: movie });
  };

  const moviePairs = [];
  for (let i = 0; i < movies.length; i += 2) {
    const pair = [movies[i]];
    if (i + 1 < movies.length) {
      pair.push(movies[i + 1]);
    }
    moviePairs.push(pair);
  }

  return (
  
    <View style={{ flex: 1, padding: 16, backgroundColor: COLORS.white }}>
      
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderWidth: 2,
            borderColor: COLORS.gold,
            padding: 8,
            borderRadius: 16,
          }}
          placeholder="Search movies"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearchQuery}>
            <XMarkIcon
              size={24}
              color={COLORS.gold}
              style={{ marginLeft: 8, marginRight: 8 }}
            />
          </TouchableOpacity>
        )}
      </View>
      {isLoading ? ( 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.gold} />
        </View>
      ) : searchQuery.trim().length >= 2 ? ( // Display FlatList for search results
        <FlatList
          data={moviePairs}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {item.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onPress={() => navigateToMovieDetails(movie)}
                />
              ))}
            </View>
          )}
        />
      ) : ( // Display image background when search query is short
        <View
          style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center',width:"100",height:120 }}>

          {/* <Image source={require('../../../assets/gottalogo1.png')}/> */}
          <Text style={{ fontSize: 18, color: COLORS.gold }}>No search results yet</Text>
        </View>
      )}
    </View>
    
    
  );
};

export default Search;
