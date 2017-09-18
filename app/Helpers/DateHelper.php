<?php

if (!function_exists('date_time')) {
    function date_time($time = null, $format = "DATE_TIME")
    {
        if (empty($time)) {
            $time = time();
        }
        $formats = array(
            'FULL_DAY' => 'Y-m-d',
            'DATE_TIME' => 'Y-m-d H:i:s',
            'TIME' => 'H:i:s',
            'DAY' => 'm-d',
            'FULL_DAY_CN' => 'Y年m月d日',
            'DAY_R' => 'Y-n-j',
            'DAY_CN' => 'm月d日',
            'DAY_CN_N' => 'm月d',
            'ONLY_DAY' => 'd',
            'H_M' => 'H:i',
            'Week' => 'w'
        );
        if ($format == 'Week') {
            $weekarray = array("日", "一", "二", "三", "四", "五", "六");
            return "星期" . $weekarray[date("w",$time)];
        }
        return date($formats[$format], $time);
    }
}
if (!function_exists('friend_date_niming')) {
    function friend_date_niming($time)
    {
        $text = '';
        $time = $time === NULL || $time > time() ? time() : intval($time);
        $t = time() - $time; //时间差 （秒）
        $y = date('Y', $time) - date('Y', time());//是否跨年
        switch ($t) {
            case $t < 60 * 60:
                $text = '1小时内'; //一小时内
                break;
            case $t < 60 * 60 * 24:
                $text = floor($t / (60 * 60)) . '小时前'; // 一天内
                break;
            case $t < 60 * 60 * 24 * 3:
                $time_start = strtotime(date('Y-m-d', $time));
                $time_end = strtotime(date('Y-m-d', time()));
                $c = $time_end - $time_start;
                $text = floor($c / (60 * 60 * 24)) == 1 ? '昨天 ' . date('H:i', $time) : '前天 ' . date('H:i', $time); //昨天和前天
                break;
            case $t < 60 * 60 * 24 * 30:
                $text = date('m月d日 H:i', $time); //一个月内
                break;
            case $t < 60 * 60 * 24 * 365 && $y == 0:
                $text = date('m月d日', $time); //一年内
                break;
            default:
                $text = date('Y年m月d日', $time); //一年以前
                break;
        }

        return $text;
    }
}
if (!function_exists('friend_date')) {
    function friend_date($time)
    {
        $text = '';
        $time = $time === NULL || $time > time() ? time() : intval($time);
        $t = time() - $time; //时间差 （秒）
        $y = date('Y', $time) - date('Y', time());//是否跨年
        switch ($t) {
            case $t < 0:
            case $t == 0:
                $text = '刚刚';
                break;
            case $t < 60:
                $text = $t . '秒前'; // 一分钟内
                break;
            case $t < 60 * 60:
                $text = floor($t / 60) . '分钟前'; //一小时内
                break;
            case $t < 60 * 60 * 24:
                $text = floor($t / (60 * 60)) . '小时前'; // 一天内
                break;
            case $t < 60 * 60 * 24 * 3:
                $time_start = strtotime(date('Y-m-d', $time));
                $time_end = strtotime(date('Y-m-d', time()));
                $c = $time_end - $time_start;
                $text = floor($c / (60 * 60 * 24)) == 1 ? '昨天 ' . date('H:i', $time) : '前天 ' . date('H:i', $time); //昨天和前天
                break;
            case $t < 60 * 60 * 24 * 30:
                $text = date('m月d日 H:i', $time); //一个月内
                break;
            case $t < 60 * 60 * 24 * 365 && $y == 0:
                $text = date('m月d日', $time); //一年内
                break;
            default:
                $text = date('Y年m月d日', $time); //一年以前
                break;
        }

        return $text;
    }
}

