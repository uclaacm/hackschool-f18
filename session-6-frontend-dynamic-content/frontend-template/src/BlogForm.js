import React from 'react';
import './BlogForm.css';
import * as api from './api';

const initState = {
    title: '',
    content: ''
};

class BlogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    updateTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    updateContent = (e) => {
        this.setState({
            content: e.target.value
        });
    }

    newPost = () => {
        const { title, content } = this.state;
        if (title === '') {
            alert('Title is empty');
            return;
        } else if (content === '') {
            alert('Content is empty');
            return;
        }

        const newPost = {
            title,
            body: content
        };
        try {
            api.addPost(newPost);
            this.props.onSend();
            this.setState(initState);
        } catch (err) {
            alert(err);
        }
    }

    render() {
        const onFocusHidePH = (e) => { e.target.placeholder = ''; };
        const titlePH = 'Title';
        const contentPH = 'Content';
        const onBlurShowPH = (ph) => {
            return (e) => { e.target.placeholder = ph; };
        };
        return (
            <div>
                <div className="blog-form">
                    <input 
                        className="title-in custom-in" 
                        placeholder={titlePH}
                        onFocus={onFocusHidePH}
                        onBlur={onBlurShowPH(titlePH)}
                        onChange={this.updateTitle}
                        value={this.state.title}
                    />
                    <textarea
                        className="content-in custom-in" 
                        placeholder={contentPH}
                        onFocus={onFocusHidePH}
                        onBlur={onBlurShowPH(contentPH)}
                        rows="30"
                        onChange={this.updateContent}
                        value={this.state.content}
                    />
                    <button 
                        className="send-btn" 
                        onClick={this.newPost}
                    >
                        Send!
                    </button>
                </div>
            </div>
        );
    }
}

export default BlogForm;
