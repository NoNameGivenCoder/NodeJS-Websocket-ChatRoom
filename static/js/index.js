let ws;

ws = new WebSocket("wss://nodejs-websocket-chatroom-production.up.railway.app/");
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
    content = ""
}

async function showMessage(data) {

    try {
        JSON.parse(data).forEach(element => {

            $("#messages-list").append(`<li> ${element} </li>`);
        });
    } catch(err) {
        $("#messages-list").append(`<li> ${await data.text()} </li>`);   
    }
}