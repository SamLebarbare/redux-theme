import { Colors, ColorManipulator, Transitions } from './utils';

export default class theme {
  constructor () {
    this.spacing = {
      iconSize: 24,
      desktopKeylineIncrement: 64
    };

    this.typo = {
      font: 'Roboto, sans-serif',
      small: '12px',
      normal: '16px',
      big: '24px'
    };

    this.spacing = {
      iconSize: 24,
      desktopKeylineIncrement: 64
    };

    this.shapes = {
      defaultBorderRadius: '2px'
    };

    this.palette = {
        primary1Color: Colors.lightBlue500,
        primary2Color: Colors.lightBlue700,
        primary3Color: Colors.lightBlue100,
        accent1Color:  Colors.pinkA200,
        accent2Color:  Colors.pinkA400,
        accent3Color:  Colors.pinkA100,
        textColor:     Colors.darkBlack,
        subTextColor:  ColorManipulator.fade(Colors.darkBlack, 0.54),
        canvasColor:   Colors.white,
        paperColor:    Colors.white,
        borderColor:   Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    };

    this.shapes = {
      defaultBorderRadius: '2px'
    };

    this.colors = Colors;

    this.transitions = Transitions;
  }

};
