/*global THREE*/

var camera, cameraPerspective, cameraTop, cameraSide, cameraFront;
var cameraFactor = 7;

var changeCameraTop = false;
var changeCameraFront = false;
var changeCameraSide = false;
var changeCameraPerspective = false;




var switchLightCalculus = false;
var currentMaterial = "phong";
var switchWireframe = false;

var ballObject;
var ballMesh;
var sphereGeometry;
var stopBall = false;
var velocity = 0.000001;
var accelerationPositive = 0.0003;
var accelerationNegative = 0.0003;
var finalVelocity = 0;
var teclaB = false;
//var ballMaxSpeed = 0.1;

var diceObject;
var diceMaxSpeed = 0.05;

var plane;

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


// toDo
var textureLenna = new THREE.TextureLoader().load('textures/Lenna.png');
var textureWood = new THREE.TextureLoader().load('textures/hardwood.jpg');
textureWood.wrapS = THREE.RepeatWrapping;
textureWood.wrapT = THREE.RepeatWrapping;
textureWood.repeat.set( 4, 4 );

var texturePause = new THREE.TextureLoader().load('textures/pause.jpg');
var material = new THREE.MeshBasicMaterial();

// toDo
var materialLennaBasic = new THREE.MeshBasicMaterial({wireframe: false });
var materialLennaPhong = new THREE.MeshPhongMaterial({wireframe: false });


var textureLoader = new THREE.TextureLoader();

var texture1 = textureLoader.load( 'textures/dice1.jpg' );
var texture2 = textureLoader.load( 'textures/dice2.jpg' );
var texture3 = textureLoader.load( 'textures/dice3.png' );
var texture4 = textureLoader.load( 'textures/dice4.png' );
var texture5 = textureLoader.load( 'textures/dice4.png' );
var texture6 = textureLoader.load( 'textures/dice6.jpg' );

var materialDiceBasic   = [
                        new THREE.MeshBasicMaterial( { map: texture5 } ),  //RIGHT
                        new THREE.MeshBasicMaterial( { map: texture1 } ),  //LEFT
                        new THREE.MeshBasicMaterial( { map: texture2 } ),  //BACK
                        new THREE.MeshBasicMaterial( { map: texture4 } ),  //FRONT
                        new THREE.MeshBasicMaterial( { map: texture3 } ),  //TOP
                        new THREE.MeshBasicMaterial( { map: texture6 } )   //BOTTOM
    ];

var materialDicePhong   = [
                        new THREE.MeshPhongMaterial( { map: texture5 } ),  //RIGHT
                        new THREE.MeshPhongMaterial( { map: texture1 } ),  //LEFT
                        new THREE.MeshPhongMaterial( { map: texture2 } ),  //BACK
                        new THREE.MeshPhongMaterial( { map: texture4 } ),  //FRONT
                        new THREE.MeshPhongMaterial( { map: texture3 } ),  //TOP
                        new THREE.MeshPhongMaterial( { map: texture6 } )   //BOTTOM
    ];






var materialWhiteBasic = new THREE.MeshBasicMaterial( {color: 'white', wireframe: false } );
var materialWhitePhong = new THREE.MeshPhongMaterial( {color: 'white', wireframe: false } );

var materialRedBasic = new THREE.MeshBasicMaterial( {color: 'red', wireframe: false } );
var materialRedPhong = new THREE.MeshPhongMaterial( {color: 'red', wireframe: false } );

var materialGoldBasic = new THREE.MeshBasicMaterial( {color: 'gold', wireframe: false } );
var materialGoldPhong = new THREE.MeshPhongMaterial( {color: 'gold', specular:  0x050505,
                                                      shininess: 200, wireframe: false } ); //FIXME

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
materialArrayBasic[85] = materialDiceBasic;
materialArrayPhong[85] = materialDicePhong;   //toDo dice

//toDo
//ball
materialArrayBasic[86] = materialLennaBasic;
materialArrayPhong[86] = materialLennaPhong;

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

var directionalLightIntensity = 1;
var pointLightIntensity = 2;

var directionalLightStatus = true;
var pointLightStatus = false;


var isPaused = false;
var reset = false;
var wireframeState = false;
var basicState = false;

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

    addDirectionalLight(300, 500, 300);
    addPointLight(40, 10, 0);


    addChessBoard();
    addBoardSide();

    diceObject = new THREE.Object3D();
    addDice(diceObject, 0, 20, 0);
    scene.add(diceObject);

    ballObject = new THREE.Object3D();
    addBall(ballObject, -20, 15, 20);
    scene.add(ballObject);
/*
    plane = new THREE.Object3D();
    addPlane(plane, 0, 100, 0);
    scene.add(plane);
*/
}



function addDirectionalLight(x, y, z){

  directionalLight = new THREE.DirectionalLight(0xffffff, directionalLightIntensity);
  directionalLight.position.set(x, y, z);
  scene.add(directionalLight);
}

function addPointLight(x, y, z){

  pointLight = new THREE.PointLight(0xffff00, pointLightIntensity);
  pointLight.position.set(x, y, z);
  scene.add(pointLight);
}



