<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Surat Masuk</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
          <DxButton icon="refresh" text="refresh " @click="refresh"/>

          <DxDataGrid
            :data-source="dataSource"
            :show-borders="true"
            @toolbar-preparing="onToolbarPreparing"
            @initialized="saveGridInstance"
            @editing-start="onEditingStart"
            key-expr="id_disposisi"
            :column-hiding-enabled="true"
            >

            <DxPaging :enabled="false"/>
            <DxEditing
                :allow-updating="true"
                :allow-adding="false"
                :allow-deleting="false"
                mode="popup"
            >
                <DxPopup
                :show-title="true"
                :width="700"
                :height="525"
                title="Surat Masuk"
                />

                <DxForm>
                  <DxItem data-field="dengan_hormat_harap"/>
                  <DxItem data-field="catatan_tindak_lanjut"/>
                  <DxItem data-field="aksi"/>
                  <DxItem data-field="approval" :visible='vApproval' />
                  <DxItem data-field="teruskan" :visible='vTeruskan' />
                </DxForm>

            </DxEditing>
            <DxColumn 
            caption="no surat" 
            data-field="suratmasuk.no_surat"
            :editor-options="{disabled:true}"
            />
            <DxColumn 
            caption="asal surat" 
            data-field="suratmasuk.asal_surat"
            :editor-options="{disabled:true}"
            />
            <DxColumn 
            caption="perihal" 
            data-field="suratmasuk.perihal_surat"
            :editor-options="{disabled:true}"
            />
            <DxColumn 
            caption="tgl surat" 
            data-field="suratmasuk.tgl_surat"
            :editor-options="{disabled:true}"
            />
            
            <DxColumn 
            caption="no agenda" 
            data-field="no_agenda"
            :editor-options="{disabled:true}"
            />
            <DxColumn 
            caption="tgl diterima" 
            data-field="suratmasuk.tgl_diterima"
            :editor-options="{disabled:true}"
            />
            <DxColumn 
            caption="sifat surat" 
            data-field="suratmasuk.sifat_surat"
            :editor-options="{disabled:true}"
            />
            <DxColumn 
            data-field="dengan_hormat_harap"
            >
              <DxLookup
                :data-source="hormat"
                value-expr="option"
                display-expr="option"
              />
            </DxColumn>
            <DxColumn data-field="catatan_tindak_lanjut"/>
            <DxColumn 
            data-field="aksi"
            :visible="false"
            :set-cell-value="setStateValue"
            >
              <DxLookup
                :data-source="aksiopt"
                value-expr="option"
                display-expr="option"  
              />
              <DxRequiredRule/>
            </DxColumn>
            <DxColumn 
            data-field="approval"
            caption="approval"
            name="approval"
            :visible="false"
            >
              <DxLookup
                :data-source="appropt"
                value-expr="id"
                display-expr="option"       
              />
            </DxColumn>
            
            <DxColumn 
            data-field="teruskan"
            caption="teruskan"
            name="teruskan"
            :visible="false"
            >
              <DxLookup
                :data-source="karyawanopt"
                value-expr="nik"
                display-expr="nama_karyawan"       
              />
            </DxColumn>

            <DxColumn 
            data-field="status"
            :encode-html="false"
            :form-item="{visible:false}"
            :customize-text="statusColumn"
            />
            <DxColumn 
            caption="file lampiran" 
            data-field="file_disposisi"
            :encode-html="false"
            :editor-options="{disabled:true}"
            :customize-text="lampiranColumn"
            />
            
            <DxScrolling column-rendering-mode="virtual"/>

      </DxDataGrid>

      <!-- </div> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxEditing,
  DxPopup,
  DxLookup,
  DxRequiredRule,
  DxScrolling,
  DxForm,
} from 'devextreme-vue/data-grid';
import DxButton from 'devextreme-vue/button';
import CustomStore from 'devextreme/data/custom_store';
import { DxItem } from 'devextreme-vue/form';

// import { DxItem } from 'devextreme-vue/form';
import 'devextreme/dist/css/dx.material.teal.light.compact.css';
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
const API_URL = 'http://127.0.0.1:8000/api/';
// const API_URL = 'https://esurat-um.com/api/';
// const URL = 'https://esurat-um.com/';
const URL = 'http://127.0.0.1:8000';

