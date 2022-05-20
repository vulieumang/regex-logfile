<?php

$file = file_get_contents('data.log', true);

preg_match('/transaction (.*[^\s]+\s*)begin/', $file, $matches, PREG_OFFSET_CAPTURE);
print_r($matches);


$re = '/transaction (.*[^\s]+\s*)begin/m';


preg_match_all($re, $file, $matches, PREG_SET_ORDER, 0);

// Print the entire match result
var_dump($matches);

?>