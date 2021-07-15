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
          {/* <div style={{zIndex: 2, textAlign: 'start', color:'white', fontWeight: 'bold', fontSize: 32}}>{vid.description}</div>
          <div style={{zIndex: 2, textAlign: 'start', color:'white', fontWeight: 'bold', fontSize: 32}}>@{vid.author.username}</div> */}
        </div>
        {/* <div style={{position: 'absolute', bottom: 60, right: 0, zIndex: 2, fontSize: 32, color: 'white'}}>{vid.reactions.length} {vid.reactions.slice(0,2).map(reac => renderReactions(reac.type))}</div>
        <div style={{position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(128, 128, 128, 0.45)', borderRadius: 20, zIndex: 2, padding: 5}}>{vid.spheres.slice(0,2).map(sphere => (<img style={{width: 32, height: 32}} src={sphere.icon} />))}</div>            */}
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


        {/* <div onClick={handlePlayClick} className='player-wrapper'>
          <ReactPlayer className='react-player' width='200px' height='320px' url='https://videodelivery.net/3b35f476f826aa97a26e8d1010aeae1a/manifest/video.m3u8' playing={isPlay} />
        </div> */}
        {/* <div style={{width: 200, height: 200, backgroundColor: 'red'}}></div>
        <div style={{width: 200, height: 200, backgroundColor: 'red'}}></div> */}
      {/* <div style={{display: 'relative'}} onClick={handlePlayClick}>
          <div style={styles.topView}>
            <img style={styles.avatar} src={'https://www.hollywoodreporter.com/wp-content/uploads/2019/03/avatar-publicity_still-h_2019.jpg?w=681&h=383&crop=1'} />
            <div style={styles.username}>andydans</div>
          </div>
          <ReactPlayer className='react-player' width='200px' height='320px' url='https://videodelivery.net/3b35f476f826aa97a26e8d1010aeae1a/manifest/video.m3u8' playing={isPlay} />
          <div style={styles.bottomView}>
            <img style={{width: 40, height: 16}} src={emojiIcon} />
            <div style={styles.emojiCounter}>126</div>
          </div>
        </div> */}