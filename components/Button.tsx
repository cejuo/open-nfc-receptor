import { Text, TouchableOpacity, TouchableHighlight, View } from "react-native";

interface Button {
  title: string;
  onPress: Function;
  color?: Color;
}

type Color = "lightBlue" | "darkBlue" | "dark" | "warning" | "darkWarning" | "red";

const colors = {
  undefined: undefined,
  lightBlue: "#8ecae6",
  darkBlue: "#219ebc",
  dark: "#023047",
  warning: "#ffb703",
  darkWarning: "#fb8500",
  red: "#e63946",
};

//https://coolors.co/palette/8ecae6-219ebc-023047-ffb703-fb8500

export default function Button(props: Button) {
  function isDark(color: string | undefined) {
    if (color == undefined) return true;
    if (color?.includes("warning")) return false;
    if (color.includes("red")) return true;
    return color?.includes("dark") || color?.includes("light");
  }
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
      }}
      style={{ marginBottom: 10, marginTop: 10, borderRadius: 12, backgroundColor: "black" }}
      activeOpacity={0.6}
    >
      <View
        style={{
          borderRadius: 10,
          padding: 10,
          backgroundColor: colors[props.color || "undefined"] || colors.lightBlue,
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "600", color: isDark(props.color) ? "white" : "black" }}>
          {props.title.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
