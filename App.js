import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [timerVal,setTimerVal] = useState(new Date())
   const timer = 
     setTimeout(() => {
       setTimerVal(
         new Date()
       )
      
     }, 1000);
     
    
    
  return (
    <SafeAreaView style={styles.container}>
      <Text>{timerVal.toLocaleTimeString()}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cornflowerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
