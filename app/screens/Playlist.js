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
  findNodeHandle
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import TabBar from '../components/TabBar';
import { BlurView, VibrancyView } from 'react-native-blur';

class PlaylistScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {songs: null}
    this.goBack = this.goBack.bind(this);
    this.renderSongs = this.renderSongs.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
    this.deletePlayList = this.deletePlayList.bind(this);
  }

  static navigationOptions = {
  };

  goBack(){
    this.props.changeTab(null, null, 'pop')
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
    } else if (songs.length < 4 && songs.length > 0){
      let pic = songs[0].image_url;
      return(
        <View style={styles.thumb}>
          <Image
            source={{uri: pic}}
            style={styles.fullThumbPic}
            />
        </View>
      )
    } else {
      return(
        <View style={styles.thumb}>
          <Image
            source={{uri: this.props.playlist.image_url}}
            style={styles.fullThumbPic}
            />
        </View>
      )
    }
  }

  renderSongs(){
    let songs = this.props.playlist.songs.map((song, idx) => {
      return (
        <TouchableOpacity
          key={idx}
          style={styles.songItem}
          onPress={() => this.props._setAudioBar(song)}>
          <Text style={styles.songText}>{song.name}</Text>
          <Text style={styles.songArtist}>{song.artist.name}</Text>
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.songsContainer}>
        {songs}
      </View>
    )
  }

  deletePlayList(){
    fetch(`http://www.beathub.us/api/playlists/${this.props.playlist.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.goBack()
      }).catch(function(error){
        console.log(`Got an error: ${error}`)
      })
  }



  render() {
    let playlist = this.props.playlist
    let songs = playlist.songs.length ? this.renderSongs() : null;
    let thumb = playlist ? this.renderThumb(playlist.songs): null;
    return (
      <ScrollView style={styles.viewContainer}>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => this.goBack()}>
        <Icon
          name="chevron-left"
          size={20}
          style={styles.itemIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemIconX}
        onPress={() => this.deletePlayList()}>
        <Icon
          name="times"
          size={20}
          style={styles.itemIcon}
        />
      </TouchableOpacity>

        <View style={styles.titleContainer}>
          {thumb}
          <Text style={styles.title}>{playlist.name}</Text>
          <Text style={styles.albumByText}>Playlist by {this.props.currentUser.username}</Text>
        </View>

        <Text style={styles.sectionTitle}>Includes</Text>
        {songs}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica",
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    backgroundColor: "transparent",
    zIndex: 20,
  },
  banner: {
    alignSelf: 'stretch',
    height: 185
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
  thumb: {
    alignSelf: 'center',
    height: 200,
    width: 200
  },
  sectionTitle: {
    fontFamily: "Helvetica",
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20
  },
  titleContainer: {
    marginTop: 45,
    marginLeft: 0,
    marginRight: 0
  },
  songsContainer: {
    flexDirection: "column"
  },
  songText: {
    color: 'white',
    fontFamily: "Helvetica",
  },
  albumByText: {
    color: "gray",
    fontFamily: "Helvetica",
    fontSize: 13,
    textAlign: "center"
  },
  songItem: {
    alignSelf: "stretch",
    padding: 10,
    marginLeft: 10
  },
  songText: {
    color: "#b4b4b4",
    fontSize: 18,
    fontFamily: "Helvetica",
    marginTop: 10
  },
  songArtist: {
    fontSize: 14,
    color: "#b4b4b4",
    marginTop: 10
  },
  thumbPic: {
    height: 100,
    width: 100
  },
  thumbRow: {
    width: 200,
    height: 100,
    flexDirection: "row"
  },
  fullThumbPic: {
    width: 200,
    height: 200
  },
  itemIconX:{
    zIndex: 20,
    backgroundColor: "transparent",
    position: "absolute",
    top: 45,
    right: 92
  }
})


export default PlaylistScreen;
