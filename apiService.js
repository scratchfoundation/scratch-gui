
class ApiService {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    async get() {
      try {
        const response = await fetch(`${this.baseUrl}`,
        {
                method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "x-moodle-session-key": "h5msqh9dn4effrpmiut9rn5ti9",
                            },
              }
        );
        if (!response.ok) {
          throw new Error(`GET request failed with status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    }

    async getProject(id) {
        let data;
        try {
           await fetch(`${this.baseUrl}/${id}`,
          {
                  method: "GET",
                              headers: {
                                  "Content-Type": "application/json",
                                  "x-moodle-session-key": "h5msqh9dn4effrpmiut9rn5ti9",
                              },
                }
          ) .then((res) => {
            return res.blob();
         })
         .then((blob) => {
             return blob.arrayBuffer();
         }).then((arrayBuffer)=> {
             data = arrayBuffer
            return data
           
               })
    
        return data
        } catch (error) {
          throw error;
        }
      }
  
    async post(filename,data) {
      try {
        const response = await fetch(`${this.baseUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "x-moodle-session-key": "h5msqh9dn4effrpmiut9rn5ti9",
          },
          body: JSON.stringify({
            name: filename,
            content: data,
          }),
        });
        // if (!response.ok) {
        //   throw new Error(`POST request failed with status: ${response.status}`);
        // }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        throw error;
      }
    }
  
    async update(id,filename, data) {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            "x-moodle-session-key": "h5msqh9dn4effrpmiut9rn5ti9"
          },
          body: JSON.stringify({
            name: filename,
            content: data
          }),
        });
        if (!response.ok) {
          throw new Error(`PUT request failed with status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        throw error;
      }
    }
  
    async delete(id) {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "x-moodle-session-key": "h5msqh9dn4effrpmiut9rn5ti9"
          },
        });
        if (!response.ok) {
          throw new Error(`DELETE request failed with status: ${response.status}`);
        }
        // const responseData = await response.json();
        return response;
      } catch (error) {
        throw error;
      }
    }
  }





  
  
  export default new ApiService(process.env.REACT_APP_SCRATCH_API_URL);
  