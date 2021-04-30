import React, {useState} from 'react';
import {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Card} from 'react-native-paper';

import Header1 from '../header/Header';

export default class QrCodeScreen extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  render() {
    const {modalVisible} = this.state;
    const exampleImage = require('../assets/barcode.png');
    return (
      // <NavigationContainer independent={true}>
      //
      <View style={styles.container}>
        <Header1 navigation={this.props.navigation} />

        <Card style={styles.cardstyle}>
          <Text style={styles.textsty}>Planting Trees</Text>
          <Text style={styles.textsty}>AAAA - 0001</Text>
          <Image
            source={exampleImage}
            style={{
              height: 130,
              width: 280,
              marginTop: 10,
              alignSelf: 'center',
            }}
          />
        </Card>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text2}>SCAN QR CODE</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}></Modal>
      </View>
      // </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',

    flex: 1,
  },
  cardstyle: {
    padding: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    height: 260,
    borderRadius: 10,
    marginTop: 150,
  },
  textsty: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#075E54',
    padding: 2,
    fontSize: 20,
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
});
