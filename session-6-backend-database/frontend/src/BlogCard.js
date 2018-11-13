import React from 'react';
import './BlogCard.css';

class BlogCard extends React.Component {
    constructor(props){
        super(props);
        const { id } = this.props.post;
        this.removePost = () => { this.props.onDelete(id); };
    }

    bgColorFromID(id) {
        const dustyRed = '#96858F';
        const lavendarBlue = '#6D7993';
        const overcastGreen = '#9099A2';
        const val = 3 * Math.sin(id.charCodeAt(0) * 54);
        if (-1 > val && val >= -3)
            return dustyRed;
        else if (1 > val && val >= -1)
            return lavendarBlue; 
        else
            return overcastGreen;
    }

    render() {
        const { title, body, id, creationTime } = this.props.post;
        const headStyle = { backgroundColor: this.bgColorFromID(id) };
        const postDate = new Date(creationTime);
        const dateString = postDate.toLocaleDateString();
        return (
            <div>
                <div className="blog-head" style={headStyle}>
                    <div className="delete-wrapper">
                        <button className="delete-btn" onClick={this.removePost}>
                            DELETE
                        </button>
                    </div>

                    <h3 className="title">{title}</h3>
                    <p className="creation-date">{dateString}</p>
                </div>

                <div className="blog-post">
                    <div className="blog-content" dangerouslySetInnerHTML={{__html: body}}/>
                </div>
            </div>
        );
    }
}

export default BlogCard;
