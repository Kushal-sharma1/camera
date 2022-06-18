var uid =new ShortUniqueId();
let video = document.querySelector("video");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn =document.querySelector(".capture-btn");
let recordBtnCont =document.querySelector(".record-btn-cont");
let recordBtn =document.querySelector(".record-btn");
let transparentColor ="transparent";
let timer = document.querySelector(".timer");
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
      let blob =new Blob(chunks,{type:'video/mp4'});

      let videoUrl = URL.createObjectURL(blob);
      if(db){
        let videoId =uid();
        let videoTransaction =db.transaction("video","readwrite");
        let videoStore =videoTransaction.objectStore("video");
        let videoEle={
            id:videoId,
            url:videoUrl,
        }
        let addRequest=videoStore.add(videoEle);
        addRequest.onsuccess=()=>{
            console.log("successfully video added in database")
        }
    }



    //  // download a video
    //   let a =document.createElement("a");
    //   a.href =videoUrl;
    //   a.download ="myVideo.mp4";
    //   a.click();

      })

    }
)

captureBtnCont.addEventListener("click", ()=>{
captureBtn.classList.add("scale-capture");

let canvas =document.createElement("canvas"); 
let tool =canvas.getContext("2d");
canvas.width =video.videoWidth;
canvas.height=video.videoHeight;

tool.drawImage(video,0,0,canvas.width,canvas.height);
//applying filter / by default color is black
tool.fillStyle=transparentColor;
tool.fillRect(0,0,canvas.width,canvas.height);

let imageURL = canvas.toDataURL();

if(db){
    let imageId =uid();
    let imageTransaction =db.transaction("image","readwrite");
    let imageStore =imageTransaction.objectStore("image");
    let imageEle={
        id:imageId,
        url:imageURL,
    }
    let addRequest=imageStore.add(imageEle);
    addRequest.onsuccess=()=>{
        console.log("successfully image added in database")
    }
}
// //append in document
// let img =document.createElement("img");
// img.src =imageURL;
// document.body.append(img);
setTimeout(()=>{
    captureBtn.classList.remove("scale-capture");
},510);
});
let isRecordStart=false;
recordBtnCont.addEventListener("click",()=>{
   
    isRecordStart=!isRecordStart;
    if(isRecordStart){
        recordBtn.classList.add("scale-record");
        //media start
        recorder.start();
        //timer start
        startTimer();

    }else{
        recordBtn.classList.remove("scale-record");
        //media stop
        recorder.stop();
        //timer stop
        stopTimer();

    }


});
let counter=0;
let timerId;
function startTimer(){
   counter=0;
   timer.style.display ='block';
   function displayTimer(){
    let totalSec =counter;

    let hours = Number.parseInt(totalSec/3600);
    totalSec = totalSec%3600;
    let minutes = Number.parseInt(totalSec/60);
    totalSec =totalSec%60;
    let sec=totalSec;
    
    hours =(hours <10)?`0${hours}`:hours;
    minutes=(minutes <10)?`0${minutes}`:minutes;
    sec =(sec  <10)?`0${sec }`:sec ;
    timer.innerText=`${hours}:${minutes}:${sec}`;
    counter++;
   }

   timerId =setInterval(displayTimer,1000);

}

function stopTimer(){
    clearInterval(timerId);
    timer.innerText="00:00:00";
    timer.style.display='none';
}


//filter add

let filters = document.querySelectorAll(".filter");
let filterLayer =document.querySelector(".filter-layer");
filters.forEach((filterEle)=>{
    filterEle.addEventListener("click",()=>{
       transparentColor = getComputedStyle(filterEle).getPropertyValue('background-color');
       filterLayer.style.backgroundColor = transparentColor;

    })
})