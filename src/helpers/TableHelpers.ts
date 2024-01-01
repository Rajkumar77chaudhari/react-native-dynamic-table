import AsyncStorage from "@react-native-async-storage/async-storage";

export function createTableHeaders(
  data: any[] = [],
): { title: string; width: number }[] {
  const headers: { title: string; width: number }[] = [];

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
        width: key.length * 20,
      });
    });
  }
  return headers;
}
export function insert(arr: any[], index: number, data: any) {
  const copy = arr;
  const remain = arr.splice(index, arr.length);
  arr.push(data);
  return [...copy, ...remain];
}

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
