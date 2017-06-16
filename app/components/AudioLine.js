import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  TabBarIOS,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome'

class AudioLine extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      duration: 0.0,
      currentTime: 0.0,
      paused: this.props.currentSongStatus.paused,
      isBuffering: false,
      displaySongInfo: false
    }
    this.onLoad = this.onLoad.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.onBuffer = this.onBuffer.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.renderSongTimes = this.renderSongTimes.bind(this);
    this.renderSongControls = this.renderSongControls.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState({paused: newProps.currentSongStatus.paused, displaySongInfo: newProps.currentSongStatus.displaySongInfo})
  }

  onLoad(data){
    this.setState({duration: data.duration});
  }

  onProgress(data){
    this.setState({currentTime: data.currentTime})
  }

  onBuffer({isBuffering}: {isBuffering: boolean}){
    this.setState({ isBuffering });
  }

  onEnd(){
    this.props._playNextSong()
  }

  getCurrentTimePercentage(){
    if (this.state.currentTime > 0){
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  getCurrentPosition(e){
    var {height, width} = Dimensions.get('window');
    let pos = e.nativeEvent.locationX;
    let posPercentage = pos / width;
    let newCurrentTime = Math.floor(posPercentage * this.state.duration);
    this.player.seek(newCurrentTime)
  }

  renderSongTimes(){
    let currentTime = this.timeFormat(this.state.currentTime);
    let duration = this.timeFormat(this.state.duration);
    return (
      <View style={styles.timeContainer}>
        <View style={styles.timeTextLeft}>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>

        <View style={styles.timeTextRight}>
          <Text style={styles.timeText}>{duration}</Text>
        </View>
      </View>
    )
  }

  renderSongControls(){
    let playBtn = this.state.paused ? "play-circle-o" : "pause-circle-o"
    return (
      <View style={styles.songControlsContainer}>
        <TouchableOpacity
          onPress={() => this.props._playPreviousSong()}>
          <Icon
            name="step-backward"
            style={styles.controlBtn}/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props._pause()}>
          <Icon
            name={playBtn}
            style={styles.playBtn}/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props._playNextSong()}>
          <Icon
            name="step-forward"
            style={styles.controlBtn}/>
        </TouchableOpacity>
      </View>
    )
  }

  timeFormat(num){
    let min;
    let sec;
    if (num > 59){
      min = Math.floor(num / 60);
      sec = Math.floor(num - (min * 60))
    } else {
      min = 0
      sec = Math.floor(num)
    }

    if (min < 10){
      min = `0${min}`
    }

    if (sec < 10){
      sec = `0${sec}`
    }

    return `${min}:${sec}`
  }


  render(){
    var {height, width} = Dimensions.get('window');
    let statusWidth = this.getCurrentTimePercentage() * width;
    let song = this.props.currentSong
    let songTimes = this.state.displaySongInfo ? this.renderSongTimes() : null
    let songControls = this.state.displaySongInfo ? this.renderSongControls() : null

    return (
      <View style={styles.container}>
        {songControls}
        {songTimes}
        <TouchableOpacity
          style={{backgroundColor: "gray", width: width, height: 5}}
          onPress={(e) => this.getCurrentPosition(e)}>
          <TouchableOpacity style={{backgroundColor: 'white', width: statusWidth, height: 5}}>
          </TouchableOpacity>
        </TouchableOpacity>
        <Video source={{uri: song.audio_url}}
          ref={(ref) => {
            this.player = ref
          }}
          rate={1.0}
          volume={1.0}
          muted={false}
          paused={this.state.paused}
          resizeMode="cover"
          repeat={true}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch={"ignore"}
          progressUpdateInterval={250.0}
          onLoadStart={this.loadStart}
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={this.onEnd}
          onError={this.videoError}
          onBuffer={this.onBuffer}
          onTimedMetadata={this.onTimedMetadata}
          style={styles.backgroundVideo} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 10
  },
  timeContainer: {
    flexDirection: "row",
    position: 'absolute',
    bottom: 25,
    justifyContent: "space-between",
    alignItems: "center",
    width: 380,
    backgroundColor: 'black'
  },
  timeText: {
    color: "white",
    fontFamily: "Helvetica"
  },
  timeTextLeft: {
    left: 10
  },
  timeTextRight: {
    right: 10
  },
  playBtn: {
    fontSize: 40,
    color: "white",
    backgroundColor: "transparent"
  },
  controlBtn: {
    fontSize: 25,
    color: "white",
    backgroundColor: "transparent"
  },
  songControlsContainer: {
    position: "absolute",
    bottom: 70,
    backgroundColor: "transparent",
    flexDirection: "row",
    width: 380,
    justifyContent: "space-around",
    alignItems: "center"
  }
})

export default AudioLine;