function addChessBoard(){
  'use strict';

  // toDo
  materialWhiteBasic.map = textureWood;
  materialWhitePhong.map = textureWood;

  materialRedBasic.map = textureWood;
  materialRedPhong.map = textureWood;


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
  // toDo
  materialBoardSidePhong.map = textureWood;
  materialBoardSideBasic.map = textureWood;

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

function addDice(obj, x, y, z){
  'use strict';

  var boxGeometry = new THREE.BoxGeometry( 20, 20, 20 );
  var diceMesh = new THREE.Mesh( boxGeometry, materialDicePhong); //toDo dice

  diceMesh.rotation.x = Math.PI/4;
  diceMesh.rotation.y = Math.PI/4;
  //diceMesh.rotation.z = Math.PI/4;

  meshArray[85] = diceMesh;

  diceMesh.position.x = x;
  diceMesh.position.y = y;
  diceMesh.position.z = z;

  obj.add( diceMesh );

}

function addBall(obj, x, y, z){
  'use strict';

  // toDo
  materialLennaBasic.map = textureLenna;
  materialLennaPhong.map = textureLenna;

  sphereGeometry = new THREE.SphereGeometry( 10, 10, 10 );
  ballMesh = new THREE.Mesh( sphereGeometry, materialLennaPhong); //toDo

  meshArray[86] = ballMesh;

  ballMesh.position.x = x;
  ballMesh.position.y = y;
  ballMesh.position.z = z;

  obj.add( ballMesh );
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



    case 87: // W
    case 119: // w
        switchWireframe = true;
        break;

    case 76: //L
    case 108: //l
        switchLightCalculus = true;
        break;

    case 66: //B
    case 98: //b
        //Change Ball acceleration
        teclaB = true;
        break;


    case 80: //P
    case 112: //p
        //Turn On/Off PointLight
        pointLightStatus = !pointLightStatus;
        break;

    case 68: //D
    case 100: //d
        //Turn On/Off DirectionalLight
        directionalLightStatus = !directionalLightStatus;
        break;


    case 83: //S
    case 115: //s
        //Toggle Pause Switch
        isPaused = !isPaused;
        console.log('em pausa?');
        console.log(isPaused);
        break;

    case 82: //R
    case 114: //r
        //Toggle Reset Switch
        reset = true;
        console.log('reset?');
        console.log(reset);
        break;


    case 84: // T
    case 116: // t
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


function checkBallMove(){

    if (!teclaB){
        velocity = velocity + accelerationPositive;
        finalVelocity = velocity + accelerationPositive;
    }
    else{
        velocity = velocity - accelerationNegative;
        finalVelocity = velocity - accelerationNegative;
    }

    if (finalVelocity > 0.1){
      finalVelocity = 0.1;
      accelerationPositive = 0;
    }
    if (finalVelocity < 0){
      finalVelocity = 0;
      accelerationNegative = 0;
    }

    ballObject.rotateY(finalVelocity);

    //console.log(ballMesh);
    ballMesh.rotateX(finalVelocity);

}


function checkDiceMove(){


  diceObject.rotateY(diceMaxSpeed);
}


function checkDirectionalLight(){
  if (directionalLightStatus==false){
    directionalLight.intensity = 0;
  }
  else{
    directionalLight.intensity = directionalLightIntensity;
  }
}


function checkPointLight(){
  if (pointLightStatus==false){
    pointLight.intensity = 0;
  }
  else{
    pointLight.intensity = pointLightIntensity;
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


  basicState = !basicState;

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

  switchWireframesAux();

  //materialArrayBasic[86].wireframe = !materialArrayBasic[86].wireframe;
  //materialArrayPhong[86].wireframe = !materialArrayPhong[86].wireframe;

  wireframeState = !wireframeState;

  switchWireframe = false;
}

function switchWireframesAux(){

  materialArrayBasic[1].wireframe = !materialArrayBasic[1].wireframe;
  materialArrayPhong[1].wireframe = !materialArrayPhong[1].wireframe;
  materialArrayBasic[3].wireframe = !materialArrayBasic[3].wireframe;
  materialArrayPhong[3].wireframe = !materialArrayPhong[3].wireframe;

  materialArrayBasic[81].wireframe = !materialArrayBasic[81].wireframe;
  materialArrayPhong[81].wireframe = !materialArrayPhong[81].wireframe;

  //dice
  for (var z = 0; z<6; z++){
    materialArrayBasic[85][z].wireframe = !materialArrayBasic[85][z].wireframe;
    materialArrayPhong[85][z].wireframe = !materialArrayPhong[85][z].wireframe;
  }


  //toDo
  materialArrayBasic[86].wireframe = !materialArrayBasic[86].wireframe;
  materialArrayPhong[86].wireframe = !materialArrayPhong[86].wireframe;
}



function resetObjects(){

  resetBall();
  resetDice();
  resetLights();
  resetWireframeAndMaterial();
  resetFlags();

}


function resetBall(){

  scene.remove(ballObject);
  ballObject = new THREE.Object3D();
  addBall(ballObject, -20, 15, 20);
  scene.add(ballObject);

  velocity = 0.000001;
  accelerationPositive = 0.0003;
  accelerationNegative = 0.0003;
}

function resetDice(){

  scene.remove(diceObject);
  diceObject = new THREE.Object3D();
  addDice(diceObject, 0, 20, 0);
  scene.add(diceObject);
}

function resetLights(){

  directionalLightIntensity = 1;
  pointLightIntensity = 2;

  directionalLightStatus = true;
  pointLightStatus = false;
}

function resetWireframeAndMaterial(){

  if (wireframeState){
    switchWireframes();
  }

  if (basicState){
    switchMaterials();
  }
}

function resetFlags(){

  teclaB = false;
  reset = false;
  isPaused = false;
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


    if (reset){
      resetObjects();
    }

    if (!isPaused){

      checkBallMove();
      checkDiceMove();
    }

    checkAxisVisibility();
    checkCamera();

    if(switchLightCalculus){
      switchMaterials();
    }

    if(switchWireframe){
      switchWireframes();
    }

    checkDirectionalLight();
    checkPointLight();


    render();
    requestAnimationFrame(animate);
}
