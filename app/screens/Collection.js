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

class CollectionScreen extends React.Component {
  constructor(props){
    super(props)
    this.renderCollection = this.renderCollection.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  renderCollection(){
    let items = this.props.collection.items.map((item, idx) => {
      return (
        <TouchableOpacity
          style={styles.collectionItem}
          onPress={() => this.props.changeTab('artist', item, 'push')}>
          <Image
            source={{uri: item.image_url}}
            style={styles.itemImage}
            />
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.collectionContainer}>
        {items}
      </View>
    )
  }

  render() {
    let criteria = this.props.collection.criteria;
    let items = this.props.collection.items.length ? this.renderCollection() : null;
    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{criteria}</Text>
        </View>

        {items}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: "Helvetica",
    color: "white",
    alignSelf: "center",
    fontWeight: "bold"
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50
  },
  collectionItem: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  itemText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Helvetica",
    fontWeight: "bold"
  },
  collectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    flexWrap: "wrap",
    marginTop: 100
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
  }
})


export default CollectionScreen;
