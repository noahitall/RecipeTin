import React, { useMemo, useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { getRecipes, getCategoryName } from "../../data/MockDataAPI";

import { recipes } from "../../data/dataArrays";

import { TaskRealmContext } from "../../models";
const { useRealm } = TaskRealmContext;

//import models
import { useUser } from "@realm/react";


export default function RecipesListScreen(props) {
  const { navigation, route } = props;

  const realm = useRealm(); //for writes
  const user = useUser();

  
  const categoryId = route?.params?.category;
  let recipesArray = getRecipes(categoryId);//.sorted("title")
  
  const recipiesFromRealm = useMemo(() => recipesArray, [recipesArray]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (recipeId) => {    
    navigation.navigate("Recipe", { recipeId });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item.recipeId)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipesArray} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
    </View>
  );
}
