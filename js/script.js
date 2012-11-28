(function () {

    var apiKey = "653FB167380DECA9D5C4B8C61409F7FD";

    lookupUserId = function(username) {
        var userId = "76561197960390219";
        return userId;
    };

    getGames = function(userId) {
        var url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + apiKey + "&steamids=" + userId;
        $.ajax(url, {
            type: "GET",
            success: function(data) {
                console.log(data);
            }
        });
    };

    window.init = function() {
        getGames(lookupUserId("esunub"));
    };
}).call(this);