

// import axios from 'axios';
import Cookies from 'js-cookie';

export default (filename, blob, id) => {
    
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    // Use special ms version if available to get it working on Edge.
    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
        return;
    }
    // const intervalId = setInterval(() => {
    //     console.log('Hello, this message will be logged every 2 seconds!');
    //   }, 30000);                                                                                                                                                                                                                                                             
    if ('download' in HTMLAnchorElement.prototype) {

        // let popup = window.open('', '_self');
        const reader = new FileReader();
        reader.onloadend = function () {
            // popup.location.href = reader.result;                                                                                                                                                        
            console.log('download', reader?.result);
            const data = reader?.result.split(",")[1];
            console.log('data', data)
            // const url = 'https://api.example.com/upload'; // Replace with the actual API endpoint
            const url = 'https://ai.myqubit.co/api/scratch';
            const formData = new FormData();
            formData.append('file', blob, filename);

            const session_key = Cookies.get('MoodleSession')
            // console.log('key', session_key) 

            // axios.post(url, {name: filename, content: data},{
            //     header: 
            //         {
            //             "key": "x-moodle-session-key",
            //             "value": "f0uhm4c6td2d2kds19iajhec1e",
            //             "type": "text"
            //         }
            // } )
            //     .then(response => {
            //         console.log('POST success:', response.data);
            //         // Do something with the response data
            //     })
            //     .catch(error => {
            //         console.error('POST error:', error);
            //         // Handle errors here
            //     });

           if(id){
            fetch(`https://ai.myqubit.co/api/scratch/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-moodle-session-key": "f0e9bgfmtp01f2gid6j6n9q2l9",
                },
                body: JSON.stringify({
                    name: filename,
                    content: data,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("POST success:", data);
                })
                .catch((error) => {
                    console.error("POST error:", error);
                });
           } else {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-moodle-session-key": "f0e9bgfmtp01f2gid6j6n9q2l9",
                },
                body: JSON.stringify({
                    name: filename,
                    content: data,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("POST success:", data);
                })
                .catch((error) => {
                    console.error("POST error:", error);
                });
           }
           



            // popup = null;
        };
        reader.readAsDataURL(blob);
        // const url = window.URL.createObjectURL(blob);
        // downloadLink.href = url;
        // downloadLink.download = filename;
        // downloadLink.type = blob.type;
        // downloadLink.click();
        // // remove the link after a timeout to prevent a crash on iOS 13 Safari
        // window.setTimeout(() => {
        //     document.body.removeChild(downloadLink);
        //     window.URL.revokeObjectURL(url);
        // }, 1000);
    } else {
        // iOS 12 Safari, open a new page and set href to data-uri
        let popup = window.open('', '_blank');
        const reader = new FileReader();
        reader.onloadend = function () {
            popup.location.href = reader.result;
            popup = null;
        };
        reader.readAsDataURL(blob);
    }

};






// import axios from 'axios';


// export default (filename, blob, type) => {
    
//     const downloadLink = document.createElement('a');
//     document.body.appendChild(downloadLink);

//     // Use special ms version if available to get it working on Edge.
//     if (navigator.msSaveOrOpenBlob) {
//         navigator.msSaveOrOpenBlob(blob, filename);
//         return;
//     }
//     // const intervalId = setInterval(() => {
//     //     console.log('Hello, this message will be logged every 2 seconds!');
//     //   }, 30000);                                                                                                                                                                                                                                                             
//     if ('download' in HTMLAnchorElement.prototype) {

//         let popup = window.open('', '_self');
//         const reader = new FileReader();
//         reader.onloadend = function () {
//             popup.location.href = reader.result;                                                                                                                                                        
//             console.log('download', reader?.result);
//             const url = 'https://api.example.com/upload'; // Replace with the actual API endpoint
//             const formData = new FormData();
//             formData.append('file', blob, filename);

//             axios.post(url, { id: "", content: reader?.result, projectName: filename})
//                 .then(response => {
//                     console.log('POST success:', response.data);
//                     // Do something with the response data
//                 })
//                 .catch(error => {
//                     console.error('POST error:', error);
//                     // Handle errors here
//                 });
//             popup = null;
//         };
//         reader.readAsDataURL(blob);
//         const url = window.URL.createObjectURL(blob);
//         downloadLink.href = url;
//         downloadLink.download = filename;
//         downloadLink.type = blob.type;
//         downloadLink.click();
//         // remove the link after a timeout to prevent a crash on iOS 13 Safari
//         window.setTimeout(() => {
//             document.body.removeChild(downloadLink);
//             window.URL.revokeObjectURL(url);
//         }, 1000);
//     } else {
//         // iOS 12 Safari, open a new page and set href to data-uri
//         let popup = window.open('', '_blank');
//         const reader = new FileReader();
//         reader.onloadend = function () {
//             popup.location.href = reader.result;
//             popup = null;
//         };
//         reader.readAsDataURL(blob);
//     }

// };
