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

    .stage-container {
      display: inline-block;
      width: 133.33333vh;
      height: 100vh;
      margin: 0 auto;
    }

    .stage {
      touch-action: manipulation;
      width: inherit;
    }

    .hidden {
      visibility: hidden;
    }

    #overlay {
      position: absolute;
      height: inherit;
      width: inherit;
      background-color: rgba(0, 0, 0, .35);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .green-flag-container {
      width: 15vh;
      height: 15vh;
    }

    @media ( max-aspect-ratio: 4/3 ) {
      .stage-container {
        width: 100vw;
        height: 75vw;
        margin-top: calc(50vh - 37.5vw)
      }
    }
    </style>
  </head>
  <body class="body">
  <div class="stage-container">
    <div id="overlay" class="hidden">
      <div class="green-flag-container">
        <svg id="green-flag" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.63 17.5"><defs><style>.cls-1,.cls-2{fill:#4cbf56;stroke:#45993d;stroke-linecap:round;stroke-linejoin:round;}.cls-2{stroke-width:1.5px;}</style></defs><title>icon--green-flag</title><path class="cls-1" d="M.75,2A6.44,6.44,0,0,1,8.44,2h0a6.44,6.44,0,0,0,7.69,0V12.4a6.44,6.44,0,0,1-7.69,0h0a6.44,6.44,0,0,0-7.69,0"/><line class="cls-2" x1="0.75" y1="16.75" x2="0.75" y2="0.75"/>
        </svg>
      </div>
    </div>
    <canvas class="stage" id="scratch-stage" width="480" height="360"></canvas>
  </div>
  </body>
</html>
`;
