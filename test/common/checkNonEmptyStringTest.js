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
    "wilton-mobile/common/checkNonEmptyString"
], function(assert, checkNonEmptyString) {
    "use strict";

    print("test: common/checkNonEmptyString");

    checkNonEmptyString("foo", "bar");
    checkNonEmptyString(null, "bar");
    assert.throws(function() { checkNonEmptyString(); });
    assert.throws(function() { checkNonEmptyString("foo"); });
    assert.throws(function() { checkNonEmptyString("foo", ""); });

});
