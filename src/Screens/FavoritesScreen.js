import React, { useState, useEffect,useRef} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../Constants/thems';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
const FavoritesScreen = ({ route }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null); // Reference to the ScrollView

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favoriteMovies');
        const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavoriteMovies(parsedFavorites);
      } catch (error) {
        console.error('Error loading favorite movies:', error);
        // Handle the error
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    // Check if a new movie was added to favorites
    if (favoriteMovies.length > 0) {
      // Scroll to the last movie in the list (newly added movie)
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [favoriteMovies]);

 const uniqueFavoriteMovies = favoriteMovies.filter(
    (movie, index, self) => index === self.findIndex(m => m.id === movie.id)
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          
          
          paddingHorizontal: 16,
          paddingTop: 16,
          flexDirection:'row'
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon width={24} height={45} color={COLORS.gold} strokeWidth={5}/>
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: 'bold',color:COLORS.gold,marginLeft:98,paddingBottom:10 }}>Favorites</Text>
        {/* <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8,color:COLORS.gold,marginLeft:98 }}>Favorites</Text>
        </View> */}
        
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 1, backgroundColor: COLORS.white, width: '100%', height: 50, }}>
        <Image
          source={require('../../assets/gottalogo1.png')}
          style={{ width: '35%', height: 100, resizeMode: 'contain', marginLeft: 10 }}
        />
       
      </View>
      
      <ScrollView ref={scrollViewRef} contentContainerStyle={{ alignItems: 'center',justifyContent:"center", }}>
        {uniqueFavoriteMovies.slice().reverse().map(item => (
          
          <TouchableOpacity
           onPress={() =>
    navigation.navigate('ShortsCard2', { item: item, source: 'Favorites' })}
            key={item.id}
            style={{  alignItems: 'center', marginBottom: 16 }}>
              <View style={{borderWidth:2,borderColor:COLORS.gold,width:300,alignItems: 'center',justifyContent:"center",marginTop:10,borderRadius: 8,}}>
              <Image
              source={{
                uri: item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : 'https://via.placeholder.com/150', // Use a placeholder image if URL is missing
              }}
              style={{
                width: 200,
                height: 300,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: COLORS.gold,
                marginTop:10
              }}
            />
            <View style={{ alignItems: 'center',justifyContent:"center", }}>
            <Text style={{ fontSize: 23, marginLeft: 10, color: COLORS.gold,fontWeight:"bold" }}>
            {item.title && item.title.length > 14 ? `${item.title.slice(0, 14)}...` : item.title}
              
              </Text>
            </View>

            
              <Text style={{ fontSize: 10, marginLeft: 1, width: 250, color: COLORS.gold,marginBottom: 8 }}>
              {item.overview}
              
              </Text>

              </View>
            
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
