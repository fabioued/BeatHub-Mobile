import React from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'

class BrowseScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {genres: null}
    this._renderGenres = this._renderGenres.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
  }

  static navigationOptions = {
    header: null
  };


  componentWillMount(){
    fetch(`http://www.beathub.us/api/genres`, {
      method: "GET"
    })
    .then((response) =>
      response.json())
    .then((responseJSON) => {
      console.log(responseJSON)
      this.setState({genres: responseJSON})
    }).catch(function(error){
      console.log(`Got an error: ${error}`)
    })
  }

  _renderGenres(){
    let genres = Object.keys(this.state.genres.genres).map((genre, idx) => {
      let currentGenres = this.state.genres;
      let thumb = currentGenres.genres[genre][0].image_url;
      let genreFormatted = currentGenres.genres[genre][0].genre;
      let collection = {criteria: genreFormatted, items: currentGenres.genres[genre]}
      return (
        <TouchableOpacity
          key={idx}
          style={styles.genreItem}
          onPress={() => this.props.changeTab('collection', collection, 'push')}>
          <Image
            source={{uri: thumb}}
            style={styles.genreThumb}/>
          <Text style={styles.genreText}>{genreFormatted}</Text>
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.genresContainer}>
        {genres}
      </View>
    )
  }

  _renderLoading(){
    return (
      <ActivityIndicator
        animating={this.state.animating}
        style={{height: 80}}
        size="large"
        />
    )
  }

  render() {
    let genres = this.state.genres ? this._renderGenres() : this._renderLoading()

    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Browse</Text>
        </View>

        <Text style={styles.sectionTitle}>Genres</Text>
        {genres}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: "Helvetica",
    color: "white",
    alignSelf: "center"
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50
  },
  genreItem: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  genreThumb: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  genreText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Helvetica",
    fontWeight: "bold"
  },
  genresContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    flexWrap: "wrap"
  },
  header: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0
  }
})


export default BrowseScreen;
