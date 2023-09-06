import { StyleSheet, Text, View,TouchableOpacity,Image ,TextInput,Alert} from 'react-native'
import React, { useState,useEffect} from 'react'
import { COLORS } from '../../Constants/thems'
import { StatusBar } from 'react-native'
import {ChevronLeftIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { XMarkIcon } from 'react-native-heroicons/solid';
import auth from '@react-native-firebase/auth'
import '@react-native-firebase/firestore';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import firebase from '@react-native-firebase/app';
const SignUp = () => {
  const navigation=useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputText2, setInputText2] = useState('');
  const [inputText1, setInputText1] = useState('');

  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[userInfo,setUserInfo]=useState(null)


  const signup=()=>{
    if(email !='' && password != ''){
      auth()
  .createUserWithEmailAndPassword(email,password)
  .then((res) => {
    console.log('response',res);
    Alert.alert("User account created & signed in!")
    navigation.replace("SignUp")
  })
  .catch((error) => {
    



    console.log('eror...........',error);
    Alert.alert(error.message)
  });
    }else{
         Alert.alert('Fill properly ')
    }
  }

  const clearTextInput = () => {
    setInputText('');
  };
  const clearTextInput1 = () => {
    setEmail('');
  };
  const clearTextInput2 = () => {
    setPassword('');
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const borderColor = isFocused ? COLORS.primary3 : COLORS.primary;

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
  
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign in');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services are not available');
      } else {
        console.log('Unknown error occurred');
      }
    }
  };
  
  
  useEffect(() => {
    // Configure Google Sign-In once
    GoogleSignin.configure({
      webClientId: '654710403581-founbbe3ac8nik2oqoavmbdvtpmg0cq2.apps.googleusercontent.com',
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
        
        <Text style={{paddingLeft:30,fontSize:35,color:COLORS.primary,fontWeight:"bold",paddingTop:20}}>Sign up</Text>
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
          Name
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
            borderColor: borderColor,
            borderRadius: 20,
            color:COLORS.primary
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Enter your Name"
          value={inputText}
          onChangeText={setInputText}
        />
        {/* XMarkIcon */}
        {isFocused && (
          <TouchableOpacity onPress={clearTextInput} style={{ position: 'absolute', right: 36 }}>
          <XMarkIcon size={24} color={COLORS.primary} />
        </TouchableOpacity>
        )}
      </View>
    </View>


    <View style={{ marginTop: 10 }}>
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
          value={email}
          // onChangeText={setInputText1}
          onChangeText={(email) => setEmail(email)}
        />
     {isFocused1 && (
  <TouchableOpacity onPress={clearEmail} style={{ position: 'absolute', right: 36 }}>
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
          placeholder="Pick a strong Password"
          
          // onChangeText={setInputText2}
          value={password}
            onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        {/* XMarkIcon */}
              {isFocused2 && (
        <TouchableOpacity onPress={clearPassword} style={{ position: 'absolute', right: 36 }}>
          <XMarkIcon size={24} color={COLORS.primary} />
        </TouchableOpacity>
      )}
      </View>
    </View>
{/* /////////////////////////////////////////////////////////////////////////////////TextInput END/////////////////////////////////////////////////////////////// */}

<TouchableOpacity onPress={signup} style={{ marginTop: 23, alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            width: '85%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{ color: COLORS.primary3, fontSize: 17,fontWeight: 'bold', }}>Create Account</Text>
        </View>
      </TouchableOpacity>

      <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",marginTop:5}}>
        <Text style={{color:COLORS.primary}}>Already have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={{color:COLORS.primary,fontSize: 16,}}>Login</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({})