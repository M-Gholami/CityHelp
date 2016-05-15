// ==UserScript==
// @name         MapHelp
// @description  This script will list all of your available items.
// @namespace    https://greasyfork.org/users/5563-bloody
// @version      1.1.2
// @author       BloodyMind [1629016]
// @match        *://www.torn.com/city.php*
// @match        *://torn.com/city.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $.ajax({
        url: addRFC('city.php'),
        type: 'get',
        data: {
            step: 'mapData'
        },
        beforeSend: function() {
            $('div.content-title').append('<div id="MapHelp"><img class="ajax-placeholder" src="/images/v2/main/ajax-loader.gif"></div>');
        },
        success: function(response) {
            var items = JSON.parse(atob(JSON.parse(response).territoryUserItems));
            if (items.length === 0) {
                $('#MapHelp').html('<p style="color:#333">You don\'t have any item on the map.</p>');
            } else {
                $('#MapHelp').html('');
                for (var i = 0; i < items.length; i++) {
                    $('#MapHelp').append('<span class="iconShow" style="display:inline-block;" title="' + items[i].title + ' (' + parseInt(items[i].c.x, 36) + ',' + parseInt(items[i].c.y, 36) + ')"><img src="/images/items/' + parseInt(items[i].d, 36).toString() + '/small.png"></span>');
                }
            }
        },
    });
})();