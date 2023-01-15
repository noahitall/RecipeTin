import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import IngredientsList from "../../components/IngredientsList/IngredientsList";

import StepsList from "../../components/StepsList/StepsList";

import { getRecipe } from "../../data/MockDataAPI";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  const recipe = getRecipe(item);  
  const categoryName = (recipe.category?.name||"").toUpperCase(); 

  const [activeSlide, setActiveSlide] = useState(0);

  const slider1Ref = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  // const onPressIngredient = (item) => {
  //   var name = getIngredientName(item);
  //   let ingredient = item;
  //   navigation.navigate("Ingredient", { ingredient, name });
  // };
  
  const onPressCategory = (item) => {
    const title = item.name;
    const category = item.categoryId;    
    navigation.navigate("RecipesList", { category, title });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
            ref={slider1Ref}
            data={recipe.photosArray}
            renderItem={renderImage}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={false}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={10000}
            onSnapToItem={(index) => setActiveSlide(0)}
          />
          <Pagination
            dotsLength={recipe.photosArray.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="rgba(255, 255, 255, 0.92)"
            dotStyle={styles.paginationDot}
            inactiveDotColor="white"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref.current}
            tappableDots={!!slider1Ref.current}
          />
        </View>
      </View>
      <View style={styles.infoRecipeContainer}>
        <View style={styles.topInfoContainer}>
          <View style={styles.infoContainer}>  
            <TouchableHighlight
              onPress={() => onPressCategory(item)}
            >
              <Text style={styles.category}>
                {categoryName}
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.timeContainer}>
            <Image
              style={styles.infoPhoto}
              source={require("../../../assets/icons/time.png")}
            />
            <View style={styles.timeSubContainer}>
              <Text style={styles.timeTotal}>{recipe.total_length_in_minutes} minutes total</Text>
              <Text style={styles.timeActive}>{recipe.active_length_in_minutes} minutes active</Text>
            </View>
          </View>
        </View>
        <Text style={styles.infoRecipeName}>{recipe.title}</Text>
        

        <View style={styles.infoContainer}>
          
        </View>

        

        <View style={styles.infoContainer}> 
          <IngredientsList            
            ingredients={recipe.ingredients}
            stepIngredients={recipe.stepIngredients}
            onPress={() => {
              //TODO may need to map step ingredients to a format of [["i-butter", '200ml']]
              
              let title = "Ingredients for " + recipe.title;
              let ingredients = recipe.ingredients;
              let stepIngredients = recipe.stepIngredients;
              navigation.navigate("IngredientsDetails", { ingredients, stepIngredients, title });
            }}
          />
        </View>        
        <View style={styles.infoContainer}>
          <StepsList
            steps={recipe.steps}
            />            
        </View>
      </View>
    </ScrollView>
  );
}
