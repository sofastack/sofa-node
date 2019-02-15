'use strict';

const fs = require('mz/fs');
const path = require('path');
const mock = require('egg-mock');
const assert = require('assert');

describe('test/framework.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'example',
      framework: true,
    });
    return app.ready();
  });

  after(() => app.close());

  afterEach(mock.restore);

  it('should call sofa-rpc ok', async () => {
    await app.httpRequest()
      .get('/')
      .expect({
        code: 200,
        message: 'hello zongyu from sofa-node',
      });

    const data = await fs.readFile(path.join(app.config.baseDir, 'logs/framework-example/opentracing.log'), 'utf8');
    const spans = data.trim().split('\n').map(item => {
      return JSON.parse(item);
    });
    assert(spans.length === 3);
    assert(spans[0].traceId === spans[1].traceId);
    assert(spans[0].traceId === spans[2].traceId);

    assert(spans[0].name === 'rpc_server');
    assert(spans[0].component === 'egg');
    assert(spans[0].appname === 'framework-example');
    assert(spans[0]['span.kind'] === 'server');
    assert(spans[0]['rpc.url'] === 'com.alipay.sofa.rpc.protobuf.ProtoService:1.0');
    assert(spans[0]['rpc.method'] === 'echoObj');
    assert(spans[0]['rpc.result_code'] === '00');
    assert(spans[0]['rpc.request_size'] > 0);
    assert(spans[0]['rpc.response_size'] > 0);

    assert(spans[1].name === 'rpc_client');
    assert(spans[1].component === 'egg');
    assert(spans[1].appname === 'framework-example');
    assert(spans[1]['span.kind'] === 'client');
    assert(spans[1]['peer.service'] === 'com.alipay.sofa.rpc.protobuf.ProtoService:1.0');

    assert(spans[2].name === 'http_server');
    assert(spans[2].component === 'egg');
    assert(spans[2].appname === 'framework-example');
    assert(spans[2]['span.kind'] === 'server');
  });
});
