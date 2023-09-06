import { StyleSheet, Text, View,TouchableOpacity,Image ,TextInput,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../Constants/thems'
import { StatusBar } from 'react-native'
import {ChevronLeftIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { XMarkIcon } from 'react-native-heroicons/solid';
import auth from '@react-native-firebase/auth'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import HomeScreen from './BottomScreens/HomeScreen'
const Login = () => {
  const navigation=useNavigation();
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [inputText2, setInputText2] = useState('');
  const [inputText1, setInputText1] = useState('');
 
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');




  const login = () => {
   
    
    
    if(email !='' && password != ''){


    auth().signInWithEmailAndPassword(email,password).then((res)=>{
        // navigation.replace('Home')
        console.log('response', res)
    }).catch((error)=>{
        console.log('error',error)
        Alert.alert(error.message)
    })


   
  }
  else
  {
    
    Alert.alert('both are mandatory')
    // Alert.alert('Alert Title', 'My Alert Msg', [
    //   {
    //     text: 'Cancel',
    //     onPress: () => console.log('Cancel Pressed'),
    //     style: 'cancel',
    //   },
    //   {text: 'OK', onPress: () => console.log('OK Pressed')},
    // ]);
  }
    
  
}
auth().onAuthStateChanged((user)=>{
  if(user){
    navigation.navigate('Home')
  }
})





  const clearTextInput1 = () => {
    setInputText1('');
  };
  const clearTextInput2 = () => {
    setInputText2('');
  };
 



  const handleFocus1 = () => {
    setIsFocused1(true);
  };

  const handleBlur1 = () => {
    setIsFocused1(false);
  };
  const borderColor1 = isFocused1 ? COLORS.primary3 : COLORS.primary;

  const handleFocus2 = () => {
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
  };
  const borderColor2 = isFocused2 ? COLORS.primary3 : COLORS.primary;
  const handlegoBack=()=>{
    navigation.goBack()
  }
  const handleButtonPress = () => {
    if (inputText1 === '' || inputText2 === '') {
      Alert.alert('Warning', 'Please fill in all fields');
    } else {
      // Do something else if both fields are filled
      // For example, navigate to another screen or perform an action
    }
  };

  const clearEmail= () => {
    setEmail('');
    
  };
  const clearPassword = () => {
    setPassword('');
   
  };
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      navigation.navigate('Home');
    } catch (error) {
      console.log('Google Sign-In Error:', error);
      // Handle the error or display an appropriate message
    }
  };
  
  useEffect(() => {
    // Configure Google Sign-In once
    GoogleSignin.configure({
      webClientId: '654710403581-1bitg8uekqqs0ajvrsitv7v1cammf0b3.apps.googleusercontent.com',
    });
  }, []);
  
  return (
    <View style={{flex:1,backgroundColor:COLORS.primary3}}>
        <StatusBar backgroundColor={COLORS.primary3}/>
        <View style={{alignItems:"center",flexDirection:"row"}}>
        <TouchableOpacity onPress={handlegoBack}
        style={{backgroundColor:COLORS.primary3,width:55,height:54,marginLeft:20,borderRadius:20,alignItems:"center",justifyContent:"center",marginTop:20,borderWidth:1,borderColor:COLORS.primary}}>
          <ChevronLeftIcon size={29} color={COLORS.primary} strokeWidth={33} />
          
        </TouchableOpacity>
        
        <Text style={{paddingLeft:30,fontSize:35,color:COLORS.primary,fontWeight:"bold",paddingTop:20}}>Login</Text>
        </View>

        <View style={{paddingLeft:25,fontSize:35,color:COLORS.primary,fontWeight:"bold",paddingTop:35}}>
          <Text style={{fontSize:15,color:COLORS.primary,fontWeight:"bold",paddingTop:25}}>Sign up with one of the following options.</Text>

        </View>
       




        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* View with Google logo */}
      <TouchableOpacity
        style={{
          marginRight: 10,
          backgroundColor: COLORS.primary3,
          width: 160,
          height: 58,
          marginLeft: 15,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 25,
          borderWidth: 1,
          borderColor: COLORS.primary,
        }}
        onPress={googleSignIn}
      >
        <Image
          source={require('../../assets/googlelogo1.png')}
          style={{ width: 39, height: 41 }}
        />
      </TouchableOpacity>

      {/* View with Apple logo */}
      <TouchableOpacity 
        style={{
          marginRight: 20,
          backgroundColor: COLORS.primary3,
          width: 160,
          height: 58,
          marginLeft: 1,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          borderWidth: 1,
          borderColor: COLORS.primary,
        }}
      >
        <Image
          source={require('../../assets/applelogo.png')}
          style={{ width: 39, height: 45 ,marginBottom:6}}
        />
      </TouchableOpacity>
    </View>
 {/* /////////////////////////////////////////////////////////////////////////////////TextInput/////////////////////////////////////////////////////////////// */}      
    

    <View style={{ marginTop: 50 }}>
      <View style={{ marginLeft: 35 }}>
        <Text style={{ paddingLeft: 1, fontSize: 19, color: COLORS.primary, fontWeight: 'bold', paddingBottom: 5 }}>
          Email
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={{
            width: '85%',
            height: 60,
            borderWidth: 2,
            borderRadius: 8,
            paddingHorizontal: 10,
            fontSize: 16,
            borderColor: borderColor1,
            borderRadius: 20,
            color:COLORS.primary
          }}
          onFocus={handleFocus1}
          onBlur={handleBlur1}
          placeholder="gotta123@gmail.com"
          // value={inputText1}
          // onChangeText={setInputText1}
          value={email}
          onChangeText={setEmail}
        />
        {/* XMarkIcon */}
        {isFocused1 && (
          <TouchableOpacity onPress={clearEmail} style={{ position: 'absolute', right: 36 }} >
          <XMarkIcon size={24} color={COLORS.primary} />
        </TouchableOpacity>
        )}
      </View>
    </View>

    <View style={{ marginTop: 10 }}>
      <View style={{ marginLeft: 35 }}>
        <Text style={{ paddingLeft: 1, fontSize: 19, color: COLORS.primary, fontWeight: 'bold', paddingBottom: 5 }}>
          Password
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={{
            width: '85%',
            height: 60,
            borderWidth: 2,
            borderRadius: 8,
            paddingHorizontal: 10,
            fontSize: 16,
            borderColor: borderColor2,
            borderRadius: 20,
            color:COLORS.primary
          }}
          onFocus={handleFocus2}
          onBlur={handleBlur2}
          placeholder="Enter your Password"
          // value={inputText2}
          // onChangeText={setInputText2}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {/* XMarkIcon */}
        {isFocused2 && (
          <TouchableOpacity onPress={clearPassword} style={{ position: 'absolute', right: 36, }}>
          <XMarkIcon size={24} color={COLORS.primary} />
        </TouchableOpacity>
        )}
      </View>
    </View>
{/* /////////////////////////////////////////////////////////////////////////////////TextInput END/////////////////////////////////////////////////////////////// */}

<TouchableOpacity  onPress={login} style={{ marginTop: 23, alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            width: '85%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{ color: COLORS.primary3, fontSize: 17,fontWeight: 'bold', }}>Login</Text>
        </View>
      </TouchableOpacity>

      <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",marginTop:5}}>
        <Text style={{color:COLORS.primary}}>Don't have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
          <Text style={{color:COLORS.primary,fontSize: 16,}}>Sign up</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})