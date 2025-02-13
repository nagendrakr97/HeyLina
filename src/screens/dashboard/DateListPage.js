import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DateListPage = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([])

  useEffect(() => {
    loadat();
  }, [])

  const loadat = async () => {
    const datesArr = await AsyncStorage.getItem('pastDates');
    const parse = JSON.parse(datesArr)
    setData(parse)
  }

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {data ===null ? (
        // Fullscreen "No Data Available" view
        <View style={styles.fullScreenView}>
          <Image
            style={styles.image}
            source={require('../../assets/confused.png')}
          />
          <Text style={styles.noDataText}>Data not available</Text>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // List of Dates
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, i }) => (

            <TouchableOpacity
              key={i}
              onPress={() =>  navigation.navigate("HomeScreen", { type: "past_date", item: item })} style={styles.item}>
              <Text style={styles.dateText}>{item.date}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default DateListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
  },
  fullScreenView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  noDataText: {
    fontSize: 19,
    fontWeight: '500',
    color: 'black',
    marginTop: 10,
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6c4c98',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
