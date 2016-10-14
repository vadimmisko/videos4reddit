import _ from 'lodash';
import SnuOwnd from 'snuownd';
import moment from 'moment';
import React,{ Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { fetchPost, fetchMorePosts } from '../../actions/index';
import { userVote } from '../../actions/user_actions';

import Loader from '../loader/loader.js';
import PostVideo from './post_video/post_video.js';
import './posts_show.css';

class PostsShow extends Component {
  constructor(){
    super();
    this.actionMove     = this.actionMove.bind(this);
    this.thumbnailMove  = this.thumbnailMove.bind(this);
    this.morePosts      = this.morePosts.bind(this);
  }

  componentWillMount(){
    this.props.fetchPost(this.props.params.id);

    if (this.props.posts) {
      if (this.props.post && this.findPost() >= this.props.posts.data.children.length - 3) {
        // loading more posts when last video in array
        this.morePosts();
      }
    }
  }

  morePosts(){
    this.props.fetchMorePosts(this.props.posts);
  }

  actionMove(way){
    switch (way) {
      case 'next':
        var currentPostNum = this.findPost() + 1;
        break;
      case 'prev':
        var currentPostNum = this.findPost() - 1;
        break;
    }

    browserHistory.push('/post/' + this.props.posts.data.children[currentPostNum].data.id);
    const deb = _.debounce(() => { this.componentWillMount() }, 0.1);
    deb();
  }

  renderComments(){
    function renderNestedComments(reply){
      if (reply !== '' && reply !== undefined) {
        return reply.data.children.map((comm) => {
          if (comm.data.body !== '' && comm.data.body !== undefined){
            var comment = SnuOwnd.getParser().render(comm.data.body);
          }else{
            var comment = '';
          }
          const comment_id      = comm.data.id;
          const comment_author  = comm.data.author;
          const comment_score   = comm.data.score;
          const comment_replies = comm.data.replies;
          const comment_date    = comm.data.created;

          if (comment !== '') {
            return (
              <div className='show-comments-comment-replies' key={comment_id}>
                <div className='show-comments-comment'>
                  <span className='show-comments-comment-title'>
                    <span className='show-comments-comment-author'>{comment_author}</span> · {comment_score} {comment_score!==1 ? 'points' : 'point'} · {moment.unix(comment_date).calendar()}
                  </span>
                  <span className='show-comments-comment-text' dangerouslySetInnerHTML={{__html: comment}}></span>
                </div>
                {renderNestedComments(comment_replies)}
              </div>
            )
          }
        })
      }
    }

    return this.props.post[1].data.children.map((comm) => {
      if (comm.data.body !== '' && comm.data.body !== undefined){
        var comment = SnuOwnd.getParser().render(comm.data.body);
      }else{
        var comment = '';
      }

      const comment_id      = comm.data.id;
      const comment_author  = comm.data.author;
      const comment_score   = comm.data.score;
      const comment_replies = comm.data.replies;
      const comment_date    = comm.data.created;

      if (comment !== '') {
        return (
          <div className='show-comments-chain' key={comment_id}>
            <div className='show-comments-comment'>
              <span className='show-comments-comment-title'>
                <span className='show-comments-comment-author'>{comment_author}</span> · {comment_score} {comment_score!==1 ? 'points' : 'point'} · {moment.unix(comment_date).calendar()}
              </span>
              <span className='show-comments-comment-text' dangerouslySetInnerHTML={{__html: comment}}></span>
            </div>
            {renderNestedComments(comment_replies)}
          </div>
        )
      }
    })
  }

  thumbnailMove(id){
    browserHistory.push('/post/' + id);
    const deb = _.debounce(() => { this.componentWillMount() }, 0.1);
    deb();
  }

  renderThumbnails(){
    return this.props.posts.data.children.map((post) => {
      let classes   = 'show-thumbnails-item';
      var thumbnail = { backgroundImage: 'url(' + post.data.thumbnail + ')'};

      if (post.data.over_18 == true) {
        var thumbnail = { backgroundImage: 'url(/style/imgs/nsfw.jpg)'};
      }
      if (post.data.id == this.props.params.id) {
        classes = classes + ' show-thumbnails-item_active';
      }

      return(
        <div key={post.data.id} className={classes}>
          <div style={thumbnail} onClick={this.thumbnailMove.bind(null, post.data.id)} />
        </div>
      )
    });
  }

  findPost(){
    var currentPostNum = this.props.posts.data.children.map((post) => {
      if (post.data.id == this.props.params.id) {
        var currentPostNum = this.props.posts.data.children.indexOf(post);
        return currentPostNum;
      }
    })

    currentPostNum = _.last(currentPostNum.filter(function( element ) {
      return element !== undefined;
    }));

    return currentPostNum;
  }

  specialCharsReplace(content) {
    return content
      .replace(/&lt;/g,'<')
      .replace(/&gt;/g,'>')
      .replace(/&amp;/g,'&');
  }

  render() {
    const { post }  = this.props;
    const { posts } = this.props;

    if (document.getElementsByClassName('show-thumbnails-item_active')[0] !== undefined) {
      document.getElementsByClassName('show-thumbnails-item_active')[0].scrollIntoView(false);
    }
    window.scrollTo(0, 0);

    if (posts.length == 0) {
      if (!post || post[0].data.children[0].data.id !== this.props.params.id) {
        return <Loader />;
      }
    }

    return (
      <div className='show'>
        {
          posts.length !== 0
          ?
          <div>
            {this.findPost() == 0 ? '' : <button className='btn-prev' onClick={this.actionMove.bind(null, 'prev')}>Prev</button>}
            <button className='btn-next' onClick={this.actionMove.bind(null, 'next')}>Next</button>
          </div>
          :
          ''
        }

        <PostVideo
          post={posts.length !== 0 ? this.props.posts.data.children[this.findPost()] : this.props.post[0].data.children[0]}
          onVote={this.props.userVote}
          key='uniqueKey' />

        <div className='show-thumbnails'>
          {posts.length !== 0 ? this.renderThumbnails() : ''}
        </div>

        <div className='show-comments'>
          {post && post[0].data.children[0].data.id == this.props.params.id ? this.renderComments() : <Loader />}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post, posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPost, fetchMorePosts, userVote })(PostsShow);
