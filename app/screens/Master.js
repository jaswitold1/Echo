import React,{useState} from 'react'
import { StyleSheet, Text, View,ImageBackground,SafeAreaView,StatusBar, Button, TouchableHighlight, TouchableOpacity,TextInput } from 'react-native'
import Login  from "./Login";
import  Recording from "./Recording";


export default function Master() {
    const [toggle,setToggle] = useState('false')
    const handleStart = () => {
        setToggle(prev=>!prev)
    }
    return (
        <ImageBackground source={require('../assets/login.jpg')} style={{width:'100%',height:'100%'}} resizeMode={"cover"}>
            <StatusBar  barStyle={'light-content'}/>
            <View style={styles.container}>
                <Text style={{color:'white',fontSize:150,fontFamily:'Avenir' ,fontWeight:'bold'}}>
                    Echo 
                </Text>

            </View>
       <View style={styles.container} >
           
       
       {
           toggle? <Login start={() => handleStart()} /> : <Recording/>
       }
       
        
        
       </View>

       
      {
          toggle? <Text/> : <SafeAreaView style={styles.lowerMenuContainer}>
          
              <TouchableOpacity style={styles.lowerMenuEl}>
                  <Text>1</Text>
                  </TouchableOpacity> 
              
          
            
               
               <TouchableOpacity style={styles.lowerMenuEl}>
                  <Text>2</Text>
                  </TouchableOpacity> 
              
          
          
           
                <TouchableOpacity style={styles.lowerMenuEl}>
                  <Text>3</Text>
                  </TouchableOpacity> 
              
              
          
           
       </SafeAreaView> 
      }
        </ImageBackground>
    )
}

export const styles = StyleSheet.create({
    container: {
            
            flex:1,
            alignItems:'center',
            justifyContent: 'flex-end',
            marginBottom:40
            

    } ,
    iconColor: {
        color:'white'
    },
    text: {
        color:'white',
        padding:20 ,
        paddingLeft: '35%',
        paddingRight: '35%',

        marginBottom:50,
        borderWidth: 1,
    borderColor: 'white',
    borderRadius: 6,
    },
    lowerMenuContainer: {
        width:'100%',
        height:80,
        borderTopWidth:1,
        borderColor:'white',
       flexDirection:'row',
       
       alignItems:'center'

        
        
    },
    lowerMenuEl: {
       
       flex:1,
       alignItems:'center',
       


       
    }
   
})
