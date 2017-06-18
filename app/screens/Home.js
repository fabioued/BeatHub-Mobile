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

class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {featuredAlbums: null}
    this.renderFeaturedAlbums = this.renderFeaturedAlbums.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
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
          style={styles.albumItem}
          onPress={() => this.props.changeTab('album', album, 'push')}>
          <Image
            style={styles.albumImage}
            source={{uri: album.image_url}}
            />
          <Text
            style={styles.albumName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {album.name}
          </Text>
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.albumsContainer}>
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
    console.log(this.state.featuredAlbums)
    let featuredAlbums = this.state.featuredAlbums ? this.renderFeaturedAlbums() : this._renderLoading();

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
    marginTop: 50
  },
  albumItem: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    maxWidth: 150
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
    top: 20,
    left: 0,
    right: 0
  }
})


export default HomeScreen;
