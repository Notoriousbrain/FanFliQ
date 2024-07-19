import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import profileData from "@/assets/data/profile.json"; // Adjust the path if necessary

const mock = new MockAdapter(axios);
mock.onGet("/api/profile").reply(200, profileData);

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/profile");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <ImageBackground
        source={require("@/assets/images/profileImage.png")}
        style={styles.profileBackground}
      >
        <View style={styles.headerOverlay}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.topIcons}>
              <AntDesign name="setting" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topIcons}>
              <Feather name="edit" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {profile && (
            <View>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.stats}>{profile.stats}</Text>
            </View>
          )}
        </View>
      </ImageBackground>
      <View style={styles.bodyTop}>
        <Text style={styles.sectionTitle}>Joined Communities</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={profile?.communities}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.community}>
            <View style={styles.communityContent}>
              <Image
                source={require("@/assets/images/communityImage.png")}
                style={styles.communityImage}
              />
              <View style={styles.communityView}>
                <Text style={styles.communityName}>{item.name}</Text>
                <Text style={styles.communitySubs}>{item.subs} members</Text>
              </View>
            </View>
            <TouchableOpacity>
              <AntDesign name="ellipsis1" size={24} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    width: "100%",
    marginBottom: 20,
    position: "relative",
  },
  profileBackground: {
    width: "100%",
    height: 400,
    justifyContent: "flex-end",
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
    padding: 20,
  },
  headerTop: {
    position: "absolute",
    display: "flex",
    top: 20,
    right: 20,
    gap: 10,
  },
  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  stats: {
    color: "gray",
    fontSize: 16,
    marginTop: 20,
  },
  topIcons: {
    padding: 10,
    backgroundColor: "#000000",
    opacity: 0.8,
    borderRadius: 50,
  },
  bodyTop: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  community: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  communityContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  communityImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  communityView: {
    gap: 4,
  },
  communityName: {
    color: "white",
    fontSize: 16,
    fontWeight: "semibold",
    marginLeft: 15,
  },
  communitySubs: {
    color: "#B3B3B3",
    fontSize: 12,
    marginLeft: 15,
  },
});
