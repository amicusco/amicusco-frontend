import React from 'react';

export function GetImageOrder(medias){
    if (medias.length > 0){
        var orderMedias = medias.sort(function (a, b) {
            if (a.id < b.id) {
              return 1;
            } 
            if (a.id > b.id) {
                return -1;
            }
            return 0;
        });
    
        return orderMedias[0]['url'];
    }

    return null;
}