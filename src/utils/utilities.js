import * as Three from 'three';

import { DESIGN } from '@/utils/constants';

export const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const yesOrNo = () => {
  let result = 0;
  while (result === 0) {
    result = randomInteger(-1, 1);
  }
  return result;
};

export const loaderDispatchHelper = (store, field) => {
  store.dispatch('preloader/preloadOrBuilt', field).then(() => {
    store.dispatch('preloader/isAllLoadedAndBuilt');
  }).catch((error) => { console.log(error); });
};

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

export const messagesByIdDispatchHelper = (scope, view, name, data) => {
  const id = scope.message + 1;
  scope.addMessage(id);

  scope.$store.dispatch('layout/showMessage', { id, view, name, data }).then(() => {
    delay(DESIGN.MESSAGES_TIMEOUT).then(() => {
      scope.$store.dispatch('layout/hideMessageById', id);
    }).catch((error) => { console.log(error); });
  }).catch((error) => { console.log(error); });
};

export const heroOnHitDispatchHelper = (scope, value) => {
  scope.setScale({
    field: DESIGN.HERO.scales.health.name,
    value,
  });

  scope.$store.dispatch('hero/setHeroOnHit', true).then(() => {
    delay(DESIGN.ANIMATION_TIMEOUT * 2).then(() => {
      scope.$store.dispatch('hero/setHeroOnHit', false);
    }).catch((error) => { console.log(error); });
  }).catch((error) => { console.log(error); });
};

export const messagesByViewDispatchHelper = (scope, view, name, data) => {
  if (!scope.messages.some(message => message[1] === view)) scope.showMessage({ id: null, view, name, data });
};

export const distance2D = (x1, y1, x2, y2) => {
  return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
};

export const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export const radiansToDegrees = (radians) => {
  return radians * (180/ Math.PI);
};

export const randomPointInCircle = (radius, x, y) => {
  const r = radius * Math.sqrt(Math.random());
  const theta = Math.random() * 2 * Math.PI;
  return [x + Math.cos(theta) * r, y + Math.sin(theta) * r];
};

export const getNumberSign = (number) => {
  return number === 0 ? 0 : number > 0 ? 1 : -1;
};

export const addImmediateAudioToObjects = (scope, objects, buffer, volume, isRobots) => {
  let audio;
  objects.forEach((object) => {
    audio = new Three.PositionalAudio(scope.listener);

    audio.setBuffer(buffer);
    audio.setVolume(volume);
    audio.setRefDistance(DESIGN.VOLUME.positional.ref);
    audio.setMaxDistance(DESIGN.VOLUME.positional.max);
    audio.setLoop(true);
    audio.setRolloffFactor(1) ;
    // audio.setDistanceModel('exponential');

    if (isRobots) object.pseudoMesh.add(audio);
    else object.mesh.add(audio);
  });
};

export const addAudioToObjects = (scope, objects, buffer, volume) => {
  let audio;
  objects.forEach((object) => {
    audio = new Three.PositionalAudio(scope.listener);

    audio.setBuffer(buffer);
    audio.setVolume(volume);
    audio.setRefDistance(DESIGN.VOLUME.positional.ref);
    audio.setMaxDistance(DESIGN.VOLUME.positional.max);
    audio.setLoop(false);
    audio.setRolloffFactor(1) ;
    // audio.setDistanceModel('exponential');

    object.pseudoMesh.add(audio);
  });
};
