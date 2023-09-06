import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions, Text, TouchableOpacity, Linking, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { COLORS } from '../../Constants/thems';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const TMDb_API_KEY = '1f430fbcf6e155460852bed7dade2bcc';

const MovieRating = ({ rating }) => {
  const ratingPercentage = (rating / 10) * 100;

  return (
    <View
      style={{
        width: '70%',
        height: 9,
        backgroundColor: COLORS.gold,
        borderRadius: 5,
        overflow: 'hidden',
        position: 'relative',
        borderWidth:1,
        borderColor:COLORS.gold,

      }}
    >
      <View
        style={{
          height: '100%',
          width: `${ratingPercentage}%`,
          backgroundColor: COLORS.white,
          borderRadius: 5,
        }}
      />
      <Text
        style={{
          position: 'absolute',
          top: -2,
          left: `${ratingPercentage }%`, // Adjust the position for better alignment
          fontWeight: 'bold',
          fontSize: 7,
          color: COLORS.white,
        }}
      >
        {`${Math.round(rating * 10)}%`}
      </Text>
    </View>
  );
};



const TopRatedMovies = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDb_API_KEY}`
        );
        const movieData = response.data.results;
        const videoPromises = movieData.map(async (movie) => {
          const videoResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDb_API_KEY}`
          );
          const videoData = videoResponse.data.results;
          const trailers = videoData.filter((video) => video.type === 'Trailer');
          if (trailers.length > 0) {
            movie.video = trailers[0];
          }
          return movie;
        });
        const moviesWithVideos = await Promise.all(videoPromises);
        setVideos(moviesWithVideos);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching upcoming movie videos:', error);
        setIsLoading(false);
      }
    };

    fetchUpcomingMovies();
  }, []);

  const openVideoLink = (videoKey) => {
    const youtubeURL = `https://www.youtube.com/watch?v=${videoKey}`;
    Linking.openURL(youtubeURL);
  };

  const handleSeeAll = () => {
    navigation.navigate('SeeAll', { movies: videos });
  };

  if (isLoading) {
    return (
      <View style={{ marginBottom: 10, borderRadius: 10, overflow: 'hidden' }}>
        {/* Placeholder or loading indicator */}
      </View>
    );
  }

  const renderMovieItem = ({ item }) => (
    <SCard item={item} openVideo={openVideoLink} />
  );

  return (
    <View style={{ marginBottom: 10, borderRadius: 10, overflow: 'hidden', marginTop: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.gold }}>TopRated Movies</Text>
        <TouchableOpacity
          style={{ backgroundColor: COLORS.white, paddingHorizontal: 1, paddingVertical: 5, borderRadius: 5 }}
          onPress={handleSeeAll}>
          <Text style={{ color: COLORS.gold, fontWeight: 'bold' }}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={videos}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        style={{ marginHorizontal: -5 }}
      />
    </View>
  );
};

const SCard = ({ item, openVideo }) => {
  const navigation = useNavigation();
  const imageUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://via.placeholder.com/150';

  return (
    <View>
      <TouchableOpacity
        style={{ alignItems: 'center', borderWidth: 3, borderColor: COLORS.gold, borderRadius: 10, marginBottom: 5, marginLeft: 5, marginRight: 5, marginTop: 2 }}
        onPress={() => navigation.navigate('ShortsCard2', { item })}>

        <Image
          source={{ uri: imageUrl }}
          style={{ width: width * 0.4, height: height * 0.3, borderRadius: 8 }}
        />

      </TouchableOpacity>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.gold, }}>

          {item.title && item.title.length > 19 ? `${item.title.slice(0, 10)}...` : item.title}
        </Text>
        <MovieRating rating={item.vote_average} />
      </View>
    </View>
  );
};

export default TopRatedMovies;
