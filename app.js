var fs = require('fs');
var mm = require('musicmetadata');

fs.readdir('./music/', function(err,files) {
    if(err) throw err;
    var jsonObj = {
                    songs: []
                };
    for(var i=0; i<files.length; i++){
    	console.log(files[i])
        var jsonSong = { 
                        title:"",
                        artist:"",
                        duration:"",
                        pic:""
                    }
        var parser = new mm(fs.createReadStream('./music/'+files[i]));
        parser.on('title', function(result) {
            jsonSong.title = result;
        });
        parser.on('albumartist', function(result) {
            jsonSong.artist = result;
        });
        parser.on('duration', function(result) {
            jsonSong.duration = result;
        });
        parser.on('picture', function(result) {
            jsonSong.pic = result;
        });

        jsonObj.songs.push(jsonSong);

    };
    console.log(jsonObj);
});


