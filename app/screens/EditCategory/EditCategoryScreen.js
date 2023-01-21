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
  const { navigation, userId } = props;
  const { categoryId, title } = props.route.params;
  
  const realm = useRealm();  
  //get the category from the realm
  const category = realm.objects("Category").filtered("categoryId = $0", categoryId)[0];  
  //const resultCat = cateo// getCategories(realm); //Use for autocomplete? 
  //Why use useMemo here?  Because the result of useQuery is a live collection, and we want to memoize it so that it doesn't re-render every time the collection changes.
  //But maybe this collection won't change, so we don't need to memoize it?
  //Or maybe it's already hooked to rerender on change, so memoizing causes a conflict
  //const categoriesFromRealm = useMemo(() => resultCat.sorted("createdAt"), [resultCat]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
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
    (name, photoUrl, categoryId="") => {
      if (!name) {
        return;
      }      
      //const categoryId = slugify(name, { lower: true });      
      realm.write(() => {
        //check for a category with the same id and update it
        const existingCategory = realm.objects("Category").filtered("categoryId = $0", categoryId)[0];
        if (existingCategory) {
          //return new Category(realm, name, photoUrl, categoryId, userId);
          //modify the existing category in realm
          existingCategory.name = name;
          existingCategory.photoUrl = photoUrl;
          existingCategory.categoryId = categoryId;          
          console.log("updated category: " + existingCategory.categoryId);
        } else {
          console.error("cannot update category, not found");
        }
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

  console.log("category: " + category);
  return (
    <View>      
      <AddCategoryForm onSubmit={handleUpdateCategory} category={category}/>
    </View>
  );
}
