import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  TextInput,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  NativeModules,
  View,
  Modal,
} from "react-native";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { login } from "../store/actions/account";

//@ts-ignore
export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("hola");
  const [error, setError] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#fb8500"}></StatusBar>
      <Text style={{ fontWeight: "600", fontSize: 20 }}>Onapp! - Admin</Text>
      <Image source={require("../assets/icon.png")} style={{ margin: 14, width: 130, height: 130 }} />
      <Text style={{ textAlign: "center" }}>¡Introduce tus credenciales para empezar a usar la aplicación!</Text>
      <View style={{ marginTop: 20, width: "70%" }}>
        <TextInput
          defaultValue={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
          placeholder="Email"
        />
        <TextInput
          defaultValue={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput}
          placeholder="Constraseña"
          secureTextEntry
        />
        <Text style={{ color: "red" }}>{error}</Text>
        <Button
          title="iniciar sesión"
          onPress={() => {
            const aFunction = async () => {
              setError("");
              setShowSpinner(true);
              const response = await dispatch(login(email, password, null));
              //@ts-ignore
              if (!response.ok) setError(response.reason);
              else navigation.navigate("Home");
              setShowSpinner(false);
            };
            aFunction();
          }}
          color="warning"
        />
        <ActivityIndicator animating={showSpinner} size={"large"} />
      </View>

      <View style={{ position: "absolute", bottom: 0, width: "85%", marginBottom: 5 }}>
        <Text style={{ textAlign: "right", color: "gray" }}>Juan Francisco Vilas Correa</Text>
        <Text style={{ textAlign: "right", color: "gray" }}>Universidad de Málaga</Text>
      </View>
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
  textInput: {
    padding: 10,
    paddingLeft: 14,
    paddingRight: 14,
    borderWidth: 0.2,
    marginBottom: 10,
  },
});
