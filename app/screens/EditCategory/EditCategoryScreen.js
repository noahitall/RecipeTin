import React, { useMemo, useLayoutEffect, useCallback } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, Button } from "react-native";
import styles from "./styles";
import { getCategories } from "../../data/MockDataAPI";
import { AddCategoryForm } from "../../components/AddCategoryForm";
import { AddTaskForm } from "../../components/AddTaskForm";
import { Category } from "../../models";
import slugify from "slugify";


import { TaskRealmContext } from "../../models";
const { useRealm } = TaskRealmContext;


export default function EditCategoryScreen(props) {
  const { navigation, userId, categories } = props;
  
  const realm = useRealm();  

  const resultCat = categories// getCategories(realm); //Use for autocomplete? 
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
        <Button
          title="Cancel"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

 


  const handleUpdateCategory = useCallback(
    (name) => {
      if (!name) {
        return;
      }
      let photoUrl = "";
      console.log("received name: " + name);
      console.log("received photoUrl: " + photoUrl||"");
      const categoryId = slugify(name, { lower: true });
      
      realm.write(() => {        
        return new Category(realm, name, photoUrl, categoryId, userId);
      });
      navigation.goBack();
    },
    [realm, userId],
  );

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
      <Text>Add Category</Text>
      <AddCategoryForm onSubmit={handleUpdateCategory} />
    </View>
  );
}
