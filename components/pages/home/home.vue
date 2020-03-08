<template>
	<view class="container">
		<view>
			<uni-search-bar @confirm="search()"></uni-search-bar>
		</view>
		<view>
			<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
		</view>
		<view class="swiper">
			<swiper :indicator-dots="true" :autoplay="true">
				<swiper-item  v-for="(item,index) in imgList" :key="index">
					<image style="width: 100%;height: 100%;" :src="item.url"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="recommend" v-for="(item,index) in datalist" :key="index">
			<view class="recommend_title">{{item.floor_title.name}}</view>
			<view class="recommend_card">
				<view class="recommend_img" v-for="(it,idx) in item.product_list" :key="idx">
					<image class="img" :src="it.image_src"></image>
					<view class="font">{{it.name}}</view>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import {getIndex,goods} from "../../apis"
	export default {
		data() {
			return {
				TabCur: 0,
				tabList: [{ name: '首页' }, { name: '家电' },{ name: '食品' },{ name: '手机' },{ name: '追星' },{ name: '日用' }],
				imgList:[{url:'../../static/swiper/sw1.jpg'},{url:'../../static/swiper/sw2.jpg'},{url:'../../static/swiper/sw3.jpg'},{url:'../../static/swiper/sw4.jpg'}],
				datalist:[]
			}
		},
		components: {uniSearchBar,WucTab},
		onLoad() {
			
		},
		onReady() {
			getIndex().then(res=>{
				let [err,data]=res;
				this.datalist=data.data.message;
			})
			
		},
		methods: {
			search(){},
			tabChange(index)
			{
			  this.TabCur = index;
			}
		}
	}
</script>
<style>
	page{
		background: #f0f0f0;
	}
</style>
<style lang="scss" scoped>
.recommend{
	background:#FFFFFF;
	width: 94%;
	margin:20upx 3% 0 3%;
	.recommend_title{
		padding: 30upx;
	}
	.recommend_card{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		.recommend_img{
			width: 50%;
			.img{
				width: 99%;
				height: 400upx;
			}
			.font{
				text-align: center;
				
			}
		}
	}
}
</style>
