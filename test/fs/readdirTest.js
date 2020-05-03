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
    "../../common/includes",
    "../../fs/readdir",
    "../support/assert",
    "../support/testDir"
], function(includes, readdir, assert, testDir) {
    "use strict";

    print("test: fs/readdir");

    var list = readdir(testDir + "data/docroot1");
    assert(list instanceof Array);
    assert.equal(2, list.length);
    assert(includes(list, "foo.txt"));
    assert(includes(list, "bar.txt"));

});
