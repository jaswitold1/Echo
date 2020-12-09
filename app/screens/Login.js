import React,{useState} from 'react'
import { StyleSheet, Text, View,ImageBackground,SafeAreaView,StatusBar, Button, TouchableHighlight, TouchableOpacity,TextInput } from 'react-native'

export default function Login() {
    const [toggle,setToggle] = useState('')
    return (
        <ImageBackground source={require('../assets/login.jpg')} style={{width:'100%',height:'100%'}} resizeMode={"cover"}>
            <StatusBar  barStyle={'light-content'}/>
            <View style={styles.container}>
                <Text style={{color:'white',fontSize:150,fontFamily:'Avenir' ,fontWeight:'bold'}}>
                    Echo
                </Text>
            </View>
       <View style={styles.container} >
           
        <TouchableOpacity>
            <Text style={styles.text}>
                Log In
            </Text>
           
        </TouchableOpacity>
        <TouchableOpacity>
             <Text style={styles.text}>
                Sign In
            </Text>
        </TouchableOpacity>
        {/* <View style={styles.container}>
            <Text style={{fontSize:60}}>
                PLACEHOLDER1
            </Text>
        </View>
         <View style={styles.container}>
            <Text style={{fontSize:60}}>
                PLACEHOLDER
            </Text>
        </View> */}
       </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
            
            flex:1,
            alignItems:'center',
            justifyContent: 'flex-end',
            marginBottom:40
            

    } ,
    text: {
        color:'white',
        padding:20 ,
        paddingLeft: '40%',
        paddingRight: '40%',

        marginBottom:20,
        borderWidth: 1,
    borderColor: 'white',
    borderRadius: 6,
    }
})
