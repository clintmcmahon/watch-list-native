
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, View, Button } from 'react-native';
import { featchAndSaveAllTitlesDummy, getMyItems, deleteAll, removeMyItem, addMyItem } from "./src/api/Helpers"
import SearchAndAddTitle from "./src/components/SearchAndAddTitle";

export default function App() {
  const [myShows, setMyShows] = useState(null);

  useEffect(() => {
    featchAndSaveAllTitlesDummy();
    getMyItems().then(data => setMyShows(data));
  }, []);

  const listEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}> You don't have anything to watch!</Text>
      </View>
    )
  }

  const addItem = async (item) => {
    let myItems = await addMyItem(item);
    setMyShows(myItems)
  }

  const removeItem = async (itemId) => {
    let myItems = await removeMyItem(itemId);
    setMyShows(myItems);
  }

  const removeAll = () => {
    deleteAll();
  }
  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.innerContainer}>
        <SearchAndAddTitle addItem={addItem} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.header} >What to watch</Text>
        </View>
        <View style={styles.whatToWatchContainer}>
          <FlatList
            style={styles.whatToWatchList}
            data={myShows}
            renderItem={({ item, index, separators }) => (
              <View
                key={index.toString()}
                style={styles.itemContainer}
              >
                <Text style={styles.itemText}>{item.title}</Text>
                <Button
                  onPress={() => removeItem(item.id)}
                  title="Delete"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            )}
            ListEmptyComponent={listEmptyView}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  innerContainer:{
   marginTop: 20,
   flex:1
  },
  header: {
    fontSize: 38,
    fontWeight: "600"
  },
  whatToWatchContainer:{
    flex: 1
  },
  emptyContainer:{
    marginTop: 10
  },
  emptyText:{
    fontSize: 18
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#ffffff',
    marginTop: 20
  },
});