const store = new CustomStore({
	key: 'id_disposisi',
	load: function() {
      return axios.get(API_URL + 'alluser').then(responsea => {
        return axios.get(API_URL + 'checknik/'+responsea.headers.email).then(responseb => {
          return axios.get(API_URL + 'disposisi-ionic?module=suratmasuk&nik='+responseb.data.nik).then(function(response){
            return response.data
          })
        });
      });
	},
	insert: (values) => {
		return axios.post(API_URL +'disposisi-ionic',values).then(function(response){  
			Toast.fire({
				icon: response.data.status,
				title: response.data.message
			})
		}).catch((response) => {
			Toast.fire({
				icon: response.data.status,
				title: response.data.message
			})
		})
	},
	remove: (key) => {
		// return CrudService.removeData('disposisi-ionic',key);
        return axios.delete(API_URL +'disposisi-ionic'+"/"+key).then(function(response) {
			Toast.fire({
				icon: response.data.status,
				title: response.data.message
			})
		}).catch((response) => {
			Toast.fire({
				icon: response.data.status,
				title: response.data.message
			})
		})
	},
	update: (key, values) => {
		// return CrudService.updateData('disposisi-ionic',key,values);
      return axios.put(API_URL +'disposisi-ionic'+"/"+key,{ module : "suratmasuk" ,data : values }).then(function(response){
			Toast.fire({
				icon: response.data.status,
				title: response.data.message
			})
		})
		.catch((response)=>{
			Toast.fire({
				icon: response.data.status,
				title: response.data.message
			})
		})
	}
});

const hormats = [{id:1,option:"Tanggapan dan Saran"},{id:2,option:"Proses Lebih Lanjut"},{id:3,option:"Koordinasi / Konfirmasi"},{id:4,option:"Lainnya"}];
const aksiopts = [{id:1,option:"approval"},{id:2,option:"teruskan"}];
const appropts = [{id:2,option:"approved"},{id:3,option:"rejected"}];

const karyawanopt = new CustomStore({
  key: 'nik',
  load: function() {
    return axios.post(API_URL + 'list-karyawan').then(function(response){
      return response.data
    })
  },
  // onBeforeSend: (method, ajaxOptions) => {
  //   ajaxOptions.xhrFields = { withCredentials: true };
  // }
});

export default {
  name: 'SuratMasuk',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxPopup,
    DxScrolling,
    DxLookup,
    DxButton,
    DxRequiredRule,
    DxForm,
    DxItem
  },
  data() {
    // const vApproval = false;
    // const vTeruskan = false;
    return {
      dataSource: store,
      hormat: hormats,
      aksiopt: aksiopts,
      appropt: appropts,
      karyawanopt,
      dataGridInstance: null,
      vApproval : false,
      vTeruskan : false,
      // columnEditorOptions: { onValueChanged: function(e) {
      //   console.log(e)
      //   const vis = (e.value == 'approval') ? true : false;
      //   return this.isSatuVisible = vis;
      // } }
      setStateValue: (rowData, value) => {
        // this.vApproval = false;
        const vis = (value == 'approval') ? true : false;
        const vis2 = (value == 'teruskan') ? true : false;

        console.log(value)
        // this.defaultSetCellValue(rowData, value);
        rowData.aksi = value
        this.visApproval(vis)
        this.visTeruskan(vis2)
      }
    };
  },
  methods: {
    visApproval(value) {
      console.log(value);
      this.vApproval = value;
    },
    visTeruskan(value) {
      console.log(value);
      this.vTeruskan = value;
    },
    onEditingStart(e) {
      this.vApproval = (e.data.aksi == 'approval')
      this.vTeruskan = (e.data.aksi == 'teruskan')
    },
    saveGridInstance(e) {
        this.dataGridInstance = e.component;
    },
    refresh: function() {
        this.dataGridInstance.refresh();
    },
    statusColumn(e) {
        const stext = ["","Waiting Approval","Approved","Rejected","Teruskan"];

        return stext[e.value];
    },
    lampiranColumn(e) {
        return "<a href='"+URL+"/upload/"+e.value+"' target='_blank'>"+e.value+"</a>";
    },

    // approvalchanged(e) {
    //     const newValue = e.value;
    //     // Event handling commands go here
    //   // const vis = (e.value == 'approval') ? true : false;
    //   // const vis2 = (e.value == 'teruskan') ? true : false;
    //   // this.isSatuVisible = vis;
    //   // this.isDuaVisible = vis2;
    //     console.log(newValue);
    // }
    // setSelectedValue(e) {
    //   console.log(e.value);
    //   // this.selectedValue = e.value;
    // },
    aksichanged(e) {
      // console.log(e.value);
      const vis = (e.value == 'approval') ? true : false;
      const vis2 = (e.value == 'teruskan') ? true : false;
      this.vApproval = vis;
      this.vTeruskan = vis2;
      // this.aksi = e.value;
    },
  },
}
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