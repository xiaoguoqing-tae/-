import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex);
import {getcartinfo} from "../../apis"
export default new Vuex.Store({
	state:{
		totalprice:"",
		goodsData:[]
	},
	mutations:{
		getdata(){
			try {
				const value = uni.getStorageSync('token');
				if(value!==""){
					let token=value.token
					getcartinfo(token).then(res=>{
						let [err,data]=res;
						this.infolist=data.data.data.items
						this.infolist.forEach(item=>{
							item.checked=false;
						})
						console.log(this.infolist)
					})
				}else{
					this.token=""
				}
			} catch (e) {
			    // error
			}
			
		}
	},
	actions:{}
})