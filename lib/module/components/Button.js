import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
const Button = ({
  onPress,
  title,
  style,
  styleText,
  Icon
}) => {
  return /*#__PURE__*/React.createElement(Pressable, {
    style: [styles.btn, style],
    onPress: onPress
  }, Icon ? /*#__PURE__*/React.createElement(Icon, null) : null, /*#__PURE__*/React.createElement(Text, {
    style: [styles.btnText, styleText]
  }, title));
};
export default Button;
const styles = StyleSheet.create({
  btn: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: "#39A7FF",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  btnText: {
    color: "#fff"
  }
});
//# sourceMappingURL=Button.js.map