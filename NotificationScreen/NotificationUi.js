import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';

export default class Notifications extends Component {
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  getListViewItem = item => {
    Alert.alert(item.key);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={[
            {
              key: 'Sivasankaran',
              message:
                'This is first message screen Lorem ipsum,De Finibus Bonorum',
              Image:
                'https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg',
            },
            {
              key: 'Mohammed',
              message:
                'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passages is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a type specimen book.',
              Image:
                'https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg',
            },
          ]}
          renderItem={({item}) => (
            <View style={styles.notification}>
              <Image
                style={styles.avatar}
                source={{
                  uri: item.Image,
                }}></Image>

              <View style={{flexDirection: 'column', marginLeft: 5}}>
                <Text style={styles.itemName}>{item.key}</Text>

                <Text style={styles.itemmsg}>{item.message}</Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemName: {
    padding: 5,
    fontSize: 18,
    color: '#075E54',
    fontWeight: 'bold',
  },
  itemmsg: {
    padding: 5,
    fontSize: 18,
    color: '#000000',
    marginRight: 40,
  },
  notification: {
    flexDirection: 'row',
    margin: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 63,
  },
});
