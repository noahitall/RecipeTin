import { Platform } from "react-native";
import colors from "./colors";

export const shadows = Platform.select({
  ios: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  android: {
    elevation: 3,
  },
});
