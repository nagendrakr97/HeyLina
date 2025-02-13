import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { appStatic, mooddata, sexdata, data, symptomsdata } from "../../common/Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const HomeScreen = () => {
  const route = useRoute();
  const { type, item } = route.params || {};
  const navigation = useNavigation();
  const isPastDate = type === "past_date";
  const [selectCalm, setCalmPressed] = useState(null);
  const [selectedMenstrualItems, setselectedMenstrualItems] = useState([]);
  const [selectedSexItems, setSelectedSexItems] = useState([]);
  const [selectedMoodItems, setSelectedMoodItems] = useState([]);
  const [selectedSymptomItems, setSelectedSymptomItems] = useState([]);
  const [currentDate, setcurrentDate] = useState(new Date());

  useEffect(() => {
    const loadData = async () => {
      try {
        if (type === "past_date") {

          if (item.selectedFeel) setCalmPressed(item.selectedFeel);
          if (item.selectedMenstrualItems) setselectedMenstrualItems(item.selectedMenstrualItems);
          if (item.selectedSexItems) setSelectedSexItems(item.selectedSexItems);
          if (item.selectedMoodItems) setSelectedMoodItems(item.selectedMoodItems);
          if (item.selectedSymptomItems) setSelectedSymptomItems(item.selectedSymptomItems);
        } else {
          setCalmPressed(null);
          setselectedMenstrualItems([]);
          setSelectedSexItems([]);
          setSelectedMoodItems([]);
          setSelectedSymptomItems([]);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };
    loadData();
  }, [type]);
{/* Array list handle cases */}
  const handleSelectItem = async (id, category) => {
    if (isPastDate) return;
    let updatedSelection;
    let storageKey;

    switch (category) {
      case "menstrual":
        updatedSelection = selectedMenstrualItems.includes(id)
          ? selectedMenstrualItems.filter((item) => item !== id)
          : [...selectedMenstrualItems, id];
        setselectedMenstrualItems(updatedSelection);
        storageKey = "selectedMenstrualItems";
        break;

      case "sex":
        updatedSelection = selectedSexItems.includes(id)
          ? selectedSexItems.filter((item) => item !== id)
          : [...selectedSexItems, id];
        setSelectedSexItems(updatedSelection);
        storageKey = "selectedSexItems";
        break;

      case "mood":
        updatedSelection = selectedMoodItems.includes(id)
          ? selectedMoodItems.filter((item) => item !== id)
          : [...selectedMoodItems, id];
        setSelectedMoodItems(updatedSelection);
        storageKey = "selectedMoodItems";
        break;

      case "symptoms":
        updatedSelection = selectedSymptomItems.includes(id)
          ? selectedSymptomItems.filter((item) => item !== id)
          : [...selectedSymptomItems, id];
        setSelectedSymptomItems(updatedSelection);
        storageKey = "selectedSymptomItems";
        break;

      default:
        return;
    }
    await AsyncStorage.setItem(storageKey, JSON.stringify(updatedSelection));
  };
{/* Data click handle of What are you feeling today */}
  const handleCalmPress = async (feeling) => {
    if (selectCalm === feeling) {
      setCalmPressed(null);
      await AsyncStorage.removeItem("selectedFeel");
    } else {
      setCalmPressed(feeling);
      await AsyncStorage.setItem("selectedFeel", feeling);
    }
  };
{/* Function to handle save button */}
  const saveDatesFun = async () => {
    if (selectCalm == null) {
      Alert.alert('Please choose how are you feeling')
    } else if (selectedMenstrualItems.length == 0) {
      Alert.alert('Please choose menstrual')
    } else if (selectedMenstrualItems.length == 0) {
      Alert.alert('Please choose menstrual')
    } else if (selectedSexItems.length == 0) {
      Alert.alert('Please choose sex and sex drive')
    } else if (selectedMoodItems.length == 0) {
      Alert.alert('Please choose mood')
    } else if (selectedSymptomItems.length == 0) {
      Alert.alert('Please choose sympotms')
    } else {
 
      const datesArr = await AsyncStorage.getItem('pastDates');
      const date = currentDate.getDate() + "/" + currentDate.getMonth() + "/" + currentDate.getFullYear();
      const mainDate = [];
 
      const dates = {
        'date': date,
        'selectedFeel': selectCalm,
        'selectedMenstrualItems': selectedMenstrualItems,
        'selectedSexItems': selectedSexItems,
        'selectedMoodItems': selectedMoodItems,
        'selectedSymptomItems': selectedSymptomItems,
      }
      if (datesArr != null) {
        const parsedate = JSON.parse(datesArr);
        // console.log(parsedate)
        if (parsedate.length == 0) {
          // console.log('working 0')
          mainDate.push(dates)
          await AsyncStorage.setItem('pastDates', JSON.stringify(mainDate));
        } else {
          const filterDate = parsedate.filter((item) => item.date != date);
          parsedate.map(async (item, index) => {
            if (item.date == date) {
              parsedate[index] = {
                'date': date,
                'selectedFeel': selectCalm,
                'selectedMenstrualItems': selectedMenstrualItems,
                'selectedSexItems': selectedSexItems,
                'selectedMoodItems': selectedMoodItems,
                'selectedSymptomItems': selectedSymptomItems,
              };
            }else {
              parsedate.push(dates);
            }
          });
 
          await AsyncStorage.setItem('pastDates', JSON.stringify(parsedate));
 
        }
      } else {
        mainDate.push(dates)
        await AsyncStorage.setItem('pastDates', JSON.stringify(mainDate));
      }
      Alert.alert("Success", "Data Saved successfully!!", [{ text: "OK", onPress: () => navigation.goBack() }]);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ height: 20, width: 20, }} />

        <View style={styles.headerContainer}>
          <Text style={styles.header_txt}>{type === "past_date" ? item.date : "Today"}</Text>
          <Text style={styles.subtext}>{appStatic.cycle_day}</Text>
        </View>

     {/* Save button to submit selected data  */}
        {!isPastDate ?
          <TouchableOpacity
            onPress={() => saveDatesFun()}
            style={styles.save_button}>
            <Text style={{ color: 'white', fontSize: 15, padding: 5, alignSelf: 'center' }}>Save</Text>
          </TouchableOpacity> : <View style={{ height: 20, width: 20, }} />}

      </View>

      {/* Search Bar (Hide in Past Mode) */}
      {!isPastDate && (
        <View style={styles.searchbar_container}>
          <Image style={styles.search_iconstyle} source={require('../../assets/search.png')}></Image>
          <TextInput
            style={styles.text_input}
            placeholder="Search"
            placeholderTextColor="#888"
          />
        </View>
      )}

      {/* Data Protected Banner */}
      <View style={styles.protected_container}>
        <Image
          style={styles.protected_icon}
          source={require("../../assets/dataprotect.png")}
        />
        <Text style={styles.data_protected}>
          {appStatic.your_data_protected}
        </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.category_container}>
          <Text style={styles.category_title}>
            {appStatic.what_are_you_feeling}{" "}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={styles.button_container}>

              <TouchableOpacity
                activeOpacity={isPastDate ? 1 : 0.1}
                disabled={isPastDate} onPress={() => handleCalmPress("calm")} style={[
                  styles.smiley_container,
                  selectCalm === "calm" && { backgroundColor: "rgba(252, 196, 85, 0.8)" },
                ]}>
                <Image
                  source={require("../../assets/blush.png")}
                  style={styles.emoji_style}
                ></Image>
              </TouchableOpacity>
              <Text style={styles.feelingText}>{appStatic.calm}</Text>
            </View>

            <View style={styles.button_container}>
              <TouchableOpacity
                activeOpacity={isPastDate ? 1 : 0.1}
                disabled={isPastDate} onPress={() => handleCalmPress("happy")} style={[
                  styles.smiley_container,
                  selectCalm === "happy" && { backgroundColor: "rgba(252, 196, 85, 0.8)" },
                ]}>
                <Image
                  source={require("../../assets/blush.png")}
                  style={styles.emoji_style}
                ></Image>
              </TouchableOpacity>
              <Text style={styles.feelingText}>{appStatic.happy}</Text>
            </View>

            <View style={styles.button_container}>
              <TouchableOpacity
                activeOpacity={isPastDate ? 1 : 0.1}
                disabled={isPastDate}
                onPress={() => handleCalmPress("creamy")}
                style={[
                  styles.creamy_container,
                  selectCalm === "creamy" && { backgroundColor: "rgba(122, 109, 184, 0.6)" }]}>
                <Image
                  source={require("../../assets/fuel.png")}
                  style={[
                    styles.emoji_style,
                    { transform: [{ rotate: "45deg" }] },
                  ]}
                ></Image>
              </TouchableOpacity>
              <Text style={styles.feelingText}>{appStatic.creamy}</Text>
            </View>

            <View style={styles.button_container}>
              <TouchableOpacity
                activeOpacity={isPastDate ? 1 : 0.1}
                disabled={isPastDate}
                onPress={() => handleCalmPress("sticky")}
                style={[
                  styles.creamy_container,
                  selectCalm === "sticky" && { backgroundColor: "rgba(122, 109, 184, 0.6)" }]}>
                <Image
                  source={require("../../assets/sticky.png")}
                  style={[
                    styles.emoji_style,
                    { transform: [{ rotate: "40deg" }] },
                  ]}
                ></Image>
              </TouchableOpacity>
              <Text style={styles.feelingText}>{appStatic.sticky}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 3,
          }}>
          <Text style={styles.category_title}>{appStatic.categories} </Text>

          {type !== "past_date" && (
            <TouchableOpacity>
              <Text style={styles.edit_style}>{appStatic.edit} </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.category_container}>
          <Text style={styles.category_title}>{appStatic.menstrual_flow} </Text>
          <Text
            style={[styles.subtext, { alignSelf: "flex-start", color: "#828282" }]} >
            {appStatic.daily_flow}
          </Text>
          <View style={styles.listContainer}>
            {data.map((element) => (
              <TouchableOpacity
                activeOpacity={isPastDate ? 1 : 0.1}
                key={element.id}
                style={[
                  styles.itemContainer,
                  selectedMenstrualItems.includes(element.id) && styles.selectedItemContainer]}
                onPress={() => handleSelectItem(element.id, "menstrual")}>
                <View style={styles.iconContainer}>
                  <Image source={element.icon} style={styles.icon} />
                </View>
                <Text style={styles.label}>{element.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.category_container}>
          <Text style={styles.category_title}>{appStatic.sex_drive} </Text>
          <View style={styles.listContainer}>
            {sexdata.map((element) => (
              <TouchableOpacity
                activeOpacity={isPastDate ? 1 : 0.1}
                key={element.id}
                style={[styles.sexItemContainer,
                selectedSexItems.includes(element.id) && styles.selectedsex_item]} onPress={() => handleSelectItem(element.id, "sex")}>
                <View style={styles.sexIconContainer}>
                  <Image source={element.icon} style={styles.icon} />
                </View>
                <Text style={styles.label}>{element.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.category_container}>
          <Text style={styles.category_title}>{appStatic.mood} </Text>
          <View style={styles.listContainer}>
            {mooddata.map((element) => (
              <TouchableOpacity
                activeOpacity={isPastDate ? 1 : 0.1}
                key={element.id}
                style={[styles.moodItemContainer,
                selectedMoodItems.includes(element.id) && styles.selectedMoodItemContainer]} onPress={() => handleSelectItem(element.id, "mood")}>
                <View style={[styles.iconContainer, { backgroundColor: "rgba(255, 175, 96, 0.2)", }]}>
                  <Image source={element.icon} style={[styles.icon, { height: 27, width: 27 }]} />
                </View>
                <Text style={styles.label}>{element.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.category_container}>
          <Text style={styles.category_title}>{appStatic.symptoms} </Text>
          <View style={styles.listContainer}>
            {symptomsdata.map((element) => (
              <TouchableOpacity
                activeOpacity={isPastDate ? 1 : 0.1}
                key={element.id}
                style={[styles.symptomsItemContainer,
                selectedSymptomItems.includes(element.id) && styles.selectedSymptomsItemContainer]} onPress={() => handleSelectItem(element.id, "symptoms")}>
                <View style={[styles.iconContainer, { backgroundColor: "rgba(235, 196, 229, 0.9)" }]}>
                  <Image source={element.icon} style={styles.icon} />
                </View>
                <Text style={styles.label}>{element.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "column",
    paddingVertical: 10,
  },
  header_txt: {
    color: "black",
    fontSize: 17,
    alignSelf: "center",
    fontWeight: "bold",
  },
  subtext: {
    color: "#848484",
    fontSize: 12,
    alignSelf: "center",
    fontWeight: "500",
    marginTop: 1
  },
  scrollContainer: {
    flex: 1,
    marginTop: 10,
  },
  protected_container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "5%",
    paddingVertical: 5
  },
  protected_icon: {
    height: 16,
    width: 18,
    resizeMode: "contain",
    alignSelf: "center",
  },
  data_protected: {
    color: "#4f4f4f",
    fontSize: 12,
    alignSelf: "center",
    fontWeight: "500",
    marginStart: 5,
  },
  category_container: {
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  category_title: {
    color: "#161616",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  feelingItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    marginRight: 10,
  },
  feelingEmoji: {
    fontSize: 30,
  },
  feelingText: {
    fontSize: 13,
    color: "black",
    fontWeight: "400",
    marginTop: 5,
    alignSelf: "center",
  },
  smiley_container: {
    height: 66,
    width: 66,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: "white",
    backgroundColor: "rgba(252, 196, 85, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  creamy_container: {
    height: 66,
    width: 66,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: "white",
    backgroundColor: "rgba(122, 109, 184, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  emoji_style: { height: 45, width: 45, resizeMode: "contain" },
  button_container: {
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 5,
  },
  edit_style: {
    color: "#fe5c80",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  listContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 239, 241, 0.9)",
    borderRadius: 30,
    paddingStart: 3,
    paddingEnd: 10,
    marginBottom: 10,
    marginRight: 10,
    paddingVertical: 2
  },
  sexItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(253, 237, 237, 0.9)",
    borderRadius: 30,
    paddingStart: 3,
    paddingEnd: 10,
    marginBottom: 10,
    marginRight: 10,
    paddingVertical: 2
  },
  moodItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 247, 239, 1.9)",
    borderRadius: 30,
    paddingStart: 3,
    paddingEnd: 10,
    marginBottom: 10,
    marginRight: 10,
    paddingVertical: 2
  },
  symptomsItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(248, 235, 246, 1.9)",
    borderRadius: 30,
    paddingStart: 3,
    paddingEnd: 10,
    marginBottom: 10,
    marginRight: 10,
    paddingVertical: 2
  },

  iconContainer: {
    height: 32,
    width: 32,
    borderRadius: 20,
    backgroundColor: "rgba(255, 207, 217, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  sexIconContainer: {
    height: 32,
    width: 32,
    borderRadius: 20,
    backgroundColor: "rgba(249, 201, 201, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  selectedsex_item: {
    backgroundColor: "rgba(255, 90, 126, 0.9)",
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#363333",
  },
  selectedItemContainer: {
    backgroundColor: "rgba(255, 126, 171, 0.5)",
  },
  selectedMoodItemContainer: {
    backgroundColor: "rgba(255, 175, 96, 0.5)",
  },
  selectedSymptomsItemContainer: {
    backgroundColor: "rgba(197, 152, 243, 0.9)",
  },
  save_button:{
    height: 36,
    width: 55,
    backgroundColor: '#6c4c98',
    borderWidth: 1, borderColor: '#6c4c98',
    borderRadius: 4, justifyContent: 'center', alignSelf: 'center'
  },
  searchbar_container:{
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#f3f3f3",
    justifyContent: 'center',
    paddingStart: 10, marginTop: 8
  },
  search_iconstyle:{
    height: 22,
    width: 22, resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal: 5
  },
  text_input:{
    flex: 1,
    fontSize: 15,
    color: "#333",
  }
});
