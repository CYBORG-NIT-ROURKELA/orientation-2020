const analytics = firebase.analytics();
const remoteConfig = firebase.remoteConfig();
remoteConfig.settings.minimumFetchIntervalMillis = 1200000;
remoteConfig.defaultConfig = {
	orientation_status: 1,
};
remoteConfig
	.fetchAndActivate()
	.then(() => {
		const val = remoteConfig.getValue("orientation_status").asNumber();
		switch (val) {
			case 0:
				if (window.location.pathname != "/comingSoon") window.location = "/comingSoon";
				break;
			case 2:
				if (window.location.pathname != "/thankYou") window.location = "/thankYou";
				break;
			default:
				if (window.location.pathname != "/orientation") window.location = "/orientation";
				break;
		}
	})
	.catch((err) => {
		console.error(err);
		if (window.location.pathname != "/orientation") window.location = "/orientation";
	});
