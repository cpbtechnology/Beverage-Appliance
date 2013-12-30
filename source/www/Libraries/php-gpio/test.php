<?php

require 'vendor/autoload.php';

use PhpGpio\Gpio;

echo "Setting up pin 17\n";
$gpio = new GPIO();
$gpio->setup(17, "out");

echo "Turning on pin 17\n";
$gpio->output(17, 0);

echo "Sleeping!\n";
sleep(3);

echo "Turning off pin 17\n";
$gpio->output(17, 1);

echo "Unexporting all pins\n";
$gpio->unexportAll();

?>
