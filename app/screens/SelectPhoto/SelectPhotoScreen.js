import React from "react";
import { View } from "react-native";

import { MyImagePicker } from "../../components/ImagePicker";

export default function SelectPhotoScreen(props) {
  
  const handleSelectCallback = props.route.params.handleSelectCallback;
  
  return (
    <View>
      <MyImagePicker handleSelectCallback={handleSelectCallback}/>
    </View>
  );
}
