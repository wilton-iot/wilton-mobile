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
    "wilton-mobile/test/assert",
    "wilton-mobile/Logger"
], function(assert, Logger) {
    "use strict";

    print("test: common/Logger");

    // validation

    assert.throws(function() { new Logger(); });
    assert.throws(function() { new Logger(""); });
    assert.throws(function() { new Logger("foo", "bar"); });

    // printer

    var calledTimes = 0;
    var logger = new Logger("foo", function(st, arg2) {
        calledTimes += 1;
        assert.equal(typeof(st), "string");
        assert.equal(typeof(arg2), "undefined");
        assert(-1 !== st.indexOf("foo"));
    });
    logger.info("bar");
    logger.warn([42]);
    logger.error(new Error("baz"));
    assert.equal(calledTimes, 3);

    // disable label
    Logger.disableLabel("foo");
    logger.info("boo");
    assert.equal(calledTimes, 3);
});
