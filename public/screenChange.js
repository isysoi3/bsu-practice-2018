;var screenChangeModule = (function () {
	const content = document.querySelector('div[class="content"]');
	const mainTemp = document.getElementById("mainScreen-template");
	const loginTemp = document.getElementById("loginScreen-template");
	const editTemp = document.getElementById("editScreen-template");

	return {
		loadMainScreen : function()
		{
			screenChangeModule.reset();
			content.insertBefore(document.importNode(mainTemp.content, true), content.lastChild);
			DOMModule.init();
		},

		loadLoginScreen : function()
		{
			screenChangeModule.reset();
			content.insertBefore(document.importNode(loginTemp.content, true), content.lastChild);
		},

		loadEditScreen : function(id)
		{
			screenChangeModule.reset();
			content.insertBefore(document.importNode(editTemp.content, true), content.lastChild);
			if(id === undefined)
				DOMModule.fillInfo();
			else
				DOMModule.fillInfo(photoPostsModule.getPhotoPost(id));
		},

		reset : function()
		{
			while(content.childNodes.length != 0)
				content.removeChild(content.lastChild);
		}
	}
})();

screenChangeModule.loadMainScreen();