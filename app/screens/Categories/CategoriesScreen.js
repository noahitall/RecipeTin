import React, { useMemo, useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";



//import realm context
import { TaskRealmContext } from "../../models";
const { useRealm, useQuery } = TaskRealmContext;

//import models
import { Category } from "../../models/Category";
import { useUser } from "@realm/react";


export default function CategoriesScreen(props) {
  const { navigation, userId } = props;

  const realm = useRealm(); //for writes
  const user = useUser();

  
  const resultCat = useQuery(Category);
  const categoriesFromRealm = useMemo(() => resultCat.sorted("createdAt"), [resultCat]);

  console.log("categoriesFromRealm");
  console.log(JSON.stringify(categoriesFromRealm));
  console.log("categories");
  console.log(categories);

  if (categoriesFromRealm.length == 0) {
    realm.write(() => {
      categories.forEach((category) => {
        console.log("adding category" + category.name);
        new Category(realm, category.name, category.photo_url, user?.id);
      });
      
      return null;
    });
  }

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
    const category = item;
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photoUrl }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item._id)} recipes</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList data={categoriesFromRealm} renderItem={renderCategory} keyExtractor={(item) => `${item._id}`} />
    </View>
  );
}
