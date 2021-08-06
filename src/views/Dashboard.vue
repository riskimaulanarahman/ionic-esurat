<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Dashboard Admin</ion-title>
        </ion-toolbar>
      </ion-header> -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Total Disposisi : {{ datadis.alldisposisi }}</ion-card-title>
          
        </ion-card-header>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Surat Masuk (Belum Dibaca): {{ datadis.nosm }} </ion-card-subtitle>
          <ion-card-subtitle>Surat Keluar (Belum Dibaca): {{ datadis.nosk }} </ion-card-subtitle>
        </ion-card-header>
      </ion-card>
      <!-- <ion-list v-for="item in datadis" :key="item"> -->
      <!-- <ion-list>
        <ion-item>
          <ion-label>Total Disposisi : {{ datadis.alldisposisi }} </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Surat Masuk : {{ datadis.nosm }} </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Surat Keluar : {{ datadis.nosk }} </ion-label>
        </ion-item>
      </ion-list> -->

 
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  // IonList,
  // IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel
  } from '@ionic/vue';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';
// const API_URL = 'https://esurat-um.com/api/';


// const totdis = axios.get(API_URL + 'dashboard-count').then(function(response){
//           return response.data.alldisposisi
//       });


export default defineComponent ({
  name: 'dashboard',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    // IonList,
    // IonItem,
    // IonLabel
    // IonCard, IonCardSubtitle, IonCardTitle,
  },
  data() {
    const datadis = {}
    return {
      datadis
    }
  },
  created() {
    return axios.get(API_URL + 'alluser').then(responsea => {
      return axios.get(API_URL + 'checknik/'+responsea.headers.email).then(responseb => {
        return axios.get(API_URL + 'dashboard-count?nik='+responseb.data.nik).then(response => {
        this.datadis = response.data
        });
      });
    });
  }
  // provide() {
  //   return {
  //     items: this.data
  //   }
  // }
})
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>