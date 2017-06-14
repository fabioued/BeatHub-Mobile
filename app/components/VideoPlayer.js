import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Video from 'react-native-video';

class VideoPlayer extends Component {

  render(){
    return(
      <Video source={{uri: "https://s3.amazonaws.com/beathub-dev/background.mp4"}}
        ref={(ref) => {
          this.player = ref
        }}
        rate={1.0}
        volume={1.0}
        muted={true}
        paused={false}
        resizeMode="cover"
        repeat={true}
        playInBackground={false}
        playWhenInactive={false}
        ignoreSilentSwitch={"ignore"}
        progressUpdateInterval={250.0}
        onLoadStart={this.loadStart}
        onLoad={this.setDuration}
        onProgress={this.setTime}
        onEnd={this.onEnd}
        onError={this.videoError}
        onBuffer={this.onBuffer}
        onTimedMetadata={this.onTimedMetadata}
        style={styles.backgroundVideo}
      />
    )
  }

}

const styles = StyleSheet.create({
  backgroundVideo: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});

export default VideoPlayer;
