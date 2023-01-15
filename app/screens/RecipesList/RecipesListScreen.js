import React, { useMemo, useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { getRecipes, getCategoryName } from "../../data/MockDataAPI";

import { recipes } from "../../data/dataArrays";

import { TaskRealmContext } from "../../models";
const { useRealm, useQuery } = TaskRealmContext;

//import models
import { Recipe } from "../../models/Recipe";
import { useUser } from "@realm/react";


export default function RecipesListScreen(props) {
  const { navigation, route } = props;

  const realm = useRealm(); //for writes
  const user = useUser();

  
  const categoryId = route?.params?.category;
  let recipesArray = getRecipes(categoryId);//.sorted("title")
  
  const recipiesFromRealm = useMemo(() => recipesArray, [recipesArray]);
  console.log(recipiesFromRealm);
  // console.log("recipiesFromRealm");
  // console.log(JSON.stringify(recipiesFromRealm));
  // console.log("recipesFromStub");
  // console.log(recipes);

  // if (recipesArray.length == 0) {
  //   realm.write(() => {
  //     recipes.forEach((recipe) => {
  //       console.log("adding recipe" + recipe.title);
  //       new Recipe(realm, user?.id, user?.id, 
  //         recipe.recipeId, recipe.categoryId, recipe.title, recipe.photo_url, 
  //         recipe.photosArray, recipe.time, recipe.total_length_in_minutes, recipe.active_length_in_minutes, recipe.materials, 
  //         recipe.stepIngredients, recipe.steps, recipe.description
  //         );
  //     });
      
  //     return null;
  //   });
  //   recipesArray = recipes    
  // }

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
