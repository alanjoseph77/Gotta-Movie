import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS } from '../../Constants/thems';

// Cast.js

const Cast = ({ item, navigation }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const apiKey = '1f430fbcf6e155460852bed7dade2bcc';
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${item.id}/similar?api_key=${apiKey}`
        );
        const data = await response.json();
        setSimilarMovies(data.results);
        console.log('simillar movies details:',data)
        setIsLoading(false); // Set loading to false when data is fetched
        
      } catch (error) {
        console.error('Error fetching similar movies:', error);
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchSimilarMovies(); // Fetch similar movies data
  }, [item.id]);

  return (
    <View style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: COLORS.gold, marginLeft:10}}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: COLORS.gold, marginTop: 20,marginLeft:20 }}>
        Similar Movies
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.gold} />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}>
          {similarMovies.map((movie, index) => (
            <TouchableOpacity
              onPress={() => navigation.push('ShortsCard2', { item: movie })} // Pass the 'movie' object
              key={index}
              style={{ marginRight: 6, alignSelf: 'center' }}>
              <Image
                source={{
                  uri: movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/100', // Default image URL
                }}
                style={{
                  width: 180,
                  height: 250,
                  borderRadius: 8,
                  marginBottom: 10,
                  borderWidth: 2,
                  borderColor: COLORS.gold,
                }}
              />
              <Text style={{ color: COLORS.gold, fontSize: 12,fontWeight: 'bold',marginLeft:5 }}>{movie.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export default Cast;

const styles = StyleSheet.create({});
