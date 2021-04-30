import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Share,
  StatusBar,
  ScrollView,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';

import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';

import {Component} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';

import Header1 from '../header/Header';

export default class Profile extends Component {
  state = {
    profileImage:
      'https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg',

    Aliasname: 'Aliasname',
  };

  ////////////////////logout//////////////
  createTwoButtonAlert = () =>
    Alert.alert(
      'Logout',
      'Are you Want sure Exit this App?',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'), ////////remaining is there
          style: 'No',
        },
        {text: 'Yes', onPress: () => this.props.navigation.navigate('Login')}, ////////remaining is there
      ],
      {cancelable: false},
    );

  //////////////////////////////////invite friends///////////////////////////////////

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //////////////////////image//////////////////////////////
  PhotoCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);

      this.setState({profileImage: image.path});
      this.RBSheet.close();
    });
  };

  getImageGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 700,
      cropping: true,
    }).then(image => {
      console.log(image);
      this.setState({profileImage: image.path});
      this.RBSheet.close();
    });
  };

  //////////////onclick change Alias////////////////////
  onclickAlias = () => {
    fetch(
      'http://40.91.193.97:8080/ChangeAlias?Type=CLI&ID=1000118&MyNewAlias=&Err=0&Msg=KOOO',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(changeAlias => {
        if (changeAlias.Err === 0) {
          alert(changeAlias.Msg);
          console.log(changeAlias.MyNewAlias);

          this.setState({
            Aliasname: changeAlias.MyNewAlias,
          });
        } else {
          alert('Error');
        }
      });
  };

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" backgroundColor="#075E54" />
        <Header1 navigation={this.props.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <View style={styles.progressBarColumn}>
              <View>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: this.state.profileImage,
                  }}></Image>
                <EvilIconsIcon
                  name="camera"
                  style={styles.iconcamera}
                  onPress={() => this.RBSheet.open()}></EvilIconsIcon>
                <RBSheet
                  ref={ref => {
                    this.RBSheet = ref;
                  }}
                  height={250}
                  openDuration={250}
                  closeOnDragDown={true}
                  customStyles={{
                    container: {
                      alignItems: 'center',
                    },
                  }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.getImageGallery}>
                    <Text style={styles.text2edit}>Choose from Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.PhotoCamera}>
                    <Text style={styles.text2edit}>Choose from Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.RBSheet.close()}>
                    <Text style={styles.text2edit}>Cancel</Text>
                  </TouchableOpacity>
                </RBSheet>

                <View style={styles.body}>
                  <View style={styles.bodyContent}>
                    <Text style={styles.name}>Sivasankaran</Text>
                    <Text style={styles.alias}>{this.state.Aliasname}</Text>
                  </View>

                  <Text
                    style={styles.EditProfile}
                    onPress={() => {
                      navigation.navigate('EditProfile');
                    }}>
                    Edit Profile
                    <EvilIconsIcon
                      name="pencil"
                      style={styles.iconpencil}></EvilIconsIcon>
                  </Text>

                  <View style={styles.namesuree}>
                    <EvilIconsIcon
                      name="chevron-right"
                      style={styles.icon7}></EvilIconsIcon>
                    <EvilIconsIcon
                      name="share-google"
                      style={styles.icon5}></EvilIconsIcon>
                    <Text style={styles.nameInput} onPress={this.onShare}>
                      Invite Friends
                    </Text>
                  </View>
                  <View style={styles.namesuree}>
                    <EvilIconsIcon
                      name="chevron-right"
                      style={styles.icon7}></EvilIconsIcon>
                    <EvilIconsIcon
                      name="user"
                      style={styles.icon5}></EvilIconsIcon>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={this.onclickAlias}>
                      <Text style={styles.nameInput}>Change Alias</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.namesuree}>
                    <EvilIconsIcon
                      name="chevron-right"
                      style={styles.icon7}></EvilIconsIcon>
                    <EvilIconsIcon
                      name="lock"
                      style={styles.icon5}></EvilIconsIcon>
                    <Text
                      style={styles.nameInput}
                      onPress={() => {
                        navigation.navigate('ChangeNewPassword');
                      }}>
                      Change Password
                    </Text>
                  </View>

                  <View style={styles.namesuree}>
                    <EvilIconsIcon
                      name="chevron-right"
                      style={styles.icon7}></EvilIconsIcon>
                    <EvilIconsIcon
                      name="tag"
                      style={styles.icon5}></EvilIconsIcon>
                    <Text style={styles.nameInput}>Language </Text>
                  </View>

                  <View style={styles.namesuree}>
                    <EvilIconsIcon
                      name="chevron-right"
                      style={styles.icon7}></EvilIconsIcon>
                    <EvilIconsIcon
                      name="credit-card"
                      style={styles.icon5}></EvilIconsIcon>
                    <Text style={styles.nameInput}>Reporting Currency</Text>
                  </View>
                  <Text
                    style={{
                      marginLeft: 108,
                      color: '#000',
                      fontSize: 15,
                      marginTop: -20,
                      fontWeight: 'bold',
                    }}>
                    EUR
                  </Text>

                  <View style={styles.namesuree}>
                    <EvilIconsIcon
                      name="chevron-right"
                      style={styles.icon7}></EvilIconsIcon>
                    <EvilIconsIcon
                      name="gear"
                      style={styles.icon5}></EvilIconsIcon>
                    <Text
                      style={styles.nameInput}
                      onPress={this.createTwoButtonAlert}>
                      Logout
                    </Text>
                  </View>
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
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  UpdatePhoto: {
    fontSize: 15,
    color: '#075E54',
    alignSelf: 'center',
  },
  text2edit: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
    padding: 10,
  },
  rect2: {
    flex: 1,
  },
  button: {
    height: 50,
    backgroundColor: '#075E54',
    marginTop: 10,
    borderRadius: 5,

    borderWidth: 1,
    justifyContent: 'center',
  },

  namesuree: {
    height: 59,
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 21,
  },
  icon5: {
    color: '#dc143c',
    fontSize: 35,
    width: 33,
    height: 33,
    marginLeft: 15,
    marginTop: 8,
    flexDirection: 'row',
  },
  iconcamera: {
    color: '#dc143c',
    fontSize: 35,
    width: 33,
    height: 33,
    alignSelf: 'center',
  },
  nameInput: {
    height: 30,
    color: '#075E54',
    fontSize: 20,
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 6,
    fontWeight: 'bold',
  },

  icon7: {
    color: '#075E54',
    fontSize: 30,
    marginLeft: 15,
    marginTop: 13,
  },
  iconpencil: {
    color: '#075E54',
    fontSize: 18,
    marginLeft: 5,
    marginTop: 15,
  },

  progressBarColumn: {
    marginLeft: 15,
    marginRight: 50,
  },
  header: {
    backgroundColor: '#fff',
    height: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 5,
    marginTop: 10,
    alignSelf: 'center',
  },

  bodyContent: {
    flex: 1,
    padding: 5,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  name: {
    fontSize: 25,
    color: '#075E54',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  alias: {
    fontSize: 25,
    color: '#075E54',
    alignSelf: 'center',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  EditProfile: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: -5,
    marginLeft: 10,
    color: '#075E54',
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
