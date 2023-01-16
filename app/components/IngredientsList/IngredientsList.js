import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';

import styles from './styles';

export default function IngredientsList (props) {
  return (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={props.onPress}>
      <View style={styles.container}>
        {props.stepIngredients.map((stepIngredient, index) => {
          return (
            <View key={stepIngredient._id}>
              <Text style={styles.text}>{stepIngredient.nameWithQuantity()}</Text>
            </View>
          );
        } )}
        
      </View>
    </TouchableHighlight>
  );
}

// IngredientsList.propTypes = {
//   onPress: PropTypes.func,
//   source: PropTypes.number,
//   title: PropTypes.string
// };
