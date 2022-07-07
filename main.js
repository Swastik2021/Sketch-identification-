function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}


function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clearCanvas() {
    background("white");
}

function draw() {
    strokeWeight(13);
    stroke(0);
    //pmouseX and pmouseY has previous x and y coordinate of mouse (its a predefined variable of p5.js)
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas() {
    classifier.classify(canvas, gotResult)
}
function gotResult(error, results){
    if(error){
        console.log(error);   
    }
    console.log(results);
    document.getElementById("label").innerHTML = "Label:"+ results[0].label;
    document.getElementById("Confidence").innerHTML = "Confidence" + Math.round(results[0].confidence*100)+ "%";
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}
