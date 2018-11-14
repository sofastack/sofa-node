'use strict';

exports.rpc = {
  enable: true,
  package: 'egg-rpc-base',
};

exports.sofaRpc = {
  enable: true,
  package: 'egg-sofa-rpc',
};

exports.rest = {
  enable: false,
  package: 'egg-rest',
};

exports.sofaAntvip = {
  enable: false,
  package: 'egg-sofa-antvip',
};

exports.sofaDsr = {
  enable: false,
  package: 'egg-sofa-dsr',
};

exports.opentracing = {
  enable: true,
  package: 'egg-opentracing',
};

exports.zipkin = {
  enable: false,
  package: 'egg-opentracing-zipkin',
};

exports.sofaTracer = {
  enable: true,
  package: 'egg-sofa-tracer',
};

exports.prometheus = {
  enable: false,
  package: 'egg-prometheus',
};

exports.lookout = {
  enable: false,
  package: 'egg-lookout',
};

exports.healthy = {
  enable: true,
  package: 'egg-healthy',
};
