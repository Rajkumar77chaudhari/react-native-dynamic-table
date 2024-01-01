"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Button = ({
  onPress,
  title,
  style,
  styleText,
  Icon
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: [styles.btn, style],
    onPress: onPress
  }, Icon ? /*#__PURE__*/_react.default.createElement(Icon, null) : null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.btnText, styleText]
  }, title));
};
var _default = exports.default = Button;
const styles = _reactNative.StyleSheet.create({
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