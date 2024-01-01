import React, {useMemo, useState} from 'react';
import {createTableHeaders, insert, getData} from '../helpers/TableHelpers';
import {Alert, FlatList, Pressable, ScrollView, Text, View} from 'react-native';
import Cell from './TableCell';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterName from './FilterName';
import Button from './Button';
import IconButton from './IconButton';
import {MI} from './VectorIcons';

interface TableProps {
  data: Record<string, any>[];
  headerColor?: string;
  onRowPress: (row: Record<string, any>) => void;
  heading: string;
  description: string;
}

const Table: React.FunctionComponent<TableProps> = ({
  data,
  headerColor = '#4477CE',
  onRowPress,
  heading,
  description,
}) => {
  const tableHeaders = useMemo(() => createTableHeaders(data), [data]);
  const [shownHeaders, setShownHeader] = useState<
    {title: string; width: number}[]
  >([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);


  React.useEffect(() => {
    getData(`${heading}`)
      .then((filterData: {title: string; width: number}[]) => {
        if (filterData !== null) {
          setShownHeader(filterData);
        } else {
          setShownHeader(createTableHeaders(data));
        }
      })
      .catch(err => console.log(err));
  }, []);

  function getLighterColor(
    originalColor: string = '#4477CE',
    percentLighter: number,
  ): string {
    const validPercentLighter: number = Math.max(
      0,
      Math.min(100, percentLighter),
    );

    const hexToRgb = (hex: string): [number, number, number] => {
      const bigint: number = parseInt(hex.slice(1), 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255] as [
        number,
        number,
        number,
      ]; // Type assertion to explicitly state the tuple type
    };

    const rgbToHex = (rgb?: [number, number, number]): string => {
      if (!rgb) {
        throw new Error('RGB values must be provided');
      }
      return `#${((1 << 24) | (rgb[0] << 16) | (rgb[1] << 8) | rgb[2])
        .toString(16)
        .slice(1)}`;
    };

    const rgbColor: [number, number, number] = hexToRgb(originalColor);

    const lighterRgb: [number, number, number] = rgbColor.map(
      (value: number) => value + (255 - value) * (validPercentLighter / 100),
    ) as [number, number, number]; // Type assertion here as well

    const lighterHexColor: string = rgbToHex(lighterRgb);

    return lighterHexColor;
  }

  const animatedStyles = useAnimatedStyle(() => ({
    height: showFilter ? withTiming(150) : withTiming(0),
    padding: showFilter ? withTiming(10) : withTiming(0),
  }));

  return (
    <View>
      <View
        style={{
          backgroundColor: "#fff",
          height: 50,
          alignItems: "center",
          paddingHorizontal: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{heading}</Text>
          <Text style={{ fontSize: 12 }}>{description}</Text>
        </View>
        <IconButton
          icon="filter"
          iconColor={showFilter ? headerColor : "#000"}
          containerColor={
            showFilter ? getLighterColor(headerColor, 80) : "#fff"
          }
          size={35}
          onPress={() => setShowFilter(!showFilter)}
        />
      </View>
      <Animated.View
        style={[
          animatedStyles,
          { backgroundColor: getLighterColor(headerColor, 80) },
        ]}>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
          }}>
          {tableHeaders?.map((name, i) => {
            var contains = shownHeaders.some((elem) => {
              return elem.title === name.title;
            });
            return (
              <FilterName
                headerColor={headerColor}
                notAdded={!contains}
                name={name.title}
                showFilter={showFilter}
                key={i}
                onPress={() => {
                  if (contains) {
                    let filtered = shownHeaders.filter(
                      (value) => value.title !== name.title,
                    );
                    setShownHeader(filtered);
                  } else {
                    // setShownHeader(prev => [name, ...prev]);
                    setShownHeader(insert(shownHeaders, i, name));
                  }
                }}
              />
            );
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 5,
            gap: 5,
          }}>
          <Button
            Icon={() => <MI name="delete" size={20} color={"#fff"} />}
            style={{
              width: "45%",
              backgroundColor: "#EA906C",
              padding: showFilter ? 6 : 0,
            }}
            onPress={() => {
              Alert.alert(
                "Delete this filter ?",
                `This Filter Will be deletd for all the tables with ${heading} heading`,
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      setShowFilter(false);
                      setShownHeader(tableHeaders);
                      AsyncStorage.removeItem(`${heading}`);
                    },
                  },
                  { text: "No", onPress: () => {}, style: "destructive" },
                ],
              );
            }}
            title={"Delete"}
          />

          <Button
            style={{
              width: "45%",
              backgroundColor: "#65B741",
              padding: showFilter ? 6 : 0,
            }}
            Icon={() => <MI name="save" size={20} color={"#fff"} />}
            onPress={() => {
              Alert.alert(
                "Save Filter ?",
                `This Filter Will be Saved for all the tables with ${heading} heading`,
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      setShowFilter(false);
                      AsyncStorage.setItem(
                        `${heading}`,
                        JSON.stringify(shownHeaders),
                      );
                    },
                  },
                  { text: "No", onPress: () => {}, style: "destructive" },
                ],
              );
            }}
            title={"Save"}
          />
        </View>
      </Animated.View>
      <ScrollView
        horizontal
        contentContainerStyle={{ flexDirection: "column" }}
        scrollEnabled={scrollEnabled}>
        <View style={{ flexDirection: "row" }}>
          {shownHeaders.map((head, index) => (
            <Cell
              handlePanResponderMove={(_: any, gestureState: any) => {
                setScrollEnabled(false);
                setShownHeader((prevHeaders) => {
                  const updatedHeaders = [...prevHeaders];
                  const index = updatedHeaders.findIndex(
                    (h) => h.title === head.title,
                  );

                  if (index !== -1) {
                    const newWidth = Math.max(0, head.width + gestureState.dx);
                    updatedHeaders[index] = { ...head, width: newWidth };
                  }

                  return updatedHeaders;
                });
              }}
              title={head.title}
              width={head.width}
              isHeader
              key={index}
              headerColor={headerColor}
            />
          ))}
        </View>
        <FlatList
          onScroll={() => setScrollEnabled(true)}
          keyExtractor={({index}) => index}
          data={data}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                onRowPress(item);
                setScrollEnabled(true);
              }}
              style={{ flexDirection: "row" }}
              key={index}>
              {shownHeaders.map((header, index1) => (
                <Cell
                  title={item[header.title]}
                  width={header.width}
                  key={index1}
                />
              ))}
            </Pressable>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Table;
