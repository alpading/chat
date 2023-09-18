"use strict"
const socket = io()

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")
const displayContainer = document.querySelector(".display-container")

sendButton.addEventListener("click", () => {
    const param = {
        "name" : nickname.value,
        "message" : chatInput.value,
    }
    socket.emit("chatting", param)
})

socket.on("chatting", (data) => {
    const { name, message, time } = data
    const item = new LiModel(data.name, data.message, data.time)
    item.makeLi()
    displayContainer.scrollTop(0,displayContainer.scrollHeight)
})

function LiModel(name,message,time) {
    this.name = name
    this.message = message
    this.time = time

    this.makeLi =  () => {
        const li = document.createElement("li")

        li.classList.add(nickname.value == this.name ? "sent" : "received")

        const dom = ` <span class = "profile">
        <span class = "user">${this.name}</span>
        <img src = "../image/cat.jpeg" alt = "any" class = "image">
        </span>
        <span class = "message">${this.message}</span>
        <span class = "time">${this.time}</span>`
        
        li.innerHTML = dom;
        chatList.appendChild(li)
    }
}

console.log(socket)