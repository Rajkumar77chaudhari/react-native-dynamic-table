import {
  StyleSheet,
  Text,
  Pressable,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import React from "react";
type Props = {
  onPress?: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  Icon?: () => JSX.Element;
};

const Button = ({
  onPress,
  title,
  style,
  styleText,
  Icon,
}: Props): JSX.Element => {
  return (
    <Pressable style={[styles.btn, style]} onPress={onPress}>
      {Icon ? <Icon /> : null}
      <Text style={[styles.btnText, styleText]}>{title}</Text>
    </Pressable>
  );
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
    gap: 8,
  },
  btnText: {
    color: "#fff",
  },
});
