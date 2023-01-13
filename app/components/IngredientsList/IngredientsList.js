import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';

import styles from './styles';
import { getStepIngredientName } from '../../data/MockDataAPI';

export default function IngredientsList (props) {
    return (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={props.onPress}>
        <View style={styles.container}>
          {props.stepIngredients.map((stepIngredient, index) => {
            return (
              <View key={index}>
                <Text style={styles.text}>{getStepIngredientName(stepIngredient)}</Text>
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
