import * as Three from 'three';

import { GLTFLoader } from '@/components/Three/Modules/Utils/GLTFLoader';

import { DESIGN, OBJECTS } from '@/utils/constants';

import {
  loaderDispatchHelper,
  yesOrNo,
} from '@/utils/utilities';

import Hero from './Hero';

import Doors from './World/Doors';
import Screens from './World/Screens';
import Passes from './World/Passes';
import Leader from './World/Leader';
import Bottles from './World/Bottles';
import Flowers from './World/Flowers';

import Atmosphere from './Atmosphere';

import Explosions from './Weapon/Explosions';
import Shots from './Weapon/Shots';

import Enemies from './Enemies';

function World() {
  const places = [];
  const things = [];

  this.doors = null;
  this.screens = null;
  this.atmosphere = null;
  this.explosions = null;
  this.shots = null;
  this.enemies = null;

  const rooms = [];

  let counter = 0;

  this.init = (scope) => {
    // Level objects
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const object in OBJECTS) {
      OBJECTS[object][scope.l] = {};
      OBJECTS[object][scope.l].data = [];
    }


    // World

    const floorTexture = new Three.TextureLoader().load(
      './images/textures/concrete1.jpg',
      () => {
        scope.render();
        loaderDispatchHelper(scope.$store, 'isConcrete1Loaded');
      },
    );

    const wallsNormalTexture = new Three.TextureLoader().load(
      './images/textures/concrete2.jpg',
      () => {
        scope.render();
        loaderDispatchHelper(scope.$store, 'isConcrete2Loaded');
      },
    );

    const wallsLargeTexture = new Three.TextureLoader().load(
      './images/textures/concrete2.jpg',
      () => {
        loaderDispatchHelper(scope.$store, 'isConcrete3Loaded');
      },
    );

    const metallTexture = new Three.TextureLoader().load(
      './images/textures/metall.jpg',
      () => {
        scope.render();
        loaderDispatchHelper(scope.$store, 'isMetall1Loaded');
      },
    );

    const doorsTexture = new Three.TextureLoader().load(
      './images/textures/metall.jpg',
      () => {
        scope.render();
        loaderDispatchHelper(scope.$store, 'isMetall2Loaded');
      },
    );

    const metallRodsTexture = new Three.TextureLoader().load(
      './images/textures/metall2.jpg',
      () => {
        scope.render();
        loaderDispatchHelper(scope.$store, 'isMetal3Loaded');
      },
    );

    const metallRodsTexture2 = new Three.TextureLoader().load(
      './images/textures/metall2.jpg',
      () => {
        scope.render();
        loaderDispatchHelper(scope.$store, 'isMetall4Loaded');
      },
    );

    const sandTexture = new Three.TextureLoader().load(
      './images/textures/sand.jpg',
      () => {
        scope.render();
        loaderDispatchHelper(scope.$store, 'isSandLoaded');
      },
    );

    const fireTexture = new Three.TextureLoader().load(
      './images/textures/fire.jpg',
      () => {
        loaderDispatchHelper(scope.$store, 'isFireLoaded');
        scope.render();
      },
    );
    const fireMaterial = new Three.MeshPhongMaterial({
      map: fireTexture,
      color: DESIGN.COLORS.white,
      transparent: true,
      opacity: 0,
    });
    fireMaterial.map.repeat.set(4, 4);
    fireMaterial.map.wrapS = fireMaterial.map.wrapT = Three.RepeatWrapping;
    fireMaterial.map.encoding = Three.sRGBEncoding;
    fireMaterial.side = Three.DoubleSide;

    const glassTexture = new Three.TextureLoader().load(
      './images/textures/glass.jpg',
      () => {
        scope.render();
        loaderDispatchHelper(scope.$store, 'isGlassLoaded');
      },
    );
    const glassMaterial = new Three.MeshPhongMaterial({
      map: glassTexture,
      color: DESIGN.COLORS.grayLight,
    });
    glassMaterial.map.repeat.set(2, 2);
    glassMaterial.map.wrapS = glassMaterial.map.wrapT = Three.RepeatWrapping;
    glassMaterial.map.encoding = Three.sRGBEncoding;

    const glassTransparentTexture = new Three.TextureLoader().load(
      './images/textures/glass.jpg',
      () => {
        scope.render();
        loaderDispatchHelper(scope.$store, 'isGlassTransparentLoaded');
      },
    );
    const glassTransparentMaterial = new Three.MeshPhongMaterial({
      map: glassTransparentTexture,
      color: DESIGN.COLORS.grayLight,
      transparent: true,
      opacity: 0.33,
    });
    glassTransparentMaterial.map.repeat.set(8, 8);
    glassTransparentMaterial.map.wrapS = glassTransparentMaterial.map.wrapT = Three.RepeatWrapping;
    glassTransparentMaterial.map.encoding = Three.sRGBEncoding;

    const glassTransparentLargeTexture = new Three.TextureLoader().load(
      './images/textures/glass.jpg',
      () => {
        scope.render();
        loaderDispatchHelper(scope.$store, 'isGlassTransparentLargeLoaded');
      },
    );
    const glassTransparentLargeMaterial = new Three.MeshPhongMaterial({
      map: glassTransparentLargeTexture,
      color: DESIGN.COLORS.grayLight,
      transparent: true,
      opacity: 0.33,
    });
    glassTransparentLargeMaterial.map.repeat.set(0.5, 0.5);
    glassTransparentLargeMaterial.map.wrapS = glassTransparentLargeMaterial.map.wrapT = Three.RepeatWrapping;
    glassTransparentLargeMaterial.map.encoding = Three.sRGBEncoding;


    const floorMaterial = new Three.MeshStandardMaterial({
      color: DESIGN.COLORS.grayDark,
      blending: Three.NoBlending,
    });
    const wallsNormalMaterial = new Three.MeshStandardMaterial({ color: DESIGN.COLORS.gray });
    const wallsLargeMaterial = new Three.MeshStandardMaterial({ color: DESIGN.COLORS.gray });
    const metallDarkMaterial = new Three.MeshStandardMaterial({ color: DESIGN.COLORS.grayDark });
    const metallLightMaterial = new Three.MeshStandardMaterial({ color: DESIGN.COLORS.gray });
    const doorsMaterial = new Three.MeshStandardMaterial({ color: DESIGN.COLORS.grayLight });
    const sandMaterial = new Three.MeshStandardMaterial({ color: DESIGN.COLORS.white });
    const holeMaterial = new Three.MeshStandardMaterial({ color: DESIGN.COLORS.black });

    scope.hero = new Hero();
    scope.hero.init(
      scope,
      fireMaterial,
      fireTexture,
      metallDarkMaterial,
      metallTexture,
    );

    new GLTFLoader().load(
      `./images/models/Levels/${scope.l}/Scene.glb`,
      (glb) => {
        glb.scene.traverse((child) => {
          if (child.isMesh) {
            if (child.name.includes('ground')) {
              child.material = floorMaterial;
              child.material.map = floorTexture;
              child.material.map.repeat.set(1, 1);
              child.material.map.anisotropy = 8;
            } else if (child.name.includes('sand')) {
              child.material = sandMaterial;
              child.material.map = sandTexture;
              child.material.map.repeat.set(1, 1);
              child.material.map.anisotropy = 8;
            } else if (child.name.includes('wall')) {
              child.material = wallsLargeMaterial;
              child.material.map = wallsLargeTexture;
              child.material.map.repeat.set(0.25, 2);
              child.material.map.anisotropy = 8;
            } else if (child.name.includes('glAss')) {
              child.material = glassTransparentMaterial;
            } else if (child.name.includes('glass')) {
              child.material = glassTransparentLargeMaterial;
            } else if (child.name.includes('rod')) {
              child.material = metallLightMaterial;

              if (child.name.includes('V2')) {
                child.material.map = metallRodsTexture2;
                child.material.map.repeat.set(2, 2);
              } else {
                child.material.map = metallRodsTexture;
                child.material.map.repeat.set(0.05, 0.05);
              }
            } else if (child.name.includes('comp')) {
              child.material = metallDarkMaterial;
              child.material.map = metallTexture;
              child.material.map.repeat.set(2, 2);
            } else if (child.name.includes(OBJECTS.SPIDERS.name)) {
              OBJECTS.SPIDERS[scope.l].data.push({
                x: child.position.x,
                y: child.position.y,
                z: child.position.z,
              });

              places.push(child);
            } else if (child.name.includes(OBJECTS.DRONES.name)) {
              OBJECTS.DRONES[scope.l].data.push({
                x: child.position.x,
                y: child.position.y,
                z: child.position.z,
              });

              places.push(child);
            } else if (child.name.includes(OBJECTS.LEADER.name)) {
              let rotate;
              if (child.name.includes('Z')) {
                if (child.name.includes('R')) rotate = Math.PI / -2;
                else rotate = Math.PI / 2;
              } else if (child.name.includes('X')) {
                if (child.name.includes('R')) rotate = Math.PI;
                else rotate = 0;
              }

              OBJECTS.LEADER[scope.l].data.push({
                x: child.position.x,
                y: child.position.y,
                z: child.position.z,
                rotate,
              });

              places.push(child);
            } else if (child.name.includes(OBJECTS.SCREENS.name)) {
              let rotate;
              if (child.name.includes('Z')) {
                if (child.name.includes('R')) rotate = Math.PI / 2;
                else rotate = Math.PI / -2;
              } else if (child.name.includes('X')) {
                if (child.name.includes('R')) rotate = 0;
                else rotate = Math.PI;
              }

              OBJECTS.SCREENS[scope.l].data.push({
                modalId: Number(child.name.substring(6, 7)),
                x: child.position.x,
                y: child.position.y,
                z: child.position.z,
                rotate,
              });

              places.push(child);
            } else if (child.name.includes('room')) {
              rooms.push({
                id: Number(child.name.substring(4, 5)),
                room: child,
              });
              places.push(child);
            } else if (child.name.includes(OBJECTS.BOTTLES.name)) {
              if (!child.name.includes('Mandatory')) {
                if (yesOrNo()) {
                  OBJECTS.BOTTLES[scope.l].data.push({
                    x: child.position.x,
                    y: child.position.y,
                    z: child.position.z,
                  });
                }
              } else {
                OBJECTS.BOTTLES[scope.l].data.push({
                  x: child.position.x,
                  y: child.position.y,
                  z: child.position.z,
                });
              }

              places.push(child);
            } else if (child.name.includes(OBJECTS.FLOWERS.name)) {
              if (!child.name.includes('Mandatory')) {
                if (yesOrNo()) {
                  OBJECTS.FLOWERS[scope.l].data.push({
                    x: child.position.x,
                    y: child.position.y,
                    z: child.position.z,
                  });
                }
              } else {
                OBJECTS.FLOWERS[scope.l].data.push({
                  x: child.position.x,
                  y: child.position.y,
                  z: child.position.z,
                });
              }

              places.push(child);
            } else if (child.name.includes(OBJECTS.PASSES.name)) {
              let pass;
              if (child.name.includes('Red')) pass = DESIGN.PASSES.red;
              else if (child.name.includes('Orange')) pass = DESIGN.PASSES.orange;
              else if (child.name.includes('Green')) pass = DESIGN.PASSES.green;
              else if (child.name.includes('Purple')) pass = DESIGN.PASSES.purple;
              else if (child.name.includes('Blue')) pass = DESIGN.PASSES.blue;


              OBJECTS.PASSES[scope.l].data.push({
                x: child.position.x,
                y: child.position.y,
                z: child.position.z,
                pass,
              });

              things.push(child);
            } else if (child.name.includes(OBJECTS.DOORS.name)) {
              let direction;
              if (child.name.includes('Up')) direction = 'up';
              else if (child.name.includes('Down')) direction = 'down';

              let pass;
              if (child.name.includes('Red')) pass = DESIGN.PASSES.red;
              else if (child.name.includes('Orange')) pass = DESIGN.PASSES.orange;
              else if (child.name.includes('Green')) pass = DESIGN.PASSES.green;
              else if (child.name.includes('Purple')) pass = DESIGN.PASSES.purple;
              else if (child.name.includes('Blue')) pass = DESIGN.PASSES.blue;

              let rotate;
              if (child.name.includes('Z')) rotate = Math.PI / 2;
              else if (child.name.includes('X')) rotate = 0;

              let width;
              let height;
              if (child.name.includes('Small')) {
                width = 8;
                height = 8;
              } else if (child.name.includes('Large')) {
                width = 20;
                height = 12;
              }

              OBJECTS.DOORS[scope.l].data.push({
                id: child.id,
                x: child.position.x,
                y: child.position.y,
                z: child.position.z,
                width,
                height,
                rotate,
                direction,
                pass,
              });

              scope.objects.push(child);
              scope.doors.push(child);

              child.material = doorsMaterial;
              child.material.map = doorsTexture;
              child.material.map.repeat.set(0.1, 0.1);
            } else {
              child.material = wallsNormalMaterial;
              child.material.map = wallsNormalTexture;
              child.material.map.repeat.set(0.25, 0.5);
            }

            // На "местах-пустышках" - не ставим текстуру
            if (!child.name.includes(OBJECTS.LEADER.name)
                && !child.name.includes(OBJECTS.PASSES.name)
                && !child.name.includes(OBJECTS.SCREENS.name)
                && !child.name.includes(OBJECTS.BOTTLES.name)
                && !child.name.includes(OBJECTS.FLOWERS.name)
                && !child.name.includes(OBJECTS.SPIDERS.name)
                && !child.name.includes(OBJECTS.DRONES.name)
                && !child.name.includes('room')) {
              child.material.map.wrapS = child.material.map.wrapT = Three.RepeatWrapping;
              child.material.map.encoding = Three.sRGBEncoding;
            }
          }
        });

        // Переносим двери в отдельное октодерево
        // и удаляем "места"-пустышки для элементов оформления и предметов

        const doorsGroup = new Three.Group();
        doorsGroup.name = 'Doors';
        scope.doors.forEach((door) => {
          glb.scene.remove(door);
          doorsGroup.add(door);
        });

        places.forEach((place) => {
          glb.scene.remove(place);
        });

        things.forEach((object) => {
          glb.scene.remove(object);
        });

        // Создаем октодеревья
        scope.octree.fromGraphNode(glb.scene);
        scope.octreeDoors.fromGraphNode(doorsGroup);

        scope.scene.add(glb.scene);
        scope.scene.add(doorsGroup);
        scope.render();


        const pseudoGeometry = new Three.SphereBufferGeometry(DESIGN.HERO.HEIGHT / 2, 4, 4);
        const pseudoMaterial = new Three.MeshStandardMaterial({
          color: DESIGN.COLORS.white,
          side: Three.DoubleSide,
        });

        const scaleGeometry = new Three.PlaneBufferGeometry(DESIGN.SCALES.width, DESIGN.SCALES.height);
        const scaleMaterial = new Three.MeshStandardMaterial({
          color: DESIGN.COLORS.redDark,
          transparent: true,
          opacity: 0.5,
        });

        // Enemies
        this.enemies = new Enemies();
        this.enemies.init(
          scope,
          metallDarkMaterial,
          metallTexture,
          holeMaterial,
          glassMaterial,
          pseudoMaterial,
          scaleGeometry,
          scaleMaterial,
        );


        // Special objects

        this.doors = new Doors();
        this.doors.init(scope);

        this.screens = new Screens();
        this.screens.init(
          scope,
          rooms,
          glassMaterial,
        );


        // Things
        scope.things = [];

        new Bottles().init(scope, pseudoGeometry, pseudoMaterial);
        new Flowers().init(
          scope,
          wallsNormalMaterial,
          wallsNormalTexture,
          sandMaterial,
          sandTexture,
          pseudoGeometry,
          pseudoMaterial,
        );

        // Passes
        new Passes().init(
          scope,
          metallTexture,
          pseudoGeometry,
          pseudoMaterial,
        );


        // Design

        // Leader
        new Leader().init(scope);


        // Checking
        this.atmosphere = new Atmosphere();
        this.atmosphere.init(scope);


        // Weapon modules

        this.explosions = new Explosions();
        this.explosions.init(
          scope,
          fireMaterial,
        );

        this.shots = new Shots();
        this.shots.init(scope);
      },
    );
  };

  const animateList = (scope) => {
    this.doors.animate(scope);
    this.screens.animate(scope);
    this.atmosphere.animate(scope);
    this.explosions.animate(scope);
    this.shots.animate(scope);
    this.enemies.animate(scope);
  };

  this.animate = (scope) => {
    if (scope.isTimeMachine) {
      if (counter === 0) animateList(scope);
      ++counter;
      if (counter > 1) counter = 0;
    } else animateList(scope);
  };
}

export default World;
