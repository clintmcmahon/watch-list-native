
import React, { useState, useEffect } from 'react';
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
      <StatusBar barStyle="dark-content" />
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
         
        </View>
        <SearchAndAddTitle addItem={addItem} />
        <View style={styles.poweredBy}>
          <Text>Powered by </Text>
          <TouchableOpacity onPress={() => Linking.openURL("https://reelgood.com")}>
            <Image
              style={styles.reelgood}
              source={require('./assets/rg_small.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.whatToWatchContainer}>
          <FlatList
            style={styles.whatToWatchList}
            ListHeaderComponent={
              <View style={styles.descriptionContainer}>
                <Text style={styles.header} >What to watch</Text>
              
              </View>
            }
            data={myShows}
            renderItem={({ item, index, separators }) => (
              <View
                key={index}
                style={styles.itemContainer}
              >
                <View>
                  <Text style={styles.itemText}>{item.title}</Text>
                  <Text style={styles.itemSubText}>{item.service}</Text>
                </View>
                <View>
                  <Button
                    onPress={() => removeItem(item.id)}
                    title="Remove"
                    accessibilityLabel="Learn more about this purple button"
                  />
                </View>
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
    flex: 1
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 5
  },
  logoContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20
  },
  logo: {
    width: 200,
    height: 51,
  },
  poweredBy: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10
  },
  header: {
    fontSize: 38,
    fontWeight: "600"
  },
  whatToWatchContainer: {
    flex: 1
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  emptyContainer: {
    marginTop: 10
  },
  itemText: {
    fontSize: 20
  },
  itemSubText: {
    fontSize: 18,
    color: "#616360"
  },
  emptyText: {
    fontSize: 20
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#ffffff',
    marginTop: 20
  },
});