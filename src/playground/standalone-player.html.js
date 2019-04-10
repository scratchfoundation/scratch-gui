export default `<!doctype html>
<html>
  <style>
  .body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    text-align: center;
    width: 100%;
  }
  .stage {
    display: inline-block;
    height: 100vh;
    margin: 0 auto;
    width: 133vh;
    touch-action: manipulation;
  }
  </style>
  <head><meta charset="UTF-8"></head>
  <body class="body">
    <canvas class="stage" id="scratch-stage" width="480" height="360"></canvas>
  </body>
</html>
`;
