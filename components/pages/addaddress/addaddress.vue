<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{addressData.addressName}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">所属省份编码</text>
			<input class="input" type="text" v-model="addressData.procode" placeholder="所属省份编码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">所属城市编码</text>
			<input class="input" type="text" v-model="addressData.citycode" placeholder="所属城市编码" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import {addaddress} from "../../apis"
	export default {
		data() {
			return {
				token:"",
				addressData: {
					name: '',
					mobile: '',
					addressName: '请选择',
					address: '',
					procode:'',
					citycode:''
				}
			}
		},
		onLoad() {
			try {
			    const value = uni.getStorageSync('token');
			    if (value) {
			        this.token=value.token
			    }
			} catch (e) {
			    // error
			}	
		},
		methods: {
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},
			confirm(){
				let data = this.addressData;
				if(!data.name){
					uni.showToast({
						title:"姓名不能为空",
						icon:"none"
					})
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)){
					uni.showToast({
						title:"请输入正确的手机号",
						icon:"none"
					})
					return;
				}
				if(!data.address){
					uni.showToast({
						title:"请在地图上选择你的位置",
						icon:"none"
					})
					return;
				}
				if(!data.procode){
					uni.showToast({
						title:"请输入所属省份编码",
						icon:"none"
					})
					return;
				}
				if(!data.citycode){
					uni.showToast({
						title:"请输入所属城市编码",
						icon:"none"
					})
					return;
				}
				addaddress({
					address:data.address,
					cityId:data.citycode,
					linkMan:data.name,
					mobile:data.mobile,
					provinceId:data.procode,
					token:this.token
				}).then(res=>{
					let [err,data]=res
					console.log(data.data) 
					uni.showToast({
						title:"添加成功"
					})
					uni.navigateTo({
						url:"../address/address"
					})
				})
			}
		}
	}
</script>

<style lang="scss">
page{
		background: #EEEEEE;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: #333333;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: #3F536E;
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		color: #fff;
		background: #DD524D;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
