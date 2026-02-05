const myIdDisplay = document.getElementById('my-id-display');
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');

// 1. Initialize Peer (This generates a random ID or you can specify one)
const peer = new Peer(); 

let localStream;

// 2. Get Camera and Microphone
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localStream = stream;
        localVideo.srcObject = stream;
    })
    .catch(err => console.error("Failed to get local stream", err));

// 3. Display your ID when Peer is ready
peer.on('open', (id) => {
    myIdDisplay.innerText = id;
});

// 4. Handle incoming calls
peer.on('call', (call) => {
    call.answer(localStream); // Answer with your stream
    call.on('stream', (userRemoteStream) => {
        remoteVideo.srcObject = userRemoteStream;
    });
});

// 5. Function to call someone else
function makeCall() {
    const remoteId = document.getElementById('remote-id').value;
    if (!remoteId) return alert("Enter an ID first!");

    const call = peer.call(remoteId, localStream);
    call.on('stream', (userRemoteStream) => {
        remoteVideo.srcObject = userRemoteStream;
    });
}
