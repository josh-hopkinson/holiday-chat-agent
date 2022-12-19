<template>
  <div class="title-wrapper">
    <div class="title-container">
      <h1 class="title">Holiday Chat Agent</h1>
    </div>
  </div>

  
 <div id="chat-wrapper" class="chat-wrapper">
  <div id="border-wrapper" class="border-wrapper">
    <div class="agent-wrapper">
      <div v-for="message in agentMessages" :key="message.id" >
        <div :class="message.class" >
          <div class="icon-wrapper">
          <font-awesome-icon class="icon" icon="fa-solid fa-circle-user" size="3x"/>
          </div>
          <div></div>
          <div class="info-wrapper">
          <p class="agentTimestamp">AGENT</p>  
          <p class="agentMessage">{{message.content}}</p>
          
          <div v-for="holiday in message.holidays" :key="holiday.id" class="holiday">
            <img v-if="holiday.Image" :src="holiday.Image" width="150" height="75"/>
            <p class="reference" v-if="holiday.HolidayReference">Reference: {{holiday.HolidayReference}}</p>
            <p v-if="holiday.Hotel">Hotel: {{holiday.HotelName}}</p>
            <p v-if="holiday.City">City: {{holiday.City}}</p>
            <p v-if="holiday.Continent">Continent: {{holiday.Continent}}</p>
            <p v-if="holiday.Country">Country: {{holiday.Country}}</p>
            <p v-if="holiday.Category">Category: {{holiday.Category}}</p>
            <p v-if="holiday.StarRating">Star Rating: {{holiday.StarRating}}</p>
            <p v-if="holiday.Temperature">Temperature: {{holiday.TempRating}}</p>
            <p v-if="holiday.Location">Location: {{holiday.Location}}</p>
            <p v-if="holiday.PricePerNight">Price Per Night: {{holiday.PricePerNight}}</p>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-wrapper">
      <div v-for="message in userMessages" :key="message.id">
        <div :class="message.class" >
          <font-awesome-icon class="icon" icon="fa-solid fa-circle-user" />
          <div></div>
          <div class="info-wrapper">
          <p class="userTimestamp">USER - {{ dateTime(message.timeSent) }}</p>
          <p class="userMessage">{{message.content}}</p>
          
          <div v-for="holiday in message.holidays" :key="holiday.id" class="holiday">
            <img class="userImg" v-if="holiday.Image" :src="holiday.Image" width="150" height="75"/>
            <p class="reference" v-if="holiday.HolidayReference">Reference: {{holiday.HolidayReference}}</p>
            <p v-if="holiday.Hotel">Hotel: {{holiday.HotelName}}</p>
            <p v-if="holiday.City">City: {{holiday.City}}</p>
            <p v-if="holiday.Continent">Continent: {{holiday.Continent}}</p>
            <p v-if="holiday.Country">Country: {{holiday.Country}}</p>
            <p v-if="holiday.Category">Category: {{holiday.Category}}</p>
            <p v-if="holiday.StarRating">Star Rating: {{holiday.StarRating}}</p>
            <p v-if="holiday.Temperature">Temperature: {{holiday.TempRating}}</p>
            <p v-if="holiday.Location">Location: {{holiday.Location}}</p>
            <p v-if="holiday.PricePerNight">Price Per Night: {{holiday.PricePerNight}}</p>
          </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
 </div>

  <div class="input-wrapper">
    <div class="input-container">
      <input placeholder="Enter Your Message..." class="text-input" id="text-input" name="text-input" type="text" v-model="input" />
      <button id="sendBtn" class="sendBtn" type="button" @click="keyWord(); question1(); question2(); updateChat()"> SEND </button>
      <button id="resetBtn" class="resetBtn" type="button" @click="startOver()"> Start Over </button>
    </div>
  </div>

</template>
<script src="@/assets/js/app.js"></script>
<style src="@/assets/css/app.css"></style>
