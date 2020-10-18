import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import { addMyItem, getAvailableTitles } from "../api/Helpers";

class SearchAndAddTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      query: ''
    };
  }

  async componentDidMount() {
    let films = await getAvailableTitles();
    this.setState({ films: films });

  }

  addItem(item) {
    this.props.addItem(item);
  }

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.title.search(regex) >= 0);
  }

  render() {
    const { query } = this.state;
    const data = this.findFilm(query);

    return (
      <SafeAreaView style={styles.container}>
        <Autocomplete
          inputContainerStyle={styles.inputContainerStyle}
          listContainerStyle={styles.listContainerStyle}
          placeholder="Enter a show or movie title"
          data={data}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          keyExtractor={item => item.id.toString() }
          renderItem={({ item, i }) => (
            <TouchableOpacity key={item.title} onPress={() => this.addItem(item)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingTop: 25,
    width: "100%",
    zIndex: 1000
  },
  inputContainerStyle: {
    padding: 10,
    borderColor: "#000000"
  },
  listContainerStyle: {
    padding: 10,
    flex: 1
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});

export default SearchAndAddTitle;