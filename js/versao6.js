/*global THREE*/

var camera, cameraPerspective, cameraTop, cameraSide, cameraFront;
var cameraFactor = 7;

var changeCameraTop = false;
var changeCameraFront = false;
var changeCameraSide = false;
var changeCameraPerspective = false;

var sphereGeometry = new THREE.SphereGeometry( 10, 32, 32 );
var ball = new THREE.Mesh( sphereGeometry, materialGoldPhong);


var switchLightCalculus = false;
var currentMaterial = "phong";
var switchWireframe = false;

var meshArray = new Array(200);
var materialArrayBasic = new Array(200);
var materialArrayLambert = new Array(200);
var materialArrayPhong = new Array(200);
for (var a = 0; a < 200; a++){
  materialArrayBasic[a] = 0;
  materialArrayLambert[a] = 0;
  materialArrayPhong[a] = 0;
  meshArray[a] = 0;
}


var switchAxisVisibility = false;

var scene, renderer;
var geometry, mesh;

//var texture = new THREE.TextureLoader().load('textures/Lenna.jpg');
/*
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
*/


var materialWhiteBasic = new THREE.MeshBasicMaterial( {color: 'white', wireframe: false } );
var materialWhitePhong = new THREE.MeshPhongMaterial( {color: 'white', wireframe: false } );

var materialRedBasic = new THREE.MeshBasicMaterial( {color: 'red', wireframe: false } );
var materialRedPhong = new THREE.MeshPhongMaterial( {color: 'red', wireframe: false } );

var materialGoldBasic = new THREE.MeshBasicMaterial( {color: 'gold', wireframe: false } );
var materialGoldPhong = new THREE.MeshPhongMaterial( {color: 'gold', wireframe: false } );

for (var b = 1; b<80; b+=4){
  materialArrayBasic[b] = materialWhiteBasic;
  materialArrayPhong[b] = materialWhitePhong;

  materialArrayBasic[b+1] = materialWhiteBasic;
  materialArrayPhong[b+1] = materialWhitePhong;

  materialArrayBasic[b+2] = materialRedBasic;
  materialArrayPhong[b+2] = materialRedPhong;

  materialArrayBasic[b+3] = materialRedBasic;
  materialArrayPhong[b+3] = materialRedPhong;
}

//dice
materialArrayBasic[85] = materialGoldBasic;
materialArrayPhong[85] = materialGoldPhong;

//ball
materialArrayBasic[86] = materialGoldBasic;
materialArrayPhong[86] = materialGoldPhong;

var materialBoardSideBasic = new THREE.MeshBasicMaterial( { color: 'white', wireframe: false } );
var materialBoardSidePhong = new THREE.MeshPhongMaterial( { color: 'white', wireframe: false /*, map: texture*/} );

//4 laterais do tabuleiro
for (b = 81; b<85; b++){
  materialArrayBasic[b] = materialBoardSideBasic;
  materialArrayPhong[b] = materialBoardSidePhong;
}

//4 cubos dos cantos do tabuleiro
for (b = 87; b<91; b++){
  materialArrayBasic[b] = materialWhiteBasic;
  materialArrayPhong[b] = materialWhitePhong;
}

var globalLightIntensity = 1;

var dice_center;

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
    scene.add(new THREE.AxisHelper(70));

    addGlobalLight(300, 500, 300);
    addChessBoard();
    addBoardSide();
    addDice(0, 21, 0);
    addBall(-20, 15, 20)


}

function addGlobalLight(x, y, z){
  directionalLight = new THREE.DirectionalLight(0xffffff, globalLightIntensity); //cor e intensidade
  directionalLight.position.set(x, y, z);
  scene.add(directionalLight);
}

