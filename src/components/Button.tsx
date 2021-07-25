import React from "react"
import {Text, TouchableOpacity, StyleSheet} from "react-native"
import colors from "../styles/colors"
import fonts from "../styles/fonts"



export function Button ( ) {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.text}>
              Confirmar
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        height:56,
    }, 
    text:{
        color: colors.white,
        fontSize:16,
        fontFamily: fonts.heading
    }
})