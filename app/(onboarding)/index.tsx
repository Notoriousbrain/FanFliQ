import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { router } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Onboarding: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const circleTranslateX = new Animated.Value(0);

  const handleOpenModal = useCallback(() => {
    setModalVisible(true);
    Animated.timing(circleTranslateX, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    }).start();
    circleTranslateX.setValue(0);
  }, []);

  const handleLogin = useCallback(() => {
    setModalVisible(false);
    router.push("(tabs)");
  }, []);

  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: circleTranslateX } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        if (
          event.nativeEvent.translationX >
          SCREEN_WIDTH - SCREEN_WIDTH / 5 - 62
        ) {
          circleTranslateX.setValue(SCREEN_WIDTH - SCREEN_WIDTH / 5 - 62);
        } else if (event.nativeEvent.translationX < 0) {
          circleTranslateX.setValue(0);
        }
      },
    }
  );

  const onRelease = ({ nativeEvent }: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.translationX > SCREEN_WIDTH - SCREEN_WIDTH / 5 - 62) {
      handleOpenModal();
    } else {
      Animated.timing(circleTranslateX, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false,
      }).start();
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          source={require("@/assets/images/onboardingBack.png")}
          style={styles.background}
        >
          <View>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.description}>
              An exclusive community of musicians and the people who love and
              support them.
            </Text>
          </View>
          <View style={styles.sliderWrapper}>
            <View style={styles.sliderContainer}>
              <PanGestureHandler
                onHandlerStateChange={onRelease}
                onGestureEvent={onPanGestureEvent}
              >
                <View style={styles.slider}>
                  <Animated.View
                    style={[
                      styles.circleSlider,
                      {
                        transform: [{ translateX: circleTranslateX }],
                      },
                    ]}
                  >
                    <AntDesign name="doubleright" size={25} color="black" />
                  </Animated.View>
                  <View style={styles.sliderTextContainer}>
                    <Text style={styles.sliderText}>Swipe to get inside</Text>
                  </View>
                </View>
              </PanGestureHandler>
            </View>
          </View>
        </ImageBackground>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Signup</Text>
            <Text style={styles.modalDescription}>
              Sign up to get access to your favorite artist's content or create
              an account for fans.
            </Text>
            <View style={styles.signInDetails}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Image source={require("@/assets/images/google.png")} />
                <Text style={styles.buttonText}>Sign in with Phone</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Image source={require("@/assets/images/apple.png")} />
                <Text style={styles.buttonText}>Sign in with Apple</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Image source={require("@/assets/images/google.png")} />
                <Text style={styles.buttonText}>Sign in with Google</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.terms}>
              By continuing, you agree to our{" "}
              <Text style={styles.link}>Terms & conditions</Text> and{" "}
              <Text style={styles.link}>Privacy policy</Text>.
            </Text>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    height: "100%",
    backgroundColor: "black",
  },
  background: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    alignSelf: "center",
    marginTop: 100,
  },
  description: {
    marginTop: 50,
    paddingHorizontal: 40,
    color: "#BFBFBF",
    textAlign: "center",
    fontSize: 20,
    lineHeight: 32,
  },
  sliderWrapper: {
    marginBottom: 50,
  },
  sliderContainer: {
    backgroundColor: "black",
    opacity: 0.7,
    paddingVertical: 1,
    paddingHorizontal: 1.5,
    width: "80%",
    alignSelf: "center",
    borderRadius: 50,
    overflow: "hidden",
  },
  slider: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleSlider: {
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  sliderText: {
    color: "#838383",
    fontSize: 16,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 16,
    color: "#6b6b6b",
    marginBottom: 20,
    marginRight: 10,
  },
  signInDetails: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 30,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  terms: {
    fontSize: 12,
    color: "#999999",
    marginTop: 10,
    textAlign: "center",
  },
  link: {
    textDecorationLine: "underline",
  },
});
