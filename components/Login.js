import React, {Component} from 'react';
import {Alert} from 'react-native';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'TestDataB.db'});

export default class Login extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  //////////////////////////////show and Hide Password///////////////////////
  constructor(props) {
    super(props);

    this.state = {
      icEye: 'visibility-off', // default icon to show that password is currently hidden
      password: '', // actual value of password entered by the user
      showPassword: true, // boolean to show/hide the password

      password: '',
      userData: {},
    };
  }

  changePwdType = () => {
    let newState;
    if (this.state.showPassword) {
      newState = {
        icEye: 'visibility',
        showPassword: false,
        password: this.state.password,
      };
    } else {
      newState = {
        icEye: 'visibility-off',
        showPassword: true,
        password: this.state.password,
      };
    }
    // set new state value
    this.setState(newState);
  };
  handlePassword = password => {
    let newState = {
      icEye: this.state.icEye,
      showPassword: this.state.showPassword,
      password: password,
    };
    this.setState(newState);
  };

  //////////////////////////////show and Hide Password///////////////////////

  //////////////validation is Pending with api Integration/////////////////////////
  onclickLogin = () => {
    const {password} = this.state;
    if (password == '' || password.length < 8) {
      this.refs.PasswordLogin.focus();
      Alert.alert('Please Enter Correct Password');
    } else {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM user_api', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          // console.log('table_user', temp);
          console.log(temp[0].user_UserID);
          fetch(
            'http://40.91.193.97:8080/CheckCredentials?AppType=CLI&OwnerID=' +
              temp[0].user_UserID +
              '&UserID=1000118&PassWord=' +
              password +
              '&Err=0&Msg=KOO',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            },
          )
            .then(response => response.json())
            .then(logindata => {
              if (logindata.Err == 0) {
                this.props.navigation.push('Bottom');
                console.log('siva');
              } else {
                console.log(logindata);
              }
            });
        });
      });

      // console.log(this.state.userData.user_name);

      // this.props.navigation.push('Bottom');
    }
  };

  /////////////////onclick reset password //////////////////////

  onclickResetPassword = () => {
    fetch(
      'http://40.91.193.97:8080/ResetPwd?UserID=1000118&Mode=M&Err=0&Msg=KOOO',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(resetData => {
        if (resetData.Err === 0) {
          alert(resetData.Msg);

          console.log(resetData);
          console.log(resetData['#result-set-1'][0]['New PassWord']);
        }
      });
  };

  ///////////////////////////////////f///////////////////////////////////////

  render() {
    const logoimage = require('../assets/logoapp.png');

    return (
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" backgroundColor="#075E54" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.background}>
            <View style={styles.progressBarColumn}>
              <Text style={styles.text3}>Login </Text>

              <View style={styles.namesuree}>
                <EvilIconsIcon
                  name="lock"
                  size={30}
                  color="#fff"
                  style={styles.icon5}></EvilIconsIcon>

                <TextInput
                  ref="PasswordLogin"
                  value={this.state.password}
                  onChangeText={password => this.setState({password})}
                  secureTextEntry={this.state.showPassword}
                  multiline={false}
                  selectionColor={'white'}
                  placeholder="Password"
                  placeholderTextColor="#D3D3D3"
                  numberOfLines={1}
                  style={styles.nameInput}></TextInput>

                <Icon
                  style={styles.icon}
                  name={this.state.icEye}
                  size={20}
                  color={'black'}
                  onPress={this.changePwdType}
                />
              </View>

              <View style={styles.icon8}>
                <TouchableOpacity
                  onPress={this.onclickLogin}
                  style={styles.button}>
                  <Text style={styles.text2}>Login</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                  <Text
                    style={styles.textreset}
                    onPress={() => this.props.navigation.push('Register')}>
                    Register
                  </Text>
                  <Text style={styles.OR}>(Or)</Text>
                  <Text
                    style={styles.textforgot}
                    onPress={this.onclickResetPassword}>
                    ForgotPassword ?
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image source={logoimage} style={{height: 150, width: 150}} />

                <Text
                  style={{fontWeight: 'bold', color: '#075E54', fontSize: 50}}>
                  {' '}
                  GARAB
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
  },
  rect2: {
    flex: 1,
  },
  icon: {
    color: '#fff',
    alignSelf: 'center',
    marginRight: 10,
  },
  Show: {
    color: '#fff',
    alignSelf: 'center',
    marginRight: 30,
    fontWeight: 'bold',
  },
  card: {
    elevation: 10,
    borderRadius: 10,
  },
  icon5: {
    color: '#fff',
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 15,
    alignSelf: 'center',
  },

  text3: {
    color: '#075E54',
    fontSize: 50,
    marginTop: 50,
    marginLeft: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  form: {
    flex: 1,
    marginTop: 30,
  },
  name: {
    height: 59,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
  },
  namesuree: {
    height: 59,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
  icon5: {
    color: '#fff',
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 15,
    alignSelf: 'center',
  },
  icon5pass: {
    color: '#fff',
    fontSize: 22,
    marginRight: 20,
    alignSelf: 'center',
  },
  nameInput: {
    height: 50,
    color: '#fff',
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'column',
    alignSelf: 'center',
  },

  icon8: {
    color: '#fff',
    fontSize: 55,
    marginTop: 13,
  },

  progressBarColumn: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  progressBarColumnFiller: {
    flex: 1,
  },
  button: {
    height: 55,
    backgroundColor: '#075E54',
    borderRadius: 5,
    borderColor: '#075E54',
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  text2: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textforgot: {
    fontWeight: 'bold',
    color: '#075E54',
    fontSize: 18,
    alignSelf: 'auto',
    marginLeft: 5,
    marginTop: 8,
    marginBottom: 10,
  },
  textreset: {
    fontSize: 18,
    color: '#075E54',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  OR: {
    marginLeft: 5,
    color: '#075E54',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  showtxt: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 20,
  },
});
