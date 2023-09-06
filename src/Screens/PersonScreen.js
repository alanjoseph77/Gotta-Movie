import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../Constants/thems';
import {ChevronLeftIcon,HeartIcon} from 'react-native-heroicons/solid'
const PersonScreen = ({ route }) => {
  const { person } = route.params;
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoadingSimilarMovies, setIsLoadingSimilarMovies] = useState(true);
  const [biography, setBiography] = useState('');
  const [isLoadingBiography, setIsLoadingBiography] = useState(true);
  const [isFavourite, toggleFavourite] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '1f430fbcf6e155460852bed7dade2bcc';
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${person.id}/movie_credits?api_key=${apiKey}`
        );
        const data = await response.json();
        setMovies(data.cast);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
        setIsLoading(false);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const apiKey = '1f430fbcf6e155460852bed7dade2bcc';
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${person.id}/similar_movies?api_key=${apiKey}`
        );
        const data = await response.json();
        setSimilarMovies(data.results);
        setIsLoadingSimilarMovies(false);
      } catch (error) {
        console.error('Error fetching similar movies:', error);
        setIsLoadingSimilarMovies(false);
      }
    };

    const fetchBiography = async () => {
      try {
        const apiKey = '1f430fbcf6e155460852bed7dade2bcc';
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${person.id}?api_key=${apiKey}`
        );
        const data = await response.json();
        setBiography(data.biography || 'N/A');
        console.log('biography:', data);
        setIsLoadingBiography(false);
      } catch (error) {
        console.error('Error fetching biography:', error);
        setIsLoadingBiography(false);
      }
    };

    fetchMovies();
    fetchSimilarMovies();
    fetchBiography();
  }, [person.id]);

  const handleSellAll = () => {
    // Add your logic for "Sell All" action
    // Navigate to the "SeeAll" screen when the button is clicked
    navigation.navigate('SeeAll', { movies });
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={{ margin: 8 }}
      onPress={() => {
        navigation.navigate('ShortsCard2', { item });
      }}
    >
      <Image
        source={{
          uri: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : 'https://via.placeholder.com/150',
        }}
        style={{
          width: 100,
          height: 150,
          borderRadius: 8,
          borderWidth: 2,
          borderColor: COLORS.gold,
        }}
      />
      <Text style={{ marginTop: 4, fontSize: 12, color: COLORS.gold , textAlign: 'center' }}>
        
        {item.original_title && item.original_title.length > 14 ? `${item.original_title.slice(0, 14)}...` : item.original_title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
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
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon
              width={24}
              height={24}
              color={isFavourite ? COLORS.red : COLORS.gold}
            />
          </TouchableOpacity>
        </View>
      <View style={{ alignItems: 'center', padding: 16 }}>
        <Image
          source={{
            uri: person.profile_path
              ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
              : 'https://via.placeholder.com/150',
          }}
          style={{
            width: 200,
            height: 300,
            borderRadius: 8,
            marginBottom: 10,
            borderWidth: 3,
            borderColor: COLORS.gold,
          }}
        />
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 8, color: COLORS.gold  }}>
          {person.original_name}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 16, color: COLORS.gold  }}>({person.character})</Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            margin: 20,
            padding: 9,
            marginTop: 10,
            borderRadius: 100,
            borderWidth: 3,
            borderColor: COLORS.gold ,
          }}
        >
          <View style={{ borderColor: COLORS.gold , alignItems: 'center', borderRightWidth: 2 }}>
            <Text style={{ color: COLORS.gold , marginRight: 7 }}>Gender</Text>
            <Text style={{ color: COLORS.gold , marginRight: 7 }}>
              {person?.gender == 1 ? 'Female' : 'Male'}
            </Text>
          </View>


          <View style={{ borderRadius: 2, borderColor: COLORS.gold , alignItems: 'center', borderRightWidth: 2 }}>
            <Text style={{ color: COLORS.gold , marginRight: 7, paddingLeft: 8 }}>Known for</Text>
            <Text style={{ color: COLORS.gold , marginRight: 7, paddingLeft: 8 }}>
              {person?.known_for_department}
            </Text>
          </View>

          <View style={{ borderRadius: 2, borderColor: COLORS.gold , alignItems: 'center' }}>
            <Text style={{ color: COLORS.gold , marginRight: 6, paddingLeft: 8 }}>Popularity</Text>
            <Text style={{ color: COLORS.gold , marginRight: 7 }}>{person?.popularity?.toFixed(2)} %</Text>
          </View>
        </View>

        <View>
          <Text style={styles.description1}>Biography</Text>
          {isLoadingBiography ? (
            <ActivityIndicator size="small" color={COLORS.gold} />
          ) : (
            <Text style={styles.description}>{biography}</Text>
          )}
        </View>

        <TouchableOpacity
          style={{ backgroundColor: COLORS.white, paddingHorizontal: 1, paddingVertical: 1, borderRadius: 5 ,marginLeft:280}}
         onPress={handleSellAll}>
          <Text style={{ color: COLORS.gold ,fontWeight: 'bold',}}>See All</Text>
        </TouchableOpacity>

        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.gold } />
        ) : (
          <FlatList
            horizontal
            data={movies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default PersonScreen;

const styles = {
  description: {
    marginLeft: 16,
    marginRight: 16,
    letterSpacing: 1,
    color: COLORS.gold,
    textAlign: 'center',
    fontSize: 11,
    marginTop: 6,
  },
  description1: {
    marginLeft: 16,
    marginRight: 16,
    letterSpacing: 1,
    color: COLORS.gold,
    textAlign: 'center',
    fontSize: 22,
    marginTop: 6,
  },
};
