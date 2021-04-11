import * as Three from 'three';

import { DESIGN } from '@/utils/constants';

import { loaderDispatchHelper } from '@/utils/utilities';

function HeroWeapon() {
  const ammos = [];
  let ammoIndex;
  let ammo;

  let weapon;

  const AMMO_RADIUS = 0.5;

  this.init = (scope) => {
    const fireTexture = new Three.TextureLoader().load(
      './images/textures/purple.jpg',
      () => {
        loaderDispatchHelper(scope.$store, 'isPurpleLoaded');
        scope.render();
      },
    );

    const fireMaterial = new Three.MeshPhongMaterial({
      map: fireTexture,
      color: DESIGN.COLORS.white
    });
    fireMaterial.map.repeat.set(4, 4);
    fireMaterial.map.wrapS = fireMaterial.map.wrapT = Three.RepeatWrapping;
    fireMaterial.map.encoding = Three.sRGBEncoding;
    // fireMaterial.side = Three.DoubleSide;

    const fireGeometry = new Three.SphereBufferGeometry(AMMO_RADIUS, 8, 8);

    for (let ammoIndex = 0; ammoIndex <= DESIGN.HERO.scales.ammo.objects - 1; ammoIndex++) {
      ammo = new Three.Mesh(fireGeometry, fireMaterial);

      ammos.push({
        mesh: ammo,
        collider: new Three.Sphere(new Three.Vector3(0, 0, 0), AMMO_RADIUS),
        velocity: new Three.Vector3(),
        start: new Three.Vector3(),
        removed: true,
      });
    }

    ammoIndex = 0;
  };

  const update = (ammo) => {
    ammo.removed = false;
  };

  this.shot = (scope) => {
    ammo = ammos[ammoIndex];
    update(ammo);

    if (scope.isOptical) weapon = scope.weaponOptical;
    else weapon = scope.weapon; // eslint-disable-line prefer-destructuring

    ammo.start.set(weapon.position.x, weapon.position.y, weapon.position.z);
    ammo.collider.center.copy(ammo.start);

    scope.camera.getWorldDirection(scope.direction);
    ammo.velocity.copy(scope.direction).multiplyScalar(30);

    scope.scene.add(ammo.mesh);

    scope.setScale({
      field: DESIGN.HERO.scales.ammo.name,
      value: -1
    });

    ammoIndex++;
    if (ammoIndex > ammos.length - 1) ammoIndex = 0;
  };

  const fly = (scope, ammo) => {
    ammo.collider.center.addScaledVector(ammo.velocity, scope.delta * 5);

    ammo.mesh.position.copy(ammo.collider.center);

    ammo.mesh.rotateX(scope.delta * 3);
    ammo.mesh.rotateZ(scope.delta * 3);
    ammo.mesh.rotateY(scope.delta * 3);
  };

  const remove = (scope, ammo) => {
    ammo.mesh.position.copy(ammo.collider.center);
    scope.scene.remove(ammo.mesh);
    ammo.removed = true;
  };

  this.animate = (scope) => {
    ammos.filter(ammo => !ammo.removed).forEach((ammo) => {
      fly(scope, ammo);

      // Улетело
      if (ammo.mesh.position.distanceTo(ammo.start) > 200) remove(scope, ammo);
    });
  };
}

export default HeroWeapon;
