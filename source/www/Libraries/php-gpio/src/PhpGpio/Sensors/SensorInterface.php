<?php

namespace PhpGpio\Sensors;

/**
 * Interface implemented by sensors classes.
 */
interface SensorInterface
{

    /**
     * Read
     *
     * @param array $args
     * @return $value
     */
    public function read($args = array());

    /**
     * Write
     *
     * @param array $args
     * @return $this
     */
    public function write($args = array());

}
