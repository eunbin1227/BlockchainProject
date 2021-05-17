{\rtf1\ansi\ansicpg949\cocoartf2578
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // SPDX-License-Identifier: GPL-3.0\
\
pragma solidity ^0.8.0;\
\
/**\
 * Blockchain Project: Parking Lot Rental Service\
 * Contributes: Eunbin Kang, Hangon Kim, Yeonok Chu\
 */\
contract Service \{\
\
    uint256 stock_number;\
    string name;\
    string owner;\
    string location;\
    uint256 quantity;\
    uint256 fee;\
    uint256 available_hour_start;\
    uint256 available_hour_end;\
    \
    mapping (uint256 => uint256) customer; //identifier -> starting time\
    \
    constructor (\
        uint256 _stock_number,\
        string _name,\
        string _owner,\
        string _location,\
        uint256 _quantity,\
        uint256 _fee,\
        uint256 _available_hour_start,\
        uint256 _available_hour_end) \{\
            stock_number = _stock_number;\
            name = _name;\
            owner = _owner;\
            location = _location;\
            quantity = _quantity;\
            fee = _fee;\
            available_hour_start = _available_hour_start;\
            available_hour_end = _available_hour_end;\
    \}\
\
    \
    function check_in(uint256 _identifier, uin256 _starting_time) public \{\
        // add customer to customer list\
        // check_remain(), check_available() then add to customer list\
    \}\
    \
    function check_out(uint256 _identifier, uin256 _starting_time) public \{\
        // remove customer to customer list\
        // check_bill(), pay() then remove from customer list\
    \}\
\
    function check_remain() public \{\
        // check remain space\
        // return # of remain space\
    \}\
    \
    function check_available() public \{\
        // check if starting time is in available hour\
        // return true or false\
    \}\
    \
    function check_bill() public \{\
        // check the amount of fee that has to be payed\
        // return price\
    \}\
    \
    function pay() public \{\
        // pay for the price\
        // return true or false\
    \}\
    \
    function get_info() public \{\
        // return name, location, available hour, fee\
    \}\
\}}