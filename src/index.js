import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Svg, G, Line, Rect, Text, Circle, Image } from 'svgs';
import * as d3 from 'd3';

import { _formatAxisLabel, _getMonth, _getYear, _selectObject } from './util';

export default class JenChart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      activeIndex: this.props.activeIndex
    };
  }

  _axisLabel = (y, value) => {
    const { axisLabelColor, axisLabelSize, axisLabelLeftPos } = this.props;

    return (
      <Text
        x={axisLabelLeftPos}
        textAnchor='start'
        y={y ? y(value) * -1 - 5 : -2}
        fontSize={axisLabelSize}
        fill={axisLabelColor}
        fillOpacity={0.4}
      >
        {value ? _formatAxisLabel(value) : 0}
      </Text>
    );
  };

  _drawTopAxis = (axisCustomProp, topValue, graphWidth, y) => (
    <G>
      <Line
        x1='0'
        y1={y(topValue) * -1}
        x2={graphWidth}
        y2={y(topValue) * -1}
        {...axisCustomProp}
      />

      {this._axisLabel(y, topValue)}
    </G>
  );

  _drawMiddleTopAxis = (axisCustomProp, middleTopValue, graphWidth, y) => (
    <G>
      <Line
        x1='0'
        y1={y(middleTopValue) * -1}
        x2={graphWidth}
        y2={y(middleTopValue) * -1}
        {...axisCustomProp}
      />

      {this._axisLabel(y, middleTopValue)}
    </G>
  );

  _drawMiddleAxis = (axisCustomProp, middleValue, graphWidth, y) => (
    <G>
      <Line
        x1='0'
        y1={y(middleValue) * -1}
        x2={graphWidth}
        y2={y(middleValue) * -1}
        {...axisCustomProp}
      />

      {this._axisLabel(y, middleValue)}
    </G>
  );

  _drawMiddleBottomAxis = (
    axisCustomProp,
    middleBottomValue,
    graphWidth,
    y
  ) => (
    <G>
      <Line
        x1='0'
        y1={y(middleBottomValue) * -1}
        x2={graphWidth}
        y2={y(middleBottomValue) * -1}
        {...axisCustomProp}
      />

      {this._axisLabel(y, middleBottomValue)}
    </G>
  );

  _drawBottomAxis = (axisCustomProp, graphWidth) => (
    <G>
      <Line
        x1='0'
        y1='2'
        x2={graphWidth}
        y2='2'
        stroke={axisCustomProp.stroke}
        strokeWidth={axisCustomProp.strokeWidth}
      />

      {this._axisLabel()}
    </G>
  );

  _drawBottomBorder = () => {
    const { svgStyles, borderBottomProp, graphMarginVertical } = this.props;
    const graphWidth = svgStyles.width;

    return (
      <Line x1='0' y1={graphMarginVertical} x2={graphWidth} y2={graphMarginVertical} {...borderBottomProp} />
    );
  };

  _drawBottomLabels = (index, item, x, graphMarginVertical) => {
    const {
      activeColor,
      fixTriangle,
      labelTopStyle,
      labelBottomStyle,
      labelBottomPosition,
      labelTopPosition,
      months,
      trianglePosition,
      triangleScale,
      triangleSrc
    } = this.props;

    const labelActiveStyles = this._activeIndex(index)
      ? {
          fill: activeColor
        }
      : null;
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
    const triangleSize = triangleScale;
    const triangleProps = fixTriangle
      ? {
          x: (x(item.lastTransactionDate) - (triangleSize / 2)) + 5,
          y: ((0 - graphMarginVertical) + triangleSize) - trianglePosition
        }
      : {
          x: x(item.lastTransactionDate),
          y: (graphMarginVertical - triangleSize) + trianglePosition
        };

    return (
      <G key={'label' + item.lastTransactionDate}>
        <Text
          {...labelTopStyles}
          x={x(item.lastTransactionDate) + 5}
          y={labelTopPosition}
          textAnchor='middle'
        >
          {months[_getMonth(item.lastTransactionDate) - 1]}
        </Text>

        <Text
          {...labelBottomStyles}
          x={x(item.lastTransactionDate) + 5}
          y={labelBottomPosition}
          textAnchor='middle'
        >
          {_getYear(item.lastTransactionDate)}
        </Text>

        {this._activeIndex(index) && triangleSrc && (
          <Image
            href={triangleSrc}
            preserveAspectRatio='xMidYMid slice'
            height={triangleSize}
            width={triangleSize}
            opacity='1'
            clipPath='url(#clip)'
            {...triangleProps}
          />
        )}
      </G>
    );
  };

  _drawBars = (item, graphBarWidth, x, y) => {
    const barColors = {
      barLeft: '#8fbc5a',
      barRight: '#fc9d13',
      ...this.props.barColor
    };
    const Income = _selectObject(item.pfmTypes, 'name', 'Income');
    const Spending = _selectObject(item.pfmTypes, 'name', 'Spending');

    return (
      <G>
        <Rect
          x={x(item.lastTransactionDate) - graphBarWidth / 2}
          y={y(Income.total) * -1}
          rx={2.5}
          width={graphBarWidth}
          height={y(Income.total)}
          fill={barColors.barLeft}
        />
        <Rect
          x={x(item.lastTransactionDate) + 7}
          y={y(Spending.total) * -1}
          rx={2.5}
          width={graphBarWidth}
          height={y(Spending.total)}
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
    const Net = _selectObject(item.pfmTypes, 'name', 'Net');

    return (
      <Circle
        cx={x(item.lastTransactionDate) + 5}
        cy={y(Net.total) * -1}
        {...circleStyles}
      />
    );
  };

  _drawLine = (x, y, index, array) => {
    const lineStyleFromProp = this.props.lineStyle;
    const lineStyles = {
      stroke: '#00a4de',
      strokeWidth: 3,
      ...lineStyleFromProp
    };
    const y1 = _selectObject(array[index].pfmTypes, 'name', 'Net');
    const y2 = _selectObject(array[index + 1].pfmTypes, 'name', 'Net');

    return (
      <Line
        x1={x(array[index].lastTransactionDate) + 5}
        y1={y(y1.total) * -1}
        x2={x(array[index + 1].lastTransactionDate) + 5}
        y2={y(y2.total) * -1}
        {...lineStyles}
      />
    );
  };

  _getMaxValue = data =>
    d3.max(data, d => {
      const Income = _selectObject(d.pfmTypes, 'name', 'Income');
      const Net = _selectObject(d.pfmTypes, 'name', 'Net');
      const Spending = _selectObject(d.pfmTypes, 'name', 'Spending');
      const maxOne =
        Income.total > Spending.total ? Income.total : Spending.total;
      const maxTwo = maxOne > Net.total ? maxOne : Net.total;

      return maxTwo;
    });

  _rectOnPress = (index, item) => {
    this.setState({ activeIndex: index });
    this.props.onPress(index, item);
  };

  _drawRectOnPress = (
    index,
    item,
    x,
    graphBarWidth,
    graphHeight,
    graphMarginVertical,
    platform
  ) => {
    const propsOnpress = {};

    if (platform !== 'web') {
      propsOnpress.onPressIn = () => this._rectOnPress(index, item);
    }

    return (
      <Rect
        x={x(item.lastTransactionDate) - graphBarWidth / 2}
        y={graphHeight * -1}
        width={graphBarWidth * 2}
        height={graphHeight + graphMarginVertical}
        fill='red'
        opacity='0.5'
        {...propsOnpress}
      />
    );
  };

  _activeIndex = index => this.state.activeIndex === index.toString() && true;

  render() {
    const {
      axisColor,
      axisCustom,
      graphBarWidth,
      borderBottom,
      graphMarginVertical,
      platform,
      svgStyles
    } = this.props;
    const axisCustomProp = {
      stroke: axisColor,
      strokeDasharray: [3, 3],
      strokeWidth: '3',
      ...axisCustom
    };

    // Dimensions
    const { data } = this.state;
    const graphHeight = svgStyles.height - 2 * graphMarginVertical;
    const graphWidth = svgStyles.width;

    // X scale point
    const xDomain = data.map(item => item.lastTransactionDate);
    const xRange = [0, graphWidth];
    const x = d3
      .scalePoint()
      .domain(xDomain)
      .range(xRange)
      .padding(1);

    // Y scale linear
    const topValue = this._getMaxValue(data);
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
        <G y={graphHeight + graphMarginVertical}>
          {this._drawTopAxis(axisCustomProp, topValue, graphWidth, y)}
          {this._drawMiddleTopAxis(
            axisCustomProp,
            middleTopValue,
            graphWidth,
            y
          )}
          {this._drawMiddleAxis(axisCustomProp, middleValue, graphWidth, y)}
          {this._drawMiddleBottomAxis(
            axisCustomProp,
            middleBottomValue,
            graphWidth,
            y
          )}
          {this._drawBottomAxis(axisCustomProp, graphWidth)}
          {borderBottom && this._drawBottomBorder()}

          {data.map((item, index, array) =>
            this._drawBottomLabels(index, item, x, graphMarginVertical)
          )}
        </G>

        {data.map(item => (
          <G y={graphHeight + graphMarginVertical} key={'bar' + item.lastTransactionDate}>
            {this._drawBars(item, graphBarWidth, x, y)}
            {this._drawCircle(item, x, y)}
          </G>
        ))}

        {data.map(
          (item, index, array) =>
            index < array.length - 1 && (
              <G
                y={graphHeight + graphMarginVertical}
                key={'line' + item.lastTransactionDate}
              >
                {this._drawLine(x, y, index, array)}
              </G>
            )
        )}

        {data.map((item, index, array) =>
          platform === 'web' ? (
            <Svg
              y={graphHeight + graphMarginVertical}
              key={'rectOnPress' + item.lastTransactionDate}
              onClick={() => this._rectOnPress(index, item)}
              style={{ overflow: 'initial' }}
            >
              {this._drawRectOnPress(
                index,
                item,
                x,
                graphBarWidth,
                graphHeight,
                graphMarginVertical,
                platform
              )}
            </Svg>
          ) : (
            <G
              y={graphHeight + graphMarginVertical}
              key={'rectOnPress' + item.lastTransactionDate}
            >
              {this._drawRectOnPress(
                index,
                item,
                x,
                graphBarWidth,
                graphHeight,
                graphMarginVertical,
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
  activeColor: '#00a4de',
  activeIndex: 0,
  axisColor: '#f5f5f5',
  axisCustom: {},
  axisLabelColor: 'black',
  axisLabelLeftPos: 5,
  axisLabelSize: 10,
  barColor: {},
  borderBottom: false,
  borderBottomProp: {},
  circleStyle: {},
  data: [],
  fixTriangle: false,
  graphBarWidth: 12,
  labelTopStyle: {},
  labelTopPosition: 15,
  labelBottomStyle: {},
  labelBottomPosition: 25,
  lineStyle: {},
  graphMarginVertical: 40,
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  onPress: () => {},
  svgStyles: {},
  trianglePosition: 0,
  triangleScale: 10
};

JenChart.propTypes = {
  data: PropTypes.array.isRequired,
  platform: PropTypes.string.isRequired,
  activeColor: PropTypes.string,
  activeIndex: PropTypes.number,
  axisColor: PropTypes.string,
  axisCustom: PropTypes.object,
  axisLabelColor: PropTypes.string,
  axisLabelLeftPos: PropTypes.number,
  axisLabelSize: PropTypes.number,
  barColor: PropTypes.object,
  borderBottom: PropTypes.bool,
  borderBottomProp: PropTypes.object,
  circleStyle: PropTypes.object,
  fixTriangle: PropTypes.bool,
  graphBarWidth: PropTypes.number,
  graphMarginVertical: PropTypes.number,
  labelTopStyle: PropTypes.object,
  labelTopPosition: PropTypes.number,
  labelBottomStyle: PropTypes.object,
  labelBottomPosition: PropTypes.number,
  lineStyle: PropTypes.object,
  months: PropTypes.array,
  onPress: PropTypes.func,
  svgStyles: PropTypes.object,
  trianglePosition: PropTypes.number,
  triangleScale: PropTypes.number
};
