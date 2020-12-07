import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [timerVal,setTimerVal] = useState(new Date())
   const timer = 
     setTimeout(() => {
       setTimerVal(
         new Date()
       )
      
     }, 1000);
     
    
    
  return (
    <View style={styles.container}>
      <Text>{timerVal.toLocaleTimeString()}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
