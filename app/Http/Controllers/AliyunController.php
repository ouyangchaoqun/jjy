<?php


namespace App\Http\Controllers;


use App\Libraries\ResponseLibrary;
use App\Models\PictureModel;
use App\Repositories\PictureTempRepository;
use App\Services\OssService;
use App\Services\PictureTempService;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Object_;

class AliyunController extends Controller
{
    /**
     * @SWG\Post(path="/aliyunapi/oss_getsetting",
     *   tags={"aliyunOSS"},
     *   summary="获取直传阿里云设置信息",
     *   description="",
     *   operationId="",
     *   produces={"application/xml", "application/json"},
     *   @SWG\Parameter(
     *     name="token",
     *     in="formData",
     *     description="token ",
     *     required=true,
     *     type="string",
     *     @SWG\Schema(ref="#/definitions/string"),
     *   ),
     *   @SWG\Response(response=200, description="successful operation"),
     * )
     * @param $token
     */
    public function getosssetting(Request $request, OssService $ossService)
    {
        $token = $request->input('token');
        $callbackUrl = env('ALIOSS_CALLBACK');
        $host = env('ALIOSS_DOMAIN');

        $id = $ossService->getAccessKeyId();
        $key = $ossService->getAccessKeySecret();

        $callback_param = array('callbackUrl' => $callbackUrl,
            'callbackBody' => 'filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}&host=' . $host . '&token=' . $token,
            'callbackBodyType' => "application/x-www-form-urlencoded");
        $callback_string = json_encode($callback_param);

        $base64_callback_body = base64_encode($callback_string);
        $now = time();
        $expire = 30; //设置该policy超时时间是30s. 即这个policy过了这个有效时间，将不能访问
        $end = $now + $expire;
        $expiration = gmt_iso8601($end);

        $dir = date('Y-m/d/', time());

        //最大文件大小.用户可以自己设置
        $maxsize = 1024 * 1024 * 4;
        $condition = array(0 => 'content-length-range', 1 => 0, 2 => $maxsize);
        $conditions[] = $condition;

        //表示用户上传的数据,必须是以$dir开始, 不然上传会失败,这一步不是必须项,只是为了安全起见,防止用户通过policy上传到别人的目录
        $start = array(0 => 'starts-with', 1 => '$key', 2 => $dir);
        $conditions[] = $start;


        $arr = array('expiration' => $expiration, 'conditions' => $conditions);
        //echo json_encode($arr);
        //return;
        $policy = json_encode($arr);
        $base64_policy = base64_encode($policy);
        $string_to_sign = $base64_policy;
        $signature = base64_encode(hash_hmac('sha1', $string_to_sign, $key, true));

        $response = array();
        $response['accessid'] = $id;
        $response['host'] = $host;
        $response['policy'] = $base64_policy;
        $response['signature'] = $signature;
        $response['expire'] = $end;
        $response['callback'] = $base64_callback_body;
        //这个参数是设置用户上传指定的前缀
        $response['dir'] = $dir;
        $response['now'] = $now;

        return ResponseLibrary::jsonSuccess($response);
    }

    /**aliyunoss上传回调
     * @param PictureTempService $service
     */
    public function osscallback(PictureTempService $service)
    {
        // 1.获取OSS的签名header和公钥url header
        $authorizationBase64 = "";
        $pubKeyUrlBase64 = "";
        /*
         * 注意：如果要使用HTTP_AUTHORIZATION头，你需要先在apache或者nginx中设置rewrite，以apache为例，修改
         * 配置文件/etc/httpd/conf/httpd.conf(以你的apache安装路径为准)，在DirectoryIndex index.php这行下面增加以下两行
            RewriteEngine On
            RewriteRule .* - [env=HTTP_AUTHORIZATION:%{HTTP:Authorization},last]
         * */
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $authorizationBase64 = $_SERVER['HTTP_AUTHORIZATION'];
        }
        if (isset($_SERVER['HTTP_X_OSS_PUB_KEY_URL'])) {
            $pubKeyUrlBase64 = $_SERVER['HTTP_X_OSS_PUB_KEY_URL'];
        }
        if ($authorizationBase64 == '' || $pubKeyUrlBase64 == '') {
            header("http/1.1 403 Forbidden");
            exit();
        }

        // 2.获取OSS的签名
        $authorization = base64_decode($authorizationBase64);

        // 3.获取公钥
        $pubKeyUrl = base64_decode($pubKeyUrlBase64);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $pubKeyUrl);

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); //不验证证书
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); //不验证证书

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        $pubKey = curl_exec($ch);

        if ($pubKey == "") {
            exit();
        }

        // 4.获取回调body
        $body = file_get_contents('php://input');

        // 5.拼接待签名字符串
        $authStr = '';
        $path = $_SERVER['REQUEST_URI'];
        $pos = strpos($path, '?');
        if ($pos === false) {
            $authStr = urldecode($path) . "\n" . $body;
        } else {
            $authStr = urldecode(substr($path, 0, $pos)) . substr($path, $pos, strlen($path) - $pos) . "\n" . $body;
        }

        // 6.验证签名
        $ok = openssl_verify($authStr, $authorization, $pubKey, OPENSSL_ALGO_MD5);
        if ($ok == 1) {
            header("Content-Type: application/json");
            $result = array();
            foreach (explode('&', $body) as $item) {
                $item_data = explode('=', $item);
                if (count($item_data) == 2) {
                    $result[$item_data[0]] = urldecode($item_data[1]);
                }
            }
            $this->format_osscallback($result, $service);
        } else {
            //header("http/1.1 403 Forbidden");
            exit();
        }
    }

    private function format_osscallback($data, PictureTempService $service)
    {
        //callbackBody
        $fileurl = $data['host'] . $data['filename'];
        $size = intval($data['size']);
        $width = intval($data['width']);
        $height = intval($data['height']);
        $token = $data['token'];

        $picdata = array();
        $picinfos[] = array(
            'path' => $fileurl,
            'width' => $width,
            'height' => $height
        );

        $picid = $service->add_newid(array(
            'path' => $fileurl,
            'size' => $size,
            'width' => $width,
            'height' => $height,
            'addtime' => time(),
            'token' => $token
        ));

        if (empty($picdata)) {
            $picdata = $picinfos[0];
        }
        $picdata['id'] = $picid;
        $picdata['pics'] = $picinfos;

        $data = array("state" => 1, "data" => $picdata);
        echo json_encode($data);
    }
}