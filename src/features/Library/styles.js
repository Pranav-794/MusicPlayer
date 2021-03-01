import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:'#FEFFFE'
  },
  header: {
    marginLeft:12, 
    marginTop:12
  },
  date: {
    color:'#808080', 
    fontSize:18
  },
  libraryText: { fontSize: 25, color:'black' },
  subHeader: {
    flexDirection:'row', 
    marginTop:20
  },
  subHeaderContainer: {
    flexDirection:'column', 
    marginLeft:14
  },
  headerImage : {
    width:'40%', 
    height:160
  },
  headerTitle: {
    fontSize:15, 
    marginBottom:2, 
    color:'black', 
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold'
  },
  headerArtist: {
    fontSize:15, 
    marginBottom:2, 
    color:'#EA4359'
  },
  headerAlbum: {
    fontSize:15, 
    marginBottom:2, 
    color:'#808080'
  },
  songList: {marginTop:20},
  itemSeparator: {
    borderBottomColor: '#F2F1F5FF',
    borderBottomWidth: 1,
  },
  listItem: { 
    flex:1,
    marginTop: 16, 
    flexDirection:'row', 
    margin:12
  },
  listItemImage: {width:15, height:18, alignSelf:'center'},
  listItemIndex: {color:'#808080'},
  listItemTitle: {marginLeft: 15, color:'black'},
  playButtonContainer: {paddingHorizontal:20, paddingVertical:12, borderRadius:4, backgroundColor:'#F2F1F5FF', marginRight:'60%', marginTop:12, flexDirection:'row', justifyContent:'center'},
  playImage: {width:15, height:15, tintColor:'#EA4359', marginRight:4, alignSelf:'center'},
  playText: {color:'#EA4359', fontWeight: Platform.OS === 'ios' ? '600' : 'bold', alignSelf: 'center'},
});

export default styles;
