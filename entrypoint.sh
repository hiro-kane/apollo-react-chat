#!/bin/bash

until mysqladmin ping -h mysql_node --silent; do
    echo 'waiting for mysqld to be connectable...'
    sleep 3
done