import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Recording() {
    return (
        <View style={styles.container}>
            <Text>How long You want to record?</Text>
            <View>
                <TouchableOpacity>
                    <Text>
                        &bull;
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity><Text>
                    ↓</Text></TouchableOpacity>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'80%'
    },
    
})
