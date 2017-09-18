<?php


namespace App\Http;

use Illuminate\Http\Request;

class MyRequest
{
    private $request;

    const MY_REQUEST_USERKEY = 'loginuser';

    function __construct(Request $request)
    {
        $this->request = $request;
    }

    public static function setUser(Request $request, $user)
    {
        $request->attributes->add(array(MyRequest::MY_REQUEST_USERKEY => $user));
    }

    public function getUser()
    {
        return $this->request->get($this::MY_REQUEST_USERKEY);
    }
}