import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ReactPlayer from 'react-player'
import './App.css';
import { getNetts } from './network';
import emojiIcon from './images/emoji.png';
import { monthNames } from './constant';

const MenuItem = ({el}) => {
  const convertDateFormat = date => {
    const newDate = new Date(date);
    // console.log('newDate', monthNames[newDate.getMonth()], ' ', newDate.getDay());
    return monthNames[newDate.getMonth()] + ' ' + newDate.getDay();
  };

  return(
    <div key={el.id}  className='player-wrapper'>
      <div className='player-top-menu'>
        <img className='player-author-avatar' src={el.author.avatar} />
        <div className='player-author-username'>{el.author.username}</div>
      </div>
      <ReactPlayer className='react-player' width='200px' height='320px' url={el.video} playing={el.playing}  />
      <div className='player-description-container'>
        <div className='player-date'>{convertDateFormat(el.createdAt)}</div>
        <div className='player-description'>{el.description}</div>
      </div>
      <div className='player-reaction-container'>
        <img className='player-reaction-icon' src={emojiIcon} />
        <div className='player-reaction-counter'>{el.reactions.length}</div>
      </div>
    </div>
    );
};

export const Menu = (list) =>
  list.map((el, index) => {
    return <MenuItem el={el} key={index}/>;
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

export default class Renett extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    // this.menuItems = Menu(list, selected);
    // this.setState({menuItems: Menu(list, selected)})
    // console.log('this.menuItems', this.state.menuItems);
  }

  async componentDidMount() {
    // console.log('url', this.props.url);
    const getNettsRes = await getNetts('new', [], this.props.url);
    if (getNettsRes.status === 200) {
      // this.menuItems = Menu(getNettsRes.data, selected);
      console.log('getNettsRes', getNettsRes.data); 
      // this.setState({menuItems: Menu(list, selected)})
      this.setState({listItems: getNettsRes.data});
      this.setState({menuItems: Menu(getNettsRes.data, selected)});
    }
  };

  state = {
    selected,
    menuItems: null,
    listItems: null,
  };

  onSelect = key => {
    console.log('key', key);
    const {listItems} = this.state;
    if (listItems[key].playing) {
      listItems[key].playing = false;
    } else {
      listItems[key].playing = true;
    }
    // this.setState({ selected: key });
    this.setState({menuItems: Menu(listItems, selected)})
  }

  render() {
    return (
      <div className="App">
        {this.state.menuItems && 
        <ScrollMenu
          data={this.state.menuItems}
          scrollBy={2}
          // innerWrapperClass='menu-wrapper--inner'
          // innerWrapperStyle={{transform: 0}}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          wheel={false}
          inertiaScrolling={true}
          onSelect={this.onSelect}
        />}
      </div>
    );
  }
}