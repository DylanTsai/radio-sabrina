const FILE_INFO_PATH = "/fileInfo.json"; // remember to include this in index.html

function filePath(fileName) {
  return "/songs/" + fileName + ".mp3;
}

function convert_to_seconds(timeStr) {
  let min, sec = timeStr.split(':');
  return (+min) * 60 + (+sec); 
}

const FILE_INFOS = {};

const QUEUE = [];

const AUDIO_ELEMENTS = {
  primary: {
    fileName: "",
    element: null
  },
  secondary: {
    fileName: "",
    element: null,
  }
}

function read_file_info() {
  let json = JSON.parse(FILE_INFO_PATH); 
  for (const [fileName, fileTimestamps] of Object.entries(json)) {
    let songStartsAndEnds = [];
    for (int i = 0; i < fileTimestamps.length - 1; i++) {
      let songStart = fileTimestamps[i];
      let songEnd = fileTimestamps[i+1];
      songStartsAndEnds.push([{start: songStart, end: songEnd}]); 
    }
    FILE_INFOS[fileName] = {
      totalLength: fileTimestamps[i],
      songs: songStartsAndEnds
    }
  }
}

function select_random_fileName() {
  let fileNames = [];
  let fileLengths = [];
  for (const [fileName, fileInfo] of Object.entries(FILE_INFOS)) {
    fileNames.push(fileName);
    fileLengths.push(fileInfo[totalLength]);
  }
  let rand = Math.random() * sum(fileLengths);
  let s = 0;
  let chosenIndex = -1;
  while (rand > s) {
    chosenIndex += 1;
    s += fileLengths[chosenIndex];
  }
  return fileNames[chosenIndex];
}

// returns {start, end}
function get_random_song(fileName) {
  let numSongs = FILE_INFOS[fileName]["songs"].length;
  let randIndex = Math.floor(Math.random() * sum(fileLengths));
  return FILE_INFOS[fileName]["songs"][randIndex];
}

function delete_audio_file(fileName) {
  delete audio_files[fileName];
}

function get_new_audio_file(fileName) {
  if (fileName in audio_files) {
    return false;
  }
  let newFile = null;
  // TODO get file
  
  audio_files[fileName] = newFile;
  return true;
}

function add_audio_sample_to_queue() {
  console.log("TODO");
}

function add_whole_audio_to_queue_no_shuffle(fileName) {
  queue.push(...FILE_INFOS[fileName]["songs"]);
}
/*
function add_whole_audio_to_queue(fileName) {
  let songsCopy = [for (s of FILE_INFOS[fileName]["songs"]) s];
  
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
*/

function song_is_in_queue(fileName, song) {
  for (int i = 0; i < queue.length(); i++) {
    if (queue[i]["fileName"] == fileName && 
        queue[i]["start"] == song["start"] && 
        queue[i]["end"] == song["end"]) {
      return true;
    }
  }
  return false;
}

function fileNamesInQueue() {
  let ret = [];
  for (int i = 0; i < queue.length(); i++) {
    if (!ret.contains(queue[i]["fileName"])) {
      ret.push(queue[i]["fileName"]);
    }
  }
  return ret;
}

function setup() {
  read_file_info();
  let newFileName = select_random_fileName();
  let success = false;
  while (!success) {
    get_new_audio_file(newFileName);
  }
  add_whole_audio_to_queue_no_shuffle(newFileName);
  
  let audio = new Audio(filePath(newFileName));
  AUDIO_ELEMENTS["primary"] = audio;
  
}

function playNext() {
  if (!QUEUE.length) 
     return false;
  let {fileName, song} = queue.pop(0);
  if (AUDIO_ELEMENTS["primary"]["fileName"] != fileName) {
    console.log("TODO: secondary audio element");
  }
  AUDIO_ELEMENTS["primary"]["element"].pause();
  let startSeconds = convert_to_seconds(song["start"]);
  console.log("setting current time to " + startSeconds);
  AUDIO_ELEMENTS["primary"]["element"].currentTime = startSeconds;
  AUDIO_ELEMENTS["primary"]["element"].play();
  return true;
}
/*
setup();
playNext();
*/

let audio = new Audio("/songs/All I Ask.mp3");
audio.play();

play() {
  var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
  audio.play();
}

document.getElementById("testAudioElement").play()
