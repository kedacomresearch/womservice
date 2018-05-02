const app = require('../../src/app');
const rp = require('request-promise');
const url = require('url');
const webstreamer = require('webstreamer');
const chai = require('chai');
const assert = chai.assert;

const port = app.get('port') || 3030;
const getUrl = pathname => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
});

async function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve();
    }, timeout);
  });
}

describe('\'livestream\' service', () => {
  before(function(done) {
    this.server = app.listen(port);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    webstreamer.Terminate();
    this.server.close(done);
  });

  describe('livestream service rtsp analyze', function () {
    // this.timeout(12000);
    let rtsp_test_server_app,
      analyzer_app;
    before(async function() {
      // initialize rtsp test server app
      rtsp_test_server_app = new webstreamer.RTSPTestServer('rtsp_test_server');
      await rtsp_test_server_app.initialize();
      await rtsp_test_server_app.startup();

      // initialize analyzer app
      analyzer_app = new webstreamer.RTSPAnalyzer('rtsp_test_analyzer', 'rtsp://127.0.0.1/test_server');
      await analyzer_app.initialize();
      analyzer_app.on('spectrum', function (data) {
        let obj = JSON.parse(data.toString('utf8'));
        let magnitude = obj.magnitude;
        analyzer_app.calc_band_number(magnitude);
      });
      analyzer_app.on('multifilesink', async function (data) {
        analyzer_app.store_image(data);
      });
    });

    after(async function() {
      await analyzer_app.terminate();
      await analyzer_app.clean();

      await rtsp_test_server_app.stop();
      await rtsp_test_server_app.terminate();
    });

    let audience_ep = {
      name: 'endpoint2',
      protocol: 'rtspserver', // rtspclient/rtspserver
      path: '/test_server'
    };
    let livestreamId,audienceId;

    it('create livestream and return id of the livestream', () => {
      return rp({
        method: 'POST',
        url: getUrl('wom/livestream'),
        body : {
          source: {
            name: 'endpoint1',
            protocol: 'rtspclient', // rtspclient/rtspserver
            url: 'rtsp://127.0.0.1/test'
          }
        },
        json: true
      }).then((res) => {
        livestreamId = res.id;
        if(!livestreamId) {
          assert.fail();
        }
      });
    });

    it('add livestream audience', () => {
      return rp({
        method: 'POST',
        url: getUrl('wom/livestream.audience'),
        body : {
          id: livestreamId,
          audience: audience_ep
        },
        json: true
      }).then((res) => {
        audienceId = res.id;
        if(!audienceId) {
          assert.fail();
        }
      });
    });

    it('rtsp analyze', async function(){
      this.timeout(0);

      await sleep(1000);

      try {
        await analyzer_app.startup();
      } catch (err) {
        throw err;
      }


      try {
        await webstreamer.utils.poll(() => {
          if((analyzer_app.audio_passed >= 3) &&
            (analyzer_app.images.length >= 10))
            return true;
          else
            return false;
        }, 100, 10000);
      } catch (err) {
        throw err;
      }

      let image_res;
      try {
        image_res = await analyzer_app.analyze_image();
      } catch (err) {
        throw err;
      }

      try {
        await analyzer_app.stop();
      } catch (error) {
        throw new Error('video analyze failed: ' + error);
      }

      image_res.forEach((value) => {
        assert.closeTo(value.time, value.ms, 10, 'ocr recognize time');
      });
    });

    it('remove livestream audience', () => {
      return rp.del({
        url: getUrl('wom/livestream.audience'),
        qs : {
          audienceId: audienceId,
          livestreamId: livestreamId
        }
      }).then((res) => {
        assert.equal('{"OK":"success"}', res);
      });
    });

    it('delete livestream', () => {
      return rp.del({
        url: getUrl('wom/livestream'),
        qs : {
          id: livestreamId
        }
      }).then((res) => {
        assert.equal('{"OK":"success"}', res);
      });
    });

  });

});
