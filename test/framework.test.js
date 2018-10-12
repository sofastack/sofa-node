'use strict';

const mock = require('egg-mock');

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

  it('should call sofa-rpc ok', () => {
    return app.httpRequest()
      .get('/')
      .expect({
        code: 200,
        message: 'hello zongyu from sofa-node',
      });
  });
});
