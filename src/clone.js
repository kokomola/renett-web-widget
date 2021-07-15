import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './App.css';

// list of items
const list = [
  { name: 'item1' },
  { name: 'item2' },
  { name: 'item3' },
  { name: 'item4' },
  { name: 'item5' },
  { name: 'item6' },
  { name: 'item7' },
  { name: 'item8' },
  { name: 'item9' }
];

// One item component
// selected prop will be passed
const MenuItem = ({text, selected}) => {
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
  list.map(el => {
    const {name} = el;

    return <MenuItem text={name} key={name} selected={selected} />;
  });


const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = 'item1';

export  default class Renett extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    this.menuItems = Menu(list, selected);
  }

  state = {
    selected
  };

  onSelect = key => {
    this.setState({ selected: key });
  }


  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;

    return (
      <div className="App">
        <ScrollMenu
          scrollBy={1}
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}
import React, { useEffect, useState } from 'react';
// import Carousel from 'react-multi-carousel';
import Carousel, {slidesToShowPlugin} from '@brainhubeu/react-carousel';
import ReactPlayer from 'react-player'
import ScrollMenu from 'react-horizontal-scrolling-menu';

import '@brainhubeu/react-carousel/lib/style.css';
// import 'react-multi-carousel/lib/styles.css';
import './App.css';

import emojiIcon from './images/emoji.png'

const host = 'https://renett.botlify.io';

const Renett = props => {
  // const [videos, setVideos] = useState([{video: 'https://videodelivery.net/394474b9e5a20a01f2722244e82cbc8e/manifest/video.m3u8', isPlay: false}, {video: 'https://videodelivery.net/7bd3002b060dd9b377055fba9c798089/manifest/video.m3u8', isPlay: false},{video: 'https://videodelivery.net/3b35f476f826aa97a26e8d1010aeae1a/manifest/video.m3u8', isPlay: false},{video: 'https://videodelivery.net/3b35f476f826aa97a26e8d1010aeae1a/manifest/video.m3u8', isPlay: false}]);
  const [videos, setVideos] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const styles = {
    player: {
      backgroundColor: 'black',
      borderRadius: 22,
    },
    topView: {
      position: 'absolute',
      marginTop: 10,
      marginLeft: 10,
      display: 'flex',
      alignItems: 'center',
      zIndex: 2,
    },
    avatar: {
      width: 25,
      height: 25,
      borderRadius: 25,
    },
    username: {
      color: 'white',
      marginLeft: 4,
      fontWeight: 'bold',
      fontSize: 13,
    },
    bottomView: {
      position: 'absolute',
      display: 'flex',
      zIndex: 2,
      marginTop: 320 - 16 - 18,
      marginLeft: 126,
      alignItems: 'center',
    },
    emojiCounter: {
      fontWeight: 'bold',
      fontSize: 13,
      color: 'white',
    },
  };

  useEffect(() => {
    (async () => {
      if (videos.length === 0) {
        const getNettsRes = await getNetts('new', []);
        console.log('getNettsRes', getNettsRes);
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

  const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

  const handlePlayClick = () => {
    setIsPlay(!isPlay);
  };

  return (
    <div className="App">
      {/* {videos.length !== 0 && <Carousel 
        plugins={[
          // 'centered',
          'arrows',
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 6
              }
          },
        ]}
        breakpoints={breakpoint}
      >
        {
        videos.map(item => 
          <div key={item.id} onClick={handlePlayClick} className='player-wrapper'>
            <ReactPlayer className='react-player' width='200px' height='320px' url={item.video} playing={isPlay} />
          </div>
        )
        }
      </Carousel>} */}

    </div>
  );
}

export default Renett;
