//import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Userform from "./Components/Userform";
import Aboutusers from "./Components/Aboutusers";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Aboutusers} />
        <Stack.Screen name="user_form" component={Userform} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
