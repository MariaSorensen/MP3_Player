//<iframe src="https://8tracks.com/mixes/5305578/player_v3_universal" width="300" height="250" style="border: 0px none;"></iframe>
//<p class="_8t_embed_p" style="font-size: 11px; line-height: 12px;"><a href="https://8tracks.com/zumbidinho-fm/internacional?utm_medium=referral&utm_content=mix-page&utm_campaign=embed_button">Internacional</a> from <a href="http://8tracks.com/zumbidinho-fm?utm_medium=referral&utm_content=mix-page&utm_campaign=embed_button">zumbidinho.fm</a> on <a href="https://8tracks.com?utm_medium=referral&utm_content=mix-page&utm_campaign=embed_button">8tracks Radio</a>.</p>
// <iframe src="https://8tracks.com/mixes/3777053/player_v3_universal" width="300" height="250" style="border: 0px none;"></iframe>
//<p class="_8t_embed_p" style="font-size: 11px; line-height: 12px;"><a href="https://8tracks.com/sherry-singh-904/best-of-the-best-2014?utm_medium=referral&utm_content=mix-page&utm_campaign=embed_button">BEST OF THE BEST. 2014.</a> from <a href="http://8tracks.com/sherry-singh-904?utm_medium=referral&utm_content=mix-page&utm_campaign=embed_button">sherry.singh.904</a> on <a href="https://8tracks.com?utm_medium=referral&utm_content=mix-page&utm_campaign=embed_button">8tracks Radio</a>.</p>


import React from "react";
import ReactDOM from "react-dom";

const BestOfTheBest = "https://8tracks.com/mixes/3777053/player_v3_universal";
const InternationalZum = "https://8tracks.com/mixes/5305578/player_v3_universal";

// before displaying the duration of the song we need to format the data
function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}
 
// if we're trying to add buttons for play, pause and stop to our app. 
// It doesn't make sense to have a pause or stop button when no song is playing. 
// Likewise a play button doesn't make sense if no song is paused.
// We want our app to know about what our music player is up to.

class App extends React.Component {
  state = {
    selectedTrack: null,
    player: "stopped",
    currentTime: null,
    duration: null
  };

  // To add a duration and a time indicator we use 'timeupdate' and then save what we need to the state of our component.

  componentDidMount() {
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTrack !== prevState.selectedTrack) {
      let track;
      switch (this.state.selectedTrack) {
        case "Campfire Story":
          track = campfireStory;
          break;
        case "Booting Up":
          track = bootingUp;
          break;
        default:
          break;
      }

      // set our 'player' state to 'playing'
      if (track) {
        this.player.src = track;
        this.player.play();
        this.setState({ player: "playing", duration: this.player.duration });
      }
    }
    // To stop and pause the audio
    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        this.setState({ selectedTrack: null });
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ) {
        this.player.play();
      }
    }
  }
// Once we get a visitor to click on a song title, we want that song to play. So we need a way to log the click, 
//identify which song was picked and then have it play. You add an 'onClick' handler to the element encapsulating the track, 
//and add the track title as an argument in the function you feed it.

  render() {
    const list = [
      { id: 1, title: "Campfire Story" },
      { id: 2, title: "Booting Up" }
    ].map(item => {
      return (
        <li
          key={item.id}
          onClick={() => this.setState({ selectedTrack: item.title })}
        >
          {item.title}
        </li>
      );
    });

    // render duration on our screen.
    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);

        // HTML tag you can place anywhere in your JSX. Since it is a real element, 
        // you will need to make sure it is encapsulated within another element.

        // Our app now knows that a song is being played. 
        //So we can use that knowledge to conditionally render a play, pause and stop button. 
    return (
      <>

        <h1>My Little Player</h1>
        <ul>{list}</ul>
        
        <div>
        
          {this.state.player === "paused" && (
            <button onClick={() => this.setState({ player: "playing" })}>
              Play
            </button>
          )}
          {this.state.player === "playing" && (
            <button onClick={() => this.setState({ player: "paused" })}>
              Pause
            </button>
          )}
          {this.state.player === "playing" || this.state.player === "paused" ? (
            <button onClick={() => this.setState({ player: "stopped" })}>
              Stop
            </button>
          ) : (
            ""
          )}
        </div>
        {this.state.player === "playing" || this.state.player === "paused" ? (
          <div>
            {currentTime} / {duration}
          </div>
        ) : (
          ""
        )}
        <audio ref={ref => (this.player = ref)} />
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
