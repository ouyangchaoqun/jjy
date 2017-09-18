<?php
if (!function_exists('is_floder_link')) {
    function is_floder_link($isFloder, $url, $controller_name = "admin")
    {
        if ($isFloder) {
            echo $url;
        } else {
            echo '/' . $controller_name . '/' . $url;
        }
    }
}

if (!function_exists('is_menu_on')) {
    function is_menu_on($curr_menu, $menu)
    {
        if ($curr_menu == $menu) {
            echo "class='current'";
        }
    }
}


if (!function_exists('is_menu_in')) {
    function is_menu_in($curr_menu, $menus)
    {
// 		print_r($curr_menu);

// 		print_r($menus);
// 		print_r(strpos($curr_menu,$menus ));
        if (strpos($menus, $curr_menu) !== false) {
            echo "class='current'";
        }

    }
}


/**
 * 截取字符串长度
 */
if (!function_exists('leftstr')) {
    function leftstr($str = '', $len, $laststr = '..')
    {
        $str = strip_tags($str);

        if ($str != '') {
            if (mb_strlen($str) > $len) {
                return mb_substr($str, 0, $len) . $laststr;
            } else {
                return $str;
            }
        } else {
            return '';
        }
    }
}

if (!function_exists('time_formate')) {
    function time_formate($time, $key)
    {
        if (is_numeric($time)) {
            return standard_date($key, $time);
        } else {
            $numtime = mysql_to_unix($time);
            return standard_date($key, $numtime);
        }
    }
}

if (!function_exists('no_data')) {
    function no_data($language = 1)
    {
        if ($language == 1) {
            return "暂无数据";
        } elseif ($language == 2) {
            return "Sorry,Nothing for Search！";
        }
    }
}

if (!function_exists('get_pic_url')) {
    function get_pic_url($pic = "", $type = 1)
    {
        if ($pic == "") {
            return "/images/no_pic.png";
        }
        if (startsWith($pic, "/jinsusi/resource")) {
            return $pic;
        } else if (startsWith($pic, "http://")) {
            return $pic;
        } else {
            $pic_url = "/uploadfiles/" . SITENAME;
            switch ($type) {
                case 1 :
                    $pic_url .= "/thumb/";
                    break;
                case 2 :
                    $pic_url .= "/middle/";
                    break;
                case 3 :
                    $pic_url .= "/large/";
                    break;
                case 4 :
                    $pic_url .= "/source/";
                    break;
                default :
                    ;
                    break;
            }
            $pic_url .= $pic;
            return $pic_url;
        }
        return "/images/no_pic.png";
    }
}
if(!function_exists('startsWith')) {
    function startsWith($str, $needle)
    {
        return $needle === "" || strrpos($str, $needle, -strlen($str)) !== FALSE;
    }
}
if(!function_exists('endsWith')) {
    function endsWith($str, $needle)
    {
        return $needle === "" || (($temp = strlen($str) - strlen($needle)) >= 0 && strpos($str, $needle, $temp) !== FALSE);
    }
}

if(!function_exists('get_zh_first')) {
    function get_zh_first($str)
    {
        if (!isset($str) || $str == null || empty($str)) {
            return '#';
        }
        $str = $str . '';
        $firstchar_ord = ord(strtoupper($str{0}));
        if (($firstchar_ord >= 65 and $firstchar_ord <= 91) or ($firstchar_ord >= 48 and $firstchar_ord <= 57)) return $str{0};
        //$s = iconv("UTF-8","GBK", $str);
        $s = mb_convert_encoding($str, "gbk", "UTF-8");
        if ($s == null || empty($s)) {
            return '#';
        }
        $asc = ord($s{0}) * 256 + ord($s{1}) - 65536;
        if ($asc >= -20319 and $asc <= -20284) return "A";
        if ($asc >= -20283 and $asc <= -19776) return "B";
        if ($asc >= -19775 and $asc <= -19219) return "C";
        if ($asc >= -19218 and $asc <= -18711) return "D";
        if ($asc >= -18710 and $asc <= -18527) return "E";
        if ($asc >= -18526 and $asc <= -18240) return "F";
        if ($asc >= -18239 and $asc <= -17923) return "G";
        if ($asc >= -17922 and $asc <= -17418) return "H";
        if ($asc >= -17417 and $asc <= -16475) return "J";
        if ($asc >= -16474 and $asc <= -16213) return "K";
        if ($asc >= -16212 and $asc <= -15641) return "L";
        if ($asc >= -15640 and $asc <= -15166) return "M";
        if ($asc >= -15165 and $asc <= -14923) return "N";
        if ($asc >= -14922 and $asc <= -14915) return "O";
        if ($asc >= -14914 and $asc <= -14631) return "P";
        if ($asc >= -14630 and $asc <= -14150) return "Q";
        if ($asc >= -14149 and $asc <= -14091) return "R";
        if ($asc >= -14090 and $asc <= -13319) return "S";
        if ($asc >= -13318 and $asc <= -12839) return "T";
        if ($asc >= -12838 and $asc <= -12557) return "W";
        if ($asc >= -12556 and $asc <= -11848) return "X";
        if ($asc >= -11847 and $asc <= -11056) return "Y";
        if ($asc >= -11055 and $asc <= -10247) return "Z";
        return '#';
    }
}

if(!function_exists('emoji_encode')) {
    /**
     *编码emoji表情
     * @param $str
     * @return mixed|string
     */
    function emoji_encode($str)
    {
        if (!is_string($str)) return $str;
        if (!$str || $str == 'undefined') return '';

        $text = json_encode($str); //暴露出unicode
        $text = preg_replace_callback("/(\\\u[ed][0-9a-f]{3})/i", function ($str) {
            return addslashes($str[0]);
        }, $text); //将emoji的unicode留下，其他不动，这里的正则比原答案增加了d，因为我发现我很多emoji实际上是\ud开头的，反而暂时没发现有\ue开头。
        return json_decode($text);
    }
}

if(!function_exists('emoji_decode')) {
    /**
     * 解码emoji表情
     */
    function emoji_decode($str)
    {
        $text = json_encode($str); //暴露出unicode
        $text = preg_replace_callback('/\\\\\\\\/i', function ($str) {
            return '\\';
        }, $text); //将两条斜杠变成一条，其他不动
        return json_decode($text);
    }
}

/**生成guid
 * @return string
 */
if(!function_exists('guid')) {
    function guid($hyphen = '-')
    {
        if (function_exists('com_create_guid')) {
            return com_create_guid();
        } else {
            mt_srand((double)microtime() * 10000);//optional for php 4.2.0 and up.
            $charid = strtoupper(md5(uniqid(rand(), true)));

            $uuid = substr($charid, 0, 8) . $hyphen
                . substr($charid, 8, 4) . $hyphen
                . substr($charid, 12, 4) . $hyphen
                . substr($charid, 16, 4) . $hyphen
                . substr($charid, 20, 12);
            return $uuid;
        }
    }
}

/**
 * 微信大头像转换成小头像
 */
if(!function_exists('wx_small_face')) {
    function wx_small_face($face = '')
    {
        return preg_replace("/\/0$/is", "/132", $face);
    }
}

if (!function_exists('is_mobile')) {
    function is_mobile($str)
    {
        if (preg_match("/^1[34578]{1}\d{9}$/", $str)) {
            return true;
        } else {
            return false;
        }
    }
}

if( !function_exists('is_date') ) {
    function is_date($str)
    {
        if (preg_match("/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/", $str, $parts)) {
            if (checkdate($parts[2], $parts[3], $parts[1])) {
                return true;
            }
        }
        return false;
    }
}



