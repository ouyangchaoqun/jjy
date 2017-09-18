<?php
namespace App\Http\Middleware;

use Closure;

class ModelBinding
{
    private $request;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $this->request = $request;
        $this->bindModel();
        return $next($this->request);
    }

    private function bindModel()
    {
        $route = $this->request->route();
        if (count($route) >= 1) {
            $this->bindModelFromRouteInfo($route);
        }
    }

    private function bindModelFromRouteInfo($route)
    {
        $routeInfo = $route[1];
        if (isset($routeInfo['models'])) {
            $models = $routeInfo['models'];
            if (!is_array($models)) {
                $models = [$models];
            }
            foreach ($models as $classFullName) {
                $this->bindModelToRequest($classFullName, $classFullName);
            }
//            //校验方法中的参数  **不知道如何注入到服务容器 故直接添加到Request对象的Attritube属性
//            $methodString = $routeInfo['uses'];
//            $methodInfo = explode('@', $methodString);
//            $params = $this->getMethodParams($methodInfo);
//            foreach ($params as $paramInfo) {
//                $this->bindModelToRequest($paramInfo['type'], $paramInfo['type']);
//            }
        }
    }

    private function getMethodParams($methodInfo)
    {
        $paramsInfoArray = array();
        $method = new \ReflectionMethod($methodInfo[0],$methodInfo[1]);
        $params = $method->getParameters();
        foreach ($params as $key=>$param) {
            if ($paramClass = $param->getClass()) {
                $paramsInfoArray[] = array(
                    'type' => $paramClass->getName(),//参数类型名称
                    'name' => $param->getName()//参数名称
                );
            }
        }
        return $paramsInfoArray;
    }

    private function getValueFromRequest($key,$typename,$instance,&$instanceArray)
    {
        $val = $this->request->input($key);
        if (!$this->isEmpty($val)) {
            $instance[$key] = $val;
            $instanceArray[$key] = $val;
        }
    }

    private function isEmpty($val)
    {
        $emptyvalues = ['null', 'undefined'];
        return empty($val)
            || in_array($val, $emptyvalues);
    }

    private function setPropertyValue($instance,$property,&$instanceArray)
    {
        $name = $property->getName();
        if ($name == 'primaryKey') {
            $this->getValueFromRequest($property->getValue($instance),'', $instance,$instanceArray);
        } else if ($name == 'fillable') {
            $fields = $property->getValue($instance);
            if (is_array($fields)) {
                foreach ($fields as $field) {
                    $this->getValueFromRequest($field,'', $instance,$instanceArray);
                }
            }
        }
    }

    private function setValueToInstance($instance,$property,&$instanceArray)
    {
        if ($property->isPublic() || $property->isProtected()) {
            $property->setAccessible(true);
            $this->setPropertyValue($instance,$property,$instanceArray);
        }
    }

    private function bindModelToRequest($classFullName,$name)
    {
        $class = new \ReflectionClass($classFullName);
        $instance = $class->newInstance();
        $instanceArray = array();
        $properties = $class->getProperties();
        foreach ($properties as $property) {
            $this->setValueToInstance($instance,$property,$instanceArray);
        }
        //将实例附加到Request对象
        //$this->request->attributes->add(array($name=>$instance));
        //将数组附加到Request对象
        $this->request->attributes->add(array($name=>$instanceArray));
    }
}