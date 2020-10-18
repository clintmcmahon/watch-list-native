
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, View,Button } from 'react-native';
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
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}> You don't have anything to watch!</Text>
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
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchAndAddTitle addItem={addItem} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.header} >What to watch</Text>
        <Button
                onPress={removeAll}
                title="Delete"
                accessibilityLabel="Learn more about this purple button"
              />
      </View>
      <View style={styles.showContainer}>
        <FlatList
          style={styles.list}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingLeft: 20
  },
  header: {
    fontSize: 42,
    fontWeight: "600"
  },
  searchContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  showContainer: {
    flex: 1,
    padding: 20
  },
  list: {
    backgroundColor: "#ffffff",
    flex: 1
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  itemText: {
    fontSize: 20
  }
});