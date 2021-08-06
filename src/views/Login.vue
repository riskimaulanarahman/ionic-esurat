<template>
 <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <!-- <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons> -->
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

  <form class="ion-padding" @submit.prevent="submitForm">
    <ion-list>
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input type="email" required v-model="enteredEmail" />
      </ion-item>
      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input type="password" required v-model="enteredPassword" />
      </ion-item>
    </ion-list>
    <ion-button type="submit" expand="block">Save</ion-button>
  </form>

  </ion-content>
  </ion-page>
</template>

<script>

import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  // IonThumbnail,
  // IonIcon
} from "@ionic/vue";

import axios from 'axios';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
// const API_URL = 'https://esurat-um.com/api/';
const API_URL = 'http://127.0.0.1:8000/api/';


export default {
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  },
  data() {
    return {
      enteredEmail: "",
      enteredPassword: ""
    };
  },
  methods: {
    submitForm() {
      // const memoryData = {
      //   title: this.enteredTitle,
      //   Email: this.enteredEmail,
      //   imageUrl: this.takenImageUrl,
      //   description: this.enteredDescription,
      // };
      // console.log(this.enteredEmail)
      // this.$emit("save-memory", memoryData);
      return axios.post(API_URL + 'getlogin',{email: this.enteredEmail, password: this.enteredPassword, module: "login"}).then(function(response){
          console.log(response)
          if(response.data.status == 200) {
              window.location.href = '/dashboard';
          } else if(response.data.status == 404) {
              Toast.fire({
                  icon: 'error',
                  title: 'Password Salah'
              })
          } else if(response.data.status == 0) {
              Toast.fire({
                  icon: 'error',
                  title: 'Anda Belum Terdaftar'
              })
          }
      });
    },
  },
};
</script>