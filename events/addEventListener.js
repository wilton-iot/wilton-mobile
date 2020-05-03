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
    // check
    "../common/checkProps",
    "../common/checkPropType",
    // other
    "../Logger",
    "./_listeners"
], function(
        module,
        callOrIgnore, callOrThrow, // call
        checkProps, checkPropType, // check
        Logger, listeners // other
) {
    "use strict";
    var logger = new Logger(module.id);

    return function(options, callback) {
        checkProps(options, ["name", "event", "func"]);
        checkPropType(options, "name", "string");
        checkPropType(options, "event", "string");
        checkPropType(options, "func", "function");
        try {
            listeners.push({
                name: options.name,
                event: options.event,
                func: options.func
            });
            return callOrIgnore(callback);
        } catch (e) {
            return callOrThrow(callback, e);
        }
    };

});
