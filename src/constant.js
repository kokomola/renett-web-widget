export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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

  // const breakpoint = {
  //   500: {
  //     plugins: [
  //       'arrows',
  //       {
  //         resolve: slidesToShowPlugin,
  //         options: {
  //          numberOfSlides: 1
  //         }
  //       },
  //     ]
  //   },
  //   750: {
  //     plugins: [
  //       'arrows',
  //       {
  //         resolve: slidesToShowPlugin,
  //         options: {
  //          numberOfSlides: 2
  //         }
  //       },
  //     ]
  //   },
  //   1000: {
  //     plugins: [
  //       'arrows',
  //       {
  //         resolve: slidesToShowPlugin,
  //         options: {
  //          numberOfSlides: 3
  //         }
  //       },
  //     ]
  //   },
  //   1250: {
  //     plugins: [
  //       'arrows',
  //       {
  //         resolve: slidesToShowPlugin,
  //         options: {
  //          numberOfSlides: 4
  //         }
  //       },
  //     ]
  //   },
  //   1500: {
  //     plugins: [
  //       'arrows',
  //       {
  //         resolve: slidesToShowPlugin,
  //         options: {
  //          numberOfSlides: 5
  //         }
  //       },
  //     ]
  //   }
  // }

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