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
export default {
  pfmOverviews: [
    {
      cif: '49022A',
      currency: 'idr',
      timeGroup: 'monthly',
      lastTransactionDate: '2019-02-20T04:18:28.908Z',
      pfmTypes: [
        {
          id: '1',
          name: 'Income',
          colorIncrease: '#123456',
          colorDecrease: '#123456',
          total: 200000,
          previousGroupDifferencePercentage: 20,
          pfmCategories: [
            {
              id: '1',
              name: 'Salary',
              color: '#123456',
              transactionCategories: ['201', '205', '212', '213'],
              isSummaryOnly: false,
              total: 100000,
              totalPercentage: 50
            },
            {
              id: '2',
              name: 'Incoming',
              color: '#123456',
              transactionCategories: ['202', '204', '210', '211', '214'],
              isSummaryOnly: false,
              total: 60000,
              totalPercentage: 30
            },
            {
              id: '3',
              name: 'Interest',
              color: '#123456',
              transactionCategories: ['206', '207'],
              isSummaryOnly: false,
              total: 40000,
              totalPercentage: 20
            }
          ]
        },
        {
          id: '2',
          name: 'Spending',
          colorIncrease: '#123456',
          colorDecrease: '#123456',
          total: 100000,
          previousGroupDifferencePercentage: 10,
          pfmCategories: [
            {
              id: '4',
              name: 'Installment',
              color: '#123456',
              transactionCategories: ['103', '105', '109', '112', '142'],
              isSummaryOnly: false,
              total: 30000,
              totalPercentage: 30
            },
            {
              id: '5',
              name: 'Routine',
              color: '#123456',
              transactionCategories: [
                '101',
                '102',
                '106',
                '107',
                '108',
                '110',
                '114',
                '115',
                '118',
                '123',
                '125',
                '129',
                '130',
                '131',
                '132',
                '138',
                '140',
                '141',
                '143',
                '144',
                '215'
              ],
              isSummaryOnly: false,
              total: 10000,
              totalPercentage: 10
            },
            {
              id: '6',
              name: 'Charity',
              color: '#123456',
              transactionCategories: ['133', '135'],
              isSummaryOnly: false,
              total: 20000,
              totalPercentage: 20
            },
            {
              id: '7',
              name: 'Lifestyle',
              color: '#123456',
              transactionCategories: [
                '104',
                '117',
                '119',
                '120',
                '121',
                '122',
                '124',
                '126',
                '127',
                '128',
                '134',
                '137',
                '203'
              ],
              isSummaryOnly: false,
              total: 13000,
              totalPercentage: 13
            },
            {
              id: '8',
              name: 'Uncategorized',
              color: '#123456',
              transactionCategories: ['116', '998'],
              isSummaryOnly: true,
              total: 17000,
              totalPercentage: 17
            }
          ]
        },
        {
          id: '3',
          name: 'Net',
          colorIncrease: '#123456',
          colorDecrease: '#123456',
          total: 100000,
          previousGroupDifferencePercentage: 0,
          pfmCategories: []
        },
        {
          id: '4',
          name: 'Balance',
          colorIncrease: '#123456',
          colorDecrease: '#123456',
          total: 300000,
          previousGroupDifferencePercentage: 0,
          pfmCategories: []
        }
      ],
      __typename: 'PfmOverview'
    },
    {
      ...
    },
    ...
}
```

## Web - React js

Example:

```
// examples/src/index.js

import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import JenChart from '../../src';
import pfmData from './data';

import './styles.css';
import triangle from '../../src/triangle.png';
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
    pfmData.pfmOverviews.reverse();
    this.measure();
  }

  componentDidUpdate() {
    this.measure();
  }

  _onPress = (index, item) => {
    console.log(index, item);
  };

  _detectmob = () =>
    window.innerWidth <= 800 && window.innerHeight <= 600 ? true : false;

  render() {
    return (
      <div>
        <div ref={ref => (this.jenchart = ref)} style={jenChartWrapper}>
          <h1 style={titleStyle}>JenChart Default</h1>
          {this.state.jenchartWidth && (
            <JenChart
              svgStyles={{
                backgroundColor: '#fff',
                width: this.state.jenchartWidth,
                height: 300
              }}
              activeIndex='1'
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
              data={pfmData.pfmOverviews}
              reverseData
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
              trianglePosition={6}
              triangleSrc={triangle}
              triangleScale={15}
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
              borderBottom
              borderBottomProp={{
                stroke: '#dfdfdf',
                strokeWidth: 2
              }}
              data={pfmData.pfmOverviews}
              reverseData
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
              graphMarginVertical={50}
              onPress={(index, item) => this._onPress(index, item)}
              platform='web'
              svgStyles={{
                backgroundColor: '#fff',
                width: this.state.jeenchartWidth,
                height: 450
              }}
              trianglePosition={6}
              triangleSrc={triangle}
              triangleScale={15}
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
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  onPress: () => {},
  reverseData: false,
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
  borderBottom: PropTypes.bool,
  borderBottomProp: PropTypes.object,
  circleStyle: PropTypes.object,
  isBabelSix: PropTypes.bool,
  graphBarWidth: PropTypes.number,
  graphMarginVertical: PropTypes.number,
  labelTopStyle: PropTypes.object,
  labelTopPosition: PropTypes.number,
  labelBottomStyle: PropTypes.object,
  labelBottomPosition: PropTypes.number,
  lineStyle: PropTypes.object,
  months: PropTypes.array,
  onPress: PropTypes.func,
  reverseData: PropTypes.bool,
  svgStyles: PropTypes.object,
  trianglePosition: PropTypes.number,
  triangleScale: PropTypes.number
};
```
