import React, { useEffect, useState } from "react";
import { ChartBarIcon, CheckBadgeIcon,ArrowRightCircleIcon } from "react-native-heroicons/solid";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Image
} from "react-native";
import { COLORS } from "../../Constants/thems";

import auth from "@react-native-firebase/auth";


const Home = ({ navigation }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return subscriber;
  }, []);

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure? You want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: () => {
            auth()
              .signOut()
              .then(() => navigation.replace("Tab"))
              .catch((error) => {
                console.log(error);
                if (error.code === "auth/no-current-user")
                  navigation.replace("Tab");
                else alert(error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:COLORS.black}}>
      <StatusBar backgroundColor={COLORS.black}/>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 1, backgroundColor: COLORS.black, width: '100%', height: 100,marginBottom:30,marginTop:50 }}>
        <Image
          source={require('../../assets/gottalogo1.png')}
          style={{ width: '75%', height: 100, resizeMode: 'contain',  }}
        />
        </View>
      <View style={{ flex: 1, padding: 16,backgroundColor: COLORS.black,
            width: '100%',marginTop:100,borderWidth:2,borderRadius:30,
            borderBottomColor:COLORS.black,borderTopColor:COLORS.gold,
            borderLeftColor:COLORS.gold,borderRightColor:COLORS.gold,borderBottomRightRadius:0,borderBottomLeftRadius:1 }}>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.black,
            width: '100%'
            
          }}
        >
        
          
          {/* <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Firebase Auth
          </Text> */}
          {user ? (
            <>
              <Text style={{color:COLORS.gold,paddingBottom:30,fontSize: 20,
              textAlign: "center"}}>
                Welcome{" "}
                {user.displayName
                  ? user.displayName
                  : user.email}
              </Text>
              <TouchableOpacity
                style={{
                  width: 290,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // position: 'absolute',
                  // left: 20,
                  flexDirection:"row",
                  marginBottom:20,
                  borderWidth:3,
                  borderColor:COLORS.gold
                }}
                activeOpacity={0.5}
                onPress={logout}
              >
                <Text style={styles.buttonTextStyle}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
               style={{
                width: 290,
                height: 50,
                borderRadius: 25,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
                // position: 'absolute',
                // left: 20,
                flexDirection:"row",
                marginBottom:20,
                borderWidth:3,
                borderColor:COLORS.gold
              }}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Tab")}
            >
              <Text style={{paddingLeft:10,paddingRight:10,color:COLORS.gold}}>Go to Home</Text>
              <ArrowRightCircleIcon size={24} color={COLORS.gold} />
            </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
            style={{
              width: 290,
              height: 50,
              borderRadius: 25,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              // position: 'absolute',
              // left: 20,
              flexDirection:"row",
              marginBottom:20,
              borderWidth:2,
              borderColor:COLORS.gold
            }}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Tab")}
            >
            <Text style={{paddingLeft:10,paddingRight:10,color:COLORS.gold}}>Go to Home</Text>
              <ArrowRightCircleIcon size={24} color={COLORS.gold} />
            </TouchableOpacity>
          )}
        </View>
        {/* <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "grey",
          }}
        >
          React Native Firebase Authentication
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "grey",
          }}
        >
          www.aboutreact.com
        </Text> */}
      </View>


      
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: 300,
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: COLORS.gold,
    paddingVertical: 10,
    fontSize: 16,
  },
});
