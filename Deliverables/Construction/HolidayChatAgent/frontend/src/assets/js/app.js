//import axios to manage the http requests
import axios from 'axios';

export default {


  name: 'App',

  //Declare Vue objects
  data() {
    return {
      input: '',
      agentMessages: [],
      userMessages: [],
    }
  },


  //beforeCreate -> created -> mounted (Will run in this order on Vue load e.g page refresh)
  //This resets the running count to 1, as well as sending a request to archive all previous messages
  async beforeCreate() {
    //set global variable RunningCount to 1 (reset)
    localStorage.setItem('RunningCount', 1);

    //post the request
    await axios.post(
    'http://localhost:3000/archive')
  },

  //This sends request to generate the first message from the agent
  created() {

    //Timeout due to both requests asynchronous, and beforeCreate needs to run first
    setTimeout(async() => {
    try {
          //post the request
          await axios.post(
            'http://localhost:3000/messages/0',
          )

        } catch (error) {
          //if any error log to console
          console.log(error)
        }
        //50ms for the timeout
      }, 50)
  },

  //This updates the chat to grab the previous message that was generated above
  async mounted() {

    //get request and assign data that has been 'got' to variables
    let user = await axios.get(
        'http://localhost:3000/messages'
      )

      let agent = await axios.get(
        'http://localhost:3000/agent'
      )

      //assign Vue object to get request data from those variables
      this.userMessages = user.data.data
      this.agentMessages = agent.data.data


      //repeat process after 1ms to catch anything that may have been missed first time
      setTimeout(async() => {
        let user = await axios.get(
        'http://localhost:3000/messages'
        )

        let agent = await axios.get(
          'http://localhost:3000/agent'
        )

        this.userMessages = user.data.data
        this.agentMessages = agent.data.data

        //scroll to bottom if message recieved
        let elem = document.getElementById('border-wrapper')
        elem.scrollTop = elem.scrollHeight
        
      }, 1)
  },


  methods: {

    //This updates the chat whenever called
    async updateChat() {

      //get request and assign data that has been 'got' to variables
      let user = await axios.get(
        'http://localhost:3000/messages'
      )

      let agent = await axios.get(
        'http://localhost:3000/agent'
      )

      //assign Vue object to get request data
      this.userMessages = user.data.data
      this.agentMessages = agent.data.data

      //scroll to bottom if message recieved
      let elem = document.getElementById('border-wrapper')
      elem.scrollTop = elem.scrollHeight

      //repeat process after 1ms to catch anything that may have been missed first time
      setTimeout(async() => {
        let user = await axios.get(
        'http://localhost:3000/messages'
        )

        let agent = await axios.get(
          'http://localhost:3000/agent'
        )

        this.userMessages = user.data.data
        this.agentMessages = agent.data.data
        
        //scroll to bottom if message recieved
        let elem = document.getElementById('border-wrapper')
        elem.scrollTop = elem.scrollHeight
        
      }, 1)
    },

    //Function to handle keyword request
    async keyWord() {

      //Check that Running Count = 1
      if (localStorage.getItem('RunningCount') == 1) {

      //Check for user input
      if (this.input === undefined || this.input === '') {

      //if no input do nothing
      return null;
      } else {

      //Formatting user response to a way that axios prefers, 
      const formData = new URLSearchParams()
      formData.append("content", this.input)

      //try-catch to catch any errors
      try {

        //post the request with the formatteded data included
        let response = await axios.post(
        'http://localhost:3000/messages/1',
        formData,
        {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
        
        //Reset the input field to be blank
        this.input = undefined

        //Updates the running count to 2 if correct response recieved
        if (response.data.status === 200){
          localStorage.setItem('RunningCount', 2)

          //scroll to bottom if message recieved
          let elem = document.getElementById('border-wrapper')
          elem.scrollTop = elem.scrollHeight

        } else {

          localStorage.setItem('RunningCount', 1)

          //scroll to bottom if message recieved
          let elem = document.getElementById('border-wrapper')
          elem.scrollTop = elem.scrollHeight
        }

        //scroll to bottom if message recieved
        let elem = document.getElementById('border-wrapper')
        elem.scrollTop = elem.scrollHeight

      } catch (error) {
        //Log any errors to console
        console.log(error)
      }
    }
    }
    },

    //Function to handle first question
    async question1() {

      //Check that the running count = 2
      if (localStorage.getItem('RunningCount') == 2) {

      //Check for user input
      if (this.input === undefined || this.input === '') {

      //if no input do nothing
      return null;
      } else {

        //Formatting user response to a way that axios prefers
        const formData = new URLSearchParams()
        formData.append("content", this.input)

        //try-catch to catch any errors
        try {

          //post the request with the formatteded data included
            let response = await axios.post(
            'http://localhost:3000/messages/2',
            formData,
            {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            })

            //Reset the input field to be blank
            this.input = undefined
            //Updates the running count to 2

            //Updates the running count to 2 if correct response recieved
            if (response.data.status === 200){
              localStorage.setItem('RunningCount', 3)

              //scroll to bottom if message recieved
              let elem = document.getElementById('border-wrapper')
              elem.scrollTop = elem.scrollHeight

            } else {

              localStorage.setItem('RunningCount', 2)

              //scroll to bottom if message recieved
              setTimeout(async() => {
                this.updateChat()
              }, 100)
              
            }

        } catch (error) {
          //Log any errors to console
          console.log(error)
        }
      
      }
    }
    },

    //Function to handle the second question
    async question2() {

    //Check that the running count = 3
    if (localStorage.getItem('RunningCount') == 3) {

    //Check for user input
      if (this.input === undefined || this.input === '') {

      //if no input do nothing
      return null;
      } else {

        //Formatting user response to a way that axios prefers
        const formData = new URLSearchParams();
        formData.append("content", this.input);

        //try-catch to catch any errors
        try {

            //post the request with the formatteded data included
            let response = await axios.post(
            'http://localhost:3000/messages/3',
            formData,
            {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            })

            //Reset the input field to be blank
            this.input = undefined

            //Updates the running count to 2 if correct response recieved
            if (response.data.status === 200){
              localStorage.setItem('RunningCount', 4)

              //Hides send button
              document.getElementById("sendBtn").style.display = "none"
              //Shows start over button
              document.getElementById("resetBtn").style.display = "block"
              //Disable text input
              document.getElementById("text-input").disabled = true
              //Set cursor effect for disabled text field
              document.getElementById("text-input").style.cursor = "not-allowed"

              //scroll to bottom if message recieved
              let elem = document.getElementById('border-wrapper')
              elem.scrollTop = elem.scrollHeight
            } else {

              localStorage.setItem('RunningCount', 3)

              //scroll to bottom if message recieved
              let elem = document.getElementById('border-wrapper')
              elem.scrollTop = elem.scrollHeight
            }

          //scroll to bottom if message recieved
          let elem = document.getElementById('border-wrapper')
          elem.scrollTop = elem.scrollHeight

        } catch (error) {
          console.log(error)
        }

    }
    }
    },

    //This is called when the start over button is pressed, it refreshes the page
    async startOver() {
      location.reload();
    }
  }
}