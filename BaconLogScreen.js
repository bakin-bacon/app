import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  View,
  Image,
  Text,
} from 'react-native';
import moment from 'moment';
import * as Colors from './Colors';

export class BaconLogScreen extends Component {
    static navigationOptions = {
        title: "My 🥓 Log",
        tabBarLabel: "🥓Log",
        headerStyle: {backgroundColor: Colors.primary },
        headerTitleStyle: { color: Colors.titleColor }
    };

    constructor(props) {
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
          dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3']),
      };
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={this.renderListRow.bind(this)}
            />
        );
    }

    durationText(duration) {
        var minutes = Math.floor(duration / 60);
        var seconds = duration % 60;
        return (minutes == 0 ? "0" : minutes) + ":" + (seconds == 0 ? "00" : (seconds < 10) ? "0" + seconds : seconds);
    }

    timestampText(timestamp) {
        var local = moment(timestamp);
        return local.format('MMMM Do YYYY, h:mm:ss a');
    }

    renderListRow(baconBit){
        return (
            <View style={styles.row}>
                {this.renderBsiImage(0)}
                <View style={styles.column}>
                    <Text style={styles.duration}>{this.durationText(1200)}</Text>
                    <Text style={styles.timestamp}>{this.timestampText("20170805T121212Z")}</Text>
                </View>
            </View>
        )
    }

    renderBsiImage(bci) {
        switch(bci) {
            case -1:
                return (
                        <Image
                            style={ styles.bsiPhoto }
                            source={require('./images/Burnt-Bacon.png')}
                        />
                    )
            case 1:
                return (
                        <Image
                            style={ styles.bsiPhoto }
                            source={require('./images/Undercooked-Bacon.png')}
                        />
                    )
            default:
                return (
                        <Image
                            style={ styles.bsiPhoto }
                            source={require('./images/JustRight-Bacon.png')}
                        />
                    )
        }
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 24,
    justifyContent: 'center',
  },
  bsiPhoto: {
    height:64,
    width: 64,
    borderRadius: 32,
    marginTop: 32,
    marginBottom: 32,
    marginLeft: 24
  },
  duration: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  timestamp: {
    fontSize: 16,
  },
});
