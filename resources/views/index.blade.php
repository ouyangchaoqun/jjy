<!DOCTYPE html>
<html lang="en">
<head>
  <?php  require "static_version.php";  ?>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;">
  <title>心情指数</title>
  <link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/1.1.2/weui.min.css"/>
  <link rel="stylesheet" type="text/css" href="src/css/common.css?v=<?=STATIC_XQZS_VERSION?>"/>
  <link rel="stylesheet" href="src/css/swiper-3.4.2.min.css">
  <script src="http://lib.sinaapp.com/js/jquery/3.1.0/jquery-3.1.0.min.js"></script>
  <script src="src/js/vue/vue.min.js"></script>
  <script src="src/js/vue/vue-resource.js"></script>
  <script src="src/js/vue/vue-router.min.js"></script>
  <script src="src/js/swiper-3.3.1.jquery.min.js"></script>
  <script src="src/js/swiper-3.4.2.min.js"></script>
  <script src="src/js/weui.js"></script>
  <script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js" type="text/javascript"></script>
  <script src="http://map.qq.com/api/js?v=2" charset="utf-8"></script>

</head>
<body>
<div id="app">

</div>
<script>
    var web={};

    web.BASE_PATH2="<?=env("BASE_PATH")?>";
    web.BASE_PATH="<?=env("BASE_PATH")?>";
    web.API_PATH=web.BASE_PATH2+"api/";
    web.IMG_PATH="/dist/";
    var now_week= "<?=date("W")?>";
    web.IPAddress="<?=$_SERVER["REMOTE_ADDR"]?>";
    <?php
      if(!empty($guest)){echo "web.guest=true;";}
    ?>



</script>
<script src="/src/js/cookie.js?v=<?=STATIC_XQZS_VERSION?>"></script>
<script src="/src/js/xqzs.js?v=<?=STATIC_XQZS_VERSION?>"></script>
<script src="/src/js/xqzs.face.js?v=<?=STATIC_XQZS_VERSION?>"></script>
<script src="/src/js/vconsole.min.js"></script>
<script src="/dist/build.js?v=<?=STATIC_XQZS_VERSION?>"></script>
<script src="https://cdn.staticfile.org/highcharts/5.0.9/highcharts.js"></script>
<script src="https://cdn.staticfile.org/jquery.qrcode/1.0/jquery.qrcode.min.js"></script>
</body>
</html>
