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
const getPosts = async () => {
    const resp = await fetch(APIURL);
    if (!resp.ok) {
        throwError(resp);
    } else {
        return resp.json();
    }
};

// TODO: Write a function that adds a new post to the database using a fetch
const addPost = async (post) => {
    const resp = await fetch(APIURL, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(post)
    });
    if (!resp.ok) {
        throwError(resp);
    }
};

// TODO: Write a function that deletes a post from the database using a fetch
const deletePost = async (postId) => {
    const delURL = APIURL + '/' + postId;
    const resp = await fetch(delURL, {
        method: 'delete'
    });

    if (!resp.ok) {
        throwError(resp);
    } 
};

export {
    //getPosts,
    // addPost,
    deletePost
};
