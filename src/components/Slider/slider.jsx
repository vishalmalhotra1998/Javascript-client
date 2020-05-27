import React from 'react';
import propTypes from 'prop-types';
import { getNextRoundRobin, getRandomNumber } from '../../libs/utils/math';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../configs/constants';

import Img from './style';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const {
      banners, duration, random,
    } = this.props;
    this.sliderInterval = setInterval(() => {
      const { index } = this.state;
      let imageIndex = 0;
      if (banners && banners.length) {
        imageIndex = random ? getRandomNumber(banners.length)
          : getNextRoundRobin(banners.length, index);
      }
      this.setState({
        index: imageIndex,
      });
    }, duration);
  }


  componentWillUnmount() {
    clearInterval(this.sliderInterval);
  }

  render() {
    const { index } = this.state;
    const {
      height, altText, banners, defaultbanner,
    } = this.props;
    const imgPath = banners.length ? `${PUBLIC_IMAGE_FOLDER}${banners[index]}` : `${defaultbanner}`;
    return (
      <>
        <Img
          src={imgPath}
          alt={altText}
          height={height}
        />
      </>
    );
  }
}

Slider.propTypes = {
  altText: propTypes.string,
  banners: propTypes.arrayOf(propTypes.string),
  defaultbanner: propTypes.string,
  duration: propTypes.number,
  height: propTypes.number,
  random: propTypes.bool,
};

Slider.defaultProps = {
  altText: 'Default Banner',
  defaultbanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
  banners: [],
};
