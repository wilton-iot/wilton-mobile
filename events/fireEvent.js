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
    // call
    "../common/callOrIgnore",
    "../common/callOrThrow",
    "../common/checkNonEmptyString",
    "../common/filter",
    // other
    "../Logger",
    "./_listeners"
], function(
        module,
        callOrIgnore, callOrThrow, checkNonEmptyString, filter, // call
        Logger, listeners // other
) {
    "use strict";
    var logger = new Logger(module.id);

    return function(event, args, callback) {
        checkNonEmptyString("event", event);
        logger.info("Event fired, name: [" + event + "]");
        try {
            var filtered = filter(listeners, function(li) {
                return event === li.event;
            });
            filtered.forEach(function(li) {
                try {
                    li.func.apply(null, args);
                } catch (e) {
                    logger.error("Event listener error," +
                            " event: [" + event + "]," +
                            " name: [" + li.name + "]", e);
                }
            });
            callOrIgnore(callback);
        } catch (e) {
            return callOrThrow(callback, e);
        }
    };
});
