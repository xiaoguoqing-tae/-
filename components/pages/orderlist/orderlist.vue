<template>
	<view>
		<view :style="{display:dataArr==[]?'block':'none'}">
			您当前暂无订单
		</view>
		<view class="container" v-for="(item,index) in dataArr" :key="index">
			<view v-for="(i,ind) in item" :key="ind">
				<view class="v1">
					<view class="v1_left">
						<image :src="i.pic" ></image>
						<view>{{i.goodsName}}</view>
						<view style="color: #DD524D;">{{i.amountSingle}}*{{i.number}}</view>
						<view style="color: #DD524D;">总计：{{i.amount}}</view>
					</view>
					<view class="v1_right">
						<image src="../../static/delete.png" @click="del(index)"></image>
					</view>
				</view>
				<view class="v2">
					<view class="bottom_btn">
						<view class="btn">看相似</view>
						<view class="btn">再次购买</view>
					</view>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
	import {getorder,delorder} from "../../apis"
	export default {
		components:{},
		data() {
			return {
				token:"",
				infolist:"",
				datalist:"",
				pic:"",
				dataArr:[]
			}
		},
		methods: {
			del(index){
				this.dataArr.splice(index,1)
			},

		},
		onLoad() {
			try {
			    const value = uni.getStorageSync('token');
			    if (value) {
			        this.token=value.token
					getorder({
						token:this.token
					}).then(res=>{
						let [err,data]=res
						this.infolist=data.data.data.goodsMap
						this.datalist=data.data.data.orderList
						console.log(this.datalist)
						console.log(this.infolist)
						for(let i=0;i<this.datalist.length;i++){
							var id=this.datalist[i].id
							this.dataArr.push(this.infolist[id])
						}
					})
			    }
			} catch (e) {
			    // error
			}	
		}
	}
</script>

<style lang="scss">
page{
	background: #EEEEEE;
}
.container{
	padding: 20upx;
	display: flex;
	flex-direction: column;
	background: #FFFFFF;
	width: 90%;
	margin-left: 2.5%;
	border-radius: 20upx;
	margin-top: 20upx;
	.v1{
		display: flex;
		.v1_left{
			image{
				width: 200upx;
				height: 200upx;
			}
		}
		.v1_right{
			image{
				position: absolute;
				right: 50upx;
				width: 60upx;
				height: 60upx;
			}
		}
	}
	.v2{
		.bottom_btn{
			display: flex;
			.btn{
				position: relative;
				left: 350upx;
				padding: 10upx;
				margin-left: 20upx;
				height: 50upx;
				line-height: 50upx;
				border-radius: 20upx;
				background: #007AFF;
			}
		}
	}
}

</style>
