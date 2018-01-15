import React from 'react';
import VisitsList from './VisitsList';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ListScreen from './ListScreen';
import VisitBig from './VisitBig';


export default App = StackNavigator({
  List: {
    screen: ListScreen
  },
  Visit: {
    screen: VisitBig
  },
},
{
  headerMode: 'float'
})