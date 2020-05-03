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
    "module",
    "wilton/Channel",
    "wilton-mobile/Logger"
], function(module, Channel, Logger) {
    "use strict";
    var logger = new Logger(module.id);

    var input = Channel.lookup("dev/tasks/queue");
    var output = Channel.lookup("dev/results/queue");
    var sconfChan = Channel.lookup("dev/server/conf");

    return {
        POST: function(req) {
            var sconf = sconfChan.peek();
            var cb = sconf.httpPostHandler;
            if (null !== cb) { 
                cb.args = [req.data()];
                input.send(cb);
                var resp = output.receive();
                if (resp.error) {
                    logger.error(resp.error);
                }
                var resData = "{}";
                if ("undefined" !== typeof(resp.result) && null !== resp.result) {
                    resData = resp.result;
                }
                req.sendResponse(resData, {
                    meta: {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                });
            }
        }
    };
});
