// Nagendra
import React, { useEffect } from "react";
import { View, Text, StyleSheet,Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
    const navigation = useNavigation();


    useEffect(() => {
        checkUserExist();
    }, [])


    // check already user 
    const checkUserExist = async () => {
        // const userID = await useAsyncStorage('userID').getItem()
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: "DatePages" }],
            })
        }, 1500);
    }

    return (
        <View style={styles.mainContainer}>
            <Image style={{resizeMode:'contain',width:'55%'}} source={require('../../assets/heylogo.png')}></Image>
        </View>
    )
}


export default SplashScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#d0bae2",
        justifyContent: 'center',
        alignItems: 'center'
    }
})