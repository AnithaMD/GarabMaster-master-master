import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';

import {Card, Paragraph} from 'react-native-paper';
import Maps from '../Map/Map';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Explore from '../ExploreItem/Explore';

import {Component} from 'react';
import CheckboxHome from '../components/CheckboxHome';
import Header1 from '../header/Header';
import RBSheet from 'react-native-raw-bottom-sheet';

export default class Home extends Component {
  state = {
    modalVisible: false,
    modalVisiblecard2: false,
    modalVisibleCard3: false,

    search: '',

    modalvisiblesearch: false,

    /////inside modal Text////
    Username1: 'Sivasankaran',
    UserAccount1: 'Siva - 0000',

    Username2: 'Mohammed Jaffer',
    UserAccount2: 'Jaffer-0001',

    //////

    //search

    backgroundColor: '#075E54',
    backgroundColor2: '#075E54',
    pressed: false,

    //////buttonhome //////////
    backgroundColor: '#fff',
    backgroundColor2: '#ebeced',
    pressed: true,

    ///// map status ////////////////////

    status: true,

    status2: false,
    //////////////////////////////////
  };

  updateSearch = search => {
    this.setState({search});
  };

  //searchnmap

  setmodalvisiblesearch = visible => {
    this.setState({modalvisiblesearch: visible});
  };
  //search

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  setModalVisiblecard2 = visible => {
    this.setState({modalVisiblecard2: visible});
  };
  setModalVisibleCard3 = visible => {
    this.setState({modalVisibleCard3: visible});
  };

  ////////////////projects or contributors/////////////

  SwitchButton() {
    if (!this.state.pressed) {
      this.setState({
        pressed: true,
        backgroundColor: '#075E54',
        backgroundColor2: '#075E54',
        status: true,
      });
    } else {
      this.setState({
        pressed: false,
        backgroundColor: '#075E54',
        backgroundColor2: '#075E54',
      });
    }
  }

  /////////////// change color of button ///////////////
  changeColor1() {
    this.setState({
      backgroundColor2: '#ebeced',
      backgroundColor: '#fff',
      status: true,
      status2: false,
    });
  }

  /////////////// change color of button 2///////////////

  changeColor2() {
    this.setState({
      backgroundColor2: '#fff',
      backgroundColor: '#ebeced',
      status: false,
      status2: true,
    });
  }

  //////////////////////////////////////////////////////

