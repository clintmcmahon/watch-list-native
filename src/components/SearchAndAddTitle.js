import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View
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
    this.setState({
      query: ''
    });
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
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.title} onPress={() => {
            this.addItem(item)
          }}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>
                {item.title} ({item.year})
              </Text>
              <Text style={styles.serviceText}>
               {item.service}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemContainer:{
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(48, 52, 52, 0.1)"
  },
  textInput: {
    minHeight: 42,
    padding: 10,
    fontSize: 24
  },
  itemText: {
    fontSize: 22,
    paddingTop: 25,
    paddingBottom: 3,
    paddingLeft: 15,
    paddingRight: 15
  },
  serviceText: {
    fontSize: 18,
    paddingLeft: 15,
    paddingBottom: 15,
    color: "#2D3047"
  }
});

export default SearchAndAddTitle;