var depth = 3;
var number_per_level = 5;
//var tst = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
$(function() {
    //take in event object on button click
  $("#submitbtn").on("click", function(e) {
    e.preventDefault();

    //take user input and set it to username
    var username = $("#userID").val();

    //call getFollowers()
        //set count to 0
        //$(".container") = document.querySelectorAll(".container"); --> select element with `class=container`
        //Pass in username to concat to URL
    getFollowers(0, $(".container"), username);

  });
});

//
function getFollowers(count, $container, username) {

    //only go to a depth of three
  if (count >= depth) {
    return false;
  }
  //console.log("username " + username);

  //concat username to URL & set to userFollower
  var userFollower =
    "https://api.github.com/users/" + username + "/followers";

console.log("userFollower " + userFollower);

  //$.getJSON() - shorthand AJAX function in jQuery
  //userFollower --> Pass in URL as userFollower
  //function(data) --> do something with returned data set
  $.getJSON(userFollower, function(data) {
    console.log(data);

    
    for (let i = 0; i < number_per_level; i++) {
        // data[i].login --> use `i` value to set 1st three `login` values to `follower`
        //follower --> name of follower
      var follower = data[i].login; //tst[i]; //data[i].login;
        //create a `div` and set it to `$mine`
      var $mine = $("<div class='follower'>");

      //console.log(`Follower ${follower} follows ${username}`);

      //append() & appendTo() work in diff directions
        //append() --> $(Append_To_This).append(The_Content_Given_Here);
        //appendTo() --> $(The_Content_Given_Here).appendTo(Append_To_This);
            //1) append `follower` name to `div.follower`
            //2) append to `div.container` our `div.follower` which contains  `follower` name
      $mine.append(follower).appendTo($container);
      console.log("$mine.append(follower).appendTo($container);  " + $mine);
      //call getFollowers(). 
        //increment count + 1
        //append follower name to div.follower
        //pass in `follower` to `username` param  
      getFollowers(count + 1, $mine, follower);
    }
  });
}
    