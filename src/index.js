import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Svg, G, Line, Rect, Text, Circle, Image } from 'svgs';
import * as d3 from 'd3';

export default class JenChart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      activeIndex: '0'
    };
  }

  componentWillMount() {
    const { activeIndex, data } = this.props;

    if (activeIndex) {
      this.setState({ activeIndex });
    }
    if (parseInt(activeIndex) + 1 > data.length) {
      console.warn('activeIndex props exceeds the data length.');
    }
  }

  _formatAxisLabel = value => {
    if (value.toString().length > 9) {
      return value / 1000000000 + 'B';
    } else if (value.toString().length > 6) {
      return value / 1000000 + 'M';
    } else {
      return value / 1000 + 'K';
    }
  };

  _axisLabel = (y, value) => {
    const { axisLabelColor, axisLabelSize } = this.props;

    return (
    <Text
      x='5'
      textAnchor='start'
      y={y ? y(value) * -1 - 5 : -2}
      fontSize={axisLabelSize ? axisLabelSize : 10 }
      fill={axisLabelColor ? axisLabelColor : 'black'}
      fillOpacity={0.4}
    >
      {value ? this._formatAxisLabel(value) : 0}
    </Text>
  )};

  _drawTopAxis = (axisColors, topValue, graphWidth, y) => (
    <G>
      <Line
        x1='0'
        y1={y(topValue) * -1}
        x2={graphWidth}
        y2={y(topValue) * -1}
        stroke={axisColors.axis}
        strokeDasharray={[3, 3]}
        strokeWidth='3'
      />

      {this._axisLabel(y, topValue)}
    </G>
  );

  _drawMiddleTopAxis = (axisColors, middleTopValue, graphWidth, y) => (
    <G>
      <Line
        x1='0'
        y1={y(middleTopValue) * -1}
        x2={graphWidth}
        y2={y(middleTopValue) * -1}
        stroke={axisColors.axis}
        strokeDasharray={[3, 3]}
        strokeWidth='3'
      />

      {this._axisLabel(y, middleTopValue)}
    </G>
  );

  _drawMiddleAxis = (axisColors, middleValue, graphWidth, y) => (
    <G>
      <Line
        x1='0'
        y1={y(middleValue) * -1}
        x2={graphWidth}
        y2={y(middleValue) * -1}
        stroke={axisColors.axis}
        strokeDasharray={[3, 3]}
        strokeWidth='3'
      />

      {this._axisLabel(y, middleValue)}
    </G>
  );

  _drawMiddleBottomAxis = (axisColors, middleBottomValue, graphWidth, y) => (
    <G>
      <Line
        x1='0'
        y1={y(middleBottomValue) * -1}
        x2={graphWidth}
        y2={y(middleBottomValue) * -1}
        stroke={axisColors.axis}
        strokeDasharray={[3, 3]}
        strokeWidth='3'
      />

      {this._axisLabel(y, middleBottomValue)}
    </G>
  );

  _drawBottomAxis = (axisColors, graphWidth) => (
    <G>
      <Line
        x1='0'
        y1='2'
        x2={graphWidth}
        y2='2'
        stroke={axisColors.axis}
        strokeWidth='3'
      />

      {this._axisLabel()}
    </G>
  );

  _drawBottomLabels = (index, item, x, GRAPH_MARGIN_VERTICAL) => {
    const {
      activeColor,
      labelTopStyle,
      labelBottomStyle,
      labelBottomPosition
    } = this.props;

    const labelActiveStyles = this._activeIndex(index) && {
      fill: activeColor ? activeColor : '#00a4de'
    };
    const labelTopStyles = {
      fill: '#7d7d7d',
      fontSize: '10',
      fontWeight: '600',
      ...labelTopStyle,
      ...labelActiveStyles
    };
    const labelBottomStyles = {
      fill: '#7d7d7d',
      fontSize: '10',
      fontWeight: '400',
      ...labelBottomStyle,
      ...labelActiveStyles
    };
    const triangleSize = 10;

    return (
      <G key={'label' + item.label}>
        <Text
          style={labelTopStyles}
          x={x(item.label) + 5}
          y='15'
          textAnchor='middle'
        >
          {item.label}
        </Text>

        <Text
          style={labelBottomStyles}
          x={x(item.label) + 5}
          y={labelBottomPosition ? labelBottomPosition : 25}
          textAnchor='middle'
        >
          {item.year}
        </Text>

        {this._activeIndex(index) && (
          <Image
            x={x(item.label)}
            y={GRAPH_MARGIN_VERTICAL - triangleSize}
            width={triangleSize}
            height={triangleSize}
            preserveAspectRatio='xMidYMid slice'
            opacity='1'
            href={require('./triangle.png')}
            clipPath='url(#clip)'
          />
        )}
      </G>
    );
  };

  _drawBars = (item, GRAPH_BAR_WIDTH, x, y) => {
    const barColors = {
      barLeft: '#8fbc5a',
      barRight: '#fc9d13',
      ...this.props.barColor
    };

    return (
      <G>
        <Rect
          x={x(item.label) - GRAPH_BAR_WIDTH / 2}
          y={y(item.value.income) * -1}
          rx={2.5}
          width={GRAPH_BAR_WIDTH}
          height={y(item.value.income)}
          fill={barColors.barLeft}
        />
        <Rect
          x={x(item.label) + 7}
          y={y(item.value.spending) * -1}
          rx={2.5}
          width={GRAPH_BAR_WIDTH}
          height={y(item.value.spending)}
          fill={barColors.barRight}
        />
      </G>
    );
  };

  _drawCircle = (item, x, y) => {
    const circleStyles = {
      r: '5',
      fill: '#00a4de',
      ...this.props.circleStyle
    };

    return (
      <Circle
        cx={x(item.label) + 5}
        cy={y(item.value.nett) * -1}
        {...circleStyles}
      />
    );
  };

  _drawLine = (x, y, index, array) => {
    const lineStyles = {
      stroke: '#00a4de',
      strokeWidth: 3,
      ...this.props.lineStyle
    };

    return (
      <Line
        x1={x(array[index].label) + 5}
        y1={y(array[index].value.nett) * -1}
        x2={x(array[index + 1].label) + 5}
        y2={y(array[index + 1].value.nett) * -1}
        style={lineStyles}
      />
    );
  };

  _getMaxValue = data =>
    d3.max(data, d => {
      const maxOne =
        d.value.income > d.value.spending ? d.value.income : d.value.spending;
      const maxTwo = maxOne > d.value.nett ? maxOne : d.value.nett;

      return maxTwo;
    });

  _rectOnPress = (index, item) => {
    this.setState({ activeIndex: index.toString() });
    this.props.onPress(index, item);
  };

  _drawRectOnPress = (
    index,
    item,
    x,
    GRAPH_BAR_WIDTH,
    graphHeight,
    GRAPH_MARGIN_VERTICAL,
    platform
  ) => {
    const propsOnpress = {};

    if (platform !== 'web') {
      propsOnpress.onPress = () => this._rectOnPress(index, item);
    }

    return (
      <Rect
        x={x(item.label) - GRAPH_BAR_WIDTH / 2}
        y={graphHeight * -1}
        width={x(item.label) - GRAPH_BAR_WIDTH / 2}
        height={graphHeight + GRAPH_MARGIN_VERTICAL}
        fill='transparent'
        opacity='0.5'
        {...propsOnpress}
      />
    );
  };

  _activeIndex = index => this.state.activeIndex === index.toString() && true;

  render() {
    const {
      axisColor,
      barWidth,
      marginVertical,
      platform,
      svgStyles
    } = this.props;
    const GRAPH_MARGIN_VERTICAL = marginVertical || 40;
    const GRAPH_BAR_WIDTH = barWidth || 10;
    const axisColors = {
      axis: axisColor || '#f5f5f5'
    };

    // Dimensions
    const { data } = this.state;
    const SVGHeight = svgStyles.height;
    const SVGWidth = svgStyles.width;
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN_VERTICAL;
    const graphWidth = SVGWidth;

    // X scale point
    const xDomain = data.map(item => item.label);
    const xRange = [0, graphWidth];
    const x = d3
      .scalePoint()
      .domain(xDomain)
      .range(xRange)
      .padding(1);

    // Y scale linear
    const topValue = Math.ceil(this._getMaxValue(data));
    const yDomain = [0, topValue];
    const yRange = [0, graphHeight];
    const y = d3
      .scaleLinear()
      .domain(yDomain)
      .range(yRange);

    // top axis and middle axis
    const middleValue = topValue / 2;
    const middleTopValue = (topValue + middleValue) / 2;
    const middleBottomValue = middleValue / 2;

    return (
      <Svg style={svgStyles}>
        <G y={graphHeight + GRAPH_MARGIN_VERTICAL}>
          {this._drawTopAxis(axisColors, topValue, graphWidth, y)}
          {this._drawMiddleTopAxis(axisColors, middleTopValue, graphWidth, y)}
          {this._drawMiddleAxis(axisColors, middleValue, graphWidth, y)}
          {this._drawMiddleBottomAxis(
            axisColors,
            middleBottomValue,
            graphWidth,
            y
          )}
          {this._drawBottomAxis(axisColors, graphWidth)}

          {data.map((item, index, array) =>
            this._drawBottomLabels(index, item, x, GRAPH_MARGIN_VERTICAL)
          )}
        </G>

        {data.map(item => (
          <G y={graphHeight + GRAPH_MARGIN_VERTICAL} key={'bar' + item.label}>
            {this._drawBars(item, GRAPH_BAR_WIDTH, x, y)}
            {this._drawCircle(item, x, y)}
          </G>
        ))}

        {data.map(
          (item, index, array) =>
            index < array.length - 1 && (
              <G
                y={graphHeight + GRAPH_MARGIN_VERTICAL}
                key={'line' + item.label}
              >
                {this._drawLine(x, y, index, array)}
              </G>
            )
        )}

        {data.map((item, index, array) =>
          platform === 'web' ? (
            <Svg
              y={graphHeight + GRAPH_MARGIN_VERTICAL}
              key={'rectOnPress' + item.label}
              onClick={() => this._rectOnPress(index, item)}
              style={{ overflow: 'initial' }}
            >
              {this._drawRectOnPress(
                index,
                item,
                x,
                GRAPH_BAR_WIDTH,
                graphHeight,
                GRAPH_MARGIN_VERTICAL,
                platform
              )}
            </Svg>
          ) : (
            <G
              y={graphHeight + GRAPH_MARGIN_VERTICAL}
              key={'rectOnPress' + item.label}
            >
              {this._drawRectOnPress(
                index,
                item,
                x,
                GRAPH_BAR_WIDTH,
                graphHeight,
                GRAPH_MARGIN_VERTICAL,
                platform
              )}
            </G>
          )
        )}
      </Svg>
    );
  }
}

JenChart.defaultProps = {
  activeColor: '',
  activeIndex: '',
  axisColor: '',
  axisLabelColor: '',
  axisLabelSize: '',
  barColor: {},
  circleStyle: {},
  labelTopStyle: {},
  labelBottomStyle: {},
  labelBottomPosition: 0,
  lineStyle: {},
  marginVertical: 0,
  onPress: () => {},
  svgStyles: {}
};

JenChart.propTypes = {
  data: PropTypes.array.isRequired,
  platform: PropTypes.string.isRequired,
  activeColor: PropTypes.string,
  activeIndex: PropTypes.string,
  axisColor: PropTypes.string,
  axisLabelColor: PropTypes.string,
  axisLabelSize: PropTypes.string,
  barColor: PropTypes.object,
  circleStyle: PropTypes.object,
  labelTopStyle: PropTypes.object,
  labelBottomStyle: PropTypes.object,
  labelBottomPosition: PropTypes.number,
  lineStyle: PropTypes.object,
  marginVertical: PropTypes.number,
  onPress: PropTypes.func,
  svgStyles: PropTypes.object
};