if (!function_exists('friend_date1')) {
    /**
     * 友好时间显示
     * @param $time
     * @return bool|string
     */
    function friend_date1($time)
    {
        if (!$time)
            return false;
        $fdate = '';
        $d = time() - intval($time);
        $ld = $time - mktime(0, 0, 0, 0, 0, date('Y')); //得出年
        $md = $time - mktime(0, 0, 0, date('m'), 0, date('Y')); //得出月
        $byd = $time - mktime(0, 0, 0, date('m'), date('d') - 2, date('Y')); //前天
        $yd = $time - mktime(0, 0, 0, date('m'), date('d') - 1, date('Y')); //昨天
        $dd = $time - mktime(0, 0, 0, date('m'), date('d'), date('Y')); //今天
        $td = $time - mktime(0, 0, 0, date('m'), date('d') + 1, date('Y')); //明天
        $atd = $time - mktime(0, 0, 0, date('m'), date('d') + 2, date('Y')); //后天

        switch ($d) {
            case $d < $atd:
                $fdate = date('Y年m月d日', $time);
                break;
            case $d < $td:
                $fdate = '后天 ' . date('H:i', $time);
                break;
            case $d < 0:
                $fdate = '明天 ' . date('H:i', $time);
                break;
            case $d < 30:
                $fdate = '刚刚';
                break;
            case $d < 60:
                $fdate = '1分钟前';
                break;
            case $d < 3600:
                $fdate = floor($d / 60) . '分钟前';
                break;
            case $d < $dd:
                $fdate = floor($d / 3600) . '小时前';
                break;
            case $d < $yd:
                $fdate = '昨天 ' . date('H:i', $time);
                break;
            case $d < $byd:
                $fdate = '前天 ' . date('H:i', $time);
                break;
            case $d < $md:
                $fdate = date('m月d日 H:i', $time);
                break;
            case $d < $ld:
                $fdate = date('m月d日', $time);
                break;
            default:
                $fdate = date('Y年m月d日', $time);
                break;

        }
        return $fdate;
    }
}

if (!function_exists('get_week')) {
    function get_week($time = null)
    {
        if($time==null)$time= time();
        return date('W', $time);
    }
}

if (!function_exists('get_week_year')) {
    function get_week_year($time = null)
    {
        if($time==null)$time= time();
        if (date('W', $time) >= 52 && date('m', $time) == 1) {
            return date("Y", $time) - 1;
        };
        return date("Y", $time);
    }
}

if (!function_exists('get_unix_week_first_day')) {
    /**
     * 通过时间错返回当前日期的本周的第一天时间错
     * @param null $time
     * @return false|int
     */
    function get_unix_week_first_day($time = null)
    {
        if ($time == null) $time = time();
        $day = date("Y", $time) . '-' . date("m", $time) . '-' . date("d", $time);
        $lastday = date('Y-m-d', strtotime("$day Sunday"));
        $firstday = date('Y-m-d', strtotime("$lastday -6 days"));
        return strtotime($firstday);
    }
}

if (!function_exists('get_unix_week_first_cute_day')) {
    function get_unix_week_first_cute_day($time = null, $cut = 0)
    {
        if ($time == null) $time = time();


        $time -= $cut * 7 * 24 * 3600;

        $day = date("Y", $time) . '-' . date("m", $time) . '-' . date("d", $time);

        $lastday = date('Y-m-d', strtotime("$day Sunday"));
        $firstday = date('Y-m-d', strtotime("$lastday -6 days"));

        return strtotime($firstday);
    }
}

if (!function_exists('get_unix_week_last_cute_day')) {
    function get_unix_week_last_cute_day($time = null, $cut = 0)
    {
        if ($time == null) $time = time();
        $time -= $cut * 7 * 24 * 3600;
        $day = date("Y", $time) . '-' . date("m", $time) . '-' . date("d", $time);
        $lastday = date('Y-m-d', strtotime("$day Sunday"));
        return strtotime($lastday) + 24 * 3600;
    }
}

if (!function_exists('get_unix_week_start_cute_day')) {
    function get_unix_week_start_cute_day($time = null, $cut = 0)
    {
        if ($time == null) $time = time();


        $time -= $cut * 7 * 24 * 3600;
        $day = date("Y", $time) . '-' . date("m", $time) . '-' . date("d", $time);
        $lastday = date('Y-m-d', strtotime("$day"));
        $firstday = date('Y-m-d', strtotime("$lastday -6 days"));

        return strtotime($firstday);
    }
}

if (!function_exists('get_unix_week_end_cute_day')) {
    function get_unix_week_end_cute_day($time = null, $cut = 0)
    {
        if ($time == null) $time = time();
        $time -= $cut * 7 * 24 * 3600;
        $day = date("Y", $time) . '-' . date("m", $time) . '-' . date("d", $time);
        $lastday = date('Y-m-d', strtotime("$day"));
        return strtotime($lastday) + 24 * 3600;
    }
}

