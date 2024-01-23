import { bootstrapCameraKit } from '@snap/camera-kit';
import html2canvas from 'html2canvas';

(async function () {

  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA0NDg1OTA3LCJzdWIiOiJhYjBlNGYxMS0wOWMwLTQyZWUtYjNlYy00NWUzZWIxMzZmMzN-U1RBR0lOR342MjA5MTI4Mi0wYjk5LTRkZjUtYTdmNS00ZjU5NmFhNDliMjgifQ.07MNBF1i4dM2FbB22ZPyDueQIs0IWb9aiWbm8tIAabs',
  });
  const liveRenderTarget = document.getElementById(
    'canvas'
  ) as HTMLCanvasElement;
  const session = await cameraKit.createSession({ liveRenderTarget });
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  await session.setSource(mediaStream);
  await session.play();

  const lens = await cameraKit.lensRepository.loadLens(
    '88bd0d05-f7ab-4f0f-8bb7-e12b5a931d67',
    '564389e3-d2aa-474a-94b9-009baf5b4d14'
  );

  await session.applyLens(lens);


  // screenshot
  const elem = document.querySelector('#screenshot');

  elem.addEventListener('click', () => {
    canvas.toBlob((blob) => {
      saveBlob(blob, `screencapture-${canvas.width}x${canvas.height}.png`);
    });
  });

  const cameraOutput = document.querySelector("#camera--output")
 
  const saveBlob = (function() {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    return function saveData(blob, fileName) {
       const url = window.URL.createObjectURL(blob);
       console.log(cameraOutput);
       a.href = url;
       a.download = fileName;
       a.click();
    };
  }());

  //capture
  const capture = document.querySelector('#capture');

  capture.addEventListener('click', () => {
    cameraOutput.src = canvas.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
  });

    
})();



