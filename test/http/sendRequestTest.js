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
    // libs
    "../../fs/mkdir",
    "../../fs/readFile",
    "../../http/sendRequest",
    "../../server/startServer",
    "../../server/stopServer",
    // support
    "../support/assert",
    "../support/scratchDir",
    "../support/testDir"
], function(
        mkdir, readFile, sendRequest, startServer, stopServer, // libs
        assert, scratchDir, testDir // support
) {
    "use strict";

    print("test: http/sendRequest");

    var dir = scratchDir + "sendRequestTest/";
    mkdir(dir);

    startServer({
        ipAddress: "127.0.0.1",
        tcpPort: 8080,
        documentRoots: [{
            resource: "/droot1",
            dirPath: testDir + "data/docroot1"
        },{
            resource: "/droot2",
            dirPath: testDir + "data/docroot2"
        }],
        httpPostHandler: {
            module: "wilton-mobile/test/http/_postHandler"
        }
    });

    // GET

    var resp1 = sendRequest("http://127.0.0.1:8080/droot1/foo.txt");
    assert.equal(resp1.responseCode, 200);
    assert.equal(resp1.data, "foo");

    var resp2 = sendRequest("http://127.0.0.1:8080/droot2/baz.txt", {
        meta: {
            responseDataFilePath: dir + "resp.txt"
        }
    });
    assert.equal(resp2.responseCode, 200);
    var resp2Data = readFile(dir + "resp.txt");
    assert.equal(resp2Data, "baz");

    // POST

    var resp3 = sendRequest("http://127.0.0.1:8080/api", {
        data: "boo"
    });
    assert.equal(resp3.responseCode, 200);
    assert.equal(resp3.data, "boo");

    stopServer();

});
