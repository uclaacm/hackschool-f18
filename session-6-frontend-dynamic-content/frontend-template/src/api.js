const APIURL = '/posts';

const throwError = async (resp) => {
    const unknownErr = { errorMessage: 'Unknown error' };
    try {
        const body = await resp.json();
        if (body.message !== undefined) {
            let err = { errorMessage: body.message };
            throw err;
        } else {
            throw unknownErr;
        }
    } catch (e) {
        throw unknownErr;
    }
};

// TODO: Write a function that gets all of the posts from the database using a fetch
const getPosts = async() => {

}
// TODO: Write a function that adds a new post to the database using a fetch
const addPost = async (post) => {
    
}
// TODO: Write a function that deletes a post from the database using a fetch
const deletePost = async (postId) => {
    
}

export {
    //getPosts,
    addPost,
    // deletePost
};
