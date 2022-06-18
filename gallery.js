
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
     videoDiv.innerHTML=`
     <div class="show">
     <video autoplay loop src="${videoObj.url}"></video>
     </div>
     <div class="delete">DELETE</div>
     <div class="download">DOWNLOAD</div>
     `;
     galleryCont.appendChild(videoDiv);
    
    })
    
    }

}
},2000);

