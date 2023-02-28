import {default as MCIcon} from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/Ionicons";

function IsFunctionEmpty(fn) {
  return fn.toString() === 0;
}

function Capitalize(str)
{
    return str && str[0].toUpperCase() + str.slice(1);
}

function LengthOf(obj) {
  return Object.keys(obj).length;
}

function getIcon(name, type="I", color, size=24, style={}) {
  var r_icon = null;
  if (type === "M") {
    r_icon = <MCIcon name={name} color={color} size={size} style={style} />;
  } else {
    r_icon = <Icon name={name} color={color} size={size} style={style} />
  }
  return r_icon;
}

export {
  IsFunctionEmpty,
  Capitalize,
  LengthOf,
  getIcon,
}