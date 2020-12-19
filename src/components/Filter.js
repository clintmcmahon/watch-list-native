import React from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    FlatList,
    View,
    Button,
    StatusBar,
    Image,
    Linking,
    TouchableOpacity
  } from 'react-native';

function Filter(props) {
    let myShows = props.myShows.map(item => item.service)
    .filter((value, index, self) => self.indexOf(value) === index);

    return (
        <View>
           
      </View>
 );
}

export default Filter;