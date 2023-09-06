import { ScrollView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState,useEffect} from 'react'
import { COLORS } from '../../../Constants/thems'
import { BellIcon } from 'react-native-heroicons/solid'
import ShortsCard from '../../components/ShortsCard'
import TopRatedMovies from '../../components/TopRatedMovies'
import UpcomingMovies from '../../components/UpcomingMovies'
import TrendingMovies from '../../components/TrendingMovies'
const HomeScreen = () => {
  const [shorts, SetShorts] = useState([]);
  const [UpcomingMovie, SetUpcomingMovie] = useState([]);
 
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <StatusBar backgroundColor={COLORS.white} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 1, backgroundColor: COLORS.white, width: '100%', height: 50 }}>
        <Image
          source={require('../../../assets/gottalogo1.png')}
          style={{ width: '35%', height: 100, resizeMode: 'contain', marginLeft: 10 }}
        />
        <TouchableOpacity style={{ paddingRight: 10 }}>
          <BellIcon size="30" strokeWidth={2} color={COLORS.gold} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <ShortsCard data={shorts}/>


        <UpcomingMovies data={UpcomingMovies}/>

        <TopRatedMovies data={TopRatedMovies} />
        <TrendingMovies/>


      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
