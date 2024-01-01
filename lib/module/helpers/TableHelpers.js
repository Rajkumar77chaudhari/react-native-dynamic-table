import AsyncStorage from "@react-native-async-storage/async-storage";
export function createTableHeaders(data = []) {
  const headers = [];
  if (data.length > 0) {
    Object.keys(data[0]).forEach(function (key) {
      // if (key.toLowerCase() === "lineid") {
      // } else if (
      //   key.slice(-2).toLowerCase() === "id" ||
      //   checkList1.includes(key.toLowerCase())
      // ) {
      //   return;
      // }
      // const checkList = ["spoolno", "lineid", "type", "spoolname", "lineno"];

      headers.push({
        title: key,
        width: key.length * 20
      });
    });
  }
  return headers;
}
export function insert(arr, index, data) {
  const copy = arr;
  const remain = arr.splice(index, arr.length);
  arr.push(data);
  return [...copy, ...remain];
}
export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
//# sourceMappingURL=TableHelpers.js.map