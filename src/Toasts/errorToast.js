import defaultConfig from './config';

export default {
  ...defaultConfig,
  message: 'An Error occured',
  toastStyles: {
    ...defaultConfig.toastStyles,
    bg: '#eb4c34',
  },
  iconName: 'warning',
};
