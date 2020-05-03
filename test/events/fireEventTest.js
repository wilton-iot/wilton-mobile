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
    "../../events/addEventListener",
    "../../events/fireEvent",
    "../../events/removeEventListener",
    "../../Logger",
    "../support/assert"
], function(addEventListener, fireEvent, removeEventListener, Logger, assert) {
    "use strict";

    print("test: events/removeEventListener");
    Logger.disableLabel("wilton-mobile/events/fireEvent");

    // validation

    assert.throws(function() { addEventListener(); });
    assert.throws(function() { addEventListener({}); });
    assert.throws(function() { addEventListener({
            name: "foo",
            event: "bar",
            func: null
    }); });
    assert.throws(function() { removeEventListener(null); });
    assert.throws(function() { fireEvent(null); });

    // calls

    var callCount = 0;
    
    addEventListener({
        name: "foo",
        event: "bar",
        func: function(num) {
            assert.equal(typeof(num), "number");
            callCount += num;
        }
    });
    fireEvent("bar", [1]);
    fireEvent("baz", [1]);
    assert.equal(callCount, 1);

    removeEventListener("foo");
    fireEvent("bar", [1]);
    assert.equal(callCount, 1);
});
