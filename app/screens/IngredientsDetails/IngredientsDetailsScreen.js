import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { getIngredientName, getAllStepIngredients } from "../../data/MockDataAPI";

import { TaskRealmContext } from "../../models";
const { useRealm } = TaskRealmContext;


export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;

  //Pass the realm to api calls
  const realm = useRealm();


  // LOG item:["si-0","si-1","si-2","si-3","si-4","si-5","si-6","si-7","si-8"]
  const item = route.params?.stepIngredients;
  console.log("item:" + JSON.stringify(item));
  const stepIngredientsArray = getAllStepIngredients(realm, item); 
  //Returns an array that includes metadata about each ingredient in the recipe
  // [stepIngredient, stepIngredient.ingredient.name, stepIngredient.ingredient.photo_url ]
  console.log("stepIngredientsArray:" + JSON.stringify(stepIngredientsArray));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  const onPressIngredient = (item) => {
    let name = getIngredientName(realm, item.ingredientId);
    let ingredient = item.ingredientId;
    navigation.navigate("Ingredient", { ingredient, name });
  };

  const renderIngredient = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressIngredient(item[0])}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item[2] }} />
        <Text style={styles.title}>{item[1]}</Text>
        <Text style={{ color: "grey" }}>{`${item[0].amount} ${item[0].units}` }</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={3} data={stepIngredientsArray} renderItem={renderIngredient} keyExtractor={(item) => `${item[0].stepIngredientId}`} />
    </View>
  );
}
