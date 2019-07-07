# Hermes
**Hermes**

## Table of Content
## Table of Contents
- [Hermes](#Hermes)
  - [Table of Contents](#Table-of-Contents)
  - [Introduction](#Introduction)
  - [Installation](#Installation)
  - [Usage](#Usage)
  - [API's](#APIs)
  - [Creators](#Creators)

## Introduction
 - A News Application created using React Native and native packages to present you news withing 100 words.


## Installation
1.Clone the git repository:

`git clone https://github.com/akhilramkee/Hermes.git`

2.Setup the Dev Environment:

`npm install`

Export Android SDK:

```
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

```
## Usage
Build The App:

`react-native run-android`

**DEPENDENCIES TO PACKAGES**

## API's

>[react-native-swiper](https://github.com/leecade/react-native-swiper/blob/master/src/index.js) 

This package helped to implement horizontal swipe feature , which is based out on ViewPagerAndroid 
present in React native package.

The swiper is built on top of the scroll view , which tends to make it customisable with lot of features.

Example of implementation of a [swiper](https://www.npmjs.com/package/react-native-swiper)

>[react-native-share](https://github.com/react-native-community/react-native-share)

 React-native-share provides support to share across various social platform with customizable messages.

>[react-native-view-shot](https://github.com/gre/react-native-view-shot)

Provides support to capture the current screen programmatically. Various implementation provides us with flexibilty to choose the suitable package as required.

Example of implementation is provided in [snap-shot](https://github.com/gre/react-native-view-shot)

>[PanResponder](https://facebook.github.io/react-native/docs/panresponder.html)

PanResponder has been used to implement the swipe feature where swipeup tends to provide the next news and Swipedown provides the previous news that has been swiped up.

## Creators

**Akhilesh R**
* [Github Profile](<https://github.com/akhilramkee>)
