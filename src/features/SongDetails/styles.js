import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#EDEDED',
    marginTop:40
  },
  controlsContainer: {
    marginHorizontal: 40,
  },
  progressBar: {
    height: 10,
    paddingBottom: 90,
  },
  backButtonContainer: {
    marginLeft: 10, 
    flexDirection:'row'
  },
  backButtonImage : { 
    width: 30, 
    height: 30, 
    tintColor:'#EA4359'
  },
  titleStyle: {
    fontSize:20, 
    color:'#EA4359', 
    alignSelf:'center',
  },
  songImage : { 
    width: "90%", 
    height: "30%", 
    borderRadius:20, 
    alignSelf:'center', 
    marginTop:30
  },
  songName: {
    fontSize:18, 
    color:'black', 
    alignSelf:'center', 
    marginTop:40
  },
  artistName: {
    fontSize:18, 
    color:'#EA4359', 
    alignSelf:'center', 
    marginTop:4
  },
  seekingContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    marginTop:40,
  },
  seekControls : { 
    width: 50, 
    height: 40 ,
  },
  seekFwdRwdContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    marginTop:20,
  },
  fastRewind: {marginTop:8},
  fastRewindImage: { width: 30, height: 30 },
});

export default styles;
