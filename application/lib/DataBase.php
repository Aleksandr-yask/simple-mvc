<?php

namespace application\lib;

use PDO;

class DataBase
{
    protected $db;

    public function __construct()
    {
        $config = require 'application/config/db.php';
        $this->db = new PDO('mysql:host='.$config['host'].';dbname='.$config['dbname'], $config['user'], $config['password'],
        array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
    }

    public function query($sql, $params = [])
    {
        $query = $this->db->prepare($sql);
        if (!empty($params))
        {
            foreach ($params as $key => $val)
            {
                $query->bindValue(":".$key, $val);
            }
        }

        $query->execute();
        return $query;
    }

    public function row($sql, $params = [])
    {
        $result = $this->query($sql, $params);
        return $result-> fetchAll(PDO::FETCH_ASSOC) ;
    }

    public function column($sql, $params = [])
    {
        $result = $this->query($sql, $params);
        return $result-> fetchColumn();
    }

}
