import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert,Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../Constants/thems';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
const ChangePassword = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      const user = auth().currentUser;

      if (user) {
        const credentials = auth.EmailAuthProvider.credential(user.email, currentPassword);
        await user.reauthenticateWithCredential(credentials);
        await user.updatePassword(newPassword);

        Alert.alert('Success', 'Password changed successfully.', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(), // Navigate back to the previous screen
          },
        ]);
      } else {
        Alert.alert('Error', 'User not logged in.');
      }
    } catch (error) {
      console.log('Password change error:', error);
      Alert.alert('Error', 'Password change failed. Please check your current password.');
    }
  };

  return (
    <View style={{ flex: 1,backgroundColor: COLORS.white }}>
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
       
        
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 1, backgroundColor: COLORS.white, width: '100%', height: 50, }}>
        <Image
          source={require('../../assets/gottalogo1.png')}
          style={{ width: '35%', height: 100, resizeMode: 'contain', marginLeft: 10 }}
        />
       
      </View>
      <View style={{alignItems:"center",justifyContent:"center",marginTop:170}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20,color:COLORS.gold }}>Change Password</Text>
       </View>
       <View style={{alignItems:"center",justifyContent:"center",marginTop:8}}>
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderWidth: 1,
          borderColor: COLORS.gold ,
          marginBottom: 20,
          padding: 10,
          borderRadius: 13,
          color:COLORS.gold
        }}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderWidth: 1,
          borderColor: COLORS.gold ,
          marginBottom: 20,
          padding: 10,
          borderRadius: 13,
          color:COLORS.gold
        }}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity
        style={{ backgroundColor: COLORS.white, padding: 10, borderRadius: 5,borderWidth: 1,
          borderColor: COLORS.gold  }}
        onPress={handleChangePassword}
      >
        <Text style={{ color: 'white', textAlign: 'center',color:COLORS.gold }}>Change Password</Text>
      </TouchableOpacity>
      </View>

      
      
    </View>
  );
};

export default ChangePassword;
