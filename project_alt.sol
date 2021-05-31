// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * Blockchain Project: Parking Lot Rental Service
 * Contributes: Eunbin Kang, Hangon Kim, Yeonok Chu
 */
 
contract Service {

    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;
    mapping (uint256 => address) private getAddress;
    mapping (address => uint256) getPlatenum;
    mapping (address => Place[]) getPlace;
    mapping (address => mapping (uint256 => Car[])) getCarlist;

    uint256 private _totalSupply = 2100000000;
    string private _name;
    string private _symbol;

    struct Car {
        uint256 plate_num;
        uint256 starting_time;
    }

    struct Place {
        string name;
        string location;
        uint256 identifier;
        uint256 quantity;
        uint256 fee;
        uint256 available_hour_start;
        uint256 available_hour_end;
        uint256 remain;
    }

    constructor (string memory name_, string memory symbol_) {
            _name = name_;
            _symbol = symbol_;
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
    
    function register(uint256 identifier, address addr) public {
        getAddress[identifier] = addr;
    }

    function give_plate_num(uint256 identifier, uint256 platenum) public {
        address addr = getAddress[identifier];
        getPlatenum[addr] = platenum;
    }

    function register_place(string memory pname, string memory location, uint256 owner, 
    uint256 identifier, uint256 quantity, uint256 fee, uint256 st, uint256 et) public {
        address addr = getAddress[owner];
        getPlace[addr].push(Place(pname, location, identifier, quantity, fee, st, et, quantity));
    }

    function check_in(uint256 owner, uint256 p_identifier, uint256 lender, uint256 starting_time) public {
        // add customer to customer list
        // check_remain(), check_available() then add to customer list
        uint256 idx = 0;
        for(uint i=0; i<getPlace[getAddress[owner]].length;i++) {
            if(getPlace[getAddress[owner]][i].identifier == p_identifier) {
                idx = i;
                break;
            }
        }
        if ((_check_remain(owner, idx) > 0) && _check_available(owner, idx, starting_time)) {
            getCarlist[getAddress[owner]][idx].push(Car(getPlatenum[getAddress[lender]], starting_time));
            getPlace[getAddress[owner]][idx].remain--;
            emit Checkin(owner, p_identifier, lender, starting_time);
        } 
    }
    
    function check_out(uint256 owner, uint256 p_identifier, uint256 lender, uint256 end_time) public {
        // remove customer to customer list
        // check_bill(), pay() then remove from customer list
        uint256 idx = 0;
        uint256 idxx = 0;
        uint256 start_time = 0;
        for(uint i=0; i<getPlace[getAddress[owner]].length;i++) {
            if(getPlace[getAddress[owner]][i].identifier == p_identifier) {
                idx = i;
                break;
            }
        }
        for(uint i=0; i<getCarlist[getAddress[owner]][idx].length;i++) {
            if(getCarlist[getAddress[owner]][idx][i].plate_num == getPlatenum[getAddress[lender]]) {
                start_time = getCarlist[getAddress[owner]][idx][i].starting_time;
                idxx = i;
                break;
            }
        }
        if(pay(owner, idx, lender, start_time, end_time)) {
            delete getCarlist[getAddress[owner]][idx][idxx];
            getPlace[getAddress[owner]][idx].remain++;
            emit Checkout(owner, p_identifier, lender, end_time);
        }
    }

    function _check_remain(uint256 owner, uint256 idx) internal view returns (uint256) {
        // check remain space
        // return # of remain space
        return getPlace[getAddress[owner]][idx].remain;
    }
    
    function _check_available(uint256 owner, uint256 idx, uint256 time) internal view returns (bool){
        // check if starting time is in available hour
        // return true or false
        return ((time >= getPlace[getAddress[owner]][idx].available_hour_start) && (time <= getPlace[getAddress[owner]][idx].available_hour_end));
    }
    
    function _check_bill(uint256 owner, uint256 idx, uint256 starting_time, uint256 end_time) internal view returns (uint256) {
        // check the amount of fee that has to be payed
        // return price
        // fee per minute
        // e.g. Starting, End time: 08:00 -> 0800, 17:24 -> 1724
        uint256 _fee = getPlace[getAddress[owner]][idx].fee;
        uint256 time = end_time - starting_time;
        if (time-time/100>=60) {
            time = time+40;
        }
        uint256 min_time = 60*(time/100)+(time-time/100);
        return _fee*min_time;
    }
    
    function pay(uint256 owner, uint256 idx, uint256 lender, uint256 starting_time, uint256 end_time) public returns (bool){
        // pay for the price
        // return true or false
        return transferFrom(getAddress[lender], getAddress[owner], _check_bill(owner, idx, starting_time, end_time));
    }
    
    
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    event Checkin(uint256 owner, uint256 p_identifier, uint256 lender, uint256 time);
    
    event Checkout(uint256 owner, uint256 p_identifier, uint256 lender, uint256 time);
}