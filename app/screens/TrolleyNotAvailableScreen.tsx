import { NavigationProp, useNavigation, useNavigationContainerRef } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerParamList } from "../types";


export function TrolleyNotAvailableScreen() {
    const navigationRef = useNavigation<NavigationProp<DrawerParamList>>();
    
    return (
        <View style={styles.container}>
            <Text style={styles.notAvailableWarning}>Trolley out of service</Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigationRef.navigate("Schedule")} >
                <Text style={[styles.notAvailableWarning]}>See Schedule</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f00",
        padding:5,
    },
    notAvailableWarning: {
        color: "#fff",
        margin: 3,
        width:"100%",
        textAlign:"center"
    },
    button: {
        backgroundColor: "#666",
        alignSelf:"center",
        padding:5,
        borderRadius:10
    }
})