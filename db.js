//connect and create databse
let db;
let openRequest = indexedDB.open("myDatabase");

openRequest.addEventListener("success",()=>{
    db =openRequest.result;
    console.log("connected with db");
});

openRequest.addEventListener("upgradeneeded",()=>{
console.log("created or intialized phase");
db =openRequest.result;
//creating objectStore
db.createObjectStore("image",{keyPath:"id"});
db.createObjectStore("video",{keyPath:"id"});


});

openRequest.addEventListener("error",()=>{
console.log("db error");

});
