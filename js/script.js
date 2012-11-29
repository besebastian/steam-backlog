(function () {

    var user = {};
    var games = [];

    lookupUser = function(username) {
        user = {};
        var jUrl =  "http://query.yahooapis.com/v1/public/yql?q=use%20'https%3A%2F%2Fgithub.com%2Fdisavian%2F" +
                    "yql-tables%2Fraw%2Fmaster%2Fsteam%2Fsteam.community.player.profile.xml'%20as%20steam.community" +
                    ".player.profile%3B%20select%20*%20from%20steam.community.player.profile%20where%20customurl%3D'" +
                    username + "'&format=json";
        $.ajax({
            url: jUrl,
            dataType: 'jsonp',
            success: function(data) {
                user = data.query.results.profile;
                getGames(username);
            }
        });
    };

    getGames = function(username) {
        games = [];
        var t = "http://pipes.yahoo.com/pipes/pipe.run?Username=" + username + "&_id=3590b205b2df8b2e9376fdd7e4e9a969&_render=json";
        $.ajax({
            url: t,
            success: function(data) {
                games = data.value.items[0].games.game;
                displayGames(games);
            }
        });
    };

    countUnplayed = function(gameList) {
        var c = 0;
        $(gameList).each(function(i,v) {
            if (this.hoursOnRecord === undefined) {
                c++;
            }
        });
        return c;
    };

    checkContainer = function() {
        $(".for-content").fadeOut(0);
        $(".for-content").html('<div class="row content"><header><h2></h2><p class="small"></p></header><div class="well"><ul class="game-list"></ul></div></div>');
        return $(".content");
    };

    displayGames = function(gameList) {
        var unplayed = countUnplayed(gameList);
        var percentage = Math.ceil(unplayed / gameList.length * 100);
        var container = checkContainer();

        container.find("header").prepend("<img src='" + user.avatarIcon + "' alt='Profile image for " + user.steamID + "' class='pull-left' />");
        container.find("header").children("h2").html("Results for <a href='http://steamcommunity.com/id/" + user.customURL + "' target='_blank'>" + user.steamID + "</a> (" + user.customURL + ")");
        container.find("header").children("p").html(gameList.length + " game(s) found, out of which " + unplayed + " (" + percentage + "%) are unplayed.");

        $(gameList).each(function(i,v) {
            if (this.hoursOnRecord === undefined) {
                container.find(".game-list").append("<li>" + this.name + "</li>");
            }
        });
        $(".for-content").fadeIn(400);
    };

    window.init = function() {
        $("#steamId").on("submit", function(e) {
            e.preventDefault();
            lookupUser(escape($("#username").val()));
        });
    };

}).call(this);