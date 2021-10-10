let item = document.querySelectorAll("tr");
let add = document.getElementById('add');
let lastItem = item[item.length-1];
add.addEventListener('click',function(){
    console.log(lastItem);
    if(lastItem!=item[item.length-1]){
        console.log("get in the")
        lastItem = item[item.length-1];
        lastItem.classList.add("rotate-contact")
        setTimeout(function(){
            lastItem.classList.remove("rotate-contact");
        }, 500);
    }
});