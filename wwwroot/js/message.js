"use strict";

var connection = new signalR.HubConnectionBuilder()
                        .withUrl("/messages")
                        .build();

// định nghĩa các phương thức treen client mà hub (trên server) có thể gọi sử dụng connection.on, sau khi build nhưng trước khi start
// 
connection.on("ReceiveMessage", function(message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var div = document.createElement("div");
    div.innerHTML = msg + "<hr/>";
    document.getElementById("messages").appendChild(div);
});

connection.start().catch(function(err) {
    return console.error(err.toString());
});

// js client call public method on hubs via the invoke method of the HubConnection
document.getElementById("sendButton").addEventListener("click", function(event) {
    var message = document.getElementById("message").value;
    connection.invoke("SendMessageToAll", message).catch(function (err) {
        return console.error(err.toString())
    });
    event.preventDefault();
});