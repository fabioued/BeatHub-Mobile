import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  TabBarIOS,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import TabBar from '../components/TabBar';
import AudioLine from '../components/AudioLine';
import Icon from 'react-native-vector-icons/FontAwesome'


class UserHomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      audioBarOn: false,
      currentUser: this.props.currentUser,
      currentSong: null, queue: [],
      currentSongStatus: {paused: false}
    }
    this._pause = this._pause.bind(this);
  }
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  _setAudioBar(song){
    this.setState({audioBarOn: true, currentSong: song})
  }

  _renderAudioBar(){
    let audioPlayIcon = this.state.currentSongStatus.paused ? "play-circle" : "pause-circle"
    return(
      <View style={styles.audioBar}>

        <AudioLine
          currentSong={this.state.currentSong}
          currentSongStatus={this.state.currentSongStatus}/>

        <View style={styles.audioBarTextContainer}>
          <Text style={styles.audioBarText}>
            {this.state.currentSong.name}
          </Text>
          <Icon
            name="circle"
            style={styles.icon}/>
          <Text style={styles.audioBarTextArtist}>
            {this.state.currentSong.artist.name}
          </Text>
        </View>


      <TouchableOpacity
        style={styles.pauseContainer}
        onPress={() => this._pause()}>
        <Icon
          name={audioPlayIcon}
          style={styles.pauseIcon}/>
      </TouchableOpacity>
      </View>
    )
  }

  _pause(){
    if (this.state.currentSongStatus.paused){
      this.setState({currentSongStatus: {paused: false}})
    } else {
      this.setState({currentSongStatus: {paused: true}})
    }
  }

  render() {
    const { params } = this.props.navigation.state
    let audioBar = this.state.audioBarOn ? this._renderAudioBar() : null

    return (
      <View style={styles.viewContainer}>
      <StatusBar
        barStyle="light-content"/>


        <TabBar
          style={styles.tabBar}
          _setAudioBar={this._setAudioBar.bind(this)}
          navigation={this.props.navigation}
        />

      {audioBar}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  tabBar: {
    position: "absolute",
    marginTop: 400
  },
  audioBar: {
    backgroundColor: "#383838",
    height: 30
  },
  audioBarText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Helvetica"
  },
  audioBarTextArtist: {
    color: 'gray',
    fontFamily: "Helvetica"
  },
  icon: {
    color: 'gray',
    fontSize: 10,
  },
  audioBarTextContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: 200,
    alignSelf: "center"
  },
  pauseIcon: {
    color: "white",
    fontSize: 20,
  },
  pauseContainer: {
    position: "absolute",
    right: 5,
    bottom: 3
  }
})

export default UserHomeScreen;