if (!function_exists('get_unix_month_first_cute_day')) {
    function get_unix_month_first_cute_day($time = null, $cut = 0)
    {
        $day = date("Y", $time) . '-' . date("m", $time) . '-' . date("d", $time);

        $time = strtotime("$day -$cut months");

//    $days=get_days_by_year_month(date("Y",$time),date("m",$time));
//    if($time==null)$time= time() - $cut *  $days *24 * 3600;
        return mktime(0, 0, 0, date("m", $time), 1, date("Y", $time));
    }
}

if (!function_exists('get_unix_month_last_cute_day')) {
    function get_unix_month_last_cute_day($time = null, $cut = 0)
    {
        $day = date("Y", $time) . '-' . date("m", $time) . '-' . date("d", $time);

        $time = strtotime("$day " . (1 - $cut) . " months");

        return mktime(0, 0, 0, date("m", $time), 1, date("Y", $time));
    }
}

if (!function_exists('get_month_first_last_date')) {
    /**获取所在月份的第一天 最后一天
     * @param $date
     */
    function get_month_first_last_date($date, $isstrtotime = false)
    {
        $firstday = date('Y-m-01', $date);
        $lastday = date('Y-m-d', strtotime("$firstday +1 month -1 day"));
        if ($isstrtotime) {
            $firstday = strtotime("{$firstday} 00:00:00");
            $lastday = strtotime("{$lastday} 23:59:59");
        }
        return array($firstday, $lastday);
    }
}

if (!function_exists('get_days_by_year_month')) {
    function get_days_by_year_month($year, $month)
    {
        //首先判断闰年
        if ($year % 400 == 0 || ($year % 4 == 0 && $year % 100 !== 0)) {
            $rday = 29;
        } else {
            $rday = 28;
        }

        if ($month == 2) {
            $days = $rday;
        } else {
            //判断是大月（31），还是小月（30）
            $days = (($month - 1) % 7 % 2) ? 30 : 31;
        }
        return $days;
    }
}

if (!function_exists('unix_day')) {
    function unix_day()
    {
        return mktime(0, 0, 0, date("m"), date("d"), date("Y"));
    }
}

if (!function_exists('unix_month')) {
    function unix_month()
    {
        return mktime(0, 0, 0, date("m"), 1, date("Y"));
    }
}

if (!function_exists('unix_year')) {
    function unix_year()
    {
        return mktime(0, 0, 0, 1, 1, date("Y"));
    }
}

if (!function_exists('com_date_str')) {

    /**
     *
     * 和当前时间做对比输出相应的时间字符串
     * @param null $time 时间错
     * @return false|int|string
     */
    function com_date_str($time=null)
    {
        if($time==null){return '';}
        $com= time()-$time;
        if($com< 60*30){
            return "刚刚";
        }else if($com< 60*60){
            return "30分钟前";
        }else if($com< 60*60*2){
            return "1小时前";
        }else if($com< 60*60*3){
            return "2小时前";
        }else if($com< 60*60*4){
            return "3小时前";
        }else if($com< 60*60*5){
            return "4小时前";
        }else if($com< 60*60*6){
            return "5小时前";
        }else if($com< 60*60*7){
            return "6小时前";
        }else if($com< 60*60*8){
            return "7小时前";
        }else if($com< 60*60*9){
            return "8小时前";
        }else if($com< 60*60*10){
            return "9小时前";
        }else if($com< 60*60*11){
            return "10小时前";
        }else if($com< 60*60*12){
            return "11小时前";
        }else if($com< 60*60*13){
            return "12小时前";
        }else if($com< 60*60*14){
            return "13小时前";
        }else if($com< 60*60*15){
            return "14小时前";
        }else if($com< 60*60*16){
            return "15小时前";
        }else if($com< 60*60*17){
            return "16小时前";
        }else if($com< 60*60*18){
            return "17小时前";
        }else if($com< 60*60*19){
            return "18小时前";
        }else if($com< 60*60*20){
            return "19小时前";
        }else if($com< 60*60*21){
            return "20小时前";
        }else if($com< 60*60*22){
            return "21小时前";
        }else if($com< 60*60*23){
            return "22小时前";
        }else if($com< 60*60*24){
            return "23小时前";
        }
    }
}

if(!function_exists('gmt_iso8601')) {
    /**
     * @param $time
     * @return string
     */
    function gmt_iso8601($time)
    {
        $dtStr = date("c", $time);
        $mydatetime = new DateTime($dtStr);
        $expiration = $mydatetime->format(DateTime::ISO8601);
        $pos = strpos($expiration, '+');
        $expiration = substr($expiration, 0, $pos);
        return $expiration . "Z";
    }
}