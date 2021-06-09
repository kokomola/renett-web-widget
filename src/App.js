import './App.css';
import Carousel from 'react-multi-carousel';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import { Stream } from "@cloudflare/stream-react";

const host = 'https://renett.botlify.io';

const Renett = props => {

  // const [videos, setVideos] = useState([{video: 'https://videodelivery.net/394474b9e5a20a01f2722244e82cbc8e/manifest/video.m3u8', isPlay: false}, {video: 'https://videodelivery.net/7bd3002b060dd9b377055fba9c798089/manifest/video.m3u8', isPlay: false},{video: 'https://videodelivery.net/3b35f476f826aa97a26e8d1010aeae1a/manifest/video.m3u8', isPlay: false},{video: 'https://videodelivery.net/3b35f476f826aa97a26e8d1010aeae1a/manifest/video.m3u8', isPlay: false}]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    (async () => {
      if (videos.length === 0) {
        const getNettsRes = await getNetts('new', []);
        const videoArr = [];
        getNettsRes.data.map(nett => {
          const splited = nett.video.split('.');
          if (splited[splited.length - 1] === 'm3u8') {
            nett.isPlay = false;
            videoArr.push(nett);
          }
        })
        console.log('videoArr',videoArr);
        setVideos(videoArr);
      }
    })();
  });

  const getNetts = async (order, spheres, skip = 0) => {
    const sphereQuery = spheres.map(sp => `&spheres[]=${sp.title}`).join('');
    const headers = {'content-type': 'application/json'};
    const response = await fetch(`${host}/netts?order=${order}${sphereQuery}&skip=${skip}&url=${props.url}`, {
      method: 'get',
      headers,
    });
    const json = await response.json();
  
    return {data: json.data, status: response.status};
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30
    }
  };

  const renderReactions = reaction => {
    switch(reaction) {
      case 'brain':
        return "🧠";
      case 'star_struck':
         return "🤩";
      case 'heart_eyes':
         return "😍";
      case 'joy':
         return "😂";
      case 'clap':
          return "👏";
      case 'hmm':
          return "🤔";
      case 'open_mouth':
          return "😮";
      case 'sleeping':
          return "😴";
      case 'exploding_head':
          return "🤯";
      case 'angry':
          return "😡";
        default:
          break;
    };
  };

  return (
    <div className="App" style={{backgroundColor: '#4b7885', borderRadius: 44}}>
          <Carousel
      // ssr
      partialVisbile
      deviceType={props.deviceType}
      itemClass="image-item"
      responsive={responsive}
      asd
    >
      {videos.map(vid => {
        return (
          <div style={{flexDirection: 'row'}}>
            <div >
              <div style={{position: 'absolute', bottom: 80, zIndex: 2, left: 0}}>
                <div style={{zIndex: 2, textAlign: 'start', color:'white', fontWeight: 'bold', fontSize: 32}}>{vid.description}</div>
                <div style={{zIndex: 2, textAlign: 'start', color:'white', fontWeight: 'bold', fontSize: 32}}>@{vid.author.username}</div>
              </div>
              <div style={{position: 'absolute', bottom: 60, right: 0, zIndex: 2, fontSize: 32, color: 'white'}}>{vid.reactions.length} {vid.reactions.slice(0,2).map(reac => renderReactions(reac.type))}</div>
              <div style={{position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(128, 128, 128, 0.45)', borderRadius: 20, zIndex: 2, padding: 5}}>{vid.spheres.slice(0,2).map(sphere => (<img style={{width: 32, height: 32}} src={sphere.icon} />))}</div>           
            {/* <ReactPlayer className='react-player'
            // This is the video address passed from the superior page
            url={vid.video}
            key={vid.video}
            playing={vid.isPlay}
            // playing={vid.isPlay}
            // width='95%'
            // light={true}
            width='240px'
            // controls={true}
            zIndex={5}
            // wrapper=
            config={{
              file: {
                forceHLS: true,
              }
            }}/> */}
            <Stream key={vid.video} controls src={vid.video} />
          </div>
          </div>
          // <iframe src="https://videodelivery.net/b841a7bc853745478652feab89545b72/manifest/video.m3u8" style={{border: 'none', height: '500px', width: '98%'}} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>
        );
      })}
    </Carousel>
    </div>
  );
}

export default Renett;
