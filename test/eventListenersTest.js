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
    "wilton-mobile/eventListeners",
    "wilton-mobile/Logger",
    "./support/assert"
], function(eventListeners, Logger, assert) {
    "use strict";

    print("test: eventListeners");
    Logger.disableLabel("wilton-mobile/eventListeners");

    // validation

    assert.throws(function() { eventListeners.add(); });
    assert.throws(function() { eventListeners.add({}); });
    assert.throws(function() { eventListeners.add({
            name: "foo",
            event: "bar",
            func: null
    }); });
    assert.throws(function() { eventListeners.remove(null); });
    assert.throws(function() { eventListeners.fireEvent(null); });

    // calls

    var callCount = 0;
    
    eventListeners.add({
        name: "foo",
        event: "bar",
        func: function() {
            callCount += 1;
        }
    });
    eventListeners.fireEvent("bar");
    eventListeners.fireEvent("baz");
    assert.equal(callCount, 1);

    eventListeners.remove("foo");
    eventListeners.fireEvent("bar");
    assert.equal(callCount, 1);
});
