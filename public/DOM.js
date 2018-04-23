;var DOMModule = (function () {
    var user = "isysoi" ;
    const posts = document.querySelector('div[class="content"]');
    const postTemplate = document.getElementById('post-template');
    const deleteButtons = document.getElementById('delete-buttons-template');
    const editButtons = document.getElementById('edit-buttons-template');

    const headerButtons = document.querySelector('div[class="user"]');
    const userLoggedIn = document.getElementById('user-logged-in');
    const userLoggedOut = document.getElementById('user-logged-out');

    return {
        addPhotoPostToHtml: function (photoPost) {
            if (document.getElementById(photoPost.id) != null)
                return;

            let newPost = document.importNode(postTemplate.content, true);

            newPost.querySelector('div[class="Post"]').id = photoPost.id;
            newPost.getElementById('description').textContent = photoPost.description;
            newPost.getElementById('photo').src = photoPost.photoLink;
            newPost.getElementById('author').textContent = photoPost.author;

            let options = {
                day: "numeric", month: "short", year: "numeric",
                hour: "2-digit", minute: "2-digit"
            };

            newPost.querySelector('p[class="date"]').textContent = photoPost.createdAt.toLocaleTimeString("en-us", options);

            if (user === photoPost.author) {
                let deleteButton = newPost.querySelector('div[class="delete-button"]');
                deleteButton.insertBefore(document.importNode(deleteButtons.content, true), deleteButton.querySelector('div[class="delete-buttons"]'));
                let editButton = newPost.querySelector('div[class="edit-button"]');
                editButton.insertBefore(document.importNode(editButtons.content, true), editButton.querySelector('div[class="delete-buttons"]'));
            }

            posts.insertBefore(newPost, posts.firstChild);
        },

        showPosts: function () {
            let postsToBeShown = photoPostsModule.getPhotoPosts(0, 10);
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

        editPhotoPost: function (id, photoPost) {
            if (!photoPostsModule.editPhotoPost(id, photoPost))
                return;
            let post = document.querySelector(`div[id ="${id}"]`);
            if (document.getElementById(id) != null) {
                if (photoPost.description !== undefined) {
                    post.querySelector('p[id="description"]').textContent = photoPost.description;
                }
                if (photoPost.photoLink !== undefined) {
                    post.querySelector('img[id="photo"]').src = photoPost.photoLink;
                }
            }
        },

        showUserElements: function () {
            let userInfoHeader;
            if (user === undefined) {
                userInfoHeader = document.importNode(userLoggedOut.content, true);
            } else {
                userInfoHeader = document.importNode(userLoggedIn.content, true);
                userInfoHeader.querySelector('p[class="username"]').textContent = user;
            }
            headerButtons.appendChild(userInfoHeader);
        }
    }
})();

DOMModule.showUserElements();
DOMModule.showPosts();
