import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { COLORS } from '../../Constants/thems';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const TMDb_API_KEY = '1f430fbcf6e155460852bed7dade2bcc';

const ShortsCard = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovieVideos = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDb_API_KEY}`
        );
        const movieData = response.data.results;
        // Get videos for each movie
        const videoPromises = movieData.map(async (movie) => {
          const videoResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDb_API_KEY}`
          );
          const videoData = videoResponse.data.results;
          // Filter out videos that are not trailers
          const trailers = videoData.filter((video) => video.type === 'Trailer');
          if (trailers.length > 0) {
            // Set the first trailer as the video for the movie
            movie.video = trailers[0];
          }
          return movie;
        });
        const moviesWithVideos = await Promise.all(videoPromises);
        setVideos(moviesWithVideos);
        setIsLoading(false); // Set loading state to false after fetching data
        console.log('Movies with videos:', moviesWithVideos);
      } catch (error) {
        console.error('Error fetching movie videos:', error);
        setIsLoading(false); // Set loading state to false in case of error
      }
    };

    fetchMovieVideos();
  }, []);

  const openVideoLink = (videoKey) => {
    const youtubeURL = `https://www.youtube.com/watch?v=${videoKey}`;
    Linking.openURL(youtubeURL);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.gold} />
      ) : (
        <Carousel
          data={videos}
          renderItem={({ item }) => <SCard item={item} openVideo={openVideoLink} />}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.6}
          slideStyle={{ display: 'flex', alignItems: 'center', marginTop: 28 }}
          autoplay={true}
          autoplayInterval={3000}
          loop={true}
        />
      )}
    </View>
  );
};

const SCard = ({ item, openVideo }) => {
  const navigation = useNavigation();
  const imageWidth = width * 0.7;
  const imageUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://via.placeholder.com/150';

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('ShortsCard2', { item })}>
      <Image
        source={{ uri: imageUrl }}
        style={{ width: width * 0.6, height: height * 0.5, borderRadius: 8 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContainer: {
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.gold,
    borderRadius: 10,
  },
});

export default ShortsCard;
