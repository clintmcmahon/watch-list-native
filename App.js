import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import SearchAndAddTitle from './src/components/SearchAndAddTitle';
import {featchAndSaveAllTitlesDummy} from "./src/api/Helpers"

export default function App() {

  featchAndSaveAllTitlesDummy();
  return (
    <SafeAreaView style={styles.container}>
      
      <SearchAndAddTitle />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
