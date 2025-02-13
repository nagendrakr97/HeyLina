import React, { useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { appStatic } from "../common/Constant";

const Header = () => {
    return (
    <View style={styles.headerC}>
        <Text style={styles.headertxt}>{appStatic.app_name_txt}</Text>
    </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerC: {
        width: '100%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6c4c98',
    },
    headertxt: {
        fontSize: 18,
        color: 'white',
        fontWeight: '500',
    }
})