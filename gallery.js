let backbtn =document.querySelector(".back");
backbtn.addEventListener("click",()=>{
    location.assign("./index.html");
})
setTimeout(()=>{
if(db){
    
    let imageDbTransaction =db.transaction("image","readonly");
    let imageStore = imageDbTransaction.objectStore("image");
    
    let imageRequest = imageStore.getAll();
   
    imageRequest.onsuccess = function () {
        let imageResult = imageRequest.result;
        console.log(imageResult);
        let galleryCont = document.querySelector(".media");
        imageResult.forEach((imageObj) => {
            let imageDiv = document.createElement("div");
            imageDiv.setAttribute("class", "content");
            imageDiv.setAttribute("id", imageObj.id);
            imageDiv.innerHTML = `
     <div class="show">
     <img src="${imageObj.url}"/>
     </div>
     <div class="delete">DELETE</div>
     <div class="download">DOWNLOAD</div>
     `;
     galleryCont.appendChild(imageDiv);
       
       let deletebtn = imageDiv.querySelector(".delete");
       deletebtn.addEventListener("click",deletelistner);
       let downloadbtn= imageDiv.querySelector(".download");
       downloadbtn.addEventListener("click",downloadlistner);

        });

    }
    imageRequest.onerror=(er)=>{
     console.log(er);
     
    }
    
    let videoDbTransaction =db.transaction("video","readonly");
    let videoStore = videoDbTransaction.objectStore("video");
    
    let videoRequest = videoStore.getAll();
    
    videoRequest.onsuccess =()=>{
    let videoResult = videoRequest.result;
    let galleryCont = document.querySelector(".media");
    videoResult.forEach((videoObj)=>{
     let videoDiv = document.createElement("div");
     videoDiv.setAttribute("class" ,"content");
     videoDiv.setAttribute("id",videoObj.id);
     let url = URL.createObjectURL(videoObj.blobData);
     videoDiv.innerHTML=`
     <div class="show">
     <video autoplay loop src="${url}"></video>
     </div>
     <div class="delete">DELETE</div>
     <div class="download">DOWNLOAD</div>
     `;
     galleryCont.appendChild(videoDiv);
     let deletebtn = videoDiv.querySelector(".delete");
     deletebtn.addEventListener("click",deletelistner);
     let downloadbtn= videoDiv.querySelector(".download");
     downloadbtn.addEventListener("click",downloadlistner);
    
    })
    
    }

}
},2000);

function deletelistner(e){
let id =e.target.parentElement.getAttribute("id");
let type = id.split("-")[0];
 if(type=="img"){
    let imageTra = db.transaction("image","readwrite");
    let imageStore =imageTra.objectStore("image");
    let deleteRequest = imageStore.delete(id);
    deleteRequest.onsuccess=()=>{
        console.log("image deleted Successfully");
    }

 }else if(type=="vid"){
    let videoTra = db.transaction("video","readwrite");
    let videoStore =videoTra.objectStore("video");
    let deleteRequest = videoStore.delete(id);
    deleteRequest.onsuccess=()=>{
        console.log(" video deleted Successfully");
    }

 }
 e.target.parentElement.remove();
}

function downloadlistner(e){
let id =e.target.parentElement.getAttribute("id");
let type = id.split("-")[0];
if(type=="img"){
    let imageTra = db.transaction("image","readonly");
    let imageStore =imageTra.objectStore("image");
    let imageRequest = imageStore.get(id);
    imageRequest.onsuccess=()=>{
        let imageResult =imageRequest.result;
        let a =document.createElement("a");
        a.href =imageResult.url;
        a.download="image.png";
        a.click();
    }

}else if(type=="vid"){
    let videoTra = db.transaction("video","readonly");
    let videoStore =videoTra.objectStore("video");
    let videoRequest = videoStore.get(id);
    videoRequest.onsuccess=()=>{
        let videoResult =videoRequest.result;
        let a =document.createElement("a");
        a.href =videoResult.url;
        a.download="myvideo.mp4";
        a.click();
    }
}

}