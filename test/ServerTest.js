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
    "wilton-mobile/httpClient",
    "wilton-mobile/Logger",
    "wilton-mobile/Server",
    "./support/assert",
    "./support/testDir"
], function(module, httpClient, Logger, Server, assert, testDir) {
    "use strict";

    print("test: Server");
    Logger.disableLabel("wilton-mobile/Server");

    var server = null;

    // check random port

    server = new Server({
        tcpPort: 0
    });
    var port1 = server.getTcpPort();
    server.stop();
    server = new Server({
        tcpPort: 0
    });
    var port2 = server.getTcpPort();
    assert(port1 !== port2);
    server.stop();

    // start with document roots


    server = new Server({
        hostname: "127.0.0.1",
        tcpPort: 8080,
        documentRoot: {
            resource: "/droot",
            dirPath: testDir + "data/docroot",
            mimeTypes: {}
        }
    });

    var resp1 = httpClient.sendRequest("http://127.0.0.1:8080/droot1/foo.txt");
    assert.equal(resp1.responseCode, 200);
    assert.equal(resp1.data, "foo");

    var resp2 = httpClient.sendRequest("http://127.0.0.1:8080/droot2/baz.txt");
    assert.equal(resp2.responseCode, 200);
    assert.equal(resp2.data, "baz");

    server.stop();

});
