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
    // call
    "../common/callOrIgnore",
    "../common/callOrThrow",
    // check
    "../common/checkNonEmptyString",
    "../common/checkProps",
    "../common/checkPropType",
    // other
    "../common/filter",
    "./Logger"
], function(
        callOrIgnore, callOrThrow, // call
        checkNonEmptyString, checkProps, checkPropType, // check
        filter, Logger // other
) {
    "use strict";
    var logger = new Logger("wilton-mobile/eventListeners");

    var listeners = [];

    function add(options, callback) {
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
    }

    function remove(name, callback) {
        checkNonEmptyString("name", name);
        try {
            var indices = [];
            listeners.forEach(function(li, idx) {
                if (name === li.name) {
                    indices.push(idx);
                }
            });
            indices.forEach(function(idx) {
                listeners.splice(idx, 1);
            });
            return callOrIgnore(callback);
        } catch (e) {
            return callOrThrow(callback, e);
        }
    }

    function fireEvent(event, callback) {
        checkNonEmptyString("event", event);
        logger.info("Event fired, name: [" + event + "]");
        try {
            var filtered = filter(listeners, function(li) {
                return event === li.event;
            });
            filtered.forEach(function(li) {
                try {
                    li.func();
                } catch (e) {
                    logger.error("Event listener error," +
                            " event: [" + event + "]," +
                            " name: [" + li.name + "]", e);
                }
            });
        } catch (e) {
            return callOrThrow(callback, e);
        }
    }

    return {
        add: add,
        remove: remove,
        fireEvent: fireEvent
    };
});
