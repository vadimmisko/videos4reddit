import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';

import { fetchPosts, fetchMorePosts } from '../../actions/index';
import Loader from '../loader/loader.js';

import './posts_index.css';

class PostsIndex extends Component {
  constructor(){
    super();
    this.morePosts = this.morePosts.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentWillMount(){
    this.props.fetchPosts();
  }

  renderPosts(){
    return this.props.posts.data.children.map((post) => {
      if (post.data.over_18 == true) {
        var divStyle = { backgroundImage: 'url(/style/imgs/nsfw.jpg)'};
      }else {
        if (post.data.thumbnail !== 'default') {
          var divStyle = { backgroundImage: 'url(' + post.data.preview.images[0].source.url + ')'};
        }else {
          var divStyle = { backgroundColor: 'black'};
        }
      }

      return (
        <div className='index-item' key={post.data.id}>
          <Link to={'post/' + post.data.id}>
            <div className='index-item-pic' style={divStyle} />
          </Link>
          <div className='index-item-text'>
            <Link to={'post/' + post.data.id}>
              <span className='index-item-title'>{this.specialCharsReplace(post.data.title)}</span>
            </Link>
            <span className='index-item-date'>
              Submitted {moment.unix(post.data.created).calendar()} by <span className='index-item-author'>{post.data.author}</span>
            </span>
            <div className='index-item-stats'>Score: {post.data.score} · Comments: {post.data.num_comments}</div>
          </div>
        </div>
      )
    })
  }

  sortBy(type){
    switch (type) {
      case 'hot':
        localStorage.setItem('sort-by', 'hot');
        this.props.fetchPosts();
        break;
      case 'new':
        localStorage.setItem('sort-by', 'new');
        this.props.fetchPosts();
        break;
      case 'rising':
        localStorage.setItem('sort-by', 'rising');
        this.props.fetchPosts();
        break;
      case 'top':
        localStorage.setItem('sort-by', 'top');
        this.props.fetchPosts();
        break;
    }
  }

  morePosts(){
    this.props.fetchMorePosts(this.props.posts);
  }

  specialCharsReplace(content) {
    return content
      .replace(/&lt;/g,'<')
      .replace(/&gt;/g,'>')
      .replace(/&amp;/g,'&');
  }

  render() {
    if (!this.props.posts || this.props.posts.length == 0) {
      return <Loader />;
    }

    return(
      <div className='index'>
        <div className='index-filterBar'>
          <div className='index-filterBar-title'>
            <svg xmlns="http://www.w3.org/2000/svg">
              <path d="M 3.71875 7.78125 L 2.28125 9.21875 L 11.28125 18.21875 L 12 18.90625 L 12.71875 18.21875 L 21.71875 9.21875 L 20.28125 7.78125 L 12 16.0625 L 3.71875 7.78125 z"></path>
            </svg>
            r/ VIDEOS
          </div>
          <div className='index-filterBar-options'>
            <button onClick={this.sortBy.bind(null, 'hot')}>HOT</button>
            <button onClick={this.sortBy.bind(null, 'new')}>NEW</button>
            <button onClick={this.sortBy.bind(null, 'rising')}>RISING</button>
            <button onClick={this.sortBy.bind(null, 'top')}>TOP</button>
          </div>
        </div>

        <div className='index-items'>
          {this.renderPosts()}
          <button className='btn-more' onClick={this.morePosts}>MORE POSTS</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPosts, fetchMorePosts })(PostsIndex);
