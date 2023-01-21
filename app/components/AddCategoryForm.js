import React, { useState, useRef } from "react";
import { View, Text, TextInput, Pressable, Platform, StyleSheet } from "react-native";

import { buttonStyles } from "../styles/button";
import colors from "../styles/colors";
import { shadows } from "../styles/shadows";

export const AddCategoryForm = ({ onSubmit, category, navigation }) => {
  const [name, setName] = useState(category?.name || "");
  const [photoUrl, setPhotoUrl] = useState(category?.photoUrl || "");
  
  const handleSubmit = () => {
    onSubmit(name, photoUrl, category?.categoryId);
    setName("");
    setPhotoUrl("");
  };

  

  const handleSelectCallback = (newPhotoUrl) => {
    console.log("handleSelect called with newPhotoUrl: " + newPhotoUrl);
    setPhotoUrl(newPhotoUrl);
  };
  const handleSelectPhoto = () => {
    navigation.navigate("SelectPhoto", { photoUrl: photoUrl, handleSelectCallback: handleSelectCallback });    

  };
  return (
    
    <View style={styles.form}>

      <View style={styles.container}>        
        <Text style={{fontSize:20, paddingBottom: 8, paddingLeft:8}}>Name</Text>
        <TextInput
            value={name}
            placeholder="Enter category name"
            onChangeText={setName}
            allowFontScaling={true}
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.textInput}
          />      
      </View>
      <View style={styles.container}>        
        <Text style={{fontSize:20, paddingBottom: 8, paddingLeft:8}}>Photo Url</Text>
        <TextInput
          value={photoUrl}
          placeholder="Enter photo url"
          onChangeText={setPhotoUrl}
          allowFontScaling={true}
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.textInput}
        />
      </View>
      <View style={styles.container}>        
        <Pressable onPress={handleSubmit} style={styles.submit}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable> 
      </View>
      <View style={styles.container}>        
        <Pressable onPress={handleSelectPhoto} style={styles.selectPhotoButton}>
          <Text style={styles.submitText}>Choose Photo</Text>
        </Pressable> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: 300,
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",    
    justifySelf: "center",
    alignSelf: "center",

    ...shadows,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 15 : 0,
    borderRadius: 5,
    backgroundColor: colors.white,
    fontSize: 17,
    
  },
  container: {
    height: 70,
    width: "100%",
    marginBottom: 20,
    alignSelf: "center"
  },
  submit: {
    ...buttonStyles.button,
    width: 300,
    alignSelf: "center",
    height: "100%",
    marginTop: 20,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  selectPhotoButton: {
    ...buttonStyles.button,
    width: 300,
    alignSelf: "center",
    height: "100%",
    marginTop: 20,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  icon: {
    ...buttonStyles.text,
  },
});