function addChessBoard(){
  'use strict';
  var boxGeometry = new THREE.BoxGeometry( 10, 10, 10 );

  var cubeCounter = 0;

  for (var j = -2; j<3; j++){
    for (var i = -2; i<2; i++){

      cubeCounter++;
      var cube1 = new THREE.Mesh( boxGeometry, materialWhitePhong);
      meshArray[cubeCounter] = cube1;

      cubeCounter++;
      var cube2 = new THREE.Mesh( boxGeometry, materialWhitePhong);
      meshArray[cubeCounter] = cube2;

      cubeCounter++;
      var cube3 = new THREE.Mesh( boxGeometry, materialRedPhong);
      meshArray[cubeCounter] = cube3;

      cubeCounter++;
      var cube4 = new THREE.Mesh( boxGeometry, materialRedPhong);
      meshArray[cubeCounter] = cube4;



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
  var boxGeometry = new THREE.BoxGeometry( 10, 10, 10 );
  var sideGeometry = new THREE.BoxGeometry( 80, 10, 10 );

  var boardSide1 = new THREE.Mesh( sideGeometry, materialBoardSidePhong);
  meshArray[81] = boardSide1;

  var boardSide2 = new THREE.Mesh( sideGeometry, materialBoardSidePhong);
  meshArray[82] = boardSide2;

  var boardSide3 = new THREE.Mesh( sideGeometry, materialBoardSidePhong);
  meshArray[83] = boardSide3;

  var boardSide4 = new THREE.Mesh( sideGeometry, materialBoardSidePhong);
  meshArray[84] = boardSide4;
  //materialBoardSide.map = texture;

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

  var cornerCubeCounter = 87;
  for (var j = -1; j < 2; j += 2){
    for (var i = -1; i < 2; i += 2){

      var cube = new THREE.Mesh( boxGeometry, materialBoardSidePhong);

      meshArray[cornerCubeCounter] = cube;

      cube.position.x += 45*i;
      cube.position.z += 45*j;
      scene.add( cube );
      cornerCubeCounter++;
    }
  }

}

function addDice(x, y, z){
  'use strict';

  var boxGeometry = new THREE.BoxGeometry( 20, 20, 20 );
  var dice = new THREE.Mesh( boxGeometry, materialGoldPhong);

  meshArray[85] = dice;

  dice.position.x = 0;
  dice.position.y = 0;
  dice.position.z = 0;


  dice_center = new THREE.Object3D();
  dice_center.position.set(x, y, z);
  dice_center.add(dice);

  scene.add(dice_center);

  dice.rotation.x = Math.PI/4;
  dice.rotation.z = Math.PI/4;

}

function addBall(x, y, z){
  'use strict';



  meshArray[86] = ball;

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
        scene.remove(ball);
        ball.geometry.dispose();
        ball.material.dispose();
        ball = undefined;
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



    case 87: // W
    case 119: // w
        switchWireframe = true;
        break;

    case 76: //L
    case 108: //l
        switchLightCalculus = true;
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


function switchMaterials(){
  console.log('troca materiais.');
  const meshLen = meshArray.length;
  console.log(meshLen);

  if (currentMaterial == "phong"){
      currentMaterial = "basic";   //Phong -> Basic
      for (var z =  0; z < meshLen; z++) {
          meshArray[z].material=materialArrayBasic[z];
      }
  }

  else if (currentMaterial == "basic"){
      currentMaterial = "phong"; //Basic -> Phong
      for (i =  0; i < meshLen; i++) {
          meshArray[i].material=materialArrayPhong[i];
      }
  }


  switchLightCalculus = false;
}


function switchWireframes(){

  const meshLen = meshArray.length;
  console.log('muda wireframe.')
  /*
  for (i =  0; i < meshLen; i++) {
      materialArrayBasic[i].wireframe = !materialArrayBasic[i].wireframe;
      materialArrayPhong[i].wireframe = !materialArrayPhong[i].wireframe;
  }
  */
  materialArrayBasic[1].wireframe = !materialArrayBasic[1].wireframe;
  materialArrayPhong[1].wireframe = !materialArrayPhong[1].wireframe;
  materialArrayBasic[3].wireframe = !materialArrayBasic[3].wireframe;
  materialArrayPhong[3].wireframe = !materialArrayPhong[3].wireframe;

  materialArrayBasic[81].wireframe = !materialArrayBasic[81].wireframe;
  materialArrayPhong[81].wireframe = !materialArrayPhong[81].wireframe;

  materialArrayBasic[85].wireframe = !materialArrayBasic[85].wireframe;
  materialArrayPhong[85].wireframe = !materialArrayPhong[85].wireframe;

  //materialArrayBasic[86].wireframe = !materialArrayBasic[86].wireframe;
  //materialArrayPhong[86].wireframe = !materialArrayPhong[86].wireframe;


  switchWireframe = false;
}

function rotate_dice(){
	dice_center.rotateY(0.05);
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

    if(switchLightCalculus){
      switchMaterials();
    }

    if(switchWireframe){
      switchWireframes();
    }

    rotate_dice();

    render();
    requestAnimationFrame(animate);
}
