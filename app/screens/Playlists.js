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

class PlaylistsScreen extends React.Component {
  constructor(props){
    super()
    this.state = {playlists: null}
    this.goBack = this.goBack.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  componentWillMount(){
    fetch(`http://www.beathub.us/api/users/${this.props.currentUser.id}/playlists`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({playlists: responseJSON})
      }).catch(function(error){
        console.log(`Got an error: ${error}`)
      })
  }

  goBack(){
    this.props.changeTab(null, null, 'pop')
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

  renderPlaylists(){
    let playlists = this.state.playlists.map((playlist, idx) => {
      let thumb = this.renderThumb(playlist.songs)
      return (
        <TouchableOpacity
          style={styles.playlistItem}
          key={idx}
          onPress={() => this.props.changeTab('playlist', playlist, 'push')}>
          {thumb}
          <Text style={styles.playlistName}>{playlist.name}</Text>
          <Text style={styles.playlistLength}>{playlist.songs.length} songs</Text>
          <Icon
            name="chevron-right"
            size={20}
            style={styles.arrow}
          />
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.playlistsContainer}>
        {playlists}
      </View>
    )
  }


  renderThumb(songs){
    if (songs.length >= 4){
      let pic1 = songs[0].image_url;
      let pic2 = songs[1].image_url;
      let pic3 = songs[2].image_url;
      let pic4 = songs[3].image_url;

      return (
        <View style={styles.thumb}>
          <View style={styles.thumbRow}>
            <Image
              source={{uri: pic1}}
              style={styles.thumbPic}
              />
            <Image
              source={{uri: pic2}}
              style={styles.thumbPic}
              />
          </View>

          <View style={styles.thumbRow}>
            <Image
              source={{uri: pic3}}
              style={styles.thumbPic}
              />
            <Image
              source={{uri: pic4}}
              style={styles.thumbPic}
              />
          </View>
        </View>
      )
    } else {
      let pic = songs[0].image_url;
      return(
        <View style={styles.thumb}>
          <Image
            source={{uri: pic}}
            style={styles.fullThumbPic}
            />
        </View>
      )
    }
  }


  render() {
    let playlists = this.state.playlists ? this.renderPlaylists() : this._renderLoading();
    return (
      <ScrollView>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.goBack()}>
          <Icon
            name="chevron-left"
            size={20}
            style={styles.itemIcon}
          />
        </TouchableOpacity>

      <Text style={styles.title}>Playlists</Text>
        {playlists}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: "Helvetica",
    color: "white",
    alignSelf: "center",
    marginTop: 25
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50
  },
  header: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0
  },
  itemImage: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  itemIcon: {
    color: "white",
    zIndex: 10,
    backgroundColor: "transparent"
  },
  backButton :{
    position: 'absolute',
    top: 25,
    left: 10,
    zIndex: 9
  },
  playlistItem: {
    flexDirection: "row",
    alignSelf: "stretch",
    flexDirection: "column",
    height: 30,
    marginTop: 30,
    marginLeft: 20
  },
  playlistName: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Helvetica",
    fontSize: 15,
    marginLeft: 70
  },
  playlistLength: {
    color: "gray",
    fontFamily: "Helvetica",
    fontSize: 13,
    marginLeft: 70
  },
  playlistsContainer: {
    marginTop: 20
  },
  arrow: {
    position: "absolute",
    color: "#585757",
    backgroundColor: "transparent",
    right: 10
  },
  thumbPic: {
    height: 25,
    width: 25
  },
  thumbRow: {
    width: 50,
    height: 25,
    flexDirection: "row"
  },
  thumb: {
    position: "absolute",
    left: 10,
    width: 50,
    height: 50
  },
  fullThumbPic: {
    width: 50,
    height: 50
  }
})


export default PlaylistsScreen;
