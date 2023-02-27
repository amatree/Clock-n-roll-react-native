import {default as MCIcon} from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/Ionicons";

function isFunctionEmpty(fn) {
  return fn.toString() === 0;
}

function lengthOf(obj) {
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
  isFunctionEmpty,
  lengthOf,
  getIcon,
}