import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput
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

  renderTextInput = (props) => {
    return <TextInput {...props} style={styles.textInput}></TextInput>
  }

  render() {
    const { query } = this.state;
    const films = this.findFilm(query);

    return (
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          inputContainerStyle={styles.inputContainerStyle}
          data={films}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter a show or movie title"
          renderTextInput={this.renderTextInput}
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
  inputContainerStyle: {
    fontSize: 18
  },
  textInput:{
    minHeight:42,
    padding: 0,
    fontSize: 24
  },
  itemText: {
    fontSize: 26,
    margin: 5
  }
});

export default SearchAndAddTitle;