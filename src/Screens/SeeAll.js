import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { COLORS } from '../../Constants/thems';

const SeeAll = ({ route }) => {
  const { movies } = route.params;
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);

  const handleMoviePress = (item) => {
    // Navigate to the ShortCard2 component and pass the selected movie item
    navigation.navigate('ShortsCard2', { item });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
      
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
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 1, backgroundColor: COLORS.white, width: '100%', height: 50, }}>
        <Image
          source={require('../../assets/gottalogo1.png')}
          style={{ width: '35%', height: 100, resizeMode: 'contain', marginLeft: 10 }}
        />
       
      </View>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              width: '100%',
              margin: 10,
              alignItems: 'center',
              color: COLORS.gold,
              borderWidth:2,
              borderColor:COLORS.gold,
              borderRadius:15,
              marginTop:10
            }}
            onPress={() => handleMoviePress(item)}>
            <Image
              source={{
                uri: item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : 'https://via.placeholder.com/150',
              }}
              style={{
                width: 150,
                height: 225,
                borderRadius: 8,
                marginTop:10,
                borderWidth:2,
                borderColor:COLORS.gold
              }}
            />
            <Text
              style={{
                marginTop: 5,
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                color: COLORS.gold,
                
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                marginTop: 5,
                fontSize: 12,
                color: 'gray',
                textAlign: 'center',
                color: COLORS.gold,
                paddingBottom:10
              }}>
              {item.overview}
            </Text>
            {/* Add more movie details as needed */}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </View>
  );
};

export default SeeAll;
