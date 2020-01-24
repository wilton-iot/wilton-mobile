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
    "../common/isFunction",
    "../common/isString",
    "./Logger"
], function(module, Logger) {
    "use strict";
    var logger = new Logger(module.id);

    var listeners = [];

    function add(name, event, fun) {
        if (!isString(name)) {
            throw new Error("Invalid non-string 'name' specified, value: [" + name + "]");
        }
        if (!isString)
    }

    function remove(name) {
        delete listeners[name];
    }

    function fireEvent(event) {
        listeners[event]();
    }

    return {
        add: add,
        remove: remove,
        fireEvent: fireEvent
    };
});
