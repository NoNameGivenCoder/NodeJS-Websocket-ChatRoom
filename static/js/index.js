let ws;

ws = new WebSocket("ws://nodejs-websocket-chatroom-production.up.railway.app/");
ws.onopen = ({data}) => {
    console.log("Connected to websocket");

    console.log(data)
}

ws.onmessage = ({data}) => showMessage(data);
ws.onclose = () => {
    ws = null;
    console.log("Closed Websocket");
}

function sendMessage() {
    const content = $('#content').val();

    ws.send(content);

    $("#messages-list").append(`<li> ${content} </li>`);
}

async function showMessage(data) {

    if (data.includes('[')) {
        JSON.parse(data).forEach(element => {
            $("#messages-list").append(`<li> ${element} </li>`);
        });
    } else {
        $("#messages-list").append(`<li> ${await data.text()} </li>`);   
    }
}