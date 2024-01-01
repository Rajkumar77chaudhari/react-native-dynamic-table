"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Cell = ({
  title,
  isHeader = false,
  width,
  // Rename initialWidth to width
  headerColor = '#4477CE',
  handlePanResponderMove
}) => {
  //   const [cellWidth, setCellWidth] = useState(width);

  // const handlePanResponderMove = (_: any, gestureState: any) => {
  //   const newWidth = Math.max(0, width + gestureState.dx);
  //   setCellWidth(newWidth);
  // };

  const panResponder = (0, _react.useMemo)(() => _reactNative.PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove
  }), [width]);
  const containerStyle = {
    width: width,
    borderWidth: 0.5,
    borderColor: isHeader ? '#fff' : '#000',
    justifyContent: 'center',
    backgroundColor: isHeader ? headerColor : undefined
  };
  const textStyle = {
    fontWeight: isHeader ? 'bold' : 'normal',
    color: isHeader ? '#fff' : '#000',
    textAlign: 'center',
    padding: 10
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    style: containerStyle
  }, panResponder.panHandlers), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: textStyle
  }, title));
};
var _default = exports.default = Cell;
//# sourceMappingURL=TableCell.js.map