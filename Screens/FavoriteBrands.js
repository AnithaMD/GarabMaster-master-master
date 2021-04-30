import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Header1 from '../header/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export class FavoriteBrands extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {modalVisible} = this.state;

    return (
      // <NavigationContainer independent={true}>
      //   <Header1 />
      <SafeAreaView style={styles.container}>
        <Header1 navigation={this.props.navigation} />
        <Text style={styles.favtext}> My Favorite Brands</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            data={[
              {Brand: 'Brand1', id: 'AAAA-0000', amount: '$230.00'},
              {
                Brand: 'Tata Consulting services',
                id: 'AAAA-0001',
                amount: '$230.00',
              },
              {Brand: '', id: 'AAAA-0002', amount: '$230.00'},
              {Brand: 'Brand4', id: 'AAAA-0003', amount: '$230.00'},
              {Brand: 'Brand5', id: 'AAAA-0004', amount: '$230.00'},
              {Brand: 'Brand6', id: 'AAAA-0005', amount: '$230.00'},
            ]}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                <Text style={styles.text}>
                  {item.Brand} {'\n'} {item.id}
                  {'\n'}
                  {item.amount}{' '}
                </Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>

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
              <Text style={styles.modalText}>Name Of the User</Text>
              <Text style={styles.modalText}>Country Of the User</Text>
              <Text style={styles.modalText}>Address Of the User</Text>
              <Text style={styles.modalText}>Amount1 </Text>
              <Text style={styles.modalText}>Amount2</Text>
              <Text style={styles.modalText}>Activity</Text>
              <Text style={styles.modalText}>Comments</Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      // </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    backgroundColor: '#075E54',
    marginTop: 10,
    padding: 15,
    color: '#fff',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#34495e',
  },
  favtext: {
    textAlign: 'center',
    fontSize: 22,
    color: '#075E54',
    fontWeight: 'bold',
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    color: '#075E54',
  },
});

export default FavoriteBrands;
