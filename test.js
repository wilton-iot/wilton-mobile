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
    "./isDev",
    "./dev/createChannels"
], function(isDev, createChannels) {

    if(isDev) {
        createChannels();
        require(["wilton/thread"], function(thread) {
            thread.run({
                callbackScript: {
                    module: "wilton-mobile/dev/jsWorkerLoop"
                }
            });
        });
    }

    require([
        // common
        "wilton-mobile/test/common/callOrIgnoreTest",
        "wilton-mobile/test/common/callOrThrowTest",
        "wilton-mobile/test/common/checkNonEmptyStringTest",
        "wilton-mobile/test/common/checkPropTypeTest",
        "wilton-mobile/test/common/checkPropsTest",
        "wilton-mobile/test/common/defaultObjectTest",
        "wilton-mobile/test/common/filterTest",
        "wilton-mobile/test/common/includesTest",
        "wilton-mobile/test/common/listPropsTest",
        "wilton-mobile/test/common/mapTest",

        // events
        "wilton-mobile/test/events/addEventListenerTest",
        "wilton-mobile/test/events/fireEventTest",
        "wilton-mobile/test/events/removeEventListenerTest",

        // fs
        "wilton-mobile/test/fs/existsTest",
        "wilton-mobile/test/fs/mkdirTest",
        "wilton-mobile/test/fs/readFileTest",
        "wilton-mobile/test/fs/readdirTest",
        "wilton-mobile/test/fs/rmdirTest",
        "wilton-mobile/test/fs/unlinkTest",
        "wilton-mobile/test/fs/writeFileTest",

        // http
        "wilton-mobile/test/http/sendFileTest",
        "wilton-mobile/test/http/sendRequestTest",

        // server
        "wilton-mobile/test/server/broadcastWebSocketTest",
        "wilton-mobile/test/server/serverTcpPortTest",
        "wilton-mobile/test/server/startServerTest",
        "wilton-mobile/test/server/stopServerTest",

        // other
        "wilton-mobile/test/compatTest",
        "wilton-mobile/test/LoggerTest",
        "wilton-mobile/test/wiltoncallTest"
    ], function() {
        print("test: PASSED");
    });

    return {
        main: function() {
        }
    };
});
