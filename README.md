# JenChart

Demo Web:
https://tyobaskara.github.io/JenChart/

Demo Apps:
https://expo.io/@tyobaskara/chartExpo

## Usage

Web :

- npm i jenchart d3 svgs prop-types

React Native without expo:

- react-native init myProject
- cd myProject
- npm i jenchart react-native-svg d3 svgs prop-types
- react-native link

React Native with expo:

- expo init myProject
- cd myProject
- npm i jenchart d3 svgs prop-types && yarn add expo

## Babel 6 Support

// Triangle Image Position Bottom Fixed in Babel 6

```
<Jenchart
  isBabelSix
 />
```

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

Example 1:

```
_renderJenChart = () =>
    Platform.OS === 'web' ? (
      <View
        onLayout={event => {
          const { width } = event.nativeEvent.layout;
          this.setState({ webChartWidth: width });
        }}
      >
        {this.state.webChartWidth && this._renderWebJenChart()}
      </View>
    ) : (
      this._renderMobJenChart()
    );

  _renderWebJenChart = () => (
    <JenChart
      activeIndex='3'
      axisLabelSize={this._detectmob() ? '11' : '14'}
      axisLabelLeftPos={10}
      axisCustom={{
        strokeDasharray: [0, 0],
        strokeWidth: 2
      }}
      borderBottom
      borderBottomProp={{
        stroke: '#dfdfdf',
        strokeWidth: 2
      }}
      data={data.slice(0, 6)}
      labelTopStyle={{
        fontSize: '14'
      }}
      labelBottomStyle={{
        fontSize: '14'
      }}
      labelTopPosition={20}
      labelBottomPosition={35}
      graphMarginVertical={60}
      onPress={(index, item) => this._onPress(index, item)}
      platform='web'
      svgStyles={{
        backgroundColor: '#fff',
        width: this.state.webChartWidth,
        height: 300
      }}
      trianglePosition={6}
      triangleSrc={triangle}
      triangleScale={15}
    />
  );
```

Example 2:

```
// examples/src/index.js

import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import JenChart from 'jenchart';
import data from './data';

import './styles.css';
import triangle from './triangle.png';
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
              triangleSrc={triangle}
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
              graphBarWidth={50}
              onPress={(index, item) => this._onPress(index, item)}
              platform='web'
              svgStyles={{
                backgroundColor: '#fff',
                width: this.state.jeenchartWidth,
                height: 450
              }}
              triangleSrc={triangle}
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

Example 1:

```
_renderMobJenChart = () => {
    const { width } = Dimensions.get('window');

    return (
      <JenChart
        activeIndex='3'
        axisCustom={{
          strokeDasharray: [0, 0],
          strokeWidth: 2
        }}
        borderBottom
        borderBottomProp={{
          stroke: '#dfdfdf',
          strokeWidth: 2
        }}
        data={data.slice(0, 6)}
        isBabelSix
        onPress={(index, item) => this._onPress(index, item)}
        platform='mobile'
        svgStyles={{
          backgroundColor: '#fff',
          width,
          height: 250
        }}
        trianglePosition={6}
        triangleSrc={triangle}
        triangleScale={15}
      />
    );
  };
```

Example 2:

```
// https://github.com/tyobaskara/learn-react-native/tree/master/JenChart/chartExpo

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
import triangle from './triangle.png';

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
            triangleSrc={triangle}
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
            graphBarWidth={50}
            onPress={(index, item) => this._onPress(index, item)}
            platform={Platform.OS}
            svgStyles={{
              backgroundColor: '#fff',
              width: 700,
              height: 400
            }}
            triangleScale={10}
            triangleSrc={triangle}
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

## Props

```
JenChart.defaultProps = {
  activeColor: '#00a4de',
  activeIndex: '0',
  axisColor: '#f5f5f5',
  axisCustom: {},
  axisLabelColor: 'black',
  axisLabelLeftPos: 5,
  axisLabelSize: '10',
  barColor: {},
  borderBottom: false,
  borderBottomProp: {},
  circleStyle: {},
  data: [],
  isBabelSix: false,
  graphBarWidth: 12,
  labelTopStyle: {},
  labelTopPosition: 15,
  labelBottomStyle: {},
  labelBottomPosition: 25,
  lineStyle: {},
  graphMarginVertical: 40,
  onPress: () => {},
  svgStyles: {},
  trianglePosition: 0,
  triangleScale: 10
};

JenChart.propTypes = {
  data: PropTypes.array.isRequired,
  platform: PropTypes.string.isRequired,
  activeColor: PropTypes.string,
  activeIndex: PropTypes.string,
  axisColor: PropTypes.string,
  axisCustom: PropTypes.object,
  axisLabelColor: PropTypes.string,
  axisLabelLeftPos: PropTypes.number,
  axisLabelSize: PropTypes.string,
  barColor: PropTypes.object,
  graphBarWidth: PropTypes.number,
  borderBottom: PropTypes.bool,
  borderBottomProp: PropTypes.object,
  circleStyle: PropTypes.object,
  isBabelSix: PropTypes.bool,
  labelTopStyle: PropTypes.object,
  labelTopPosition: PropTypes.number,
  labelBottomStyle: PropTypes.object,
  labelBottomPosition: PropTypes.number,
  lineStyle: PropTypes.object,
  graphMarginVertical: PropTypes.number,
  onPress: PropTypes.func,
  svgStyles: PropTypes.object,
  trianglePosition: PropTypes.number,
  triangleScale: PropTypes.number
};
```