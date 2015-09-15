if (Meteor.isClient) {
  myImgPath = "";
  //console.log(test)
  var Dep = new Tracker.Dependency();
  Template.heroImg.events({
    "submit .new-hero": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      // myImgPath = "";
      // Get value from form element
      var privKey = "";
      var pubKey = "e687d607d622b25c31d6ae38f2f42597";
      var name = event.target.text.value;
      var ts = parseInt(Date.now()/1000, 10);
      var preHash = ts + privKey + pubKey;
      var hash = CryptoJS.MD5(preHash).toString();
      var url = "http://gateway.marvel.com:80/v1/public/characters?name=" + name + "&ts=" + ts + "&apikey=e687d607d622b25c31d6ae38f2f42597&hash=" + hash
      // console.log(url)
      $.ajax({
        // the URL endpoint for the JSON object
        url: url,
        // type of request
        type: "get",
        // datatype xml or json
        dataType: "json"
        // promise that executes on successful ajax call
      }).done(function(response){
        console.dir(this)
        myImgPath = response.data.results[0].thumbnail.path + "/portrait_incredible" + ".jpg";
        Template.heroImg.helpers({
          avatarPath: function(){
            return myImgPath
          }
        });
        // console.log(myImgPath)
        // console.log(response.data.results[0].id)
      })
      // console.log(myImgPath)
      // Clear form
      event.target.text.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
