import React from 'react';
import * as api from './api';
import BlogCard from './BlogCard';
import BlogIntro from './BlogIntro';
import BlogForm from './BlogForm';
import './Blog.css';

const emoHighlight = {
    backgroundColor: '#bbbbbb',
    fontFamily: 'Times New Roman'
};

const hiddenFormStyle = {
    top: '-100vh',
    position: 'absolute',
};

const showFormStyle = {
    top: '0'
};

class Blog extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            showForm: false
        };
        this.composeOnClick = () => { this.toggleForm(); };
        this.refreshPosts = () => { 
            this.loadPosts(); 
            this.setState({ showForm: false });
        };
    }

    componentDidMount() {
        this.loadPosts();
    }

    toggleForm() {
        const oldState = this.state.showForm;
        this.setState({
            showForm: !oldState
        });
    }

    async loadPosts() {
        const posts = await api.getPosts();
        this.setState({ posts });
    }

    deletePost = async (id) => {
        try {
            api.deletePost(id);
            this.loadPosts();
        } catch (error) {
            alert('Cannot Delete Post with id ' + id);
        }
    }

    render() {
        const { posts } = this.state;
        let cards;
        if (posts.length !== 0){
            cards = posts.map(post => (
                <BlogCard 
                    key={post.id} 
                    post={post} 
                    onDelete={this.deletePost}
                />
            ));
        } else {
            cards = (<h1 style={{ fontSize: '3vw' }}>
                It is currently very <span style={emoHighlight}>empty</span>.
                Compose?
            </h1>);
        }
        const { showForm } = this.state;
        const formStyle = showForm ? showFormStyle : hiddenFormStyle;
        return (
            <div>
                <div style={formStyle}>
                    <BlogForm onSend={this.refreshPosts}/>
                </div>

                <div className="btn-wrapper">
                    <button className="compose-btn" onClick={this.composeOnClick}>
                        {showForm? 'DONE': 'COMPOSE'}
                    </button>
                </div>

                <BlogIntro />
                {cards}
            </div>
        );
    }
}
    
export default Blog;