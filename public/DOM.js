var DOMModule = (function () {
    var user = "isysoi" ;
    var posts;
    var postTemplate;
    var deleteButtons;
    var editButtons;

    var editingPost;

    var headerButtons;
    var userLoggedIn;
    var userLoggedOut;

    var postsCount = 10;

    return {

        init : function()
        {
            posts = document.querySelector("div[class=\"posts\"]");
            postTemplate = document.getElementById("post-template");
            deleteButtons = document.getElementById("delete-buttons-template");
            editButtons = document.getElementById("edit-buttons-template");

            headerButtons = document.querySelector("div[class=\"ser\"]");
            userLoggedIn = document.getElementById("user-logged-in");
            userLoggedOut = document.getElementById("user-logged-out");


            DOMModule.showUserElements();
            DOMModule.showPosts();
        },

        addPhotoPostToHtml: function (photoPost) {
            if (document.getElementById(photoPost.id) != null)
                return;

            let newPost = document.importNode(postTemplate.content, true);

            newPost.querySelector("div[class=\"Post\"]").id = photoPost.id;
            newPost.getElementById("description").textContent = photoPost.description;
            newPost.getElementById("photo").src = photoPost.photoLink;
            newPost.getElementById("author").textContent = photoPost.author;

            let options = {
                day: "numeric", month: "short", year: "numeric",
                hour: "2-digit", minute: "2-digit"
            };

            var like = newPost.getElementById("like");

            like.onclick = function(){
                if(like.id === "like")
                {
                    like.id = "pressed_like";
                }
                else
                    like.id = "like";
            };               

            newPost.querySelector("p[class=\"date\"]").textContent = photoPost.createdAt.toLocaleTimeString("en-us", options);

            if (user === photoPost.author) {
                let deleteButton = newPost.querySelector("div[class=\"delete-button\"]");
                deleteButton.onclick = function(){
                    DOMModule.removePhotoPost(photoPost.id);
                    DOMModule.showPosts();
                };
                deleteButton.insertBefore(document.importNode(deleteButtons.content, true), deleteButton.querySelector("div[class=\"delete-buttons\"]"));
                let editButton = newPost.querySelector("div[class=\"edit-button\"]");
                editButton.onclick = function(){
                    screenChangeModule.loadEditScreen(photoPost.id);
                };
                editButton.insertBefore(document.importNode(editButtons.content, true), editButton.querySelector("div[class=\"delete-buttons\"]"));
            }

            posts.insertBefore(newPost, posts.firstChild);
        },

        fillInfo : function(photoPost){
            let options = {
                day: "numeric", month: "short", year: "numeric",
                hour: "2-digit", minute: "2-digit"
            };

            if(photoPost === undefined || photoPost === null)
                editingPost = new photoPostsModule.createPost(-1, "", new Date() , user, "");
            else
                editingPost = photoPost;
            document.getElementById("author").textContent = user;
            document.querySelector("p[class=\"date\"]").textContent = (editingPost.createdAt.toLocaleTimeString("en-us", options));
            document.getElementById("photo").src = editingPost.photoLink;
            document.getElementById("description").textContent = editingPost.description;

            document.getElementById("file").onchange = function(){
                editingPost.photoLink = window.URL.createObjectURL(document.getElementById("file").files[0]);
                document.getElementById("photo").src = editingPost.photoLink;
            };
        },

        onSaveClick : function(){
            editingPost.description = document.getElementById("description").value;
            if(photoPostsModule.getPhotoPost(editingPost.id) !== null)
                photoPostsModule.editPhotoPost(editingPost.id, editingPost);
            else
                photoPostsModule.addPhotoPost(editingPost);
            screenChangeModule.loadMainScreen();
        },

        showPosts: function () {
            DOMModule.removeAllChilds(posts);
            let postsToBeShown = photoPostsModule.getPhotoPosts(0, postsCount);
            postsToBeShown.forEach(post => this.addPhotoPostToHtml(post));
        },

        addPhotoPost: function (photoPost) {
            if (photoPostsModule.addPhotoPost(photoPost))
                this.addPhotoPostToHtml(photoPost);
        },

        removePhotoPost: function (id) {
            photoPostsModule.removePhotoPost(id);
            postToBeRemoved = document.getElementById(id);
            if (postToBeRemoved != null)
                posts.removeChild(postToBeRemoved);
        },

        login : function()
        {
            var loginTextBox =  document.getElementById("login");
            var paswwordTextBox =  document.getElementById("password");
            if(photoPostsModule.login(loginTextBox.value, paswwordTextBox.value))
            {
                user = loginTextBox.value;
                screenChangeModule.loadMainScreen();
            }
            else
                alert("Wrong login/password");
        },

        editPhotoPost: function (id, photoPost) {
            if (!photoPostsModule.editPhotoPost(id, photoPost))
                return;
            let post = document.querySelector(`div[id ="${id}"]`);
            if (document.getElementById(id) != null) {
                if (photoPost.description !== undefined) {
                    post.querySelector("p[id=\"description\"]").textContent = photoPost.description;
                }
                if (photoPost.photoLink !== undefined) {
                    post.querySelector("img[id=\"photo\"]").src = photoPost.photoLink;
                }
            }
        },

        showMore : function()
        {
            postsCount += 10;
            DOMModule.showPosts();
        },

        removeAllChilds : function(content)
        {
            while(content.childNodes.length != 0)
                content.removeChild(content.lastChild);
        },

        showUserElements: function () {
            let userInfoHeader;
            DOMModule.removeAllChilds(headerButtons);
            if (user === undefined) {
                userInfoHeader = document.importNode(userLoggedOut.content, true);
            } else {
                userInfoHeader = document.importNode(userLoggedIn.content, true);
                userInfoHeader.querySelector("p[class=\"username\"]").textContent = user;
            }
            headerButtons.appendChild(userInfoHeader);
        },

        logout : function()
        {
            user = undefined;
            DOMModule.showUserElements();
            DOMModule.showPosts();
        }
    };
})();
