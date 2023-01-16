import React, { useLayoutEffect, useMemo } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";

import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import { getAllRecipes, loadStaticData} from "../../data/MockDataAPI";
import { TaskRealmContext } from "../../models";
import { LogData } from "react-native/Libraries/LogBox/LogBox";

const { useRealm } = TaskRealmContext;
import { useUser } from "@realm/react";

export default function HomeScreen(props) {
  const { navigation } = props;

  // We've gotta load the data if it's not already in the realm. 
  

  // Get the recipes  from the realm
  const realm = useRealm(); //for writes
  const user = useUser();
  //This data updates live when the realm data updates
  let recipesArray = getAllRecipes(realm);//.sorted("title")
  
  if (recipesArray.length == 0) {
    console.log("No recipes found, loading... ");
    loadStaticData(realm, user);    
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category?.name}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipesArray} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
    </View>
  );
}
