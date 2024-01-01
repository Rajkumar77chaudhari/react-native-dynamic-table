"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _TableHelpers = require("../helpers/TableHelpers");
var _reactNative = require("react-native");
var _TableCell = _interopRequireDefault(require("./TableCell"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
var _FilterName = _interopRequireDefault(require("./FilterName"));
var _Button = _interopRequireDefault(require("./Button"));
var _IconButton = _interopRequireDefault(require("./IconButton"));
var _VectorIcons = require("./VectorIcons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Table = ({
  data,
  headerColor = '#4477CE',
  onRowPress,
  heading,
  description
}) => {
  const tableHeaders = (0, _react.useMemo)(() => (0, _TableHelpers.createTableHeaders)(data), [data]);
  const [shownHeaders, setShownHeader] = (0, _react.useState)([]);
  const [showFilter, setShowFilter] = (0, _react.useState)(false);
  const [scrollEnabled, setScrollEnabled] = (0, _react.useState)(true);
  _react.default.useEffect(() => {
    (0, _TableHelpers.getData)(`${heading}`).then(filterData => {
      if (filterData !== null) {
        setShownHeader(filterData);
      } else {
        setShownHeader((0, _TableHelpers.createTableHeaders)(data));
      }
    }).catch(err => console.log(err));
  }, []);
  function getLighterColor(originalColor = '#4477CE', percentLighter) {
    const validPercentLighter = Math.max(0, Math.min(100, percentLighter));
    const hexToRgb = hex => {
      const bigint = parseInt(hex.slice(1), 16);
      return [bigint >> 16 & 255, bigint >> 8 & 255, bigint & 255]; // Type assertion to explicitly state the tuple type
    };
    const rgbToHex = rgb => {
      if (!rgb) {
        throw new Error('RGB values must be provided');
      }
      return `#${(1 << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2]).toString(16).slice(1)}`;
    };
    const rgbColor = hexToRgb(originalColor);
    const lighterRgb = rgbColor.map(value => value + (255 - value) * (validPercentLighter / 100)); // Type assertion here as well

    const lighterHexColor = rgbToHex(lighterRgb);
    return lighterHexColor;
  }
  const animatedStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    height: showFilter ? (0, _reactNativeReanimated.withTiming)(150) : (0, _reactNativeReanimated.withTiming)(0),
    padding: showFilter ? (0, _reactNativeReanimated.withTiming)(10) : (0, _reactNativeReanimated.withTiming)(0)
  }));
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      backgroundColor: "#fff",
      height: 50,
      alignItems: "center",
      paddingHorizontal: 5,
      flexDirection: "row",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: 16,
      fontWeight: "600"
    }
  }, heading), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: 12
    }
  }, description)), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    icon: "filter",
    iconColor: showFilter ? headerColor : "#000",
    containerColor: showFilter ? getLighterColor(headerColor, 80) : "#fff",
    size: 35,
    onPress: () => setShowFilter(!showFilter)
  })), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [animatedStyles, {
      backgroundColor: getLighterColor(headerColor, 80)
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    contentContainerStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8
    }
  }, tableHeaders?.map((name, i) => {
    var contains = shownHeaders.some(elem => {
      return elem.title === name.title;
    });
    return /*#__PURE__*/_react.default.createElement(_FilterName.default, {
      headerColor: headerColor,
      notAdded: !contains,
      name: name.title,
      showFilter: showFilter,
      key: i,
      onPress: () => {
        if (contains) {
          let filtered = shownHeaders.filter(value => value.title !== name.title);
          setShownHeader(filtered);
        } else {
          // setShownHeader(prev => [name, ...prev]);
          setShownHeader((0, _TableHelpers.insert)(shownHeaders, i, name));
        }
      }
    });
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginTop: 5,
      gap: 5
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    Icon: () => /*#__PURE__*/_react.default.createElement(_VectorIcons.MI, {
      name: "delete",
      size: 20,
      color: "#fff"
    }),
    style: {
      width: "45%",
      backgroundColor: "#EA906C",
      padding: showFilter ? 6 : 0
    },
    onPress: () => {
      _reactNative.Alert.alert("Delete this filter ?", `This Filter Will be deletd for all the tables with ${heading} heading`, [{
        text: "Yes",
        onPress: () => {
          setShowFilter(false);
          setShownHeader(tableHeaders);
          _asyncStorage.default.removeItem(`${heading}`);
        }
      }, {
        text: "No",
        onPress: () => {},
        style: "destructive"
      }]);
    },
    title: "Delete"
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    style: {
      width: "45%",
      backgroundColor: "#65B741",
      padding: showFilter ? 6 : 0
    },
    Icon: () => /*#__PURE__*/_react.default.createElement(_VectorIcons.MI, {
      name: "save",
      size: 20,
      color: "#fff"
    }),
    onPress: () => {
      _reactNative.Alert.alert("Save Filter ?", `This Filter Will be Saved for all the tables with ${heading} heading`, [{
        text: "Yes",
        onPress: () => {
          setShowFilter(false);
          _asyncStorage.default.setItem(`${heading}`, JSON.stringify(shownHeaders));
        }
      }, {
        text: "No",
        onPress: () => {},
        style: "destructive"
      }]);
    },
    title: "Save"
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    horizontal: true,
    contentContainerStyle: {
      flexDirection: "column"
    },
    scrollEnabled: scrollEnabled
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flexDirection: "row"
    }
  }, shownHeaders.map((head, index) => /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    handlePanResponderMove: (_, gestureState) => {
      setScrollEnabled(false);
      setShownHeader(prevHeaders => {
        const updatedHeaders = [...prevHeaders];
        const index = updatedHeaders.findIndex(h => h.title === head.title);
        if (index !== -1) {
          const newWidth = Math.max(0, head.width + gestureState.dx);
          updatedHeaders[index] = {
            ...head,
            width: newWidth
          };
        }
        return updatedHeaders;
      });
    },
    title: head.title,
    width: head.width,
    isHeader: true,
    key: index,
    headerColor: headerColor
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    onScroll: () => setScrollEnabled(true),
    keyExtractor: ({
      index
    }) => index,
    data: data,
    renderItem: ({
      item,
      index
    }) => /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      onPress: () => {
        onRowPress(item);
        setScrollEnabled(true);
      },
      style: {
        flexDirection: "row"
      },
      key: index
    }, shownHeaders.map((header, index1) => /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      title: item[header.title],
      width: header.width,
      key: index1
    })))
  })));
};
var _default = exports.default = Table;
//# sourceMappingURL=Table.js.map