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
    "../../fs/exists",
    "../../fs/mkdir",
    "../../fs/rmdir",
    "../../fs/writeFile",
    "../support/assert",
    "../support/scratchDir"
], function(exists, mkdir, rmdir, writeFile, assert, scratchDir) {
    "use strict";

    print("test: fs/rmdir");

    var dir = scratchDir + "rmdirTest/";
    mkdir(dir);
    assert(exists(dir));
    mkdir(dir + "dir1");
    writeFile(dir + "dir1/foo.txt", "foo");
    rmdir(dir);
    assert(!exists(dir));

});
