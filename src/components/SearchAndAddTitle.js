import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import { getAvailableTitles } from "../api/Helpers";

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
    const films = this.findFilm(query);

    return (
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={films}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter Star Wars film title"
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.addItem(item)}>
              <Text style={styles.itemText}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
    );
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    fontSize: 15,
    margin: 2
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