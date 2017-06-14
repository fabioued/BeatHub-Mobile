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
      isBuffering: false
    }
    this.onLoad = this.onLoad.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.onBuffer = this.onBuffer.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState({paused: newProps.currentSongStatus.paused})
  }

  onLoad(data){
    this.setState({duration: data.duration});
  }

  onProgress(data){
    this.setState({currentTime: data.currentTime})
    console.log(this.state.currentTime)
    console.log(this.state.duration)
  }

  onBuffer({isBuffering}: {isBuffering: boolean}){
    this.setState({ isBuffering });
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

  render(){
    var {height, width} = Dimensions.get('window');
    let statusWidth = this.getCurrentTimePercentage() * width;

    let song = this.props.currentSong
    return (
      <View style={styles.container}>
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
          playInBackground={false}
          playWhenInactive={false}
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
  }
})

export default AudioLine;
