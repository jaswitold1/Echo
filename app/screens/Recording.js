import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'



export default function Recording() {
  

    return (
        <View style={stylesRec.container}>
            <Text style={stylesRec.icons}>How long You want to record?</Text>
            <View style={stylesRec.iconContainer} >
                <TouchableOpacity  style={stylesRec.iconRec}>
                    <View style={stylesRec.dotRec}></View>
                </TouchableOpacity>
                <TouchableOpacity  style={stylesRec.iconRec}><Text style={stylesRec.icons, stylesRec.iconDown}>
                    ↓</Text></TouchableOpacity>
                
            </View>
        </View>
    )
}

const stylesRec = StyleSheet.create({
    container: {
        padding:10,
        flex:1,
        width:'90%',
        borderRadius:20,
        backgroundColor:'black',
        opacity:0.7
    },
    iconContainer: {
        flexDirection:'row',
        alignSelf:'center',
       
        alignItems:'center',
        
    }, icons: {
        color:'white',
        fontSize:20,
        fontWeight:'200',
        
    }, iconRec : {
        width:70,
        height:70,
        justifyContent:'center',
        alignItems:'center',
        marginTop:100,
        borderWidth:1,
        borderColor:'white',
        borderRadius:10,
        margin:10
       

    }, dotRec : {
        width:30,
        height:30,
        backgroundColor:'white',
        borderRadius:100

    },
    iconDown: {
        
        color:'white',
        fontSize:30,
       
    }
    
})
