import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  TabBarIOS,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

class SongScreen extends React.Component {
  constructor(props){
    super(props)

    }


  render(){
    let song = this.props.song;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.props._renderSongScreen()}>
          <Icon
            name="times"
            size={20}
            style={styles.itemIcon}
          />

        </TouchableOpacity>
        <Image
          style={styles.albumArt}
          source={{uri: this.props.song.image_url}}
          />
        <Text style={styles.songName}>{song.name}</Text>
        <Text style={styles.artistName}>{song.artist.name}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  albumArt: {
    width: 300,
    height: 300
  },
  songName: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: "Helvetica",
    fontSize: 18
  },
  artistName: {
    color: 'white',
    fontFamily: "Helvetica",
    fontSize: 14
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
})

export default SongScreen;
