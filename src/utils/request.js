import Vue from 'vue';
import axios from 'axios';
import store from '@/store';
import notification from 'ant-design-vue/es/notification';
import { VueAxios } from './axios';
import { ACCESS_TOKEN } from '@/store/mutation-types';

// 创建 axios 实例
const service = axios.create({
	baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
	timeout: 6000, // 请求超时时间
});

const err = error => {
	if (error.response) {
		const data = error.response.data;
		const token = Vue.ls.get(ACCESS_TOKEN);
		if (error.response.status === 403) {
			notification.error({
				message: '您还没有此操作的权限！',
				description: data.msg,
			});
		}
		if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
			notification.error({
				message: '您还未登录',
				description: '请登录后再试！',
			});
			if (token) {
				store.dispatch('Logout').then(() => {
					setTimeout(() => {
						window.location.reload();
					}, 1500);
				});
			}
		}
	}
	return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(config => {
	const token = Vue.ls.get(ACCESS_TOKEN);
	if (token) {
		config.headers['Access-Token'] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
	}
	return config;
}, err);

// response interceptor
service.interceptors.response.use(response => {
	if (response.config.responseType == 'blob') {
		return response;
	} else {
		const res = response.data;
		if (res.code == 200) {
			return res;
		} else if (res.code == 401) {
			store.dispatch('user/logout').then(() => {
				location.reload();
			});
		} else if (res.code == 403) {
			notification.error({
				message: '无权限',
				description: '您暂无此操作权限！',
			});
		} else {
			notification.error({
				message: '错误',
				description: res.msg || res.message || 'Error',
			});
			return Promise.reject(new Error(res.msg || res.message || 'Error'));
		}
	}
}, err);

const installer = {
	vm: {},
	install(Vue) {
		Vue.use(VueAxios, service);
	},
};

export { installer as VueAxios, service as axios };
