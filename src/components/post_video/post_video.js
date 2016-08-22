import React from 'react';
import moment from 'moment';

import './post_video.css';

const PostVideo = ({post}) => {
  function specialCharsReplace(content) {
    return content
      .replace(/&lt;/g,'<')
      .replace(/&gt;/g,'>')
      .replace(/&amp;/g,'&');
  }

  var post        = post[0].data.children[0].data;
  var video_embed   = post.media_embed.content;
  var linkToSource  = post.url;
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
    case 'vimeo.com':
      var srcIcon = { backgroundImage: 'url(../style/imgs/vimeo.png)'};
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
      <div className='show-content-video' dangerouslySetInnerHTML={{__html: specialCharsReplace(video_embed)}} />
      <div className='show-content-stats'>
        <span className='show-content-title'>{specialCharsReplace(post.title)}</span>
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
};

export default PostVideo;
