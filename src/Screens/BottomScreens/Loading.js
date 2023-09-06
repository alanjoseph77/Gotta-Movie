import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React, { useState } from 'react'
import * as Progress from 'react-native-progress';
var {width,height}=Dimensions.get('window');
const Loading = () => {
    const[loading,isLoading]=useState(false);

  return (
    <View style={{height,width,position:"absolute",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
      <Progress.CircleSnail thickness={1} size={160} color="yellow"/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})