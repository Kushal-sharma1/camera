
let imageDbTransaction =db.transaction("image","readonly");
let imageStore = db.objectStore("image");

let imageRequest = imageStore.getAll();

imageRequest.onsuccess =()=>{
let imageResult =imageRequest.result;
let galleryCont = document.querySelector(".media");
imageResult.forEach((imageObj)=>{
 let imageDiv = document.createElement("div");
 imageDiv.setAttribute("class" , "media-sub");
 imageDiv.setAttribute("id",imageObj.id);
 imageDiv.innerHTML=`
 <div>
 <img src="${imageObj.url}">
 </div>
 <div class="delete">DELETE</div>
 <div class="download">DOWNLOAD</div>
 `;
 galleryCont.appendChild(imageDiv);

})

}
