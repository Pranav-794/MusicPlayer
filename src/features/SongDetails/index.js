import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import TrackPlayer, {TrackPlayerEvents, STATE_PLAYING} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player/lib/hooks';
import styles from './styles';
import Images from '../../../images'
import {AlbumCovers} from '../../../songs';
/*
AUDIO FILES

https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
...
https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3

*/
const SongDetails = ({navigation}) => {
  const [currentlyPlaying, setIsPlaying] = useState(false);
  const [songName, setName] = useState('')
  const [artistName, setArtistName] = useState('')
  const [sliderProgress, setSliderProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const {position, duration} = useTrackPlayerProgress(150);

  useEffect(() => {
    const setupPlayer = async () => {
      const id = await TrackPlayer.getCurrentTrack();
      const state = await TrackPlayer.getState();
      const track = await TrackPlayer.getTrack(id);
      if(state === STATE_PLAYING) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
      setName(track.title);
      setArtistName(track.artist);
   }
   setupPlayer();
  }, []);

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], async (event) => {
    const id = await TrackPlayer.getCurrentTrack();
    const track = await TrackPlayer.getTrack(id);
    setName(track.title);
    setArtistName(track.artist);
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });

 useEffect(() => {
  if (!isSeeking && position && duration) {
    setSliderProgress(position / duration);
  }
  }, [position, duration]);

  const buttonClicked = () => {
    currentlyPlaying ? TrackPlayer.pause() : TrackPlayer.play();
  };

  const seekBack30 = () => {
    TrackPlayer.seekTo(position-30)
    setSliderProgress((position-30)/duration);
  };
  const seekForward30 = () => {
    TrackPlayer.seekTo(position+30)
    setSliderProgress((position+30)/duration);
  };
  const previousSong = () => {
    TrackPlayer.skipToPrevious();
    setSliderProgress(0);
  };
  const nextSong = () => {
    TrackPlayer.skipToNext();
    setSliderProgress(0);
  };

  const slidingStarted = () => {
    setIsSeeking(true);
  };

  const slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setSliderProgress(value);
    setIsSeeking(false);
  };
  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar style="auto" />
      <BackButton onClick={() => navigation.goBack(null)}/>
      <Header song={songName} artist={artistName} albumImg={AlbumCovers[artistName]}/>
      <SliderControl 
        progress={sliderProgress} 
        onStart={slidingStarted} 
        onEnd={slidingCompleted} 
        disabled={!currentlyPlaying}
      />
      <SeekControls 
        onPrevious={previousSong} 
        onPausePlay={buttonClicked} 
        onNext={nextSong} 
        playing={currentlyPlaying} 
      />
      <AdvancedSeekControls onSeekBack={seekBack30} onSeekForward={seekForward30}/>
    </SafeAreaView>
  );
}

const BackButton = (props) => {
  return (
    <TouchableOpacity style={styles.backButtonContainer} onPress={props.onClick}>
      <Image source={Images.backButton} style={styles.backButtonImage}/>
      <Text style={styles.titleStyle}>{'Library'}</Text>
    </TouchableOpacity>
  );
};

const Header = (props) => {
  return (
    <>
      <Image source={props.albumImg} style={styles.songImage}/>
      <Text style={styles.songName}>{props.song}</Text>
      <Text style={styles.artistName}>{props.artist}</Text>
    </>
  )
}

const SliderControl = (props) => {
  return (
    <View style={styles.controlsContainer}>
      <Slider
        style={styles.progressBar}
        minimumValue={0}
        maximumValue={1}
        value={props.progress}
        minimumTrackTintColor='black'
        maximumTrackTintColor='gray'
        onSlidingStart={props.onStart}
        onSlidingComplete={props.onEnd}
        thumbTintColor='black'
        disabled={props.disabled}
      />
    </View>
  )
}

const SeekControls = (props) => {
  return (
    <View style={styles.seekingContainer}>
        <TouchableOpacity onPress={props.onPrevious}>
          <Image source={Images.skipBack} style={styles.seekControls}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onPausePlay}>
          <Image source={props.playing ? Images.pause : Images.play} style={styles.seekControls}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onNext}>
          <Image source={Images.skipForward} style={styles.seekControls}/>
        </TouchableOpacity>
      </View>
  );
}

const AdvancedSeekControls = (props) => {
  return (
    <View style={styles.seekFwdRwdContainer}>
      <TouchableOpacity style={styles.fastRewind} onPress={props.onSeekBack}>
        <Image source={Images.rewind} style={styles.fastRewindImage}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.fastRewind} onPress={props.onSeekForward}>
        <Image source={Images.fastForward} style={styles.fastRewindImage}/>
      </TouchableOpacity>
    </View>
  );
}

export default SongDetails;