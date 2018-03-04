Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [(dd>9 ? '' : '0') + dd,
        (mm>9 ? '' : '0') + mm,
        this.getFullYear()
    ].join('.');
};

(function() {

    var photoPosts = [
        createPost(0, "Test post 1", new Date('February 12, 2018 17:24:00'), "Vasya", "photo1.jpg"),
        createPost(1, "Test post 2", new Date('February 17, 2018 21:24:00'), "Vasya", "photo1.jpg"),
        createPost(2, "Test post 3", new Date('February 17, 2018 15:42:00'), "Alex", "photo1.jpg"),
        createPost(3, "Test post 4", new Date('February 18, 2018 13:24:00'), "Vasya", "photo1.jpg"),
        createPost(4, "Test post 5", new Date('February 17, 2018 20:53:00'), "Ilada", "photo1.jpg"),
        createPost(5, "Test post 6", new Date('February 17, 2018 11:44:00'), "Zheka", "photo1.jpg"),
        createPost(6, "Test post 7", new Date('February 17, 2018 16:24:00'), "Vasya", "photo1.jpg"),
        createPost(7, "Test post 8", new Date('February 17, 2018 17:24:00'), "Yana", "photo1.jpg"),
        createPost(8, "Test post 9", new Date('February 17, 2018 17:18:00'), "Vasya", "photo1.jpg"),
        createPost(9, "Test post 10", new Date('February 17, 2018 17:54:00'), "Zheka", "photo1.jpg"),
        createPost(10, "Test post 11", new Date('February 17, 2018 17:24:00'), "Vasya", "photo1.jpg"),
        createPost(11, "Test post 12", new Date('February 17, 2018 17:04:00'), "Vasya", "photo1.jpg"),
        createPost(12, "Test post 13", new Date('February 17, 2018 19:24:00'), "Vasya", "photo1.jpg"),
        createPost(13, "Test post 14", new Date('February 17, 2018 12:27:00'), "san", "photo1.jpg"),
        createPost(14, "Test post 15", new Date('February 18, 2018 17:24:00'), "Vasya", "photo1.jpg"),
        createPost(15, "Test post 16", new Date('February 17, 2018 9:15:00'), "Vasya", "photo1.jpg"),
        createPost(16, "Test post 17", new Date('February 17, 2018 17:24:00'), "Vasya", "photo1.jpg"),
        createPost(17, "Test post 18", new Date('February 19, 2018 10:24:00'), "Vasya", "photo1.jpg"),
        createPost(18, "Test post 19", new Date('February 17, 2018 13:54:00'), "Mark", "photo1.jpg"),
        createPost(19, "Test post 20", new Date('February 17, 2018 17:24:00'), "Vasya", "photo1.jpg")
    ];

    function createPost(id, description, createdAt, author, photoLink) {
        return {
            id: id,
            description: description,
            createdAt: createdAt,
            author: author,
            photoLink: photoLink

        }
    }


    function getPhotoPosts(skip, top, filterConfig) {
        if(filterConfig === undefined ){
            return photoPosts.slice(skip, skip + top);
        }
        else {
            if (filterConfig.author !== undefined
                && filterConfig.author !== "") {
                return photoPosts.filter(function(author) {
                    return author === filterConfig.author;
                })
            }

        }

    }

    function getPhotoPost(id){
        for (var i = 0; i < photoPosts.length; i++) {
            if(photoPosts[i].id === id)
                return photoPosts[i];
        }
        return null;
    }

    function validatePhotoPost(photoPost) {
        return photoPost.description !== undefined
            && photoPost.description.length <= 200
            && photoPost.createdAt !== undefined
            && photoPost.author !== undefined
            && photoPost.photoLink !== undefined;

    }

    function addPhotoPost(photoPost) {
        if(validatePhotoPost(photoPost)) {
            photoPost.id = photoPosts.length;
            photoPosts.push(photoPost);
            return true;
        }
        return false;
    }

    function findIndexOfPhotoPost(id) {
        for (var i = 0; i < posts.length; i++) {
            if(photoPosts[i].id === id)
                return i;
        }
        return -1;
    }

    function editPhotoPost(id, photoPost) {
        var post = getPhotoPost(id);
        if(post != null)
        {
            if(photoPost.photoLink !== undefined)
                post.photoLink = photoPost.photoLink;
            if(photoPost.description !== undefined)
                post.description = photoPost.description;
            if(validatePhotoPost(photoPost))
            {
                return true;
            }
        }
        return false;
    }

    function removePhotoPost(id) {
        if(getPhotoPost(id))
        {
            var index = findIndexOfPhotoPost(id);
            if(index !== -1)
            {
                photoPosts.splice(index, 1);
                return true;
            }
        }
        return false;
    }


    var posts = getPhotoPosts(0, 10);

    for (var i = 0; i < posts.length; i++) {
        var html = "<div class=\"Post\"> \
                        <div class=\"editButton\"> \
                            <button><img src=\"assets/pencil-edit-button.png\" height=32 width=32/>  </button> \
                        </div> \
                        <img class=\"photoPost\" src=\"assets/photo1.png\" height=\"80%\" width=\"60%\"/> \
                        <div class=\"description\"> \
                            <p>"+ posts[i].author +"</p> \
                            <p>"+ posts[i].createdAt.getUTCHours() + ":" + posts[i].createdAt.getUTCMinutes() + " " + posts[i].createdAt.yyyymmdd() +"</p> \
                            <p>"+ posts[i].description +"</p> \
                        </div> \
                        <button class=\"button\" style=\"top: 50px; left: 40px;\">Like 54</button> \
                        <button class=\"button\" style=\"top: 50px; left: 50%\">Удалить</button> \
                        <div class=\"border\"></div> \
                    </div>";
        document.write(html);
    }
})();

