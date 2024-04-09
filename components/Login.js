import React, { Component, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text, TextInput, Platform, ScrollView } from "react-native";
import { SafeAreaView, withSafeAreaInsets } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  
  const handleSubmit = async ()=>{
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      }
      catch (err) {
        console.log('got error: ', err.message);
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
            <Text className="text-white" style={styles.titleText}>Sign in to your account</Text>
          </View>
      </SafeAreaView>

      <View className="flex-1 bg-white px-8 pt-10" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <View className="form space-y-2">
        
          <Text className="text-gray-700 ml-4">Email Address</Text>


          <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
            value={email} onChangeText={value=> setEmail(value)} placeholder='Enter Email'/>
         


          <Text className="text-gray-700 ml-4">Password</Text>
 
          <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
            secureTextEntry value={password} onChangeText={value=> setPassword(value)} placeholder='Enter Password'/>
          
          <TouchableOpacity className="flex items-end mb-2">
            <Text className="text-gray-700">Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit} className="py-3 bg-blue-300 rounded-xl">
            <Text className="font-xl font-bold text-center text-gray-700">Login</Text>
          </TouchableOpacity>

          <Text className="text-gray-700 font-bold text-center py-2">Or</Text>

          <TouchableOpacity className="py-3 bg-blue-300 rounded-xl" onPress={()=> navigation.navigate('Register')}>
            <Text className="font-xl font-bold text-center text-gray-700">Register</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
    </ScrollView>
    
  );
}


/*
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

<KeyboardAwareScrollView>
  <TextInput />
</KeyboardAwareScrollView>
*/
const styles = StyleSheet.create({

  titleText: {
    color: '#28436d',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

//style={{alignItems: "center", backgroundColor: "#ffffff"}}
//style={{borderTopLeftRadius: 50, borderTopRightFadius: 50}}>