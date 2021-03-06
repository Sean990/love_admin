export function timeFix() {
	const time = new Date();
	const hour = time.getHours();
	return hour < 9
		? '早上好'
		: hour <= 11
		? '上午好'
		: hour <= 13
		? '中午好'
		: hour < 20
		? '下午好'
		: '晚上好';
}

export function welcome() {
	const arr = ['休息一会儿吧', '准备吃什么呢?', '要不出去走走吧', '我猜你可能累了'];
	const index = Math.floor(Math.random() * arr.length);
	return arr[index];
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
	const event = document.createEvent('HTMLEvents');
	event.initEvent('resize', true, true);
	event.eventType = 'message';
	window.dispatchEvent(event);
}

export function handleScrollHeader(callback) {
	let timer = 0;

	let beforeScrollTop = window.pageYOffset;
	callback = callback || function() {};
	window.addEventListener(
		'scroll',
		event => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				let direction = 'up';
				const afterScrollTop = window.pageYOffset;
				const delta = afterScrollTop - beforeScrollTop;
				if (delta === 0) {
					return false;
				}
				direction = delta > 0 ? 'down' : 'up';
				callback(direction);
				beforeScrollTop = afterScrollTop;
			}, 50);
		},
		false
	);
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
	if (id === '') {
		return;
	}
	setTimeout(() => {
		document.body.removeChild(document.getElementById(id));
	}, timeout);
}

/**
 * 清理空值，对象
 * @param children
 * @returns {*[]}
 */
export function filterEmpty(children = []) {
	return children.filter(c => c.tag || (c.text && c.text.trim() !== ''));
}

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
	str.split('').reduce((pre, cur) => {
		const charCode = cur.charCodeAt(0);
		if (charCode >= 0 && charCode <= 128) {
			return pre + 1;
		}
		return pre + 2;
	}, 0);

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */
export const cutStrByFullLength = (str = '', maxLength) => {
	let showLength = 0;
	return str.split('').reduce((pre, cur) => {
		const charCode = cur.charCodeAt(0);
		if (charCode >= 0 && charCode <= 128) {
			showLength += 1;
		} else {
			showLength += 2;
		}
		if (showLength <= maxLength) {
			return pre + cur;
		}
		return pre;
	}, '');
};
