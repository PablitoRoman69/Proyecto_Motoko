import Array "mo:base/Array";

actor TypeMusic {

type Song = {
  id : Nat;
  title : Text;
  description : Text;
  rating : Nat;
};

var songs : [Song] = [
  {
    id = 1;
    title = "Bang Bang! by Ariana Grande";
    description = "Hit del 2014";
    rating = 4;
  }
  ];

public func addSong(rating : Nat, title : Text, description : Text) : async Bool {
  let newId = Array.size(songs) + 1;
  let newSong = {
    id = newId;
    title = title;
    description = description;
    rating = rating;
  };
  songs := Array.append<Song>(songs, [newSong]);
  return true;
};

public query func getAllSongs() : async [Song] {
  return songs;
};

public func getSongById(id : Nat) : async ?Song {
  return Array.find<Song>(songs, func(m) {m.id == id});
};

public func updateSong(id : Nat, title : Text, description : Text, rating : Nat) : async Bool {
  let SongToUpdate = Array.find<Song>(songs, func(task) {task.id == id });

  switch (SongToUpdate) {
    case (null) { return false };
    case (?SongToUpdate) {
      let updateSong = {
        id = id;
        title = title;
        description = description;
        rating = rating;
      };
      songs := Array.map<Song, Song>(songs, func(m) { if (m.id == id) { updateSong } else { m }});
      return true;
    }; 
  };
};

public func deleteSong(id: Nat) : async Bool {
  let song = Array.find<Song>(songs, func(song) { song.id == id });
  if (song != null) {
    songs := Array.filter<Song>(songs, func(song) { song.id != id });
    return true;
  } else {
    return false;
  };
};

};