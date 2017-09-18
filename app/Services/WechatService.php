<?php

namespace App\Services;

use EasyWeChat\Foundation\Application;
use EasyWeChat\Support\Log as WeChatLog;

class WechatService
{
    const FIRST_SUBSCRIBE = '亲，期待你很久了，日子有大有小，心情冷暖共知。置顶本号，随时记录和查看心情。';
    const SUBSCRIBE_AGAIN = '欢迎回来。';
    const UNSUBSCRIBE = '讲不出再见。';
    const DEFAULT_REPLY='已收到你的留言，谢谢反馈！';

    private $userservice;
    private $app;

    function __construct(Application $wechat,UserService $service)
    {
        $this->app = $wechat;
        $this->userservice = $service;
    }

    /**接口
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function run()
    {
        $server = $this->app->server;
        $this->messageHandler($server);
        try {
            $response = $server->serve();
            return $response;
        }catch (\Exception $e){
            WeChatLog::error('WeChat Error:'.$e->getMessage());
        }
    }

    /**发送客服消息
     * @param $content
     * @param $openId
     * @return bool
     */
    public function sendStaff($content,$openId)
    {
        $message = new Text(['content' => $content]);
        return $this->app->staff->message($message)->to($openId)->send();
    }

    public function getUser($openId)
    {
        $userService = $this->app->user;
        return $userService->get($openId);
    }

    public function getUserList($openIds)
    {
        $userService = $this->app->user;
        return $userService->batchGet($openIds);
    }

    public function getJsSign($url,$apilist,$debug=false)
    {
        $jsService = $this->app->js;
        $jsService->setUrl($url);
        return $jsService->config($apilist, $debug);
    }

    /**消息处理
     * @param $server
     */
    private function messageHandler($server)
    {
        $server->setMessageHandler(function ($message) {
            switch ($message->MsgType) {
                case 'event':
                    return $this->onEvent($message);
                    break;
                case 'text':
                    return $this->onText($message);
                    break;
                case 'image':
                    return $this->onImage($message);
                    break;
                case 'voice':
                    return $this->onVoice($message);
                    break;
                case 'video':
                    return $this->onVideo($message);
                    break;
                case 'shortvideo':
                    return $this->onShortVideo($message);
                    break;
                case 'location':
                    return $this->onLocationMessage($message);
                    break;
                case 'link':
                    return $this->onLink($message);
                    break;
                default:
                    return $this->onUnKnow($message);
                    break;
            }
            return $this->defaultReply($message);
        });
    }

    private function getUserOpenIdFormMessage($message)
    {
        //$message->ToUserName;    //接收方帐号（该公众号 ID）
        //$message->FromUserName;  //发送方帐号（OpenID, 代表用户的唯一标识）
        //$message->CreateTime;    //消息创建时间（时间戳）
        //$message->MsgId;         //消息 ID（64位整型）
        return $message->FromUserName;
    }

    private function onText($message)
    {
        return $this->defaultReply($message);
    }

    private function onImage($message)
    {
        return $this->defaultReply($message);
    }

    private function onVoice($message)
    {
        return $this->defaultReply($message);
    }

    private function onVideo($message)
    {
        return $this->defaultReply($message);
    }

    private function onShortVideo($message)
    {
        return $this->defaultReply($message);
    }

    /**发送地理位置
     * @param $message
     * @return string
     */
    private function onLocationMessage($message)
    {
        return $this->defaultReply($message);
    }

    private function onLink($message)
    {
        return $this->defaultReply($message);
    }

    private function onUnKnow($message)
    {
        return $this->defaultReply($message);
    }

    /**事件回复
     * @param $message
     * @return mixed|string
     */
    private function onEvent($message)
    {
        switch ($message->Event) {
            case 'subscribe':
                return $this->onSubscribe($message);
                break;
            case  'unsubscribe':
                $this->onUnSubscribe($message);
            case  'SCAN':
                return $this->onScan($message, false);
            case 'LOCATION':
                return $this->onLocation($message);
            case 'CLICK':
                return $this->onClick($message);
                break;
            case 'VIEW':
                return $this->onView($message);
                break;
        }
        return null;
    }

    /**
     * @param $message
     * @return string
     */
    private function onUnSubscribe($message)
    {
        return $this::UNSUBSCRIBE;
    }

    /**订阅事件
     * @param $message
     * @return string
     */
    private function onSubscribe($message)
    {
        //

        //扫描带参数二维码
        if (isset($message->EventKey))
        {
            return $this->onScan($message, true);
        }
        return $this::FIRST_SUBSCRIBE;
    }

    /**扫描带参数二维码
     * @param $message
     * @param bool $isnewSubscribe 是否是新关注用户
     * @return mixed|string
     */
    private function onScan($message, $isnewSubscribe = false)
    {
        $eventkey = $message->EventKey;   //事件KEY值，比如：qrscene_123123，qrscene_为前缀，后面为二维码的参数值
        $ticket = $message->Ticket;      //二维码的 ticket，可用来换取二维码图片

        return $this->eventReply($message);
    }

    /**上报地理位置事件
     * @param $message
     * @return string
     */
    private function onLocation($message)
    {
        return $this->eventReply($message);
    }

    /**点击菜单拉取消息时的事件推送
     * @param $message
     * @return mixed|string
     */
    private function onClick($message)
    {
        return $this->eventReply($message);
    }

    /**点击菜单跳转链接时的事件推送
     * @param $message
     * @return mixed|string
     */
    private function onView($message)
    {
        return $this->eventReply($message);
    }

    /**默认返回
     * @return string
     */
    private function defaultReply($message)
    {
        return $this::DEFAULT_REPLY;
    }
}