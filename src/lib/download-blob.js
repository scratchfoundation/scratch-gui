

// import axios from 'axios';
import Cookies from 'js-cookie';
import html2canvas from 'html2canvas';
import { async } from 'regenerator-runtime';
import apiService from '../../apiService'


export default (filename, blob, id) => {
    
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    // Use special ms version if available to get it working on Edge.
    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
        return;
    }
                                                                                                                                                                                                                                                               
    if ('download' in HTMLAnchorElement.prototype) {

        // let popup = window.open('', '_self');
        const reader = new FileReader();
        reader.onloadend = function () {
            // popup.location.href = reader.result;                                                                                                                                                        
            const data = reader?.result.split(",")[1];
            const url = 'https://ai.myqubit.co/api/scratch';
            const formData = new FormData();
            formData.append('file', blob, filename);

            const session_key = Cookies.get('MoodleSession')
          

           if(id){

            async function update() {
                const updatedItem = await apiService.update(id,filename, data); // Make a PUT request
                setTimeout(() => {
                    if(updatedItem.status === 'success') {
                        createMessage("Your Project has been updated successfully", true);
                    }
                    // After updating the project, show the updated message
                    
                }, 500); 

            }
            update();
            
           } else {

            

            async function post () {

                const targetElement = document.body;
                let screenshotDataUrl;

               

               
               await html2canvas(targetElement).then(canvas => {
                    // Convert canvas to Base64-encoded image
                     screenshotDataUrl = canvas.toDataURL('image/png');
               
           
          async function ps() {

          
              const createdData = await apiService.post(filename,data); // Make a POST request

              const response = {
                fmsg: "Name must be unique",
                smsg: 'Your Project has been saved successfully',
              };

              setTimeout(() => {
                
                // Check if the response status indicates success or failure
                if (createdData.status === 'success') {
                  createMessage(response.smsg, true); // Success message
                } else {
                    createMessage(response.fmsg, false);
                  // Failure message
                }
              }, 500);

            }
            ps()

            })



//               setTimeout(() => {
//                 // Check if the response status indicates success
// if (createdData.status === 'success') {
// // Create and display a styled success message for saved
// createSuccessMessage("Your Project has been saved successfully");


// } else if(createdData.status === 'error'){
// // Handle the case where the response status is not successful
// failedSuccessmsg('name must be unique')}
// }, 500);


            }
            post();
                      
          
    

           }



           function createMessage(message, isSuccess) {
      const messageContainer = document.createElement('div');
      messageContainer.classList.add('message-popup', isSuccess ? 'success' : 'failure');
      messageContainer.textContent = message;
      document.body.appendChild(messageContainer);
    
      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 3000); 
    }



    const styles = `
.message-popup {
  position: fixed;
  top: 10%;
  right: 10%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.success {
  background-color: #4CAF50;
  color: #fff;
}

.failure {
  background-color: #FF5733;
  color: #fff;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

           
        //    function createSuccessMessage(message) {
        //     const successMessage = document.createElement('div');
        //     successMessage.classList.add('success-popup');
        //     successMessage.textContent = message;
        //     document.body.appendChild(successMessage);
          
        //     setTimeout(() => {
        //         document.body.removeChild(successMessage);
        //     }, 1500);
        // }
        
       
      
        
          
        //   const styles = `
        //   .success-popup {
        //     position: fixed;
        //     top: 10%;
        //     right: 10%;
        //     transform: translate(-50%, -50%);
        //     padding: 10px 20px;
        //     background-color: #4CAF50;
        //     color: #fff;
        //     border-radius: 5px;
        //     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        //     z-index: 1000;
            
        //   }
        //   `;
          
        //   const styleElement = document.createElement('style');
        //   styleElement.innerHTML = styles;
        //   document.head.appendChild(styleElement);


           
        };
        reader.readAsDataURL(blob);
        
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
