import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput,StatusBar, Alert,ScrollView } from 'react-native'; // Import TextInput
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { COLORS } from '../../../Constants/thems';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PencilSquareIcon,EnvelopeIcon,PhoneIcon,BookOpenIcon,ChatBubbleOvalLeftEllipsisIcon,ChatBubbleBottomCenterIcon} from 'react-native-heroicons/solid'
import CountryPicker, { Flag } from 'react-native-country-picker-modal';
import { Modal } from 'react-native';



const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false); // Track whether the name is being edited
  const [newDisplayName, setNewDisplayName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [newBio, setNewBio] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);


  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        AsyncStorage.clear(); // Clear AsyncStorage when a new user logs in
        fetchProfilePicUrl(user);
        fetchStoredDisplayName();
        fetchStoredPhoneNumber();
        fetchStoredBio();
      } else {
        setProfilePicUrl(null);
      }
    });
  
    return unsubscribe;
  }, []);
  

  const fetchProfilePicUrl = async (user) => {
    const userRef = storage().ref(`profile_pics/${user.uid}.jpg`);
    try {
      const url = await userRef.getDownloadURL();
      setProfilePicUrl(url);
    } catch (error) {
      console.log('Error fetching profile pic URL:', error);
      setProfilePicUrl(null);
    }
  };

  const handleEditProfilePic = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });

      if (image) {
        setSelectedImage(image);
        uploadProfilePicture(user, image);
      } else {
        console.log('Image selection canceled');
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const uploadProfilePicture = async (user, image) => {
    const userRef = storage().ref(`profile_pics/${user.uid}.jpg`);

    try {
      await userRef.putFile(image.path);
      const url = await userRef.getDownloadURL();
      setProfilePicUrl(url);
    } catch (error) {
      console.log('Error uploading or getting profile pic:', error);
    }
  };
  const fetchStoredDisplayName = async () => {
    try {
      const storedDisplayName = await AsyncStorage.getItem('displayName');
      if (storedDisplayName !== null) {
        setNewDisplayName(storedDisplayName);
      }
    } catch (error) {
      console.log('Error fetching stored display name:', error);
    }
  };

  const fetchStoredPhoneNumber = async () => {
    try {
      const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
      if (storedPhoneNumber !== null) {
        setNewPhoneNumber(storedPhoneNumber);
      }
    } catch (error) {
      console.log('Error fetching stored phone number:', error);
    }
  };
  const fetchStoredBio = async () => {
    try {
      const storedBio = await AsyncStorage.getItem('bio');
      if (storedBio !== null) {
        setNewBio(storedBio);
      } else {
        setNewBio(user?.bio || ''); // If bio is not stored, use the user's bio from Firebase
      }
    } catch (error) {
      console.log('Error fetching stored bio:', error);
    }
  };
  const handleEditPhone = () => {
    setIsEditingPhone(true);
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };
  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = async () => {
    if (newBio !== '') {
      // Update the user's bio
      await user.updateProfile({ bio: newBio });
      setIsEditingBio(false);
      // Store the updated bio in AsyncStorage
      try {
        await AsyncStorage.setItem('bio', newBio);
      } catch (error) {
        console.log('Error storing bio:', error);
      }
    }
  };


  const handleSaveName = async () => {
    if (newDisplayName !== '') {
      await user.updateProfile({ displayName: newDisplayName }); // Update the user's display name
      setIsEditingName(false);

      // Store the updated display name in AsyncStorage
      try {
        await AsyncStorage.setItem('displayName', newDisplayName);
      } catch (error) {
        console.log('Error storing display name:', error);
      }
    }
  };
  const handleSavePhone = async () => {
    if (newPhoneNumber !== '' && selectedCountry) {
      const phoneNumber = newPhoneNumber.replace(/\D/g, ''); // Remove non-numeric characters

      if (phoneNumber.length === 10) { // Assuming a fixed length of 10 digits for mobile numbers
        const phoneNumberWithCountryCode = `${selectedCountry.callingCode[0]}${phoneNumber}`;

        setIsEditingPhone(false);

        try {
          await AsyncStorage.setItem('phoneNumber', phoneNumberWithCountryCode);
        } catch (error) {
          console.log('Error storing phone number:', error);
        }
      } else {
        console.log('Invalid phone number format');
        Alert.alert('Invalid Format')
      }
    }
  };


 

  return (
    <ScrollView style={{backgroundColor: COLORS.white,}}>
    <View style={{ flex: 1, backgroundColor: COLORS.white, }}>
      <StatusBar color={COLORS.gold}/>
      
      <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20, borderRadius: 80,backgroundColor: COLORS.white,width:"92%",marginLeft:15,borderColor:COLORS.white,borderWidth:2, }}>
      
        {selectedImage ? (
        
          <Image source={{ uri: selectedImage.path }} style={{ width: 100, height: 100, borderRadius: 150,marginTop: 10,borderColor:COLORS.gold,borderWidth:2 }} />
        ) : profilePicUrl ? (
          <Image source={{ uri: profilePicUrl }} style={{ width: 100, height: 100, borderRadius: 150,marginTop: 10,borderColor:COLORS.gold,borderWidth:2 }} />
        ) : (
          <Image
            source={require('../../../assets/bgimg.jpg')}
            style={{ width: 100, height: 100, borderRadius: 150 ,borderColor:COLORS.gold,borderWidth:2,marginTop: 10}}
          />
          
        )}
        
        
        
         {user && (
          
          <View>

<View style={{alignItems:'center',justifyContent:"center"}}>
      <TouchableOpacity onPress={handleEditProfilePic} style={{  backgroundColor: COLORS.white, borderRadius: 15, paddingVertical: 5, paddingHorizontal: 10,}}>
          {/* <Text style={{ color: COLORS.gold }}>Edit</Text> */}
          <PencilSquareIcon
                name={isEditingName ? 'checkmark' : 'pencil'}
                size={20}
                color={COLORS.gold}
                style={{ marginLeft: 0, }}
              />
        </TouchableOpacity>
      </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", marginBottom: 30, }}>
            <TextInput
              placeholder="Enter your name"
              value={newDisplayName}
              onChangeText={setNewDisplayName}
              editable={isEditingName} 
              style={{
                // flex: 1,
                marginTop: 10,
                borderColor: COLORS.white,
                borderWidth: 1,
                paddingHorizontal: 10,
                marginLeft:50,
                borderRadius: 15,
                color:COLORS.gold,
                fontSize:20
              }}
            />
            <TouchableOpacity onPress={isEditingName ? handleSaveName : handleEditName}>
              <PencilSquareIcon
                name={isEditingName ? 'checkmark' : 'pencil'}
                size={25}
                color={COLORS.gold}
                style={{ marginLeft: 10, }}
              />
            </TouchableOpacity>
          </View>
          </View>
        )}

       
      </View>
      
      {user && (
      <View style={{flexDirection:"row",borderRadius: 15,borderColor:COLORS.gold,borderWidth:1,width:"90%",marginLeft:20,height:60}}>
         {/* Show Gmail */}
         <EnvelopeIcon
         size={33}
         color={COLORS.gold}
         style={{ marginLeft: 10,marginTop:10 }}/>
         {user && user.email && (
          <Text style={{ marginTop: 10,color:COLORS.gold,marginLeft: 10,fontSize:15,marginTop:15 }}>{user.email}</Text>
        )}
        </View>
      )}

        {user && (
        <View style={{ flexDirection: 'row', borderRadius: 15, borderColor: COLORS.gold, borderWidth: 1, width: "90%", marginLeft: 20, height: 60, marginTop: 10 }}>
          <PhoneIcon
            size={30}
            color={COLORS.gold}
            style={{ marginLeft: 10, marginTop: 10 }}
          />
          {isEditingPhone ? (
            // Show the country picker when editing phone number
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Flag
                countryCode={selectedCountry?.cca2}
                flagSize={30}
                style={{ marginTop: 10,marginLeft:10 }}
              />
              <CountryPicker
                withFilter
                withFlagButton={false}
                withCallingCode={false}
                withAlphaFilter
                onSelect={(country) => setSelectedCountry(country)}
              />
            </View>
          ) : (
            // Show the selected country text when not editing phone number
            selectedCountry && (
              <Flag
                countryCode={selectedCountry.cca2}
                flagSize={22}
                style={{ marginTop: 10,marginLeft:10 }}
              />
            )
          )}
          {/* Always show the phone number input field */}
          <TextInput
            placeholder="Enter your phone number"
            value={newPhoneNumber}
            onChangeText={setNewPhoneNumber}
            editable={isEditingPhone} 
            keyboardType="numeric"
            style={{
              flex: 1,
              marginLeft: 1,
              color:COLORS.gold
            }}
          />
          {/* Show the pencil icon to trigger the editing */}
          <TouchableOpacity onPress={isEditingPhone ? handleSavePhone : handleEditPhone}>
            <PencilSquareIcon
              name={isEditingPhone ? 'checkmark' : 'pencil'}
              size={25}
              color={COLORS.gold}
              style={{ marginLeft: 10, marginRight: 10,marginTop:15 }}
            />
          </TouchableOpacity>
        </View>
      )}


      {/* ????????????????????????????????userbio???????????????????/ */}
      
      {user && (
      <View>
        {/* ... */}

        {/* Bio Input */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 1, borderWidth: 1, width: '90%', marginLeft: 20, marginTop: 10, borderRadius: 15, borderColor: COLORS.gold, height: 70 }}>
          <BookOpenIcon size={33} color={COLORS.gold} style={{ marginLeft: 10, marginTop: 10 }} />
          <ScrollView style={{ flex: 1 }}>
              <TextInput
                placeholder="Enter your bio"
                value={newBio}
                onChangeText={(text) => {
                  if (text.length <= 200) {
                    setNewBio(text);
                  }
                }}
                editable={isEditingBio}
                multiline={true}
                style={{
                  padding: 10,
                  color: COLORS.gold,
                  fontSize: 16,
                }}
              />
            </ScrollView>
          <TouchableOpacity onPress={isEditingBio ? handleSaveBio : handleEditBio}>
            <PencilSquareIcon name={isEditingBio ? 'checkmark' : 'pencil'} size={25} color={COLORS.gold} style={{ marginLeft: 10 }} />
          </TouchableOpacity>


        </View>
        
      </View>
    )}
       

       {user && (
      <View>
        {/* ... */}

        {/* Contact Input //////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20, borderWidth: 1, width: '90%', marginLeft: 20, marginTop: 10, borderRadius: 15, borderColor: COLORS.gold, height: 60 }}>
        <ChatBubbleOvalLeftEllipsisIcon size={33} color={COLORS.gold} style={{ marginLeft: 10, marginTop: 10 }} />
          <TouchableOpacity style={{ flex: 1,marginLeft: 70 }}>
             <Text style={{ color: COLORS.gold,fontSize:20 }}>Contact Us</Text>
            </TouchableOpacity>
         


        </View>
        
      </View>
    )}



        

        {/* Change Password */}
        {user && ( 
          <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, borderWidth: 2, width: '90%', marginLeft: 20, marginTop: 10, borderRadius: 15, borderColor: COLORS.gold, height: 40 }}>
            <Text style={{ color: COLORS.gold,fontSize:20 }}>Change Password</Text>
          </TouchableOpacity>
        )}
      
      <TouchableOpacity onPress={() => navigation.navigate(user ? 'Home' : 'SignUp')}
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30, borderWidth: 2, width: '90%', marginLeft: 20, marginTop: 10, borderRadius: 15, borderColor: COLORS.gold, height: 40, }}>
        <Text style={{ color: COLORS.gold,fontSize:20 }}>{user ? 'Logout' : 'Go to Sign Up'}</Text>
      </TouchableOpacity>
      
    </View>
    </ScrollView>
  );
};

export default Profile;
