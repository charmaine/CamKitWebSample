import { bootstrapCameraKit } from '@snap/camera-kit';
import html2canvas from 'html2canvas';

const API_TOKEN = 'YOUR_API_TOKEN'; // Replace with your actual API token
const CANVAS_ID = 'canvas';
const SCREENSHOT_ID = 'screenshot';
const CAMERA_OUTPUT_ID = 'camera--output';
const CAPTURE_ID = 'capture';

async function initializeCamera() {
  const cameraKit = await bootstrapCameraKit({ apiToken: API_TOKEN });
  const liveRenderTarget = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
  const session = await cameraKit.createSession({ liveRenderTarget });
  const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

  await session.setSource(mediaStream);
  await session.play();

  const lens = await cameraKit.lensRepository.loadLens(
     '<YOUR_LENS_ID>', // Replace with your actual Lens ID 
     '<YOUR_LENS_GROUP_ID>' // Replace with your actual Lens Group ID
  );
  await session.applyLens(lens);
}

function handleScreenshot() {
  const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
  canvas.toBlob((blob) => {
    const fileName = `screencapture-${canvas.width}x${canvas.height}.png`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  });
}

function handleCapture() {
  const cameraOutput = document.querySelector(`#${CAMERA_OUTPUT_ID}`);
  const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
  cameraOutput.src = canvas.toDataURL('image/webp');
  cameraOutput.classList.add('taken');
}

async function main() {
  await initializeCamera();

  const screenshotButton = document.querySelector(`#${SCREENSHOT_ID}`);
  screenshotButton?.addEventListener('click', handleScreenshot);

  const captureButton = document.querySelector(`#${CAPTURE_ID}`);
  captureButton?.addEventListener('click', handleCapture);
}

main();
