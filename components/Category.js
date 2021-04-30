import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Items from '../MoreItems/Scolllist';

class Category extends Component {
  state = {
    favorite: false,
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {favorite} = this.state;
    const {modalVisible} = this.state;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('CardItem')}
        activeOpacity={0.7}>
        <View
          style={{
            height: 200,
            width: 250,
            marginLeft: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#dddddd',
            padding: 5,
            marginBottom: 20,
            elevation: 2,
            backgroundColor: '#FFF',
            marginHorizontal: 10,
            shadowColor: '#000',
            shadowRadius: 5,
            shadowOpacity: 0.3,
            shadowOffset: {x: 8, y: -8},
            overflow: 'hidden',
          }}>
          <View style={{flex: 5, height: 250, width: 238, marginTop: 30}}>
            <Image
              source={this.props.imageUri}
              style={{flex: 1, width: 120, height: 80}}
            />

            <Icon
              name={favorite ? 'heart' : 'heart-o'}
              color={favorite ? '#F44336' : 'rgb(50, 50, 50)'}
              size={30}
              onPress={() => this.setState({favorite: !favorite})}
              style={{
                position: 'absolute',
                right: 10,
                top: -10,
                fontSize: 20,
              }}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible);
            }}>
            <Items />
          </Modal>
        </View>
      </TouchableOpacity>
    );
  }
}
export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
