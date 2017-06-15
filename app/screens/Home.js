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
  ScrollView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'

class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {featuredAlbums: null}
    this.renderFeaturedAlbums = this.renderFeaturedAlbums.bind(this);
  }

  static navigationOptions = {
    header: null
  };


  componentWillMount(){
    fetch(`http://www.beathub.us/api/albums`, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({featuredAlbums: responseJSON})
    }).catch(function(error){
      console.log(`Got an error: ${error}`)
    })
  }

  renderFeaturedAlbums(){

    let albums = this.state.featuredAlbums.map((album, idx) => {
      return (
        <TouchableOpacity
          key={idx}
          style={styles.albumItem}>
          <Image
            style={styles.albumImage}
            source={{uri: album.image_url}}
            />
          <Text style={styles.albumName}>{album.name}</Text>
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.albumsContainer}>
        {albums}
      </View>
    )
  }

  render() {
    console.log(this.state.featuredAlbums)
    let featuredAlbums = this.state.featuredAlbums ? this.renderFeaturedAlbums() : null;

    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>HOME</Text>
        </View>

        <Text style={styles.sectionTitle}>Featured Albums</Text>
        {featuredAlbums}

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
    marginTop: 40
  },
  albumItem: {
    padding: 10
  },
  albumImage: {
    width: 150,
    height: 150
  },
  albumName: {
    color: "white",
    textAlign: "center",
    fontFamily: "Helvetica"
  },
  albumsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    flexWrap: "wrap"
  },
  header: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0
  }
})


export default HomeScreen;
