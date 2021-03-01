import React, { useEffect } from 'react';
import { useState } from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StatusBar, 
  SafeAreaView, 
} from 'react-native';
import TrackPlayer, { STATE_PLAYING } from 'react-native-track-player';
import TrackPlayerEvents from 'react-native-track-player/lib/eventTypes';
import { useTrackPlayerEvents } from 'react-native-track-player/lib/hooks';
import Moment from 'moment';
import styles from './styles';
import PUBLIC_SONGS from '../../../songs';
import Images from '../../../images'

const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();
  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_JUMP_FORWARD,
      TrackPlayer.CAPABILITY_JUMP_BACKWARD,
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ],
  });
  await TrackPlayer.add(PUBLIC_SONGS);
  return true;
};

const Library = ({ navigation }) => {
  const [initialized, setInitialized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const setupPlayer = async () => {
       const setupVal = await trackPlayerInit();
       setInitialized(setupVal);
    }
    if(!initialized) setupPlayer();
  }, [initialized]);

  const [trackId, selectTrackId] = useState(-1);
  useEffect(() => {
    const setupPlayer = async () => {
      const id = await TrackPlayer.getCurrentTrack();
      const state = await TrackPlayer.getState();
      if(state === STATE_PLAYING) {
        selectTrackId(id);
      }
   }
   setupPlayer();
  }, [trackId]);

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], async (event) => {
    const id = await TrackPlayer.getCurrentTrack();
    selectTrackId(id);
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });

  const SongItem = (listItem) => {
    return (
      <TouchableOpacity 
        style={styles.listItem}
        onPress={async () => {
          if(listItem.item.id !== trackId) {
            await TrackPlayer.skip(listItem.item.id);
            await TrackPlayer.play();
          }
          await navigation.navigate('MyModal');
        }}>
        {isPlaying && listItem.item.id === trackId ? 
          <Image style={styles.listItemImage} source={Images.barsGif}/> :
          <Text style={styles.listItemIndex}>{`${listItem.index +1}. `}</Text>
        }
        <Text style={styles.listItemTitle}>{listItem.item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#F2F1F5FF'/>
      <View style={styles.header}>
        <Text style={styles.date}>{Moment(new Date()).format('dddd, MMMM D')}</Text>
        <Text style={styles.libraryText}>Your Library</Text>
        <SubHeader/>
        <TouchableOpacity onPress={()=> {isPlaying ? TrackPlayer.pause() : TrackPlayer.play()}} style={styles.playButtonContainer}>
          <Image source={isPlaying ? Images.pause : Images.play} style={styles.playImage}></Image>
          <Text style={styles.playText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.songList}
        data={PUBLIC_SONGS}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator}/>}
        renderItem={(listItem)=> SongItem(listItem)}
      />
    </SafeAreaView>
  );
};

const SubHeader = () => {
  return (
    <View style={styles.subHeader}>
      <Image source={Images.replay} style={styles.headerImage}/>
      <View style={styles.subHeaderContainer}>
        <Text style={styles.headerTitle}>SoundHelix Spins</Text>
        <Text style={styles.headerArtist}>DJ Tiesto</Text>
        <Text style={styles.headerAlbum}>Replay 2021</Text>   
      </View>
    </View>
  );
}

export default Library;
