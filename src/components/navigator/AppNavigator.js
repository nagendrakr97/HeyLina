import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import SplashScreen from "../../screens/authScreens/SplashScreen";
import DatePages from "../../screens/dashboard/DatePages";
import HomeScreen from "../../screens/dashboard/HomeScreen";
import DateListPage from "../../screens/dashboard/DateListPage";

const Stack = createStackNavigator();

// Nagendra Navigator Container
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DatePages"
          component={DatePages}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="DateListPage"
          component={DateListPage}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
