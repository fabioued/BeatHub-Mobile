import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  TabBarIOS,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import TabBar from '../components/TabBar';
import AudioLine from '../components/AudioLine';
import Icon from 'react-native-vector-icons/FontAwesome';
import SongScreen from './SongScreen';


class UserHomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      audioBarOn: false,
      currentUser: this.props.navigation.state.params.currentUser,
      currentSong: null, queue: [], playedStack: [],
      currentSongStatus: {paused: false, displaySongInfo: false},
      songScreenShow: false,
      fetchingSongs: false
    }
    this._pause = this._pause.bind(this);
    this._renderSongScreen = this._renderSongScreen.bind(this);
    this._playRadio = this._playRadio.bind(this);
    this._playNextSong = this._playNextSong.bind(this);
    this._playPreviousSong = this._playPreviousSong.bind(this);
    this._setAudioBar = this._setAudioBar.bind(this);
  }
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  _setAudioBar(song){
    this.setState({audioBarOn: true, currentSong: song})
  }

  _renderAudioBar(){
    let audioPlayIcon = this.state.currentSongStatus.paused ? "play-circle" : "pause-circle";
    let btnOpacity = this.state.currentSongStatus.displaySongInfo ? 0 : 1
    return(
      <View style={styles.audioBar}>

        <AudioLine
          currentSong={this.state.currentSong}
          currentSongStatus={this.state.currentSongStatus}
          _pause={this._pause}
          _playNextSong={this._playNextSong}
          _playPreviousSong={this._playPreviousSong}
          />

        <TouchableOpacity
          style={styles.audioBarTextContainer}
          onPress={() => this._renderSongScreen()}>
          <Text style={styles.audioBarText} ellipsizeMode="tail">
            {this.state.currentSong.name}{`      `}
          </Text>
          <Icon
            name="circle"
            style={styles.icon}/>
          <Text style={styles.audioBarTextArtist} ellipsizeMode="tail">
            {`   `}{this.state.currentSong.artist.name}
          </Text>
        </TouchableOpacity>


      <TouchableOpacity
        style={styles.pauseContainer}
        onPress={() => this._pause()}>
        <Icon
          name={audioPlayIcon}
          style={{opacity: btnOpacity, color: "white", fontSize: 20}}/>
      </TouchableOpacity>
      </View>
    )
  }

  _pause(){
    if (this.state.currentSongStatus.paused){
      this.setState({currentSongStatus: {paused: false, displaySongInfo: this.state.currentSongStatus.displaySongInfo}})
    } else {
      this.setState({currentSongStatus: {paused: true, displaySongInfo: this.state.currentSongStatus.displaySongInfo}})
    }
  }

  _renderSongScreen(){
    var CustomAnimation = {
      duration: 400,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7
      }
    }

    LayoutAnimation.configureNext(CustomAnimation)
    if (this.state.songScreenShow){
      let currentSongStatus = Object.assign({}, this.state.currentSongStatus, { displaySongInfo: false } )
      this.setState({songScreenShow: false, currentSongStatus: currentSongStatus})
    } else {
      let currentSongStatus = Object.assign({}, this.state.currentSongStatus, { displaySongInfo: true } )
      this.setState({songScreenShow: true, currentSongStatus: currentSongStatus})
    }
  }

  _playRadio(){
    this.setState({fetchingSongs: true}, () =>
      fetch(`http://www.beathub.us/api/radio`, {
        method: "GET"
      })
      .then((response) =>
        response.json())
      .then((responseJSON) => {
        console.log(responseJSON)
        this.setState({queue: responseJSON, fetchingSongs: false}, this._setAudioBar(responseJSON[0]))
      }).catch(function(error){
        console.log(`Got an error: ${error}`)
      })
    )
  }

  _playNextSong(){
    let currentQueue = this.state.queue;
    let playedStack = this.state.playedStack;

    if (currentQueue.length > 1){
      let lastSong = currentQueue.shift();
      playedStack.push(lastSong);
      this.setState({currentSong: currentQueue[0], playedStack: playedStack, queue: currentQueue})
    }
  }

  _playPreviousSong(){
    let playedStack = this.state.playedStack;
    if (playedStack.length){
      let previousSong = playedStack[playedStack.length - 1]
      this.setState({currentSong: previousSong})
    }
  }

  render() {
    const { params } = this.props.navigation.state
    let audioBar = this.state.audioBarOn ? this._renderAudioBar() : null
    let songScreen = this.state.songScreenShow ?
      <SongScreen
        song={this.state.currentSong}
        _renderSongScreen={this._renderSongScreen}/>
      : null


    return (
      <View style={styles.viewContainer}>
      <StatusBar
        barStyle="light-content"/>


        <TabBar
          style={styles.tabBar}
          _setAudioBar={this._setAudioBar}
          navigation={this.props.navigation}
          _playRadio={this._playRadio}
          fetchingSongs={this.state.fetchingSongs}
          currentUser={this.state.currentUser}
        />
      {songScreen}
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
    fontSize: 5,
  },
  audioBarTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 2
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
