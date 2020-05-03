/*
 * Copyright 2020, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
    // common
    "../common/callOrIgnore",
    "../common/callOrThrow",
    "../common/defaultJson",
    // local
    "../isDev",
    "../wiltoncall"
], function(
        callOrIgnore, callOrThrow, defaultJson, // common
        isDev, wiltoncall // local
) {
    "use strict";

    return function(message, callback) {
        try {
            if(isDev) {
                require(["wilton-mobile/dev/server/broadcastWebSocket"], function(broadcastWebSocket) {
                    broadcastWebSocket({
                        path: "/websocket",
                        message: defaultJson(message)
                    });
                });
            } else {
                wiltoncall("server_broadcast_web_socket", defaultJson(message));
            }
            return callOrIgnore(callback);
        } catch (e) {
            return callOrThrow(callback, e);
        }
    };
});
