import {default as MCIcon} from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/Ionicons";

const Colors = {
  accent: "#b472f2",
}

function IsFunctionEmpty(fn) {
  return fn.toString() === 0;
}

function ObjectHasEmptyValue(obj) {
  return Object.values(obj).includes("") && !Object.values(obj).includes(undefined) && !Object.values(obj).includes(null);
}

function TrimForNumber(str) {
  return str.replace(/[^\d.-]/g, '');
}

function AttachWagePerHour(str) {
  return "$" + TrimForNumber(str) + "/hr";
}

function Capitalize(str)
{
    return str && str[0].toUpperCase() + str.slice(1);
}

function LengthOf(obj) {
  return Object.keys(obj).length;
}

function getIcon(name, type="I", size=24, style={}) {
  var r_icon = null;
  if (type === "M") {
    r_icon = <MCIcon name={name} color={style.color} size={size} style={style} />;
  } else {
    r_icon = <Icon name={name} color={style.color} size={size} style={style} />
  }
  return r_icon;
}

function AreObjectsDifferent(obj1, obj2) {
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}

export {
  IsFunctionEmpty,
  Capitalize,
  LengthOf,
  getIcon,
  TrimForNumber,
  AttachWagePerHour,
  ObjectHasEmptyValue,
  AreObjectsDifferent,
  Colors,
}