import React from 'react';
import propTypes from 'prop-types';
import { getNextRoundRobin, getRandomNumber } from '../../libs/utils/math';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from './configs/constants';

import Img from './style';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      index: 0,
    };
  }

  componentDidMount() {
    const {
      banners, duration, random, defaultbanner,
    } = this.props;
    this.id = setInterval(() => {
      const { index } = this.state;
      let imageIndex = 0;
      let imagePath = `${defaultbanner}`;
      if (banners.length) {
        imageIndex = random ? getRandomNumber(banners.length)
          : getNextRoundRobin(banners.length, index);
        imagePath = `${PUBLIC_IMAGE_FOLDER}${banners[imageIndex]}`;
      }
      this.setState({
        path: imagePath,
        index: imageIndex,
      });
    }, duration);
  }


  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    const { path, index } = this.state;
    const {
      height, altText, banners,
    } = this.props;

    let imgPath;
    if (!path) {
      imgPath = banners.length ? `${PUBLIC_IMAGE_FOLDER}${banners[index]}` : DEFAULT_BANNER_IMAGE;
    } else {
      imgPath = path;
    }
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
