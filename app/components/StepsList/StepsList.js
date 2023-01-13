import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import styles from './styles';

//import stepListitem
import StepsListItem from '../StepsListItem/StepsListItem';

export default function StepsList (props) {
    return (      
      <View style={styles.container}>
        {props.steps.map((step, index) => {
          return (
            <View  style={styles.container} key={index}>              
              <StepsListItem step={step} index={index} />
            </View>
          );
        } )}        
      </View>
      
    );
}

StepsList.propTypes = {
  
};
