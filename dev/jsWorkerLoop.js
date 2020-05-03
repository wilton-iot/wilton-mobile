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
    "../common/formatError",
    "../Logger"
], function(module, Channel, formatError, Logger) {
    "use strict";
    var logger = new Logger(module.id);

    return function(data) {
        var input = Channel.lookup("dev/tasks/queue", 0);
        var output = Channel.lookup("dev/results/queue", 0);
        for(;;) {
            var cb = input.receive();
            var json = JSON.stringify(cb, null, 4);
            try {
                var res = WILTON_run(json);
                output.send({
                    result: res
                });
            } catch (e) {
                logger.error(e);
                output.send({
                    error: formatError(e)
                });
            }
        }
    };

});
