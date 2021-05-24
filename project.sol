// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * Blockchain Project: Parking Lot Rental Service
 * Contributes: Eunbin Kang, Hangon Kim, Yeonok Chu
 */
 
// interface ERC20 {
//     function totalSupply() external view returns (uint256);
    
//     function balanceOf(address account) external view returns (uint256);

//     function transfer(address recipient, uint256 amount) external returns (bool);

//     function allowance(address owner, address spender) external view returns (uint256);

//     function approve(address spender, uint256 amount) external returns (bool);

//     function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

//     event Transfer(address indexed from, address indexed to, uint256 value);
    
//     event Approval(address indexed owner, address indexed spender, uint256 value);
    
//     function check_in(uint256 _identifier, uint256 _starting_time) external;
    
//     function check_out(uint256 _identifier, uint256 _starting_time) external;

//     function check_remain() external;
    
//     function check_available() external;
    
//     function check_bill() external;
    
//     function pay() external;
    
//     function get_info() external;
// }
 

contract Service {

    mapping (uint256 => uint256) customer; //identifier -> starting time
    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;
    mapping (uint256 => address) private getAddress;
    mapping (uint256 => Car) private getCar;

    uint256 private _totalSupply = 2100000000;
    string private _name;
    string private _symbol;
    string private _identifier;
    string private _location;
    uint256 private _stock_number;
    uint256 private _quantity;
    uint256 private _fee;
    uint256 private _available_hour_start;
    uint256 private _available_hour_end;
    
    struct Car {
        uint256 identifier;
        uint256 starting_time;
    }
    
    Car[] _current_car_list;
    
  
    constructor (string memory name_, 
    string memory symbol_, 
    string memory identifier_,
    string memory location_,
    uint256 stock_number_,
    uint256 quantity_,
    uint256 fee_,
    uint256 available_hour_start_,
    uint256 available_hour_end_) {
            _name = name_;
            _symbol = symbol_;
            _identifier = identifier_;
            _location = location_;
            _stock_number = stock_number_;
            _quantity = quantity_;
            _fee = fee_;
            _available_hour_start = available_hour_start_;
            _available_hour_end = available_hour_end_;
            _balances[msg.sender] = _totalSupply;
            
            emit Transfer(address(0), msg.sender, _totalSupply);
    }

    
    function name() public view returns (string memory) {
        return _name;
    }
  
    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual returns (uint8) {
        return 2;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public virtual returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) public view virtual returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public virtual returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual returns (bool) {
        _transfer(sender, recipient, amount);

        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        _approve(sender, msg.sender, currentAllowance - amount);

        return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        uint256 senderBalance = _balances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        _balances[sender] = senderBalance - amount;
        _balances[recipient] += amount;

        emit Transfer(sender, recipient, amount);
    }

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        _balances[account] = accountBalance - amount;
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);
    }

    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
    function check_in(uint256 identifier, uint256 starting_time, address addr) public {
        // add customer to customer list
        // check_remain(), check_available() then add to customer list
        if ((_check_remain() > 0) && _check_available(starting_time)) {
            getAddress[identifier] = addr;
            getCar[identifier] = Car(identifier, starting_time); 
            _current_car_list.push(Car(identifier, starting_time));
            _stock_number--;
            emit Checkin(identifier, starting_time);
        } 
    }
    
    function check_out(uint256 identifier, uint256 end_time) public {
        // remove customer to customer list
        // check_bill(), pay() then remove from customer list
        if(pay(identifier, getCar[identifier].starting_time, end_time)) {
            for(uint i=0; i<_current_car_list.length; i++) {
                if(_current_car_list[i].identifier == identifier) {
                    delete _current_car_list[i];
                }
            }
            _stock_number++;
            emit Checkout(identifier, end_time);
        }
    }

    function _check_remain() internal view returns (uint256) {
        // check remain space
        // return # of remain space
        return _stock_number;
    }
    
    function _check_available(uint256 time) internal view returns (bool){
        // check if starting time is in available hour
        // return true or false
        return ((time >= _available_hour_start) && (time <= _available_hour_end));
    }
    
    function _check_bill(uint256 starting_time, uint256 end_time) internal view returns (uint256) {
        // check the amount of fee that has to be payed
        // return price
        // fee per minute
        // e.g. Starting, End time: 08:00 -> 0800, 17:24 -> 1724
        uint256 time = end_time - starting_time;
        if (time-time/100>=60) {
            time = time+40;
        }
        uint256 min_time = 60*(time/100)+(time-time/100);
        return _fee*min_time;
    }
    
    function pay(uint256 identifier, uint256 starting_time, uint256 end_time) public returns (bool){
        // pay for the price
        // return true or false
        return transfer(getAddress[identifier], _check_bill(starting_time, end_time));
    }
    
    function get_info() public view returns (string memory, string memory, uint256, uint256, uint256) {
        // return name, location, available hour, fee
        return (_name, _location, _available_hour_start, _available_hour_end, _fee);
    }
    
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    event Checkin(uint256 lender, uint256 time);
    
    event Checkout(uint256 lender, uint256 time);
}