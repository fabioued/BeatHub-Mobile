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

class AlbumScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {songs: null}
    this.fetchAlbumSongs = this.fetchAlbumSongs.bind(this);
    this.renderSongs = this.renderSongs.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  static navigationOptions = {
  };

  componentWillMount(){
    this.fetchAlbumSongs()
  }

  fetchAlbumSongs(){
    fetch(`http://www.beathub.us/api/albums/${this.props.album.id}/songs`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({songs: responseJSON})
      }).catch(function(error){
        console.log(`Got an error: ${error}`)
      })
  }

  goBack(){
    this.props.changeSearchTab(null, null, 'pop')
  }

  renderSongs(album){
    let songs = this.state.songs.map((song, idx) => {
      return (
        <TouchableOpacity
          key={idx}
          style={styles.songItem}
          onPress={() => this.props._setAudioBar(song)}>
          <Text style={styles.songText}>{song.name}</Text>
          <Text style={styles.songArtist}>{album.artist_name}</Text>
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.songsContainer}>
      {songs}
      </View>
    )
  }

  render() {
    let album = this.props.album
    let songs = this.state.songs ? this.renderSongs(album) : null;

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

        <View style={styles.titleContainer}>
          <Image
            style={styles.thumb}
            source={{uri: album.image_url}}
            />
          <Text style={styles.title}>{album.name}</Text>
          <Text style={styles.albumByText}>Album by {album.artist_name}</Text>
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
    top: 125,
    fontSize: 20,
    fontFamily: "Helvetica",
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    position: "absolute",
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
  }
})


export default AlbumScreen;
