import React, { Component } from 'react';
import { Platform, View, Image, CameraRoll, StyleSheet, Alert, Button } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { PhotoPicker_VM } from '../stores/models/PhotoPickerScreenVM';
import { getAbsolutePath, fileToBase64, generateFileName } from '../util/fileHelper';
import { Chat_VM } from '../stores/models/ChatScreenVM';
import LeanCloud from '../IMClient/LeanCloud';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridView: {
    // marginTop: 50,
    flex: 1,
    flexDirection: 'row',
  },
  itemContainer: {
    justifyContent: 'flex-start',
    margin: 0,
  },
  checkBox: {
    position: 'absolute',
    right: 0,
    top: 0,
    left: 85,
    bottom: 85,
  },
});

class PhotoPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      lastCursor: null,
      noMorePhotos: false,
      loadingMore: false,
    };

    this.getPhotos = this.getPhotos.bind(this);
    this.appendPhotos = this.appendPhotos.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.send = this.send.bind(this);
  }

  componentDidMount() {
    this.getPhotos();
  }

  onCheck(image) {
    const { numOfChecked, checked } = this.props;
    if (numOfChecked >= 3 && !checked[image.uri]) {
      Alert.alert('can not exceed 3');
    } else {
      this.props.onCheck(image.uri);
    }
  }

  getPhotos() {
    const params = {
      first: 24,
      groupTypes: 'All',
      assetType: 'Photos',
    };

    if (Platform.OS === 'android') {
      delete params.groupTypes;
    }

    if (this.state.lastCursor) {
      params.after = this.state.lastCursor;
    }

    CameraRoll.getPhotos(params)
      .then(data => {
        this.appendPhotos(data);
      })
      .catch((e) => {
        Alert.alert(e);
      });
  }

  async send() {
    const { checked, addMessage, navigation } = this.props;
    const { conversation } = this.props.navigation.state.params;
    let i = 0;
    Object.entries(checked).forEach(async ([key, value]) => {
      if (value) {

        const path = await getAbsolutePath(key);
        const file = await fileToBase64(path);
        const data = { base64: file };
        const filename = generateFileName(conversation, i);
        console.log('begain to send');
        LeanCloud.sendImageMessage(conversation, data, filename)
          .then(result => {
          console.log(result);
          addMessage({ content: result, type: 'image', success: true });
          navigation.goBack();
        });
        i += 1;
      }
    });
  }

  tryPhotoLoad() {
    if (!this.state.loadingMore) {
      this.setState({ loadingMore: true }, () => { this.loadPhotos(); });
    }
  }

  appendPhotos(data) {
    const photos = data.edges;
    const nextState = {
      loadingMore: false,
    };

    if (!data.page_info.has_next_page) {
      nextState.noMorePhotos = true;
    }

    if (photos.length > 0) {
      nextState.lastCursor = data.page_info.end_cursor;
      nextState.photos = this.state.photos.concat(photos);
    }

    this.setState(nextState);
  }

  endReached() {
    if (!this.state.noMorePhotos) {
      this.tryPhotoLoad();
    }
  }

  render() {
    const { progress, numOfChecked, checked } = this.props;
    return (
      <View style={styles.container}>
        <Button title = {`send(${numOfChecked}/3)`} onPress = {this.send} />
        <FlatGrid
          itemDimension={90}
          items={this.state.photos}
          style={styles.gridView}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.node.image.uri }}
                style={{ width: 90, height: 90 }}
                key={index}
              />
              <CheckBox
                style={styles.checkBox}
                checked={checked[item.node.image.uri]}
                onIconPress={() => this.onCheck(item.node.image)}
              />
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  checked: state[PhotoPicker_VM].checked,
  numOfChecked: state[PhotoPicker_VM].numOfChecked,
  receiver: state[Chat_VM].receiver,
  progress: state[PhotoPicker_VM].progress,
  appKey: state[Chat_VM].appKey,
});

const mapDispatchToProps = dispatch => ({
  changeProgress: v => dispatch[PhotoPicker_VM].changeProgress({ progress: v }),
  onCheck: v => dispatch[PhotoPicker_VM].onCheck({ checked: v }),
  addMessage: v => dispatch[Chat_VM].addMessage({ message: v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotoPicker);
