let video = document.querySelector("video");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn =document.querySelector(".capture-btn");
let recordBtnCont =document.querySelector(".record-btn-cont");
let recordBtn =document.querySelector(".record-btn");
let transparentColor ="transparent";
let recorder;
let chunks=[];
let constraints ={
    video:true,
    audio:true
}
navigator.mediaDevices.getUserMedia(constraints).then(
     (stream) => {
      video.srcObject=stream;

      recorder = new MediaRecorder(stream);

      recorder.addEventListener("start",()=>{
        chunks=[];
      });

      recorder.addEventListener("dataavailable",(e)=>{
        chunks.push(e.data)
      })

      recorder.addEventListener("stop",()=>{
      //convert the video


      })

    }
)

captureBtnCont.addEventListener("click", ()=>{
let canvas =document.createElement("canvas"); 
let tool =canvas.getContext("2d");
canvas.width =video.videoWidth;
canvas.height=video.videoHeight;

tool.drawImage(video,0,0,canvas.width,canvas.height);
//applying filter / by default color is black
tool.fillStyle=transparentColor;
tool.fillRect(0,0,canvas.width,canvas.height);

let imageURL = canvas.toDataURL();
//append in document
let img =document.createElement("img");
img.src =imageURL;
document.body.append(img);

});
let isRecordStart=false;
recordBtnCont.addEventListener("click",()=>{

    isRecordStart=!isRecordStart;
    if(isRecordStart){

        //media start
        recorder.start();
        //timer start

    }else{
        //media stop
        recorder.stop();
        //timer stop

    }


});