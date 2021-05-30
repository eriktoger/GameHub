import defaultConfig from './config';

export default {
  ...defaultConfig,
  message: 'Success!',
  toastStyles: {
    ...defaultConfig.toastStyles,
    bg: '#32a852',
  },
  iconName: 'save',
};
