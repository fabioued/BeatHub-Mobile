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
  StatusBar,
  ListView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import ArtistScreen from './ArtistScreen'

class SearchScreen extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      searchInput: "",
      searchResults: {artists: [], albums: [], songs: []},
      animating: false
    }

    this._handleInput = this._handleInput.bind(this)
  }

  static navigationOptions = {
    header: null
  };


  _handleInput(text){

    window.context = this;
    this.setState({searchInput: text, animating: true}, () => fetch(`http://www.beathub.us/api/search?query=${this.state.searchInput}`, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({searchResults: responseJSON, animating: false})
    }).catch(function(error){
      console.log(`Got an error: ${error}`)
    }))

  }

  _renderArtists(){
    const { navigate } = this.props.navigation;

    let artists = this.state.searchResults.artists.map((artist, idx) => {
      return(
        <TouchableOpacity
          key={idx}
          style={styles.artistItem}
          onPress={() => this.props.changeSearchTab('artist', artist, 'push')}>
          <View style={styles.artistInfo}>
            <Image
              style={styles.artistImage}
              source={{uri: artist.image_url}}
              />
            <Text style={styles.artistText}>{artist.name}</Text>
          </View>

          <Icon
            name="chevron-right"
            size={10}
            style={styles.itemIcon}
          />
      </TouchableOpacity>
      )
    })

      return(
          <View style={styles.artistContainer}>
            <Text style={styles.resultTitle}>Artists</Text>
            {artists}
          </View>
      )
  }

  _renderAlbums(){
    let albums = this.state.searchResults.albums.map((album, idx) => {

      return(
        <TouchableOpacity key={idx} style={styles.artistItem}>
          <View style={styles.artistInfo}>
            <Image
              style={styles.artistImage}
              source={{uri: album.image_url}}
              />
            <Text style={styles.artistText}>{album.name}</Text>
          </View>

          <Icon
            name="chevron-right"
            size={10}
            style={styles.itemIcon}
          />
      </TouchableOpacity>
      )
    })

    return(
        <View style={styles.artistContainer}>
          <Text style={styles.resultTitle}>Albums</Text>
          {albums}
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
    let artists = this.state.searchResults.artists;
    let albums = this.state.searchResults.albums;
    artistsView = artists.length ? this._renderArtists() : null
    albumsView = albums.length ? this._renderAlbums() : null
    let spinner = this._renderLoading()

    console.log(artistsView)

    return (
      <View style={styles.container}>

        <Icon
          name="search"
          style={styles.icon}/>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this._handleInput(text)}
          placeholder="Search"
          placeholderTextColor="grey"
          value={this.state.searchInput}
          selectionColor="#1ac0ff"/>

        <ScrollView style={styles.resultsContainer}>
          {artistsView}
          {albumsView}
          {spinner}
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 5,
    top: 24,
    height: 25,
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    left: 5,
    right: 5,
    textAlign: "center",
    position: "absolute"
  },
  icon: {
    fontSize: 20,
    top: 25,
    position: "absolute",
    left: 16,
    color: "grey",
    zIndex: 3,
    backgroundColor: "white"
  },
  resultTitle: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Helvetica",
    fontSize: 17,
    textAlign: "center"
  },
  resultContainer: {
    flexDirection: "column"
  },
  artistImage: {
    borderRadius: 25,
    height: 50,
    width: 50
  },
  artistItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 370,
    marginTop: 10
  },
  itemIcon: {
    color: "white",
    marginRight: 25
  },
  artistInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20
  },
  artistText: {
    color: "white",
    fontFamily: "Helvetica",
    marginLeft: 20
  },
  artistContainer: {
    marginTop: 30
  },
  resultsContainer: {
    marginTop: 50
  }
})


export default SearchScreen;
