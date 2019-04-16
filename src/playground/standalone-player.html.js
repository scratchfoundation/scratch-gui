export default `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <style>
    .body {
      height: 100%;
      margin: 0;
      overflow: hidden;
      text-align: center;
      background-color: black;
      color: #cccccc;
    }

    .stage {
      display: inline-block;
      width: 133.33333vh;
      height: 100vh;
      margin: 0 auto;
      touch-action: manipulation;
    }
  
    @media ( max-aspect-ratio: 4/3 ) {
      .stage {
        width: 100vw;
        height: 75vw;
        margin-top: calc(50vh - 37.5vw)
      }
    }
    </style>
  </head>
  <body class="body">
    <canvas class="stage" id="scratch-stage" width="480" height="360"></canvas>
  </body>
</html>
`;
