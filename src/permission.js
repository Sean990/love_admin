import Vue from 'vue';
import router from './router';
import store from './store';

import notification from 'ant-design-vue/es/notification';
import { setDocumentTitle, domTitle } from '@/utils/domUtil';
import { ACCESS_TOKEN } from '@/store/mutation-types';

const defaultRoutePath = '/';
router.beforeEach((to, from, next) => {
	to.meta &&
		typeof to.meta.title !== 'undefined' &&
		setDocumentTitle(`${to.meta.title} - ${domTitle}`);
	if (Vue.ls.get(ACCESS_TOKEN)) {
		/* has token */
		if (to.path === '/Login/index') {
			next({ path: defaultRoutePath });
		} else {
			const redirect = decodeURIComponent(from.query.redirect || to.path);
			if (to.path === redirect) {
				// hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
				next({ ...to, replace: true });
			} else {
				// 跳转到目的路由
				next({ path: redirect });
			}
		}
	} else {
		if (to.name === 'Login') {
			// 在免登录白名单，直接进入
			next();
		} else {
			next({ path: '/Login/index', query: { redirect: to.fullPath } });
		}
	}
});

router.afterEach(() => {});
