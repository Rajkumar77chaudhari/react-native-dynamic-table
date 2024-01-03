import React, { useMemo, useState } from "react";
import { createTableHeaders, insert, getData } from "../helpers/TableHelpers";
import { Alert, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import Cell from "./TableCell";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FilterName from "./FilterName";
import Button from "./Button";
import IconButton from "./IconButton";
import { MI } from "./VectorIcons";
const Table = ({
  data,
  headerColor = "#4477CE",
  onRowPress,
  heading,
  description
}) => {
  const tableHeaders = useMemo(() => createTableHeaders(data), [data]);
  const [shownHeaders, setShownHeader] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  React.useEffect(() => {
    getData(`${heading}`).then(filterData => {
      if (filterData !== null) {
        setShownHeader(filterData);
      } else {
        setShownHeader(createTableHeaders(data));
      }
    }).catch(err => console.log(err));
  }, []);
  function getLighterColor(originalColor = "#4477CE", percentLighter) {
    const validPercentLighter = Math.max(0, Math.min(100, percentLighter));
    const hexToRgb = hex => {
      const bigint = parseInt(hex.slice(1), 16);
      return [bigint >> 16 & 255, bigint >> 8 & 255, bigint & 255]; // Type assertion to explicitly state the tuple type
    };
    const rgbToHex = rgb => {
      if (!rgb) {
        throw new Error("RGB values must be provided");
      }
      return `#${(1 << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2]).toString(16).slice(1)}`;
    };
    const rgbColor = hexToRgb(originalColor);
    const lighterRgb = rgbColor.map(value => value + (255 - value) * (validPercentLighter / 100)); // Type assertion here as well

    const lighterHexColor = rgbToHex(lighterRgb);
    return lighterHexColor;
  }
  const animatedStyles = useAnimatedStyle(() => ({
    height: showFilter ? withTiming(150) : withTiming(0),
    padding: showFilter ? withTiming(10) : withTiming(0)
  }));
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
    style: {
      backgroundColor: "#fff",
      height: 50,
      alignItems: "center",
      paddingHorizontal: 5,
      flexDirection: "row",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: {
      fontSize: 16,
      fontWeight: "600"
    }
  }, heading), /*#__PURE__*/React.createElement(Text, {
    style: {
      fontSize: 12
    }
  }, description)), /*#__PURE__*/React.createElement(IconButton, {
    icon: "filter",
    iconColor: showFilter ? headerColor : "#000",
    containerColor: showFilter ? getLighterColor(headerColor, 80) : "#fff",
    size: 35,
    onPress: () => setShowFilter(!showFilter)
  })), /*#__PURE__*/React.createElement(Animated.View, {
    style: [animatedStyles, {
      backgroundColor: getLighterColor(headerColor, 80)
    }]
  }, /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8
    }
  }, tableHeaders?.map((name, i) => {
    var contains = shownHeaders.some(elem => {
      return elem.title === name.title;
    });
    return /*#__PURE__*/React.createElement(FilterName, {
      headerColor: headerColor,
      notAdded: !contains,
      name: name.title,
      key: i,
      onPress: () => {
        if (contains) {
          let filtered = shownHeaders.filter(value => value.title !== name.title);
          setShownHeader(filtered);
        } else {
          // setShownHeader(prev => [name, ...prev]);
          setShownHeader(insert(shownHeaders, i, name));
        }
      }
    });
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginTop: 5,
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Button, {
    Icon: () => /*#__PURE__*/React.createElement(MI, {
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
      Alert.alert("Delete this filter ?", `This Filter Will be deletd for all the tables with ${heading} heading`, [{
        text: "Yes",
        onPress: () => {
          setShowFilter(false);
          setShownHeader(tableHeaders);
          AsyncStorage.removeItem(`${heading}`);
        }
      }, {
        text: "No",
        onPress: () => {},
        style: "destructive"
      }]);
    },
    title: "Delete"
  }), /*#__PURE__*/React.createElement(Button, {
    style: {
      width: "45%",
      backgroundColor: "#65B741",
      padding: showFilter ? 6 : 0
    },
    Icon: () => /*#__PURE__*/React.createElement(MI, {
      name: "save",
      size: 20,
      color: "#fff"
    }),
    onPress: () => {
      Alert.alert("Save Filter ?", `This Filter Will be Saved for all the tables with ${heading} heading`, [{
        text: "Yes",
        onPress: () => {
          setShowFilter(false);
          AsyncStorage.setItem(`${heading}`, JSON.stringify(shownHeaders));
        }
      }, {
        text: "No",
        onPress: () => {},
        style: "destructive"
      }]);
    },
    title: "Save"
  }))), /*#__PURE__*/React.createElement(ScrollView, {
    horizontal: true,
    contentContainerStyle: {
      flexDirection: "column"
    },
    scrollEnabled: scrollEnabled
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      flexDirection: "row"
    }
  }, shownHeaders.map((head, index) => /*#__PURE__*/React.createElement(Cell, {
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
  }))), /*#__PURE__*/React.createElement(FlatList, {
    onScroll: () => setScrollEnabled(true),
    keyExtractor: () => Math.random().toString(),
    data: data,
    renderItem: ({
      item,
      index
    }) => /*#__PURE__*/React.createElement(Pressable, {
      onPress: () => {
        onRowPress(item);
        setScrollEnabled(true);
      },
      style: {
        flexDirection: "row"
      },
      key: index
    }, shownHeaders.map((header, index1) => /*#__PURE__*/React.createElement(Cell, {
      title: item[header.title],
      width: header.width,
      key: index1
    })))
  })));
};
export default Table;
//# sourceMappingURL=Table.js.map