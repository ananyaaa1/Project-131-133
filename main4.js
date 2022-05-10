img = "";
status1 = "";
objects = [];
function setup()
{
    canvas = createCanvas(640,450);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML= "Status : Object Detecting";
}

function modelLoaded()
{
    console.log("modelLoaded");
    status1 = true;
    objectDetector.detect(img, gotResult);
}
 

function preload()
{
    img = loadImage("officeroom.jpg");
}

function draw()
{
    image(img, 0, 0, 640,450);
    if (status1 != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML= "Status : Object detected";

            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%" , objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("#ff000");
            rect(objects[i].x , objects[i].y , objects[i].width, objects[i].height);
        }
    }
}

function gotResult (error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}