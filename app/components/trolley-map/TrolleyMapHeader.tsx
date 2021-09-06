import { useEffect, useState } from "react";
import React from "react";
import {Text, StyleSheet} from 'react-native';
import { TrolleyStatus, WatchTrolleyStatus } from "../../services/TrolleyStatusService";

export function TrolleyMapHeader(){
    const [trolleyHeader, setTrolleyHeader] = useState<string>("")
    useEffect(() => {
        return WatchTrolleyStatus((status:TrolleyStatus)=>{
            if(status.bannerContent == trolleyHeader){
                return;
            }
            setTrolleyHeader(status.bannerContent);
        })
    }, []);

    return (
        <Text style={styles.header}>
            {trolleyHeader}
        </Text>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor:"#488115",
        padding:5,
        color:"#ffffff"
      }
})