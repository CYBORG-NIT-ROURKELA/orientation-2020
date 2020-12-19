let youtubeURL = "https://player.twitch.tv/?channel=cyborgnitr&parent=cyborgnitr.tech",
	slidoURL = "https://app.sli.do/event/5esgpdzv/live/questions",
	menti1URL = "https://www.menti.com/fjxs9ph3gv",
	menti2URL = "https://www.menti.com/pxfq6x19ja",
	currentMode = 0,
	currentUser = null;

const provider = new firebase.auth.OAuthProvider("microsoft.com");
provider.addScope("email");
provider.addScope("profile");
provider.addScope("User.Read");
provider.setCustomParameters({
	prompt: "consent",
	tenant: "nitrkl.ac.in",
});
const uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function (authResult, redirectUrl) {
			//authResult.user.displayName
			//authResult.user.email
			return true;
		},
		uiShown: function () {
			document.getElementById("loader-spinner").setAttribute("hidden", true);
			document.getElementById("sign-in-text").removeAttribute("hidden");
		},
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: "popup",
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		provider.providerId,
	],
};

const auth = firebase.auth();
auth.onAuthStateChanged((user) => {
	currentUser = user;
	if (!currentUser) {
		document.getElementById("interact-div").setAttribute("hidden", true);
		document.getElementById("sign-in-div").removeAttribute("hidden");
	} else {
		document.getElementById("sign-in-div").setAttribute("hidden", true);
		document.getElementById("interact-div").removeAttribute("hidden");
	}
});

const firestore = firebase.firestore();
const unsub = firestore
	.collection("websiteData")
	.doc("orientationPage")
	.onSnapshot((doc) => {
		let data = doc.data();
		console.log(data);
		if (youtubeURL !== data.youtubeURL) {
			youtubeURL = data.youtubeURL;
			document.getElementById("youtube-frame").setAttribute("src", youtubeURL);
		}
		if (slidoURL !== data.slidoURL) {
			slidoURL = data.slidoURL;
			document.getElementById("interact-frame0").setAttribute("src", slidoURL);
		}
		if (menti1URL !== data.menti1URL) {
			menti1URL = data.menti1URL;
			document.getElementById("interact-frame1").setAttribute("src", menti1URL);
		}
		if (menti2URL !== data.menti2URL) {
			menti2URL = data.menti2URL;
			document.getElementById("interact-frame2").setAttribute("src", menti2URL);
		}
		if (currentMode !== data.currentMode) {
			currentMode = data.currentMode;
			document.getElementById("interact-frame0").setAttribute("hidden", true);
			document.getElementById("interact-frame1").setAttribute("hidden", true);
			document.getElementById("interact-frame2").setAttribute("hidden", true);
			document.getElementById("interact-frame" + currentMode.toString()).removeAttribute("hidden");
		}
	});

const ui = new firebaseui.auth.AuthUI(auth);
ui.start("#sign-in-div", uiConfig);
