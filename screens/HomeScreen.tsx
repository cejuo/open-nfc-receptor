import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, StatusBar, SafeAreaView, StyleSheet, Text, NativeModules, View, Modal, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

//@ts-ignore
import SvG from "../assets/img/payment.svg";
import Button from "../components/Button";
import { sendToken } from "../store/actions/account";

const { HCEReceptor } = NativeModules;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//@ts-ignore
export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const accountStore = useSelector((state: any) => state.accountStore);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#fb8500"}></StatusBar>

      <View style={styles.topContainer}>
        <Text style={styles.heading}>Hi {capitalizeFirstLetter(accountStore.email.split("@")[0])}! 👋</Text>
        <Button
          title="logout"
          onPress={() => {
            AsyncStorage.clear();
            navigation.navigate("Login");
          }}
          color="red"
        />
      </View>

      <Text>Press the button to check the token info 👇👇:</Text>
      <Button
        title="Receive token info"
        onPress={() => {
          setShowModal(true);
          HCEReceptor.getMessage((result: any) => {
            const aFunction = async () => {
              console.log("HCEReceptor result:");
              console.log(result);
              const response: any = await dispatch(sendToken(result));
              if (!response.ok) {
                Alert.alert("❌ Invalid", response.reason);
              } else {
                Alert.alert("✅ Valid", `Left: ${response.token.count || (response.token.count == 0 ? "0" : "∞")}`);
              }

              setShowModal(false);
            };
            aFunction();
          });
        }}
        color="warning"
      />

      <View style={{ position: "absolute", bottom: 0 }}>
        <SvG width={400} height={200}></SvG>
      </View>

      {/* Modals */}

      <Modal style={{ position: "absolute", zIndex: -99 }} transparent={true} animationType="fade" visible={showModal}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}></View>
      </Modal>

      <Modal transparent={true} animationType="slide" visible={showModal}>
        <View style={{ flex: 2, backgroundColor: "rgba(0,0,0,0.0)" }}></View>
        <View style={styles.topModalContainer}>
          <Text style={{ fontWeight: "600", fontSize: 20, marginBottom: 10 }}>Approach the NFC emitter</Text>
          <Text style={{ fontSize: 16, marginBottom: 30 }}>Waiting for token info...</Text>
          <Button
            color="warning"
            title="cancel"
            onPress={() => {
              setShowModal(false);
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  heading: {
    fontWeight: "600",
    fontSize: 30,
  },
  topModalContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
