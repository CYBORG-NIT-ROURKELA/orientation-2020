let youtubeURL = "https://www.youtube.com/embed/ffc-FIwGcu0",
	slidoURL = "https://app.sli.do/event/lflkcy0p",
	menti1URL = "https://www.menti.com/eeepjkvbgt",
	menti2URL = "https://www.menti.com/srm7jxv6hj",
	currentMode = 0;
const firestore = firebase.firestore();
const ubsub = firestore
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
