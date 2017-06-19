import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

class CreatePlaylistModal extends Component {
  constructor(props){
    super(props)

    this.state = {
      modalVisible: false,
      playlistName: ""
    }

    this.createPlaylist = this.createPlaylist.bind(this);
  }

  componentWillReceiveProps(props){
    this.setState({modalVisible: props.display})
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  createPlaylist(){
    let name = this.state.playlistName;
    this.setState({playlistName: ""})
    fetch(`http://www.beathub.us/api/users/${this.props.currentUser.id}/playlists`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({playlist: {name: name}})
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.props.playlistsContext.setState({playlistModalDisplay: false})
      }).catch(function(error){
        console.log(`Got an error: ${error}`)
      })
  }

  render() {
    return (
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >

        <View style={styles.modalBackground}>
        </View>
          <View style={styles.container}>
            <Text style={styles.createPlaylistTitle}>Create New Playlist</Text>
            <Text style={styles.createPlaylistText}>Enter a name for this new playlist</Text>

              <TextInput
                style={styles.textInput}
                onChangeText={(text) => this.setState({playlistName: text})}
                placeholder="My Awesome Playlist"
                placeholderTextColor="gray"
                value={this.state.playlistName}
                selectionColor="#1ac0ff"/>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}>
                  <Text>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.createPlaylist()}
                  style={styles.button}>
                  <Text>Create</Text>
                </TouchableOpacity>
              </View>
          </View>



        </Modal>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1e1e1",
    height: 200,
    width: 250,
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    top: 200,
    borderRadius: 10
  },
  modalBackground: {
    backgroundColor: "black",
    opacity: .5,
    flex: 1
  },
  textInput: {
    height: 20,
    borderWidth: 1,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    width: 150,
    alignSelf: "center",
    textAlign: "left",
    marginLeft: 10,
    fontSize: 13
  },
  createPlaylistTitle: {
    fontSize: 18
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200
  },
  button: {
    borderWidth: 1,
    height: 35,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: '#cecdcd',
    marginLeft: 5
  }
})


export default CreatePlaylistModal
