import './App.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'

const host = 'https://renett.botlify.io';

const App = props => {

  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    (async () => {
      if (videos.length === 0) {
        const getNettsRes = await getNetts('new', []);
        const videoArr = [];
        getNettsRes.data.map(nett => {
          const splited = nett.video.split('.');
          if (splited[splited.length - 1] === 'm3u8') {
            videoArr.push(nett);
          }
        })
        setVideos(videoArr);
      }
    })();
  });

  const getNetts = async (order, spheres, skip = 0) => {
    const sphereQuery = spheres.map(sp => `&spheres[]=${sp.title}`).join('');
    const headers = {'content-type': 'application/json'};
    const response = await fetch(`${host}/netts?order=${order}${sphereQuery}&skip=${skip}`, {
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

  return (
    <div className="App">
          <Carousel
      ssr
      partialVisbile
      deviceType={props.deviceType}
      // itemClass="image-item"
      responsive={responsive}
    >
      {videos.map(vid => {
        return (
          <ReactPlayer className='react-player'
          // This is the video address passed from the superior page
          url={vid.video}
          playing
          width='95%'
          controls
          
          // config={{
          //   file: {
          //     forceHLS: true,
          //   }
          // }}
  />
          // <iframe src="https://videodelivery.net/b841a7bc853745478652feab89545b72/manifest/video.m3u8" style={{border: 'none', height: '500px', width: '98%'}} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>
        );
      })}
    </Carousel>
    </div>
  );
}

export default App;
