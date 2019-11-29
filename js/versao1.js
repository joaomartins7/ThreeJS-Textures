/*global THREE*/

var camera, cameraPerspective, cameraTop, cameraSide, cameraFront;
var cameraFactor = 7;

var changeCameraTop = false;
var changeCameraFront = false;
var changeCameraSide = false;
var changeCameraPerspective = false;

var switchAxisVisibility = false;

var scene, renderer;
var geometry, mesh;

var textureLenna = new THREE.TextureLoader().load('textures/Lenna.png');
var textureWood = new THREE.TextureLoader().load('textures/hardwood.jpg');

textureWood.wrapS = THREE.RepeatWrapping;
textureWood.wrapT = THREE.RepeatWrapping;
textureWood.repeat.set( 4, 4 );

/*
var materials = [
       new THREE.MeshPhongMaterial({
           map: new THREE.TextureLoader().load('textures/dice1.jpg')
       }),
       new THREE.MeshPhongMaterial({
           map: new THREE.TextureLoader().load('textures/dice2.jpg')
       }),
       new THREE.MeshPhongMaterial({
           map: new THREE.TextureLoader().load('textures/dice3.png')
       }),
       new THREE.MeshPhongMaterial({
           map: new THREE.TextureLoader().load('textures/dice4.png')
       }),
       new THREE.MeshPhongMaterial({
           map: new THREE.TextureLoader().load('textures/dice5.png')
       }),
       new THREE.MeshPhongMaterial({
           map: new THREE.TextureLoader().load('textures/dice6.jpg')
       })
    ];

*/
/*
var textureDice = [ new THREE.TextureLoader().load( 'textures/dice1.jpg'),
new THREE.TextureLoader().load( 'textures/dice2.jpg'),
new THREE.TextureLoader().load( 'textures/dice3.png'),
new THREE.TextureLoader().load( 'textures/dice4.png'),
new THREE.TextureLoader().load( 'textures/dice5.png'),
new THREE.TextureLoader().load( 'textures/dice6.jpg') ];
*/
var materialLenna = new THREE.MeshPhongMaterial();
var materialDice = new THREE.MeshPhongMaterial();
var materialWhite = new THREE.MeshPhongMaterial( {color: 'white'} );
var materialRed = new THREE.MeshPhongMaterial( {color: 'red'} );
var materialBoardSide = new THREE.MeshPhongMaterial( { color: 'gold'} );

var globalLightIntensity = 1;



function render(){
    'use strict';
    renderer.render(scene, camera);
}

//-----Camera------------------------------
function createCameraPerspective() {
    'use strict';
    cameraPerspective = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    cameraPerspective.position.x = 120;
    cameraPerspective.position.y = 120;
    cameraPerspective.position.z = 120;
    cameraPerspective.lookAt(scene.position);
}

function createCameraTop() {
    'use strict';
    cameraTop = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor,
                                         window.innerWidth / cameraFactor,
                                         window.innerHeight / cameraFactor,
                                         window.innerHeight / -cameraFactor,
                                         1,
                                         1000);
    cameraTop.position.x = 0;
    cameraTop.position.y = 100;
    cameraTop.position.z = 0;
    cameraTop.lookAt(scene.position);
}

function createCameraSide() {
    'use strict';
    cameraSide = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor,
                                         window.innerWidth / cameraFactor,
                                         window.innerHeight / cameraFactor,
                                         window.innerHeight / -cameraFactor,
                                         1,
                                         1000);
    cameraSide.position.x = 100;
    cameraSide.position.y = 0;
    cameraSide.position.z = 0;
    cameraSide.lookAt(scene.position);
}

function createCameraFront() {
    'use strict';
    cameraFront = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor,
                                         window.innerWidth / cameraFactor,
                                         window.innerHeight / cameraFactor,
                                         window.innerHeight / -cameraFactor,
                                         1,
                                         1000);
    cameraFront.position.x = 0;
    cameraFront.position.y = 0;
    cameraFront.position.z = -100;
    cameraFront.lookAt(scene.position);
}
//-----------------------------------------

//-----Scene-------------------------------
function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    addGlobalLight(300, 500, 300);
    addChessBoard();
    addBoardSide();
    addDice(20, 15, -20);
    addBall(-20, 15, 20)


}

function addGlobalLight(x, y, z){
  directionalLight = new THREE.DirectionalLight(0xffffff, globalLightIntensity); //cor e intensidade
  directionalLight.position.set(x, y, z);
  scene.add(directionalLight);
}

