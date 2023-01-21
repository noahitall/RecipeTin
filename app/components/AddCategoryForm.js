import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Platform, StyleSheet } from "react-native";

import { buttonStyles } from "../styles/button";
import colors from "../styles/colors";
import { shadows } from "../styles/shadows";

export const AddCategoryForm = ({ onSubmit, category }) => {
  const [name, setName] = useState(category?.name || "");
  const [photoUrl, setPhotoUrl] = useState(category?.photoUrl || "");
  
  const handleSubmit = () => {
    onSubmit(name, photoUrl, category?.categoryId);
    setName("");
    setPhotoUrl("");
  };

  
  return (
    <View style={styles.form}>
      <View style={{ flexDirection: "column", marginBottom: 40 }}> 
        <Text style={{fontSize:20}}>Name</Text>        
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
      <View style={{ flexDirection: "column", marginBottom: 40  }}> 
        <Text style={{fontSize:20}}>Photo Url</Text>      
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
      <Pressable onPress={handleSubmit} style={styles.submit}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    height: 50,
    marginBottom: 20,
    flexDirection: "column",
    ...shadows,
  },
  textInput: {
    //height: 20,    
    width: 300,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 15 : 0,
    lineHeight: 20,
    //flex: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
    fontSize: 17,
    margin: 10
  },
  submit: {
    ...buttonStyles.button,
    width: 300,
    alignSelf: "center",
    height: "100%",
    marginTop: 20,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 300,
  },
  submitText: {
    ...buttonStyles.text,
    
  },
});
