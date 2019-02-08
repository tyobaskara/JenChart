/***  examples/src/index.js ***/
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import JenChart from '../../src';
import data from './data';

import './styles.css';

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
        <div
          ref={ref => (this.jenchart = ref)}
          style={{
            backgroundColor: '#f5f5f5',
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: '#f5f5f5',
            width: 320,
            margin: 'auto'
          }}
        >
          <h1
            style={{ paddingTop: 25, paddingBottom: 25, textAlign: 'center' }}
          >
            JenChart Default
          </h1>
          {this.state.jenchartWidth && (
            <JenChart
              data={data.slice(0, 6)}
              onPress={(index, item) => this._onPress(index, item)}
              activeIndex='3'
              platform='web'
              svgStyles={{
                backgroundColor: '#fff',
                width: this.state.jenchartWidth,
                height: 300
              }}
            />
          )}
        </div>

        <div
          ref={ref => (this.jeenchart = ref)}
          style={{
            backgroundColor: '#f5f5f5',
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: '#f5f5f5',
            width: 660,
            margin: 'auto'
          }}
        >
          <h1
            style={{ paddingTop: 25, paddingBottom: 25, textAlign: 'center' }}
          >
            JenChart With Props
          </h1>
          {this.state.jeenchartWidth && (
            <JenChart
              activeColor='green'
              activeIndex='0'
              axisColor='red'
              barColor={{ barLeft: 'green', barRight: 'blue' }}
              circleStyle={{
                r: '5',
                fill: 'red'
              }}
              data={data}
              labelTopStyle={{
                fill: 'red',
                fontSize: '10',
                fontWeight: '600'
              }}
              labelBottomStyle={{
                fill: 'orange',
                fontSize: '10',
                fontWeight: '400'
              }}
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
                height: 400
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
