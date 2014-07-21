 
var canvas;
var canvasW;
var canvasH;

var context;
var width;

var colorList = ["#FF0000", "#00FF00", "#0000FF","#FFFF00"];
var colorCount = 0;

function setVal(a)
{
    width = a;
}

function drawMap()
{
    canvas = document.getElementById("marketmap");
    context = canvas.getContext("2d");
    canvasW = canvas.getAttribute("width");
    canvasH = canvas.getAttribute("height");
    
    var box = [0,0, canvasW, canvasH];
    var L = [2,2,2,1,1,1,1];
    var dir = 0;
    drawRegion(box, dir, L);
}


function getNextColor()
{
    colorCount = (colorCount+1)%colorList.length;
    return colorList[colorCount];
}

function drawRegion(box, dir, valList)
{
    if(valList.length==1)
    {
        context.fillStyle = getNextColor();
        console.log(valList+"->"+box);
        context.fillRect(box[0], box[1], box[2], box[3]);
        return;
    }

    var leftList = [];
    var leftSum = 0;
    var rightList = [];
    var rightSum = 0;
    
    sortedList = valList.sort().reverse();
    leftList.push(sortedList[0]);
    leftSum = leftList[0];
    for(i=1; i<sortedList.length; i++)
    {
        var curVal = valList[i];
        if(leftSum <=rightSum)
        {
            leftList.push(curVal);
            leftSum+=curVal;
        }
        else
        {
            rightList.push(curVal);
            rightSum+=curVal;
        }
    }

    var totalSum = rightSum+leftSum;
    console.log(totalSum);
    var leftBox = box.slice();
    var rightBox = box.slice();
    if(dir==1)
    {
        leftBox[2] = Math.floor((leftSum*box[2])/totalSum);
        rightBox[0] = leftBox[2]+leftBox[0]+1;
        rightBox[2] = box[2] - leftBox[2];
    }
    else
    {
        leftBox[3] = Math.floor((leftSum*box[3])/totalSum);
        rightBox[1] = leftBox[3]+leftBox[1]+1;
        rightBox[3] = box[3] - leftBox[3];
    }
    dir = (dir+1)%2;
    console.log(leftList);
    console.log(rightList);
    drawRegion(leftBox, dir, leftList);
    drawRegion(rightBox, dir, rightList);

}
