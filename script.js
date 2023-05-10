//----------------------Video-Recorder-------------------------------------
let vidrecnum=0;
function start_video_Recording() {
   
    //To stores or load recorded media
 
    let chunks = [];
    const startBtn=document.getElementById("video_st");
    const endBtn=document.getElementById("video_en");
    
    // Access the camera and microphone for recording permission.
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then((mediaStreamObj) => {
    
       // Create a new MediaRecorder instance
       const medRec =new MediaRecorder(mediaStreamObj);
       window.mediaStream = mediaStreamObj;
       window.mediaRecorder = medRec;
       medRec.start();
       
       //when recorded data is available then push into chunkArr array
       medRec.ondataavailable = (e) => {
          chunks.push(e.data);
       };
       
       //stop the video recording
       medRec.onstop = () => {
          const blobFile = new Blob(chunks, { type:"video/mp4" });chunks = [];
       
          // create video element and store the media which is recorded
         // const recMediaFile = document.createElement("video");
         // recMediaFile.controls = true;
         // const RecUrl = URL.createObjectURL(blobFile);
          
          //keep the recorded url as source
          //recMediaFile.src = RecUrl;
          //document.getElementById(`video_rec_hist`).append(recMediaFile);




          ////////
          const recMediaFileDiv = document.createElement("div");
          recMediaFileDiv.classList.add('container');
          var recviddivstr="recviddiv-"+vidrecnum;
          recMediaFileDiv.id=recviddivstr;
 
 
          const recMediaFileAudioDiv = document.createElement("div");
          recMediaFileAudioDiv.classList.add('col1');
          
          const recMediaFile = document.createElement("video");
          recMediaFile.setAttribute("id", "videoBox"+vidrecnum);
          recMediaFile.controls = true;
          const RecUrl = URL.createObjectURL(blobFile);
          recMediaFile.src = RecUrl;
          //recMediaFile.setAttribute("srcObject", mediaStreamObj);
          recMediaFileAudioDiv.appendChild(recMediaFile);
          recMediaFileDiv.appendChild(recMediaFileAudioDiv);
 
          const recMediaFileDelBtnDiv = document.createElement("div");
          recMediaFileDelBtnDiv.classList.add('col2');
          const recMediaFileDelBtn = document.createElement("button");
          recMediaFileDelBtn.setAttribute("id", "viddelbtn"+vidrecnum);
          recMediaFileDelBtn.classList.add('delete-button');
          recMediaFileDelBtn.textContent = "Delete";
          recMediaFileDelBtn.addEventListener("click", () => {
            console.log("Delete clicked");
            deleteRowRecDiv(recviddivstr);
          });
          recMediaFileDelBtnDiv.appendChild(recMediaFileDelBtn);
          recMediaFileDiv.appendChild(recMediaFileDelBtnDiv);
 
          document.getElementById(`video_rec_hist`).append(
             recMediaFileDiv);
             vidrecnum++;
          document.getElementById("videoBox"+vidrecnum).srcObject = mediaStreamObj;

          ///////
       };
       document.getElementById("vidBox").srcObject = mediaStreamObj;
       startBtn.disabled = true;
       endBtn.disabled = false;
    });
 }
 //--------------------Audio-Recorder---------------------------------------
 let audrecnum=0;
 function start_audio_Recording() {
    //To stores or load the recorded media
    let chunksArr = [];
    const startBtn=document.getElementById("aud_st");
    const endBtn=document.getElementById("aud_en");
    
    // Access the camera and microphone for recording permission.
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
    .then((mediaStream) => {
       const medRec = new MediaRecorder(mediaStream);
       window.mediaStream = mediaStream;
       window.mediaRecorder = medRec;
       medRec.start();
       
    //when recorded data is available then push into chunkArr array
    medRec.ondataavailable = (e) => {
       chunksArr.push(e.data);
    };
    
    //stop the audio recording
       medRec.onstop = () => {
          const blob = new Blob(chunksArr, {type: "audio/mpeg"});
          chunksArr = [];
          
          // create audio element and store the media which is recorded
 
          const recMediaFileDiv = document.createElement("div");
          recMediaFileDiv.classList.add('container');
          var recdividstr="recdiv-"+audrecnum;
          recMediaFileDiv.id=recdividstr;
 
 
          const recMediaFileAudioDiv = document.createElement("div");
          recMediaFileAudioDiv.classList.add('col1');
          
          const recMediaFile = document.createElement("audio");
          recMediaFile.controls = true;
          const RecUrl = URL.createObjectURL(blob);
          recMediaFile.src = RecUrl;
          recMediaFileAudioDiv.appendChild(recMediaFile);
          recMediaFileDiv.appendChild(recMediaFileAudioDiv);
 
          const recMediaFileDelBtnDiv = document.createElement("div");
          recMediaFileDelBtnDiv.classList.add('col2');
          const recMediaFileDelBtn = document.createElement("button");
          recMediaFileDelBtn.setAttribute("id", "delbtn"+audrecnum);
          recMediaFileDelBtn.classList.add('delete-button');
          recMediaFileDelBtn.textContent = "Delete";
          recMediaFileDelBtn.addEventListener("click", () => {
            console.log("Delete clicked");
            deleteRowRecDiv(recdividstr);
          });
          recMediaFileDelBtnDiv.appendChild(recMediaFileDelBtn);
          recMediaFileDiv.appendChild(recMediaFileDelBtnDiv);
 
          document.getElementById(`audio_rec_hist`).append(
             recMediaFileDiv);
          audrecnum++;
       };
       startBtn.disabled = true;
       endBtn.disabled = false;
    });
 }
 function stop_Recording(end, start) {
    //stop all tracks
    window.mediaRecorder.stop();
    window.mediaStream.getTracks() .forEach((track) => {track.stop();});
       //disable the stop button and enable the start button
       end.disabled = true;
       start.disabled = false;
    }
 
 function deleteRowRecDiv(divid){
     const recdiv = document.getElementById(divid);
     if (recdiv) {
         recdiv.remove();
     }
 }   