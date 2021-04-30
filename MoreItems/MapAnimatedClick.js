import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class MapAnimatedClick extends Component {
  constructor(props) {
    super(props);
  }

  onClickExport = async () => {
    try {
      const result = await Share.share({
        message: 'This is a message share',
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

  render() {
    const image = {uri: 'https://reactjs.org/logo-og.png'};

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <ImageBackground
            resizeMode="stretch"
            source={this.props.route.params.Image}
            style={{
              height: 200,
              width: '100%',
            }}>
            <View style={styles.icons}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <EvilIconsIcon
                  name="arrow-left"
                  size={35}
                  color="#000"
                  style={styles.icon5}></EvilIconsIcon>
              </TouchableOpacity>

              <View style={styles.tworowicons}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.onClickExport}>
                  <MaterialCommunityIcons
                    name="export-variant"
                    size={25}
                    color="#fff"
                    style={styles.icon5}></MaterialCommunityIcons>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.Mainheader}>
            <Text style={styles.titletxt}>{this.props.route.params.title}</Text>
            <Text style={styles.address}>
              {this.props.route.params.address}
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginLeft: 30,
              marginRight: 30,
            }}
          />
          <View style={{margin: 30}}>
            <ScrollView>
              <View>
                <Text style={styles.Descriptxt}>Description:</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon5: {
    color: 'red',
    margin: 10,
  },
  icons: {
    flexDirection: 'row',
  },
  tworowicons: {
    flexDirection: 'row',
    marginLeft: 300,
  },
  Mainheader: {
    margin: 20,
  },
  titletxt: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  Descriptxt: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 18,
    marginTop: 5,
    width: '100%',
  },
});
