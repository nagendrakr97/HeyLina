// Nagendra
import React, { useEffect } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { appStatic } from '../../common/Constant';
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";


const DatePages = () => {
     const navigation = useNavigation();

     const handleLogNewDateClick = () => {
        navigation.navigate("HomeScreen", { type: "new_log" });;
    };
     const handlePastDateClick = () => {
        navigation.navigate("DateListPage");
     }
    return (
        <View style={{ flex: 1 }}>
            {/* header */}
            <Header />

            {/* buttons view */}
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.firstview} onPress={handleLogNewDateClick}>
                    <Text style={styles.notextx}>{appStatic.log_mew_date_txt}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.secondview} onPress={handlePastDateClick}>
                    <Text style={styles.notextx}>{appStatic.see_pass_date_txt}</Text>
                </TouchableOpacity>

                <View style={styles.secondview}>
                    <Text style={styles.notextx}>{appStatic.free_note_txt}</Text>
                </View>
            </View>
          
        </View>
    )
}


export default DatePages;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    notextx: {
        fontSize: 16,
        fontWeight: '500'
    },
    firstview: {
        backgroundColor: '#d0bae2',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 42
    },
    secondview: {
        backgroundColor: '#d0bae2',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 42,
        marginTop: 20
    }
})