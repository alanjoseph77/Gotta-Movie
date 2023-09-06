import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

function Add() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);

  const firestoreDB = firestore();

useEffect(() => {
  const unsubscribe = auth().onAuthStateChanged(async (authenticatedUser) => {
    if (authenticatedUser) {
      await authenticatedUser.reload();
      setUser(authenticatedUser);
      fetchAuthenticatedUsers();
    } else {
      Alert.alert('Authentication Required', 'Please sign in to use the chat.');
    }
  });

  return () => {
    unsubscribe();
  };
}, []);

useEffect(() => {
  if (searchedUser) {
    setSelectedUser(searchedUser);
  }
}, [searchedUser]);

const fetchAuthenticatedUsers = async () => {
  try {
    if (!user) {
      return;
    }

    // Fetch authenticated users from Firestore.
    const usersRef = firestoreDB.collection('users');
    const snapshot = await usersRef.get();
    const userList = [];

    snapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.uid !== user.uid) {
        userList.push({
          id: doc.id,
          name: userData.name,
          email: userData.email,
        });
      }
    });

    setUsers(userList);

    // Fetch initial messages.
    fetchMessages();
  } catch (error) {
    console.error('Error fetching authenticated users:', error);
  }
};

const searchUserByEmail = async () => {
  try {
    if (!user || !searchQuery) {
      return;
    }

    // Query Firestore for user by email.
    const usersRef = firestoreDB.collection('users');
    const querySnapshot = await usersRef.where('email', '==', searchQuery).get();

    if (!querySnapshot.empty) {
      // Handle query results
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setSearchedUser({
          id: doc.id,
          name: userData.name,
          email: userData.email,
        });
      });
    } else {
      Alert.alert('User Not Found', 'No user with this email address found.');
      setSearchedUser(null);
    }
  } catch (error) {
    console.error('Error searching for user:', error);
  }
};

const fetchMessages = () => {
  if (user && selectedUser) {
    // Fetch messages between the current user and the selected user from Firestore.
    const chatRef = firestoreDB.collection('chats').doc(user.uid).collection(selectedUser.id);

    chatRef.orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
      const messageArray = snapshot.docs.map((doc) => doc.data());
      setMessages(messageArray);
    });
  }
};

const sendMessage = async () => {
  if (!selectedUser) {
    Alert.alert('No Recipient Selected', 'Please select a recipient to send the message to.');
    return;
  }

  if (!newMessage || newMessage.trim() === '') {
    Alert.alert('Empty Message', 'Please enter a message to send.');
    return;
  }

  if (user) {
    // Add a new message to Firestore.
    const chatRef = firestoreDB.collection('chats').doc(user.uid).collection(selectedUser.id);

    const messageData = {
      text: newMessage,
      senderUid: user.uid,
      recipientUid: selectedUser.id,
      timestamp: firestore.FieldValue.serverTimestamp(),
    };

    chatRef.add(messageData);
    setNewMessage('');
  }
};
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
          </View>
        )}
        inverted
      />

      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 5,
          margin: 5,
          padding: 5,
        }}
        placeholder="Search user by email (Gmail)"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Search" onPress={searchUserByEmail} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            margin: 5,
            padding: 5,
          }}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

export default Add;
