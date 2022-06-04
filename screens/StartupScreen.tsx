import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/account";
import { connectToSocket } from "../store/actions/socket";

//@ts-ignore
export default function StartupScreen({ navigation }) {
  const dispatch = useDispatch();
  const socketStore = useSelector((state: any) => state.socketStore);

  //AsyncStorage.clear();
  useEffect(() => {
    async function aFunction() {
      dispatch(connectToSocket());
    }
    aFunction();
  }, []);

  useEffect(() => {
    const aFunction = async () => {
      if (socketStore.isConnected) {
        const email = await AsyncStorage.getItem("email");
        const session = await AsyncStorage.getItem("session");
        const response = await dispatch(login(email, undefined, session));
        //@ts-ignore
        if (response.ok) {
          navigation.navigate("Home");
          return;
        }
        navigation.navigate("Login");
      }
    };
    aFunction();
  }, [socketStore]);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={"large"} />
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
});
