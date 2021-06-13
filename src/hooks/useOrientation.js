import {useWindowDimensions} from 'react-native';

const useOrientation = () => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  return windowWidth < windowHeight ? 'PORTRAIT' : 'LANDSCAPE';
};

export default useOrientation;
