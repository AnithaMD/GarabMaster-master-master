import React, {Component} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Button,
} from 'react-native';

import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={StyleSheet.container}>
        <EvilIconsIcon
          name="close"
          size={40}
          color="#000"
          style={styles.icon5}></EvilIconsIcon>

        <View style={{flexDirection: 'row', margin: 10}}>
          <Text style={styles.txts}>Latitude</Text>
          <TextInput
            placeholder="Enter Latitude"
            placeholderTextColor="#fff"
            selectionColor="#fff"
            style={styles.txtinput}></TextInput>
        </View>

        <View style={{flexDirection: 'row', margin: 10}}>
          <Text style={styles.txts}>Longitude</Text>
          <TextInput
            placeholder="Enter Latitude"
            placeholderTextColor="#fff"
            selectionColor="#fff"
            style={styles.txtinput}></TextInput>
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <Text style={styles.txts}>Radius</Text>
          <TextInput
            placeholder="Enter Radius"
            placeholderTextColor="#fff"
            selectionColor="#fff"
            style={styles.txtinput}></TextInput>
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <Text style={styles.txts}>Activity</Text>
          <TextInput
            placeholder="Enter Activity"
            placeholderTextColor="#fff"
            selectionColor="#fff"
            style={styles.txtinput}></TextInput>
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <Text style={styles.txts}>Country</Text>
          <TextInput
            placeholder="Enter Country"
            placeholderTextColor="#fff"
            selectionColor="#fff"
            style={styles.txtinput}></TextInput>
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <Text style={styles.txts}>Name</Text>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="#fff"
            selectionColor="#fff"
            style={styles.txtinput}></TextInput>
        </View>

        <View style={{flexDirection: 'row', margin: 10}}>
          <Text style={styles.txts}>Keyword</Text>
          <TextInput
            placeholder="Enter Keyword"
            placeholderTextColor="#fff"
            selectionColor="#fff"
            style={styles.txtinput}></TextInput>
        </View>

        <TouchableOpacity onPress={this.onclickLogin} style={styles.button}>
          <Text style={styles.text2}>Search</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtinput: {
    backgroundColor: '#075E54',
    marginLeft: 130,
    padding: 10,
    height: 50,
    width: 250,
    position: 'absolute',
    color: '#fff',
    borderRadius: 10,
  },
  txts: {
    color: '#075E54',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    height: 55,
    backgroundColor: '#075E54',
    borderRadius: 5,
    borderColor: '#075E54',
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 10,
    margin: 20,
  },
  text2: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  icon5: {
    color: '#000',
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 15,
    fontWeight: 'bold',
  },
});