function addChessBoard(){
  'use strict';
  materialWhite.map = textureWood;
  materialRed.map = textureWood;
  var boxGeometry = new THREE.BoxGeometry( 10, 10, 10 );

  for (var j = -2; j<3; j++){
    for (var i = -2; i<2; i++){

      var cube1 = new THREE.Mesh( boxGeometry, materialWhite);
      var cube2 = new THREE.Mesh( boxGeometry, materialWhite);
      var cube3 = new THREE.Mesh( boxGeometry, materialRed);
      var cube4 = new THREE.Mesh( boxGeometry, materialRed);

      cube1.position.x = 20*i+5;
      cube1.position.z = sum+5;
      cube2.position.x = 20*i+15;
      cube2.position.z = sum+15;

      cube3.position.x = 20*i+15;
      cube3.position.z = sum+5;
      cube4.position.x = 20*i+5;
      cube4.position.z = sum+15;

      scene.add( cube1 );
      scene.add( cube2 );
      scene.add( cube3 );
      scene.add( cube4 );

    }
    var sum = 20*j;

  }

}

function addBoardSide() {
  'use strict';
  //materialBoardSide.bumpMap = textureWood;
  materialBoardSide.map = textureWood;
  var boxGeometry = new THREE.BoxGeometry( 10, 10, 10 );
  var sideGeometry = new THREE.BoxGeometry( 80, 10, 10 );

  var boardSide1 = new THREE.Mesh( sideGeometry, materialBoardSide);
  var boardSide2 = new THREE.Mesh( sideGeometry, materialBoardSide);
  var boardSide3 = new THREE.Mesh( sideGeometry, materialBoardSide);
  var boardSide4 = new THREE.Mesh( sideGeometry, materialBoardSide);


  boardSide1.position.z = -45;

  boardSide2.position.z = 45;

  boardSide3.rotateY(Math.PI/2);
  boardSide3.position.x = 45;

  boardSide4.rotateY(Math.PI/2);
  boardSide4.position.x = -45;

  scene.add( boardSide1 );
  scene.add( boardSide2 );
  scene.add( boardSide3 );
  scene.add( boardSide4 );


  for (var j = -1; j < 2; j += 2){
    for (var i = -1; i < 2; i += 2){
      var cube = new THREE.Mesh( boxGeometry, materialBoardSide);
      cube.position.x += 45*i;
      cube.position.z += 45*j;
      scene.add( cube );
    }
  }

}

function addDice(x, y, z){
  'use strict';

  //materialDice.map = textureDice;

  var boxGeometry = new THREE.BoxGeometry( 20, 20, 20 );
  var dice = new THREE.Mesh( boxGeometry, materials);

  dice.position.x = x;
  dice.position.y = y;
  dice.position.z = z;

  scene.add( dice );

}

function addBall(x, y, z){
  'use strict';

  materialLenna.map = textureLenna;
  //materialLenna.specular();
  var sphereGeometry = new THREE.SphereGeometry( 10, 32, 32 );
  var ball = new THREE.Mesh( sphereGeometry, materialLenna);

  ball.position.x = x;
  ball.position.y = y;
  ball.position.z = z;

  scene.add( ball );
}
//-----------------------------------------

function onResize() {
    'use strict';

    // notify the renderer of the size change
    renderer.setSize(window.innerWidth, window.innerHeight);
    // update the camera

    cameraTop.left = -window.innerWidth / cameraFactor;
    cameraTop.right = window.innerWidth / cameraFactor;
    cameraTop.top = window.innerHeight / cameraFactor;
    cameraTop.bottom = -window.innerHeight / cameraFactor;
    cameraTop.updateProjectionMatrix();


    cameraPerspective.aspect = window.innerWidth / window.innerHeight;
    cameraPerspective.updateProjectionMatrix();

}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {

    case 49:   // tecla 1
        changeCameraTop = true;
        break;
    case 50:   // tecla 2
        changeCameraPerspective = true;
        break;

    case 52:   // tecla 4
        changeCameraFront = true;
        break;
    case 53:   // tecla 5
        changeCameraSide = true;
        break;

    case 82: // R
    case 114: // r
        switchAxisVisibility = true;
        break;
    }
}

function checkCamera(){
    if(changeCameraFront){
        camera = cameraFront;
        changeCameraFront = false;
    }
    else if(changeCameraSide){
        camera = cameraSide;
        changeCameraSide = false
    }
    else if(changeCameraTop){
        camera = cameraTop;
        changeCameraTop = false
    }
    else if(changeCameraPerspective){
        camera = cameraPerspective;
        changeCameraPerspective = false
    }

}

function checkAxisVisibility(){
    if (switchAxisVisibility){

        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });

    switchAxisVisibility = false;
    }
}

function init(){
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();

    createCameraPerspective();          //perspetiva
    createCameraTop();                  //ortográfica topo
    createCameraSide();                 //ortográfica lateral
    createCameraFront();                //ortográfica frente

    camera = cameraPerspective;

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    checkAxisVisibility();
    checkCamera();

    render();
    requestAnimationFrame(animate);
}
