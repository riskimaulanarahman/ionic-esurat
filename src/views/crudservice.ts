import axios from 'axios';
import Swal from 'sweetalert2'
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
const API_URL = 'http://esurat-um.com/api/';

class CrudService {
	getAll(table){
		return axios.get(API_URL +table).then(response => response.data);
		// return axios.get(API_URL +table).then(function(response){
		// 	console.log(response.headers.email)
		// });
	}
	getByID(table,key){
		return axios.get(API_URL +table+"/"+key).then(response => response.data);
	}
	findData(table,params) {
		return axios.post(API_URL +table,params).then(response => response.data);
	}
	insertData(table,values) {
		return axios.post(API_URL +table,values).then(function(response){  
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
	}
	removeData(table,key){
		return axios.delete(API_URL +table+"/"+key).then(function(response){  
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
	}
	updateData(table,key,values){
		return axios.put(API_URL +table+"/"+key,values).then(function(response){  
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
	}
}

export default new CrudService();
