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
    "./checkProps",
    "./listProps"
], function(checkProps, listProps) {
    "use strict";

    return function(obj, prop, type) {
        if ("object" !== typeof(obj) || null === obj) {
            throw new Error("'checkPropType' error: specified object is invalid, value: [" + obj + "]");
        }
        if ("string" !== typeof(prop) || 0 === prop.length) {
            throw new Error("'checkPropType' error: specified prop is invalid, value: [" + prop + "]");
        }
        if ("string" !== typeof(type) || 0 === type.length) {
            throw new Error("'checkPropType' error: specified type is invalid, value: [" + type + "]");
        }
        checkProps(obj, [prop]);
        var actual = typeof(obj[prop]);
        if (type !== actual) {
            throw new Error("Invalid attribute specified, name: [" + prop + "]," +
                    " required type: [" + type + "], actual type: [" + actual + "]," +
                    " object: [" + listProps(obj) + "]");
        }
    };
});

