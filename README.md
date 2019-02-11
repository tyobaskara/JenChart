# JenChart

Demo:
https://tyobaskara.github.io/JenChart/

## publish npm
- BABEL_ENV=production yarn transpile
- npm publish 

## publish demo github pages
- npm run publish-demo

## Data
```
[
  {
    label: 'Jan',
    year: '2018',
    value: {
      income: 5000000,
      spending: 2500000,
      nett: 2500000
    }
  },
  ...
]
```

## Web - React js

```
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import JenChart from 'jenchart';
import data from './data';

import './styles.css';
import { jenChartWrapper, jeenChartWrapper, titleStyle } from './styles';

export default class App extends PureComponent {
  state = {
    jenchartWidth: null,
    jeenchartWidth: null
  };

  measure() {
    this.setState({
      jenchartWidth: this.jenchart.clientWidth,
      jeenchartWidth: this.jeenchart.clientWidth
    });
  }

  componentDidMount() {
    this.measure();
  }

  componentDidUpdate() {
    this.measure();
  }

  _onPress = (index, item) => {
    console.log(index, item);
  };

  render() {
    return (
      <div>
        <div ref={ref => (this.jenchart = ref)} style={jenChartWrapper}>
          <h1 style={titleStyle}>JenChart Default</h1>
          {this.state.jenchartWidth && (
            <JenChart
              data={data.slice(0, 6)}
              activeIndex='3'
              platform='web'
              onPress={(index, item) => this._onPress(index, item)}
              svgStyles={{
                backgroundColor: '#fff',
                width: this.state.jenchartWidth,
                height: 300
              }}
            />
          )}
        </div>

        <div ref={ref => (this.jeenchart = ref)} style={jeenChartWrapper}>
          <h1 style={titleStyle}>JenChart With Props</h1>
          {this.state.jeenchartWidth && (
            <JenChart
              activeColor='green'
              activeIndex='0'
              axisColor='lightblue'
              axisLabelColor='brown'
              axisLabelSize='15'
              barColor={{ barLeft: 'green', barRight: 'blue' }}
              circleStyle={{
                r: '5',
                fill: 'red'
              }}
              data={data}
              labelTopStyle={{
                fill: 'red',
                fontSize: '13',
                fontWeight: '600'
              }}
              labelBottomStyle={{
                fill: 'orange',
                fontSize: '13',
                fontWeight: '400'
              }}
              labelBottomPosition={30}
              lineStyle={{
                stroke: 'magenta',
                strokeWidth: 3
              }}
              marginVertical={50}
              onPress={(index, item) => this._onPress(index, item)}
              platform='web'
              svgStyles={{
                backgroundColor: '#fff',
                width: this.state.jeenchartWidth,
                height: 450
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
```

## Mobile - React Native

```
import React, { PureComponent } from 'react';
import { Dimensions, View, Text, Platform, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

import data from './data';
import {
  AxisGeneration,
  BarGeneration,
  BarLine,
  BarChart
} from '../../components/BarChart';

import JenChart from 'jenchart';

import styles from './styles';

export default class Chart extends PureComponent {
  _onPress = (index, item) => {
    console.log(index, item);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>JenChart Default</Text>
          <JenChart
            data={data.slice(0, 6)}
            onPress={(index, item) => this._onPress(index, item)}
            activeIndex='3'
            platform={Platform.OS}
            svgStyles={{
              backgroundColor: '#fff',
              width: width,
              height: 250
            }}
          />
        </View>

        <Text style={styles.title}>JenChart With Props</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.sectionScroll}
        >
          <JenChart
            activeColor='green'
            activeIndex='0'
            axisColor='lightblue'
            axisLabelColor='brown'
            axisLabelSize='12'
            barColor={{ barLeft: 'green', barRight: 'blue' }}
            circleStyle={{
              r: '5',
              fill: 'red'
            }}
            data={data}
            labelTopStyle={{
              fill: 'red',
              fontSize: '13',
              fontWeight: '600'
            }}
            labelBottomStyle={{
              fill: 'orange',
              fontSize: '13',
              fontWeight: '400'
            }}
            labelBottomPosition={30}
            lineStyle={{
              stroke: 'magenta',
              strokeWidth: 3
            }}
            marginVertical={50}
            onPress={(index, item) => this._onPress(index, item)}
            platform={Platform.OS}
            svgStyles={{
              backgroundColor: '#fff',
              width: 700,
              height: 400
            }}
          />
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.title}>BarChart</Text>
          <BarChart data={data} round={100} unit='€' />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Bar Generation</Text>
          <BarGeneration data={data} />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>BarLine</Text>
          <BarLine />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Axis Generation</Text>
          <AxisGeneration />
        </View>
      </ScrollView>
    );
  }
}
```
