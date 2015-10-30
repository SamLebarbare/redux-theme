'use strict';

module.exports = {
  defaultTransition: {
    duration: 500,
    enter: {
      opacity: [ 1, 0 ]
    },
    leave: {
      opacity: [ 0, 1 ]
    }
  },
  rotate: {
    duration: 250,
    enter: {
      translateZ: 0, // Force HA by animating a 3D property
      rotateZ: '360deg'
    },
    leave: {
      translateZ: 0, // Force HA by animating a 3D property
      rotateZ: '-360deg'
    }
  },
  slide: {
    duration: 250,
    enter: {
      translateZ: 0, // Force HA by animating a 3D property
      translateX: [ '0%', '-100%' ]
    },
    leave: {
      translateZ: 0, // Force HA by animating a 3D property
      translateX: [ '100%', '0%' ]
    }
  },
  overlay: {
    duration: 500,
    enter: {
      opacity: [ 1, 0 ]
    },
    leave: {
      opacity: [ 0, 1 ]
    }
  },
  leftPanel: {
    duration: 250,
    enter: {
      translateZ: 0, // Force HA by animating a 3D property
      translateX: [ '0%', '-100%' ]
    },
    leave: {
      translateZ: 0, // Force HA by animating a 3D property
      translateX: [ '100%', '0%' ]
    }
  },
  easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

  easeOut: function(duration, property, delay, easeFunction) {
    easeFunction = easeFunction || this.easeOutFunction;
    return this.create (duration, property, delay, easeFunction);
  },

  create: function(duration, property, delay, easeFunction) {
    duration = duration || '450ms';
    property = property || 'all';
    delay    = delay || '0ms';
    easeFunction = easeFunction || 'linear';

    return property + ' ' +
      duration + ' ' +
      easeFunction + ' ' +
      delay;
  }
};