  render() {
    const {modalVisible} = this.state;
    const {modalVisiblecard2} = this.state;

    const chip = require('../assets/chipp.png');
    const exampleImage = require('../assets/barcode.png');

    return (
      <SafeAreaView style={styles.container}>
        <Header1 navigation={this.props.navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          maximumZoomScale={2}
          minimumZoomScale={1}>
          <View style={styles.cardview}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
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
                    <Text style={styles.modalText}>{this.state.Username1}</Text>
                    <Text style={styles.modalTextnumber}>
                      {this.state.UserAccount1}
                    </Text>
                    <Image
                      source={exampleImage}
                      style={{height: 150, width: 250, marginBottom: 1}}
                    />
                  </View>
                </View>
              </Modal>

              <Card
                style={styles.card}
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.nametxt}>{this.state.Username1}</Text>
                  <Image
                    source={chip}
                    style={{
                      height: 35,
                      width: 90,
                      marginTop: 25,
                      marginLeft: 35,
                    }}
                  />
                </View>

                <Text style={styles.acctxt}>{this.state.UserAccount1}</Text>

                <Text style={styles.cureency}>$230.00</Text>
              </Card>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisiblecard2}
                onRequestClose={() => {
                  this.setModalVisiblecard2(!modalVisiblecard2);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setModalVisiblecard2(!modalVisiblecard2)
                      }>
                      <FontAwesome
                        name="close"
                        size={26}
                        color="#1C2833"
                        style={{marginLeft: 200, color: 'red'}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.modalText}>{this.state.Username2}</Text>
                    <Text style={styles.modalTextnumber}>
                      {this.state.UserAccount2}
                    </Text>
                    <Image
                      source={exampleImage}
                      style={{height: 150, width: 250, marginBottom: 1}}
                    />
                  </View>
                </View>
              </Modal>

              <Card
                style={styles.card2}
                onPress={() => {
                  this.setModalVisiblecard2(true);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.nametxt}>{this.state.Username2}</Text>
                  <Image
                    source={chip}
                    style={{
                      height: 35,
                      width: 90,
                      marginTop: 25,
                      marginLeft: 35,
                    }}
                  />
                </View>

                <Text style={styles.acctxt}>{this.state.UserAccount2}</Text>

                <Text style={styles.cureency}>$230.00</Text>
              </Card>

              <Card
                style={styles.card3}
                onPress={() =>
                  this.props.navigation.navigate('My Favourite Projects')
                }>
                <Card.Content>
                  <Paragraph style={styles.favorite}>
                    My Favorite Projects
                  </Paragraph>
                </Card.Content>
              </Card>
            </ScrollView>
          </View>

          <View style={styles.projectorcontributors}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {<CheckboxHome />}
            </ScrollView>
          </View>
          <Maps navigation={this.props.navigation} />
          <View>
            <Button
              title="View All Items"
              color="red"
              onPress={() => this.RBSheet.open()}></Button>
            <RBSheet
              ref={ref => {
                this.RBSheet = ref;
              }}
              height={330}
              openDuration={250}
              closeOnDragDown={true}
              customStyles={{
                container: {
                  alignItems: 'center',
                },
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Explore navigation={this.props.navigation} />
              </ScrollView>
            </RBSheet>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  projectorcontributors: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
  },
  map: {
    height: 250,
    margin: 10,
  },
  text: {
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  list: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5,
    flex: 1,
  },
  label: {
    marginLeft: 5,
    marginTop: 2,
    fontSize: 18,
    color: '#075E54',
    fontWeight: 'bold',
  },

  checkbox: {
    alignSelf: 'center',
  },

  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },

  nameinputcli: {
    height: 50,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
    margin: 15,
  },
  Garabtext: {
    color: '#fff',
    marginLeft: 11,
    alignSelf: 'center',
    fontSize: 25,
    fontFamily: 'Roboto',
  },
  checkBoxText: {
    color: '#4a4a4a',
    fontWeight: 'normal',
  },
  text: {
    color: '#000',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  containerbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
  },
  ellipseRow: {
    height: 24,
    flexDirection: 'row',
    flex: 1,
    marginRight: 225,
    marginLeft: 11,
    alignSelf: 'center',
  },
  icon: {
    color: '#fff',
    fontSize: 30,
    alignSelf: 'center',
    marginRight: 10,
  },
  card: {
    height: 200,
    backgroundColor: '#8E212B',
    borderRadius: 20,
    elevation: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  card2: {
    height: 200,
    backgroundColor: '#0C1643',
    borderRadius: 20,
    elevation: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  card3: {
    height: 200,
    width: 300,
    backgroundColor: '#D4AF37',
    borderRadius: 20,
    elevation: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  checkboxdire: {
    flexDirection: 'row',
  },
  LocationView: {
    flexDirection: 'row',

    marginLeft: 20,
  },
  LatitudelongText: {
    fontSize: 15,
    color: '#075E54',
    marginTop: 20,
  },
  numberlatlong: {
    fontSize: 15,
    color: '#075E54',
    marginTop: 20,
  },
  ActivityTxt: {
    color: '#075E54',
    marginTop: 20,
    fontSize: 15,
  },
  cardview: {
    backgroundColor: '#fff',
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
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#075E54',
    marginTop: 10,
  },
  modalTextnumber: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20,
    color: '#075E54',
    fontWeight: 'bold',
  },
  search: {
    borderRadius: 20,
    margin: 20,
    backgroundColor: '#fff',
  },
  favorite: {
    color: '#1C2833',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 65,
    fontWeight: 'bold',
  },
  textlist: {
    fontSize: 20,
    color: '#075E54',
    marginTop: 15,
    marginLeft: 25,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  nametxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
    marginLeft: 20,
  },
  acctxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
    marginLeft: 20,
  },
  cureency: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
    marginLeft: 20,
  },
  txtinputsearch: {
    marginLeft: 30,

    width: '50%',
    color: '#075E54',
    fontSize: 18,
  },

  searchsty: {
    color: '#075E54',
    fontSize: 20,
    fontWeight: 'bold',
  },
  centeredViewsearch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalViewsearch: {
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
    shadowRadius: 4,
    elevation: 5,
  },
});
