import React from "react";
import { Tabs } from "expo-router";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0F0F0F", borderTopColor: "black", paddingTop: 12 }, 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name={focused ? "heart" : "hearto"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? "user-circle" : "user-circle-o"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
