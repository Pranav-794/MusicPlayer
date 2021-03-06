# Features of the App:

Goal: Create a user friendly music player app. I took some inspiration for Apple Music, since they have a very user friendly user experience. Hope you like it! :) This was a super fun project to work on. I wish I could work on it more!

Features:
- Library - where a user gets to see the list of songs they can listen to
  - User can start play and pause
  - User can click on a song for its details to control it
- Song Details - where a user gets to control the song
  - Pause / Play
  - Skip to previous song
  - Skip to next song
  - Skip to next 30 seconds
  - Skip to previous 30 seconds
  - Seek to anywhere in the song with slider
- Background Music when app is inactive
  - Notification controls for user when phone is locked or unlocked.
  - Quick Notification controls

If I continued working on this, some key features I would add :)
  - Rating for songs
  - Shuffle/Repeat songs
  - Unit tests for the code.

Note: The emulator is sometimes slow and doesn't behave correctly when app is in background. Testing on real device is ideal.

# How to run the app:

- Make sure you have `yarn` installed on your machine. If you do not, you can install yarn using Homebrew on Mac:
```
brew install yarn
```

```
yarn
```
And then:
```
cd ios && pod install
yarn ios
```
Or
```
yarn android
```

# React Native Take Home Exercise

You will have **a week** to complete the following take-home exercise. Please use primarily Javascript to code the following exercise, although you may edit native code for anything that you feel requires it.

When submitting your exercise please include:

- A Readme for how to run the application and any tests (including any dependencies that must be downloaded). Also feel free to include any notes or tidbits about thought process as you tackled the exercise.

- Any comments to explain particular logic or call out something cool!

To submit your exercise, please create a repository in Github and email the link to [eng@join-real.com](mailto:eng@join-real.com). Also please email with any questions you may have. Happy Coding!

---

## Exercise: Scrollable Audio Streaming

Create an application that allows people to scroll through a list of audio clips, each associated with an image. 

- The list should load at least 16 audio clips. You can use the clips on [SoundHelix](https://www.soundhelix.com/audio-examples).

- You may use whatever images you would like for each audio clip.

- The user should be able to play, pause, and seek 30 seconds forwards or backwards for each audio clip. 

- A user can only play one audio clip at a time.

- The audio should continue playing in the background when a user leaves the app. 

- The app should be performant and not take too long to load initially or too long to load each successive clip.

- We are not judging your design skills, but we would love to see that you can build a beautiful UI. Feel free to use any existing apps for inspiration. 

## Notes
- Make sure you have `yarn` installed on your machine. If you do not, you can install yarn using Homebrew on Mac:
```
brew install yarn
```

- We have created a basic app using [create-react-native-app](https://github.com/expo/create-react-native-app) that runs on iOS and Android. To run it, please run:

```
yarn
```
And then:
```
yarn ios
```
Or
```
yarn android
```
These instructions assume you have set up XCode and have an iOS simulator as well as an Android simulator through Android Studio. 


## Requirements

- The app should run on both Android and iOS
