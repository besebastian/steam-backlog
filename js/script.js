(function () {

    var apiKey = "653FB167380DECA9D5C4B8C61409F7FD";
    var tUserId = "76561197960390219";

    lookupUserId = function(username) {
        var url = "http://steamcommunity.com/id/" + username + "/?xml=1";
        $.ajax(url, {
            type: "GET",
            dataType: "xml",
            success: function(request, status) {
                console.log(request);
                return tUserId;
            }
        });
    };

    getGames = function(userId) {
        var url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + apiKey + "&steamids=" + tUserId;
        $.ajax(url, {
            type: "GET",
            dataType: "jsonp",
            jsonp: "jsonp",
            success: function(data) {
                var player = data.response.players[0];
                $("body").append("<h1>" + player.personaname + "</h1>");
                $("body").append("<img src='" + player.avatarfull + "'/>");
            }
        });
    };

    window.init = function() {
        getGames(lookupUserId("esunub"));
    };
}).call(this);