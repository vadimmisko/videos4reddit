import _ from 'lodash';
import Remarkable from 'remarkable';
import moment from 'moment';
import React,{ Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { fetchPost, fetchMorePosts } from '../actions/index';

import '../../style/show.css';

class PostsShow extends Component {
  constructor(){
    super();
    this.actionMove = this.actionMove.bind(this);
    this.morePosts = this.morePosts.bind(this);
  }

  componentWillMount(){
    this.props.fetchPost(this.props.params.id);
  }

  morePosts(){
    this.props.fetchMorePosts(this.props.posts);
  }

  actionMove(way){
    var currentPostNum = this.findPost().join('');

    if (currentPostNum == this.props.posts.data.children.length - 2) {
      // loading more posts when last video in array
      this.morePosts();
    }

    switch (way) {
      case 'next':
        var currentPostNum = parseInt(currentPostNum) + 1;
        break;
      case 'prev':
        var currentPostNum = parseInt(currentPostNum) - 1;
        break;
    }

    browserHistory.push('/posts/' + this.props.posts.data.children[currentPostNum].data.id);
    const deb = _.debounce(() => { this.props.fetchPost(this.props.params.id) }, 0.1);
    deb();

    window.scrollTo(0, 0);
  }

  renderComments(){
    var md = new Remarkable(); // Markdown transpiler

    var replyy = null;

    function renderNestedComments(reply){
      if (reply !== '' && reply !== undefined) {
        return reply.data.children.map((comm) => {
          const comment         = md.render(comm.data.body);
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
      const comment         = md.render(comm.data.body);
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

  renderPost(){
    const post        = this.props.post[0].data.children[0].data;
    var video_embed   = this.props.post[0].data.children[0].data.media_embed.content;
    var linkToSource  = this.props.post[0].data.children[0].data.url;
    var linkToReddit  = 'https://www.reddit.com' + post.permalink;

    if (post.over_18) {
      var thumbnail = '../style/imgs/nsfw.jpg';
    }else {
      if (post.preview) {
        var thumbnail = post.preview.images[0].source.url;
      }else {
        var thumbnail = '';
      }
    }

    if (video_embed == undefined){
      var video_embed = "<div class='show-content-video-noFrame'><a class='show-content-video-source' target='_blank' href=" + linkToSource + ">Link to the source</a><img class='show-content-video-thumbnail' src=" + thumbnail + "></div>";
    }

    switch (post.domain) {
      case 'youtu.be':
        var srcIcon = { backgroundImage: 'url(../style/imgs/youtube.png)'};
        break;
      case 'm.youtube.com':
        var srcIcon = { backgroundImage: 'url(../style/imgs/youtube.png)'};
        break;
      case 'youtube.com':
        var srcIcon = { backgroundImage: 'url(../style/imgs/youtube.png)'};
        break;
      case 'streamable.com':
        var srcIcon = { backgroundImage: 'url(../style/imgs/streamable.png)'};
        break;
      case 'liveleak.com':
        var srcIcon = { backgroundImage: 'url(../style/imgs/liveleak.png)'};
        break;
      case 'twitter.com':
        var srcIcon = { backgroundImage: 'url(../style/imgs/twitter.png)'};
        break;
      case 'mobile.twitter.com':
        var srcIcon = { backgroundImage: 'url(../style/imgs/twitter.png)'};
        break;
      default:
        var srcIcon = { backgroundColor: 'white'};
    }

    return (
      <div className='show-content' key='12345'>
        <div className='show-content-video' dangerouslySetInnerHTML={{__html: this.specialCharsReplace(video_embed)}} />
        <div className='show-content-stats'>
          <span className='show-content-title'>{post.title}</span>
          <br />
          <div className='show-content-source'>
            <div className='source-icon' style={srcIcon}></div>
            <div className='source'>
              <span>Submitted by {post.author}</span>
              <span><a target='_blank' href={linkToSource}>Source</a> · <a target='_blank' href={linkToReddit}>Link to a reddit post</a></span>
            </div>
          </div>
          Score: {post.score} · Comments: {post.num_comments} · Submitted {moment.unix(post.created).calendar()}
          <br />
        </div>
      </div>
    )
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
      .replace(/&gt;/g,'>');
  }

  render() {
    const { post }  = this.props;
    const { posts } = this.props;

    if (!post || post[0].data.children[0].data.id !== this.props.params.id) {
      return <div className='loader'>
        <svg width='40px' height='40px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" ><rect x="0" y="0" width="100" height="100" fill="none"></rect><defs><filter id="uil-ring-shadow" x="-100%" y="-100%" width="300%" height="300%"><feOffset result="offOut" in="SourceGraphic" dx="0" dy="0"></feOffset><feGaussianBlur result="blurOut" in="offOut" stdDeviation="0"></feGaussianBlur><feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend></filter></defs><path d="M10,50c0,0,0,0.5,0.1,1.4c0,0.5,0.1,1,0.2,1.7c0,0.3,0.1,0.7,0.1,1.1c0.1,0.4,0.1,0.8,0.2,1.2c0.2,0.8,0.3,1.8,0.5,2.8 c0.3,1,0.6,2.1,0.9,3.2c0.3,1.1,0.9,2.3,1.4,3.5c0.5,1.2,1.2,2.4,1.8,3.7c0.3,0.6,0.8,1.2,1.2,1.9c0.4,0.6,0.8,1.3,1.3,1.9 c1,1.2,1.9,2.6,3.1,3.7c2.2,2.5,5,4.7,7.9,6.7c3,2,6.5,3.4,10.1,4.6c3.6,1.1,7.5,1.5,11.2,1.6c4-0.1,7.7-0.6,11.3-1.6 c3.6-1.2,7-2.6,10-4.6c3-2,5.8-4.2,7.9-6.7c1.2-1.2,2.1-2.5,3.1-3.7c0.5-0.6,0.9-1.3,1.3-1.9c0.4-0.6,0.8-1.3,1.2-1.9 c0.6-1.3,1.3-2.5,1.8-3.7c0.5-1.2,1-2.4,1.4-3.5c0.3-1.1,0.6-2.2,0.9-3.2c0.2-1,0.4-1.9,0.5-2.8c0.1-0.4,0.1-0.8,0.2-1.2 c0-0.4,0.1-0.7,0.1-1.1c0.1-0.7,0.1-1.2,0.2-1.7C90,50.5,90,50,90,50s0,0.5,0,1.4c0,0.5,0,1,0,1.7c0,0.3,0,0.7,0,1.1 c0,0.4-0.1,0.8-0.1,1.2c-0.1,0.9-0.2,1.8-0.4,2.8c-0.2,1-0.5,2.1-0.7,3.3c-0.3,1.2-0.8,2.4-1.2,3.7c-0.2,0.7-0.5,1.3-0.8,1.9 c-0.3,0.7-0.6,1.3-0.9,2c-0.3,0.7-0.7,1.3-1.1,2c-0.4,0.7-0.7,1.4-1.2,2c-1,1.3-1.9,2.7-3.1,4c-2.2,2.7-5,5-8.1,7.1 c-0.8,0.5-1.6,1-2.4,1.5c-0.8,0.5-1.7,0.9-2.6,1.3L66,87.7l-1.4,0.5c-0.9,0.3-1.8,0.7-2.8,1c-3.8,1.1-7.9,1.7-11.8,1.8L47,90.8 c-1,0-2-0.2-3-0.3l-1.5-0.2l-0.7-0.1L41.1,90c-1-0.3-1.9-0.5-2.9-0.7c-0.9-0.3-1.9-0.7-2.8-1L34,87.7l-1.3-0.6 c-0.9-0.4-1.8-0.8-2.6-1.3c-0.8-0.5-1.6-1-2.4-1.5c-3.1-2.1-5.9-4.5-8.1-7.1c-1.2-1.2-2.1-2.7-3.1-4c-0.5-0.6-0.8-1.4-1.2-2 c-0.4-0.7-0.8-1.3-1.1-2c-0.3-0.7-0.6-1.3-0.9-2c-0.3-0.7-0.6-1.3-0.8-1.9c-0.4-1.3-0.9-2.5-1.2-3.7c-0.3-1.2-0.5-2.3-0.7-3.3 c-0.2-1-0.3-2-0.4-2.8c-0.1-0.4-0.1-0.8-0.1-1.2c0-0.4,0-0.7,0-1.1c0-0.7,0-1.2,0-1.7C10,50.5,10,50,10,50z" fill="#ff4500" filter="url(#uil-ring-shadow)"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" repeatCount="indefinite" dur=".5s"></animateTransform></path></svg>
      </div>;
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

        {this.renderPost()}

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

export default connect(mapStateToProps, { fetchPost, fetchMorePosts })(PostsShow);
