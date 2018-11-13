'use strict';

const mock = require('egg-mock');

describe('test/healthy.test.js', () => {
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

  it('should be healthy', () => {
    return app.httpRequest()
      .get('/healthy/readiness')
      .expect('OK')
      .expect(200);
  });
});
