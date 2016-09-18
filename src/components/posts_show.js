import _ from 'lodash';
import SnuOwnd from 'snuownd';
import moment from 'moment';
import React,{ Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { fetchPost, fetchMorePosts } from '../actions/index';
import { userVote } from '../actions/user_actions';

import Loader from './loader/loader.js';
import PostVideo from './post_video/post_video.js';
import '../../style/show.css';

class PostsShow extends Component {
  constructor(){
    super();
    this.actionMove = this.actionMove.bind(this);
    this.morePosts = this.morePosts.bind(this);
  }

  componentWillMount(){
    this.props.fetchPost(this.props.params.id);

    if (this.findPost().join('') >= this.props.posts.data.children.length - 2) {
      // loading more posts when last video in array
      this.morePosts();
    }
  }

  morePosts(){
    this.props.fetchMorePosts(this.props.posts);
  }

  actionMove(way){
    var currentPostNum = this.findPost().join('');

    switch (way) {
      case 'next':
        var currentPostNum = parseInt(currentPostNum) + 1;
        break;
      case 'prev':
        var currentPostNum = parseInt(currentPostNum) - 1;
        break;
    }

    browserHistory.push('/post/' + this.props.posts.data.children[currentPostNum].data.id);
    const deb = _.debounce(() => { this.componentWillMount() }, 0.1);
    deb();

    window.scrollTo(0, 0);
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

          if (comment !== '') {
            return (
              <div className='show-comments-comment-replies' key={comment_id}>
                <div className='show-comments-comment'>
                  <span className='show-comments-comment-author'>{comment_author}</span> | {comment_score}
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

      if (comment !== '') {
        return (
          <div className='show-comments-chain' key={comment_id}>
            <div className='show-comments-comment'>
              <span className='show-comments-comment-author'>{comment_author}</span> | {comment_score}
              <div className='show-comments-comment-text' dangerouslySetInnerHTML={{__html: comment}}></div>
            </div>
            {renderNestedComments(comment_replies)}
          </div>
        )
      }
    })
  }

  findPost(){
    return this.props.posts.data.children.map((post) => {
      if (post.data.id == this.props.params.id) {
        var currentPostNum = this.props.posts.data.children.indexOf(post);
        return currentPostNum;
      }
    })
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

    if (!post || post[0].data.children[0].data.id !== this.props.params.id) {
      return <Loader />;
    }

    window.scrollTo(0, 0);

    return (
      <div className='show'>
        <Link to='/' className='btn-back'>Back</Link>

        {posts.length !== 0
          ?
          <div>
            {this.findPost().join('') == 0 ? '' : <button className='btn-prev' onClick={this.actionMove.bind(null, 'prev')}>Prev</button>}
            <button className='btn-next' onClick={this.actionMove.bind(null, 'next')}>Next</button>
          </div>
          :
          ''
        }

        <PostVideo
          post={this.props.post}
          onVote={this.props.userVote}/>

        <div className='show-comments'>
          {this.renderComments()}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post, posts: state.posts.all };
}

export default connect(mapStateToProps, { fetchPost, fetchMorePosts, userVote })(PostsShow);
