#  Video Call Application

A full-featured, browser-based real-time video calling application supporting multi-party communication, chat, screen sharing, and file transfer.  
Built to deliver a seamless and secure communication experience using WebRTC and Node.js.

---

##  Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

##  Overview

This project is a complete **Video Call Platform** developed to provide a robust communication experience directly in the browser — without plugins or external software.  
It supports **multi-party calls**, **text chat**, and **screen sharing** all while being optimized for both desktop and mobile.

---

##  Features

 **Multi-Party Video Calls** — powered by WebRTC with Mesh/SFU/MCU architecture support.  
 **Text Chat** — real-time messaging alongside video.  
 **Screen Sharing** — share your entire screen or specific windows during calls.  
 **Responsive UI** — optimized for both desktop and mobile browsers.  
 **Authentication** — user login, room creation, and access management.  
 **Room Management** — create, join, and list available rooms dynamically.

---

##  Architecture

- **Frontend (Client):**  
  Uses WebRTC APIs for real-time peer connections and media handling.  
  UI built with modern JavaScript and  frameworks React .  
  Handles chat, Video call and screen sharing interfaces.

- **Backend (Server):**  
  Node.js server with Socket.io for signalling between peers.  
  Manages rooms, authentication, and message/event routing.  
  Can integrate with TURN/STUN servers for NAT traversal.

---

##  Tech Stack

| Layer | Technologies |
|:--|:--|
| **Frontend** | HTML5, CSS3, JavaScript , WebRTC APIs, Material UI, AXIOS, ReactJS |
| **Backend** | Node.js, Express.js, Socket.io, bcrypt, Crypto |
| **Database**| MongoDB |
| **Media & Signalling** | WebRTC + STUN/TURN servers |
| **Deployment** | Heroku / Render / AWS / Vercel |

---

## 
Getting Started

### Prerequisites

- Node.js ≥ 14.x  
- npm or yarn  
- A modern browser supporting WebRTC (Chrome, Edge, Firefox, Safari)

### Installation

    git clone https://github.com/foranurag0202/Video_Call_Application.git
    cd Video_Call_Application

### Backend Setup

cd backend
npm install
npm start

###Frontend Setup

cd ../frontend
npm install
npm run dev

Then open the browser at http://localhost:3000 (or the configured frontend port).

🕹 ###Usage

@Open the app and grant camera & microphone permissions.

@Sign in or enter a room ID to create/join a room.

@Start your video call — invite others by sharing the room link.

@Use the controls to:

  Mute/unmute audio
  
  Enable/disable camera
  
  Share your screen
  
  Chat 
  
  Leave or end the call

### Project Structure

Video_Call_Application/
├─ backend/
│   ├─ index.js
│   ├─ package.json
│   └─ ...server logic
├─ frontend/
│   ├─ src/
│   ├─ public/
│   ├─ package.json
│   └─ ...client logic
└─ README.md

###  Configuration

Update frontend WebSocket URL if backend runs on a separate port.
For production, deploy with HTTPS to support secure WebRTC.

Update the .env for production and local.

##Future Enhancements

`UI & Security Improvements

`Redesign interface for a smoother user experience.

`Add dark/light mode and animated transitions.

`Implement end-to-end encryption for calls and chat.

`Strengthen authentication .

`Add role-based permissions (host, guest, moderator).

### License

    ```This project is open-source under the MIT License.
