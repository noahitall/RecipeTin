import React from 'react';
import {  Text, View } from 'react-native';
import styles from './styles';
import { getStepById } from '../../data/MockDataAPI';


export default function StepsListItem (props) {
    const step = getStepById(props.step);
    return (      
      <View style={styles.container}>
        <View style={styles.stepHeader}>
          <Text style={styles.headerText}>Step {props.index+1}</Text>
        </View> 
        <View style={styles.stepContent}>            
          <Text style={styles.contentText}>{step.description}</Text>          
        </View> 
      </View>
      
    );
}

// StepsListItem.propTypes = {
//   index: PropTypes.number,
  
// };
