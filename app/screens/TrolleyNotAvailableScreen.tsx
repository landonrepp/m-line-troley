import React from "react";
import { View, Text, StyleSheet } from "react-native";


export function TrolleyNotAvailableScreen() {
    return (
        <Text style={styles.notAvailableWarning}>Trolley out of service</Text>
    )
}

const styles = StyleSheet.create({
    notAvailableWarning: {
        backgroundColor: "#f00",
        color: "#fff",
        width:"100%",
        textAlign:"center"
    }
})