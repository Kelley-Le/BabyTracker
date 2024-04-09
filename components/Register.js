import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { Component, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text, TextInput, ScrollView, Platform } from "react-native";
import { SafeAreaView, withSafeAreaInsets } from "react-native-safe-area-context";
import { ref, set } from "firebase/database";
import { auth, database } from '../config/firebase'






export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [fullName, setFullName] = useState('');

  /*
    This function will add the created parent into the database.
    const uid = firebase.auth().currentUser.uid; // gets current logged in userID
  */
  function create() {
    set(ref(database, 'parents/' + auth.currentUser.uid), {
      username: email.split('@')[0], //username will be the same as the email but without the @
      email: email,
      fullName : fullName,
      parentID : auth.currentUser.uid
    }).then(() => {
      console.log("Successfully Registered");
    }).catch((error) => {
      console.log(error);
    });
  };


  const handleSubmit = async ()=>{
    if (!isValidPassword) {
      console.log('got error!');
    }
    else {
      if (email && password) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          create();
        }
        catch (err) {
          console.log('got error: ', err.message);
        }
      }
    }
  }
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
    <View className="flex-1 bg-white" style={{backgroundColor: "#cfe2f3"}}>
      <SafeAreaView className="flex">
          <View className="flex-row justify-center">
            <Image source={require('../assets/logo.png')}
                style={{width: 200, height: 200}} />
          </View>

          <View className="flex-row justify-center" style={styles.container}>
            <Text className="text-white" style={styles.titleText}>Welcome!</Text>
          </View>
          
          <View className="flex-row justify-center" style={styles.container}>
            <Text className="text-white" style={styles.titleText}>Create your account</Text>
          </View>
      </SafeAreaView>

      <View className="flex-1 bg-white px-8 pt-8" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
      
        <View className="form space-y-1">
          <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
            value={fullName} onChangeText={value=> setFullName(value)}placeholder='Enter name'/>
          
          <Text className="text-gray-700 ml-4">Email</Text>
          <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
             value={email} onChangeText={value=> setEmail(value)} placeholder='Enter Email'/>
          
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
            secureTextEntry value={password} 
            onChangeText={value=> {
              setPassword(value);
              setIsValidPassword(value.length >= 8); }}
            placeholder='Enter Password'/>
          

          <TouchableOpacity className="py-3 bg-blue-300 rounded-xl" onPress={handleSubmit}>

            <Text className="font-xl font-bold text-center text-gray-700">Sign Up</Text>
          </TouchableOpacity>
          
          <View className="flex-row justify-center mt-7"> 
            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}><Text className="font-semibold text-gray-700"> Login</Text></TouchableOpacity>
          </View>        
        </View>
       
      </View>
    </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({

  titleText: {
    color: '#28436d',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

//style={{alignItems: "center", backgroundColor: "#ffffff"}}
//style={{borderTopLeftRadius: 50, borderTopRightFadius: 50}}>