import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export class HomeCard3 extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  render() {
    const exampleImage = require('../assets/barcode.png');
    const {modalVisible} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Project1', amount: '$230.00'},
            {key: 'Project2', amount: '$231.00'},
            {key: 'Project3', amount: '$232.00'},
            {key: 'Project4', amount: '$233.00'},
          ]}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text style={styles.text}>
                {item.key} {'\n'} {item.amount}{' '}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => this.setModalVisible(!modalVisible)}>
                <FontAwesome
                  name="close"
                  size={26}
                  color="#1C2833"
                  style={{marginLeft: 200, color: 'red'}}
                />
              </TouchableOpacity>
              <Text style={styles.modalText}>Namaste India</Text>
              <Text style={styles.modalTextnumber}>PRJ - A3254</Text>
              <Image
                source={exampleImage}
                style={{height: 100, width: 200, marginBottom: 1}}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    backgroundColor: '#075E54',
    marginTop: 10,
    padding: 30,
    color: '#fff',
    flex: 1,
    marginLeft: 20,
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  modalTextnumber: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeCard3;
