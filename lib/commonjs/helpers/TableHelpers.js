"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTableHeaders = createTableHeaders;
exports.getData = void 0;
exports.insert = insert;
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function createTableHeaders(data = []) {
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
function insert(arr, index, data) {
  const copy = arr;
  const remain = arr.splice(index, arr.length);
  arr.push(data);
  return [...copy, ...remain];
}
const getData = async key => {
  try {
    const jsonValue = await _asyncStorage.default.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
exports.getData = getData;
//# sourceMappingURL=TableHelpers.js.map