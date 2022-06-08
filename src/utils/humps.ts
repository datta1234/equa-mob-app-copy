import humps from 'humps';

export const HUMPS_REGEX = /(?=[A-Z])/;

const defaultSettings = {
  split: HUMPS_REGEX,
};

// fixme import from common infinit import loop
function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

const isFunction = (obj) => typeof obj === 'function';
const isObject = (obj) => obj === Object(obj);
const isArray = (obj) => toString.call(obj) === '[object Array]';
const isDate = (obj) => toString.call(obj) === '[object Date]';
const isRegExp = (obj) => toString.call(obj) === '[object RegExp]';
const isBoolean = (obj) => toString.call(obj) === '[object Boolean]';

const processKeys = (convert, obj, options) => {
  if (
    !isObject(obj) ||
    isDate(obj) ||
    isRegExp(obj) ||
    isBoolean(obj) ||
    isFunction(obj)
  ) {
    return obj;
  }

  let output;
  let i = 0;
  let l = 0;

  if (isArray(obj)) {
    output = [];
    for (l = obj.length; i < l; i++) {
      output.push(processKeys(convert, obj[i], options));
    }
  } else {
    output = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        output[convert(key, options)] = processKeys(convert, obj[key], options);
      }
    }
  }
  return output;
};

const decamelizeDigitalGroup = (string, options = {}) => {
  if (typeof string !== 'string') {
    return string;
  }
  const separator = options.separator || '_';
  return string
    .split('')
    .reduce(
      (str, char) =>
        `${str}${
          /\d/.test(char) && !/\d/.test(str.slice(-1)) ? separator : ''
        }${char}`,
      ''
    );
};

export const decamelize = (str, settings = {}) =>
  humps.decamelize(
    decamelizeDigitalGroup(str, { ...defaultSettings, ...settings }),
    {
      ...defaultSettings,
      ...settings,
    }
  );
export const decamelizeKeys = (data, settings = {}) =>
  humps.decamelizeKeys(
    processKeys(decamelizeDigitalGroup, data, {
      ...defaultSettings,
      ...settings,
    }),
    {
      ...defaultSettings,
      ...settings,
    }
  );
export const camelize = (str, settings = {}) =>
  humps.camelize(str, { ...defaultSettings, ...settings });
export const camelizeKeys = (data, settings = {}) =>
  humps.camelizeKeys(data, { ...defaultSettings, ...settings });

export function decamelizeWithoutFormData(object) {
  if (object && isFormData(object)) {
    return object;
  }
  return decamelizeKeys(object);
}
