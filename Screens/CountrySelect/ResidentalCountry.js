import React from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
// native base imports
import {Container, Item, Input} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import data from '../Country';

const defaultFlag = data.filter(obj => obj.name === 'France')[0].flag;

export default class ResidentalCon extends React.Component {
  state = {
    flag: defaultFlag,
    modalVisible: false,
    selectCountry: '',
  };
  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }
  showModal() {
    this.setState({modalVisible: true});
  }
  hideModal() {
    this.setState({modalVisible: false});
    // Refocus on the Input field after selecting the country code
    this.refs.phone._root.focus();
  }

  async getCountry(country) {
    const countryData = data;
    try {
      const countryName = countryData.filter(obj => obj.name === country)[0]
        .name;
      const countryFlag = countryData.filter(obj => obj.name === country)[0]
        .flag;
      // Set data from user choice of country
      this.setState({selectCountry: countryName, flag: countryFlag});
      this.hideModal();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    let {flag} = this.state;
    const countryData = data;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Container style={styles.infoContainer}>
                <Item style={styles.itemStyle} onPress={() => this.showModal()}>
                  <View>
                    <Input
                      selectionColor={'white'}
                      style={styles.input}
                      placeholder="Residental Country"
                      fontSize={15}
                      placeholderTextColor="#D3D3D3"
                      editable={false}
                      returnKeyType="done"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      ref="phone"
                      value={this.state.selectCountry}
                      onChangeText={val => {
                        if (this.state.selectCountry === '') {
                          // render UK phone code by default when Modal is not open
                          this.onChangeText('selectCountry', val);
                        } else {
                          // render country code based on users choice with Modal
                          this.onChangeText('selectCountry', val);
                        }
                      }}
                    />
                  </View>

                  <Modal
                    animationType="slide" // fade
                    transparent={false}
                    visible={this.state.modalVisible}>
                    <TouchableOpacity></TouchableOpacity>
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          flex: 1,

                          backgroundColor: '#fff',
                        }}>
                        <View
                          style={{
                            backgroundColor: '#fff',
                            height: 59,
                          }}>
                          <MaterialCommunityIcons
                            onPress={() => this.hideModal()}
                            name="close-circle"
                            style={{
                              fontSize: 35,
                              color: '#696969',
                              padding: 15,
                              backgroundColor: '#fff',
                            }}></MaterialCommunityIcons>
                        </View>
                        <FlatList
                          data={countryData}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => (
                            <TouchableWithoutFeedback
                              onPress={() => {
                                this.getCountry(item.name, item.code),
                                  console.log(item.code),
                                  this.props.data.changeresident(item.code);
                              }}>
                              <View
                                style={[
                                  styles.countryStyle,
                                  {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                  },
                                ]}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: '#000',
                                    marginLeft: 20,
                                  }}>
                                  {item.name}
                                </Text>
                                <Text style={{fontSize: 35, marginRight: 10}}>
                                  {item.flag}
                                </Text>
                              </View>
                            </TouchableWithoutFeedback>
                          )}
                        />
                      </View>
                    </View>
                  </Modal>
                </Item>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    marginLeft: 50,
    top: 0,
    marginTop: -25,
    position: 'absolute',
  },
  itemStyle: {
    height: 59,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
  },

  iconStyle1: {
    flex: 1,
    color: '#fff',
    fontSize: 40,
    left: 275,
    marginTop: -12,
    position: 'absolute',
  },

  countryStyle: {
    flex: 1,
    backgroundColor: '#fff',

    height: 50,
  },
});
