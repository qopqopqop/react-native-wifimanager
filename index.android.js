/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';
import wifi from 'react-native-android-wifi';
import { Container, Content, Picker, List, ListItem, Button, Text, InputGroup, Input, Form, Item, Toast } from 'native-base';
const Itemp = Picker.Item


export default class WifiApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected1: '0',
      wifiList: [],
      password: '',
      ssid: '',
      showToast: false
    }
  }

  onValueChange(value: string) {
    console.log('value-----------' + value);
    this.setState({
      selected1: value
    });
    let selectedSsid = this.state.wifiList[value];

    console.log('ssid----------' + selectedSsid.SSID)

    this.setState({ ssid: selectedSsid.SSID })
  }

  getWifiNetworks() {
    wifi.loadWifiList((wifiStringList) => {
      var wifiArray = JSON.parse(wifiStringList);
      this.setState({
        wifiList: wifiArray,
      });
      let selectedSsidDefault = this.state.wifiList[this.state.selected1];
      this.setState({ ssid: selectedSsidDefault.SSID });

      console.log(this.state.wifiList);

      console.log('------------------' + this.state.ssid);
    },
      (error) => {
        console.log(error);
      }
    );
  }

  connectOnPress() {
    wifi.findAndConnect(this.state.ssid, this.state.password, (found) => {
      if (found) {
        console.log('connected successfully...');
        Toast.show({
              // supportedOrientations=['potrait','landscape'],
              text: 'connected successfully...!',
              position: 'bottom',
              buttonText: 'Okay'
            })
      } else {
        console.log('unable to connect....');
        Toast.show({
              // supportedOrientations=['potrait','landscape'],
              text: 'unable to connect....!',
              position: 'bottom',
              buttonText: 'Okay'
            })
      }
    });
  }

  componentDidMount() {
    this.getWifiNetworks();
  }

  render() {
    return (

      <Container>
        <Content>
          <Text>Select Wifi</Text>
          <Picker
            supportedOrientations={['portrait', 'landscape']}
            iosHeader="Select one"
            mode="dropdown"
            selectedValue={this.state.selected1}
            onValueChange={this.onValueChange.bind(this) }>
            {this.state.wifiList.map((l, i) => { return <Itemp value={i} label={l.SSID} key={i}  /> }) }
          </Picker>
          <Form>
            <Item regular>
              <Input placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({ password }) }/>
            </Item>
          </Form>
          <Button block style={{ margin: 20, top: 20 }} onPress={this.connectOnPress.bind(this) }><Text> Connect </Text></Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('WifiApp', () => WifiApp);
