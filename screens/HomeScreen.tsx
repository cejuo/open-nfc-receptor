import { useState } from "react";
import { Alert, StatusBar, SafeAreaView, StyleSheet, Text, NativeModules, Button } from "react-native";

const { HCEReceptor } = NativeModules;

const arr = [{ title: "Test", id: "000128", expire: Date.now(), count: 2 }];

export default function HomeScreen() {
  const [text, setText] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#00b4d8"}></StatusBar>
      <Button
        title="Receive token info"
        onPress={() => {
          Alert.alert("Approach the NFC emitter", "Receiving token info...", [{ text: "Cancel", onPress: () => {} }]);
          HCEReceptor.getMessage((result: any) => {
            console.log("HCEReceptor result:");
            console.log(result);
          });
        }}
      />
      <Text style={{ fontSize: 23, fontWeight: "600", marginBottom: 14, marginTop: 14, width: "80%" }}>
        Select a token:
      </Text>
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
