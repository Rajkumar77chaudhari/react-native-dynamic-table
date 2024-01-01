"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FilterName = ({
  name,
  showFilter,
  onPress,
  notAdded,
  headerColor = '#4477CE'
}) => {
  const animatedStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    padding: showFilter ? (0, _reactNativeReanimated.withTiming)(10) : (0, _reactNativeReanimated.withTiming)(0),
    borderWidth: showFilter ? (0, _reactNativeReanimated.withTiming)(0.5) : (0, _reactNativeReanimated.withTiming)(0)
  }));
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [{
      borderRadius: 16,
      backgroundColor: notAdded ? '#fff' : headerColor,
      alignSelf: 'center',
      justifyContent: 'center',
      borderColor: notAdded ? headerColor : '#fff'
    }, animatedStyles]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    onPress: onPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: notAdded ? headerColor : '#fff',
      fontSize: 12,
      fontWeight: 'bold'
    }
  }, name)));
};
var _default = exports.default = FilterName;
//# sourceMappingURL=FilterName.js.map