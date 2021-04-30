import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';

export default class ChangeNewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpasschange: '',
      newpasschange: '',
      confPasschange: '',
    };
  }

  onpchangeschangePassword = () => {
    const {oldpasschange} = this.state;
    const {newpasschange} = this.state;
    const {confPasschange} = this.state;

    if (oldpasschange == '' || newpasschange == '' || confPasschange == '') {
      alert('Error');
    } else if (
      oldpasschange.length < 8 ||
      newpasschange.length < 8 ||
      confPasschange.length < 8
    ) {
      alert('password fileds must have 8 characters');
    } else if (newpasschange != confPasschange) {
      alert("Passwords doesn't match");
    } else if (newpasschange == confPasschange) {
      //////////////////////////api integration for change Password///////////////////////
      const url =
        'http://40.91.193.97:8080/ChangePwd?UserID=1000136&OldPassWord=' +
        oldpasschange +
        '&NewPassWord=' +
        newpasschange +
        '&Err=0&Msg=KOOO';
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(response => response.json())
        .then(changepwddata => {
          if (changepwddata.Err === 0) {
            alert('Password changed successfully');
          } else {
            alert('Error Case');
          }
        })
        .catch(error => {
          console.log(error);
          alert('Please Check Your Input Fields');
        });

      /////////////////////////////////////////////////////
    } else {
      alert('Error case');
    }
  };

  render() {
    return (
      <View style={styles.rootchange}>
        <StatusBar barStyle="dark-content" backgroundColor="#075E54" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.backgroundchange}>
            <View style={styles.progchangesBarColumnchange}>
              <Text style={styles.text3change}>Change Password</Text>
              <View style={styles.formchange}>
                <View style={styles.namechange}>
                  <EvilIconsIcon
                    name="lock"
                    style={styles.icon5change}></EvilIconsIcon>
                  <TextInput
                    // onChangeText={(value) => setTextInputOldPassword(value)}
                    multiline={false}
                    onChangeText={oldpasschange =>
                      this.setState({oldpasschange})
                    }
                    selectionColor={'white'}
                    placeholder="Old Password"
                    placeholderTextColor="#D3D3D3"
                    secureTextEntry={false}
                    style={styles.nameInputchange}></TextInput>
                </View>
                <View style={styles.namesureechange}>
                  <EvilIconsIcon
                    name="lock"
                    style={styles.icon5change}></EvilIconsIcon>
                  <TextInput
                    onChangeText={newpasschange =>
                      this.setState({newpasschange})
                    }
                    multiline={false}
                    selectionColor={'white'}
                    placeholder="New Password"
                    placeholderTextColor="#D3D3D3"
                    secureTextEntry={false}
                    style={styles.nameInputchange}></TextInput>
                </View>
                <View style={styles.namesureechange}>
                  <EvilIconsIcon
                    name="lock"
                    style={styles.icon5change}></EvilIconsIcon>
                  <TextInput
                    onChangeText={confPasschange =>
                      this.setState({confPasschange})
                    }
                    multiline={false}
                    selectionColor={'white'}
                    placeholder=" Confirm Password"
                    placeholderTextColor="#D3D3D3"
                    secureTextEntry={false}
                    style={styles.nameInputchange}></TextInput>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={this.onpchangeschangePassword}
                    style={styles.buttonchange}>
                    <Text style={styles.text2change}> Change Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootchange: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundchange: {
    flex: 1,
  },
  rect2change: {
    flex: 1,
  },

  text3change: {
    color: '#075E54',
    fontSize: 40,
    marginTop: 80,
    marginLeft: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  formchange: {
    flex: 1,
    marginTop: 30,
  },
  namechange: {
    height: 59,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
  },
  namesureechange: {
    height: 59,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
  icon5change: {
    color: '#fff',
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 15,
    alignSelf: 'center',
  },

  nameInputchange: {
    height: 50,
    color: '#fff',
    fontSize: 14,
    marginRight: 17,
    marginLeft: 10,
    marginTop: 2,
  },
  rowchange: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  icon8change: {
    color: '#fff',
    fontSize: 55,
    marginTop: 13,
  },

  progchangesBarColumnchange: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 60,
  },
  progchangesBarColumnFillerchange: {
    flex: 1,
  },
  buttonchange: {
    height: 55,
    backgroundColor: '#075E54',
    borderRadius: 5,
    borderColor: '#075E54',
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 55,
    marginTop: 20,
  },
  text2change: {
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
  },
});
