/**
 * @api {post} /wom/livestream 创建
 * @apiVersion 0.1.0
 * @apiName CreateLiveStream
 * @apiGroup LiveStream
 *
 * @apiParam {Object} source 待创建的直播流媒体源信息.
 * @apiParam {string} source.name 待创建的直播流媒体源名称.
 * @apiParam {string} performer_ep.protocol 待创建的直播流媒体源的类型，目前仅支持创建类型为rtspclient的直播流媒体源.
 * @apiParam {string} performer_ep.url 为待创建的直播流媒体源提供媒体流的地址.
 *
 * @apiExample Example usage:
 * curl -X POST http://localhost:3030/wom/livestream
 * -H 'content-type: application/json'
 * -d '{ 
 *		"source" : {
 *			"name" : "endpoint1",
 *			"protocol" : "rtspclient",
 *			"url" : "rtsp://127.0.0.1/test"
 *		}
 *	}'
 *
 * @apiSuccess {String}   id            The unique LiveStream-ID.
 *
 * @apiError RequestError 请求参数错误.
 *
 * @apiErrorExample RequestError (example):
 *     HTTP/1.1 400 Request Error
 *     {
 *       "error": "RequestError"
 *     }
 * 
 * @apiError InternalError 服务器内部错误.
 *
 * @apiErrorExample InternalError (example):
 *     HTTP/1.1 500 Internal Error
 *     {
 *       "error": "InternalError"
 *     }
 */
function createLiveStream() { return; }

/**
 * @api {delete} /wom/livestream 删除
 * @apiVersion 0.1.0
 * @apiName DeleteLiveStream
 * @apiGroup LiveStream
 * @apiPermission none
 *
 *
 * @apiParam {String} id The unique LiveStream-ID.
 *
 * @apiExample Example usage:
 * curl -X DELETE 'http://localhost:3030/wom/livestream?id=8edb8984b49f434e8e6e907138389d1a'
 *
 * @apiSuccess {String} OK      删除成功.
 *
 * @apiError LiveStreamNotFound   The <code>id</code> of the LiveStream was not found.
 *
 * @apiErrorExample LiveStreamNotFound (example):
 *     HTTP/1.1 400 LiveStream Not Found
 *     {
 *       "error": "LiveStreamNotFound"
 *     }
 *
 * @apiError InternalError 服务器内部错误.
 *
 * @apiErrorExample InternalError (example):
 *     HTTP/1.1 500 Internal Error
 *     {
 *       "error": "InternalError"
 *     }
 *
 */
function deleteLiveStream() { return; }

/**
 * @api {post} /wom/livestream.audience 添加观众
 * @apiVersion 0.1.0
 * @apiName AddLiveStreamAudience
 * @apiGroup LiveStream
 * @apiPermission none
 *
 *
 * @apiParam {String} id The unique LiveStream-ID.
 * @apiParam {Object} audience 需要添加的观众信息.
 * @apiParam {String} audience.name 需要添加的观众名称.
 * @apiParam {String} audience.protocol 需要添加的观众端点类型，目前仅支持添加端点类型为rtspserver的观众.
 * @apiParam {String} audience.path 添加端点类型为rtspserver的观众所挂载的路径.
 *
 * @apiExample Example usage:
 * curl -X POST http://localhost:3030/wom/livestream.audience 
 * -H 'content-type: application/json' 
 * -d '{
 *		"id" : "8edb8984b49f434e8e6e907138389d1a",
 *		"audience" : {
 *			"name" : "endpoint2",
 *			"protocol" : "rtspserver",
 *			"path" : "/test_server"
 *		}
 *	   }'
 *
 * @apiSuccess {String} id      The unique Audience-ID.
 *
 * @apiError LiveStreamNotFound   The <code>id</code> of the LiveStream was not found.
 *
 * @apiErrorExample LiveStreamNotFound (example):
 *     HTTP/1.1 400 LiveStream Not Found
 *     {
 *       "error": "LiveStreamNotFound"
 *     }
 *
 * @apiError InternalError 服务器内部错误.
 *
 * @apiErrorExample InternalError (example):
 *     HTTP/1.1 500 Internal Error
 *     {
 *       "error": "InternalError"
 *     }
 */
function addLiveStreamAudience() { return; }

/**
 * @api {delete} /wom/livestream.audience 删除观众
 * @apiVersion 0.1.0
 * @apiName RemoveLiveStreamAudience
 * @apiGroup LiveStream
 * @apiPermission none
 *
 * @apiParam {String} livestreamId The LiveStream-ID.
 * @apiParam {String} audienceId The Audience-ID.
 *
 * @apiExample Example usage:
 * curl -X DELETE 'http://localhost:3030/wom/livestream.audience?livestreamId=8edb8984b49f434e8e6e907138389d1a&audienceId=8edb8984b49f434e8e6e907138389d1b'
 *
 * @apiSuccess {String} OK      删除成功.
 *
 * @apiError AudienceNotFound   The <code>audienceId</code> of the Audience was not found.
 *
 * @apiErrorExample AudienceNotFound (example):
 *     HTTP/1.1 400 Audience Not Found
 *     {
 *       "error": "AudienceNotFound"
 *     }
 *
 * @apiError LiveStreamNotFound   The <code>livestreamId</code> of the LiveStream was not found.
 *
 * @apiErrorExample LiveStreamNotFound (example):
 *     HTTP/1.1 400 LiveStream Not Found
 *     {
 *       "error": "LiveStreamNotFound"
 *     }
 *
 * @apiError InternalError 服务器内部错误.
 *
 * @apiErrorExample InternalError (example):
 *     HTTP/1.1 500 Internal Error
 *     {
 *       "error": "InternalError"
 *     } 
 */
function removeLiveStreamAudience() { return; }