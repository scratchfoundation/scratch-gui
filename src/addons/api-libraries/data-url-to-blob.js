// From https://github.com/LLK/scratch-gui/blob/develop/src/lib/data-uri-to-blob.js
export default function (dataURL, returnArrayBuffer) {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
  }
  if (returnArrayBuffer) return arrayBuffer;
  const blob = new Blob([arrayBuffer], {type: mimeString});
  return blob;
}
