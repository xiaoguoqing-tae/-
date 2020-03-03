<template>
	<view>
		
	</view>
</template>

<script>
	import {getorder} from "../../apis"
	export default {
		data() {
			return {
				token:""
			}
		},
		methods: {
			
		},
		onLoad() {
			getorder(this.token).then(res=>{
				let [err,data]=res
				console.log(data.data)
			})
			try {
			    const value = uni.getStorageSync('token');
			    if (value) {
			        this.token=value.token
			    }
			} catch (e) {
			    // error
			}	
		}
	}
</script>

<style>

</style>
