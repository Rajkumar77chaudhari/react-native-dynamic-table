"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FilterName = ({
  name,
  onPress,
  notAdded,
  headerColor = "#4477CE"
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress,
    style: {
      borderRadius: 16,
      backgroundColor: notAdded ? "#fff" : headerColor,
      alignSelf: "center",
      justifyContent: "center",
      borderColor: notAdded ? headerColor : "#fff",
      padding: 10,
      borderWidth: 0.5
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: notAdded ? headerColor : "#fff",
      fontSize: 12,
      fontWeight: "bold"
    }
  }, name));
};
var _default = exports.default = FilterName;
//# sourceMappingURL=FilterName.js.map