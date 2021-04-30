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

import data from '../Screens/Country';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
// Default render of country flag
const defaultFlag = data.filter(obj => obj.name === 'France')[0].flag;

export default class Concode extends React.Component {
  state = {
    flag: defaultFlag,
    modalVisible: false,
    phoneNumber: '',
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
    this.refs.PhoneInput._root.focus();
  }

  async getCountry(country) {
    const countryData = data;
    try {
      const countryCode = countryData.filter(obj => obj.name === country)[0]
        .dial_code;
      const countryFlag = countryData.filter(obj => obj.name === country)[0]
        .flag;
      // Set data from user choice of country
      this.setState({phoneNumber: countryCode, flag: countryFlag});
      this.hideModal();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
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
                      placeholder="+91"
                      placeholderTextColor="#D3D3D3"
                      editable={false}
                      returnKeyType="done"
                      autoCapitalize="none"
                      secureTextEntry={false}
                      ref="PhoneInput"
                      value={this.props.data.phoneNumber}
                      onChangeText={phoneNumber => this.setState(phoneNumber)}
                    />
                  </View>
                  <EvilIconsIcon
                    name="chevron-down"
                    style={styles.iconStyle}
                    onPress={() => this.showModal()}
                  />

                  <Modal
                    animationType="slide" // fade
                    transparent={false}
                    visible={this.state.modalVisible}>
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          flex: 10,
                          paddingTop: 80,
                          backgroundColor: '#075E54',
                        }}>
                        <FlatList
                          data={countryData}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => (
                            <TouchableWithoutFeedback
                              onPress={() => {
                                this.getCountry(
                                  item.name,
                                  {phoneNumber: item.dial_code},
                                  console.log(item.dial_code),
                                ),
                                  this.props.data.changeNumber(item.dial_code);
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
                                <Text style={{fontSize: 45}}>{item.flag}</Text>
                                <Text style={{fontSize: 20, color: '#fff'}}>
                                  {item.name} ({item.dial_code})
                                </Text>
                              </View>
                            </TouchableWithoutFeedback>
                          )}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => this.hideModal()}
                        style={styles.closeButtonStyle}>
                        <Text style={styles.textStyle}>Close</Text>
                      </TouchableOpacity>
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
    width: 135,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 28,
  },

  itemStyle: {
    height: 59,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
  },
  iconStyle: {
    color: '#fff',
    fontSize: 40,
    marginLeft: -10,
  },

  textStyle: {
    padding: 5,
    fontSize: 20,
    color: '#075E54',
    fontWeight: 'bold',
  },
  countryStyle: {
    flex: 1,
    backgroundColor: '#075E54',
    borderTopColor: '#211f',
    borderTopWidth: 1,
    padding: 12,
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
