import React, { useMemo, useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { getCategories } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";

import { TaskRealmContext } from "../../models";
const { useRealm } = TaskRealmContext;


export default function CategoriesScreen(props) {
  const { navigation, userId } = props;
  
  const realm = useRealm();  

  const resultCat = getCategories(realm);
  //Why use useMemo here?  Because the result of useQuery is a live collection, and we want to memoize it so that it doesn't re-render every time the collection changes.
  //But maybe this collection won't change, so we don't need to memoize it?
  //Or maybe it's already hooked to rerender on change, so memoizing causes a conflict
  //const categoriesFromRealm = useMemo(() => resultCat.sorted("createdAt"), [resultCat]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
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

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item.categoryId;    
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photoUrl }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{item.recipes.length} recipes</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList data={resultCat} renderItem={renderCategory} keyExtractor={(item) => `${item._id}`} />
    </View>
  );
}
