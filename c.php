<?php
/* -------------------------------------
Консольное приложение для создания файлов и папок с классами
-------------------------------------*/
$conf = [
  'rout' => '',
  'controller' => '',
  'model' => '',
  'action' => '',
  'acl' => 1
];
start();
function start() {
    echo "Welcome \n";
    echo 'Включить краткий вид? (Y/N): ';
    $line = mb_strtolower(getLine());
    if ($line == 'y'or $line == 'н')
        smallFun();
    else
        normalFan();
}

function smallFun() {
    global $conf;
    echo "Краткий ввод: \n1) Путь (routes.php)\n2) Название контроллера (NameController, models->Name.php)\n3) Модель (Action)\n4) Тип доступа (1 - all, 2 - authorize, 3 - guest, 4 - admin)\nРазделитель - |\n";
    $line = getLine();
    $vars = explode("|", $line);
    if (count($vars) < 4)
        die('Недостаточно параметров');

    $conf['rout']       = trim($vars[0]);
    $conf['controller'] = trim($vars[1]);
    $conf['model']      = trim($vars[2]);
    $conf['action']     = trim($vars[2]);
    $conf['acl']        = trim($vars[3]);
    startInsert();
}

function normalFan() {
    global $conf;

    $arr = require 'application/config/routes.php';

    echo "Введите route: \n";
    $line = getLine();
    if (!empty($arr[$line]))
        die('Такой путь уже существует');
    $conf['rout'] = $line;

    echo "Введите название контроллера: \n";
    $line = getLine();
    $conf['controller'] = $line;

    echo "Введите название модели: \n";
    $line = getLine();
    $conf['model'] = $line;
    $conf['action'] = $line;

    echo "Введите тип доступа (1 - all, 2 - authorize, 3 - guest, 4 - admin) : \n";
    $line = getLine();
    $conf['acl'] = $line;

    startInsert();
}

function startInsert() {
    global $conf;
    route($conf);
    controller($conf);
    model($conf);
    acl($conf);
    fileContent($conf);
    echo 'Создано!';
}

function route($route) {
    $s = file_get_contents('application/config/routes.php');
    $p = "
    '".$route['rout']."' => [
        'controller' => '".$route['controller']."',
        'action' => '".$route['model']."'
    ],
    //new_line//end_line
    ";
    $s2 = preg_replace('/\/\/new_line(.*)\/\/end_line/', $p, $s);
    if ($s2)
        file_put_contents('application/config/routes.php', $s2);
    else
        exit('Файл routes.php не имеет new_line и end_line');
}

/**
 * @param $ctrl
 */
function controller($ctrl) {
    $fileName = 'application/controllers/'.ucfirst($ctrl['controller']).'Controller.php';
    if (file_exists($fileName)) {
        $f = file_get_contents($fileName);
        $f = trim($f);

        $p = '
    public function '.$ctrl['action'].'Action() {
        
        $this->view->render(\'Name\');
    }
        
    //e::::d
    ';

        $s = preg_replace('/\/\/e::(.*)::d/', $p, $f);
        if ($s)
            file_put_contents($fileName, $s);
        else
            exit('Файл Controller не имеет //e::::d');
    } else {
        $file = fopen($fileName, 'w');
        $p = '<?php
/**
 * '.ucfirst($ctrl['controller']).'Controller
 * 
 */

namespace application\controllers;

use application\core\Controller;

class '.ucfirst($ctrl['controller']).'Controller'.' extends Controller
{
    public function '.$ctrl['action'].'Action() {
        $this->view->render(\'Name\');
    }
        
    //e::::d
        
}';
        fwrite($file, $p);
        fclose($file);

    }
}

function model($mdl) {
    $fileName = 'application/models/'.ucfirst($mdl['controller']).'.php';
    if (!file_exists($fileName)) {
        $file = fopen($fileName, 'w');
        $p = '<?php
/**
 * '.ucfirst($mdl['controller']).'
 *
 */

namespace application\models;

use application\core\Model;

class '.ucfirst($mdl['controller']).' extends Model
{
    
}';
        fwrite($file, $p);
        fclose($file);
    }
}

function acl($acl) {
    if ($acl['acl'] == 1) {
        aclChange($acl, '/\/\/alle:(.*):alld/', '//alle::alld');
    } elseif($acl['acl'] == 2) {
        aclChange($acl, '/\/\/authorizee:(.*):authorized/', '//authorizee::authorized');
    } elseif($acl['acl'] == 3) {
        aclChange($acl, '/\/\/gueste:(.*):guestd/', '//gueste::guestd');
    } elseif($acl['acl'] == 4) {
        aclChange($acl, '/\/\/admine:(.*):admind/', '//admine::admind');
    }
}

function aclChange($acl, $r, $bd) {
    $s = file_get_contents('application/acl/acl_check.php');

    $p = "'".$acl['action']."',
        ".$bd."";

    $s2 = preg_replace($r, $p, $s);
    if ($s2)
        file_put_contents('application/acl/acl_check.php', $s2);
    else
        exit('Файл routes.php не имеет new_line и end_line');
}

function fileContent($arr) {
    $path = 'application/views/'.$arr['controller'].'/';
    if (file_exists($path)) {
        if (!file_exists($path.$arr['action'].'.php'))
            fopen($path.$arr['action'].'.php', 'w');
    } else {
        mkdir($path);
        fopen($path.$arr['action'].'.php', 'w');
    }
}

function getLine() {
    $handle = fopen ("php://stdin","r");
    return trim(fgets($handle));
}