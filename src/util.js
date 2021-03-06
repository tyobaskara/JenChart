const _toFixed = (number, round) => {
  const num = number.toString();
  return num.indexOf('.') !== -1
    ? num.substring(0, num.indexOf('.') + (round + 1))
    : num;
};

const _formatAxisLabel = value => {
  const val = value.toString().split('.')[0];

  if (val.length > 9) {
    return _toFixed(val / 1000000000, 2) + 'B';
  } else if (val.length > 6) {
    return _toFixed(val / 1000000, 2) + 'M';
  } else {
    return _toFixed(val / 1000, 2) + 'K';
  }
};

const _getMonth = str => {
  return str.split('T')[0].split('-')[1];
};

const _getYear = str => {
  return str.split('T')[0].split('-')[0];
};

const _selectObject = (obj, param, val) => {
  return obj.find(o => {
    return o[param] === val;
  });
};

export {
    _toFixed,
    _formatAxisLabel,
    _getMonth,
    _getYear,
    _selectObject
}