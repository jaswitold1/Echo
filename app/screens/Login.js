import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity, } from 'react-native'
import {styles} from './Master'
export default function main({start}) {
    return (
         <TouchableOpacity onPress={start}>
            <Text style={styles.text}>
                Let's Start
            </Text>
           
        </TouchableOpacity>
    )
}

