function func(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(username == 'qaifi' && password == 'qaifi'){
        alert("successfull!")
        window.location.assign("order.html")
    }
    else{
        alert("wrong entry invalid")
    }
}