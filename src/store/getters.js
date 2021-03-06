const getters = {
	device: state => state.app.device,
	theme: state => state.app.theme,
	color: state => state.app.color,
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	nickname: state => state.user.name,
	welcome: state => state.user.welcome,
	roles: state => state.user.roles,
	userInfo: state => state.user.info,
	multiTab: state => state.app.multiTab,
	collapsed: state => state.app.collapsed,
	// lang: state => state.i18n.lang
};

export default getters;
