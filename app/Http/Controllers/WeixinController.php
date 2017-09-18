<?php

namespace App\Http\Controllers;

use App\Services\ApiService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class WeixinController extends Controller
{
    function __construct()
    {

    }

    public function index(Request $request)
    {
        $appid = env('WECHAT_APPID');
        $callback = env('WECHAT_CALL_BACK_URL');
        $backurl = $request->input('reurl');
        if (empty($backurl)) {
            $backurl = 'index';
        } else {
            $backurl = urlencode(urldecode($backurl));
        }
        $url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={$appid}&redirect_uri=" . urlencode($callback)
            . "&response_type=code&scope=snsapi_base&state={$backurl}#wechat_redirect";

        return redirect($url);
    }

    /**
     * 微信授权中转页
     */
    public function jump(Request $request, ApiService $apiService)
    {
        $gourl = '/';
        $state = $request->input('state');
        $code = $request->input('code');
        if (!empty($state) && $state != 'index') {
            $gourl = urldecode($state);
        }

        $apiurl = "/wei/xin/get/user?code={$code}";
        $data = $apiService->execFull($request, '', $apiurl, 'GET');

        try {
            if (!empty($data)) {
                $obj = json_decode($data, true);
                if ($obj !== false) {
                    if ($obj['status'] == 1) {
                        $this->setUserInfo($obj['data']);
                        var_dump($obj['data']['id']);
                        $apiService->login($obj['data']['id']);
                    }
                }
            }
        } catch (\Exception $e) {

        } finally {
            return redirect($gourl);
        }
    }


    /**
     * 需要授权
     */

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Laravel\Lumen\Http\Redirector
     */
    public function pub(Request $request)
    {
        $appid = env('WECHAT_APPID');
        $callback = env('WECHAT_CALL_BACK_URL_PUB');
        $backurl = $request->input('reurl');
        if (empty($backurl)) {
            $backurl = 'index';
        } else {
            $backurl = urlencode(urldecode($backurl));
        }
        $url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={$appid}&redirect_uri=" . urlencode($callback)
            . "&response_type=code&scope=snsapi_userinfo&state={$backurl}#wechat_redirect";

        return redirect($url);
    }

    public function pubjump(Request $request, ApiService $apiService)
    {
        $gourl = '/';
        $state = $request->input('state');
        $code = $request->input('code');
        if (!empty($state) && $state != 'index') {
            $gourl = urldecode($state);
        }
        $apiurl = "/wei/xin/get/user?code={$code}";
        $data = $apiService->execFull($request, '', $apiurl, 'GET');

        try {
            if (!empty($data)) {
                $obj = json_decode($data, true);
                if ($obj !== false) {
                    if ($obj['status'] == 1) {
                        $this->setUserInfo($obj['data']);
                    } else {
                        //
                        $gourl = '/guest#/me/aboutUs';
                    }
                }
            }
        } catch (\Exception $e) {

        } finally {
            return redirect($gourl);
        }
    }

}