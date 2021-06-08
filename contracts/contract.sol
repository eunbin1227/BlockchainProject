// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * Blockchain Project: Parking Lot Rental Service
 * Contributes: Eunbin Kang, Hangon Kim, Yeonok Chu
 */
 
contract Service {

    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;
    mapping (address => uint256) getPlatenum;
    mapping (address => Place[]) getPlace;
    mapping (address => uint256) getPlacenum;
    mapping (address => address) getCurrentplace;
    mapping (address => uint256) getCurrentplacenum;
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
    
    function give_plate_num(address user, uint256 platenum) public {
        getPlatenum[user] = platenum;
        getPlacenum[user] = 0;
        getCurrentplace[user] = address(0);
        getCurrentplacenum[user] = 0;
        _transfer(0xDa7f17CdF9ECd9EABA085957E5F9585F41431af4,user,1000000); //for test
    }

    function register_place(string memory pname, string memory location, address owner, 
    uint256 identifier, uint256 quantity, uint256 fee, uint256 st, uint256 et) public {
        getPlace[owner].push(Place(pname, location, identifier, quantity, fee, st, et, quantity));
        getPlacenum[owner]++;
    }

    function check_in(address owner, uint256 p_identifier, address lender, uint256 starting_time) public {
        // add customer to customer list
        // check_remain(), check_available() then add to customer list
        uint256 idx = 0;
        for(uint i=0; i<getPlace[owner].length;i++) {
            if(getPlace[owner][i].identifier == p_identifier) {
                idx = i;
                break;
            }
        }
        if ((_check_remain(owner, idx) > 0) && _check_available(owner, idx, starting_time) && _check_current(lender)) {
            getCarlist[owner][idx].push(Car(getPlatenum[lender], starting_time));
            getPlace[owner][idx].remain--;
            getCurrentplace[lender] = owner;
            getCurrentplacenum[lender] = p_identifier;
            emit Checkin(owner, p_identifier, lender, starting_time);
        } 
    }
    
    function check_out(address owner, uint256 p_identifier, address lender, uint256 end_time) public {
        // remove customer to customer list
        // check_bill(), pay() then remove from customer list
        uint256 idx = 0;
        uint256 idxx = 0;
        uint256 start_time = 0;
        for(uint i=0; i<getPlace[owner].length;i++) {
            if(getPlace[owner][i].identifier == p_identifier) {
                idx = i;
                break;
            }
        }
        for(uint i=0; i<getCarlist[owner][idx].length;i++) {
            if(getCarlist[owner][idx][i].plate_num == getPlatenum[lender]) {
                start_time = getCarlist[owner][idx][i].starting_time;
                idxx = i;
                break;
            }
        }
        if(pay(owner, idx, lender, start_time, end_time)) {
            delete getCarlist[owner][idx][idxx];
            getPlace[owner][idx].remain++;
            getCurrentplace[lender] = address(0);
            getCurrentplacenum[lender] = 0;
            emit Checkout(owner, p_identifier, lender, end_time);
        }
    }

    function _check_remain(address owner, uint256 idx) internal view returns (uint256) {
        // check remain space
        // return # of remain space
        return getPlace[owner][idx].remain;
    }
    
    function _check_available(address owner, uint256 idx, uint256 time) internal view returns (bool){
        // check if starting time is in available hour
        // return true or false
        return ((time >= getPlace[owner][idx].available_hour_start) && (time <= getPlace[owner][idx].available_hour_end));
    }
    
    function _check_bill(address owner, uint256 idx, uint256 starting_time, uint256 end_time) internal view returns (uint256) {
        // check the amount of fee that has to be payed
        // return price
        // fee per minute
        // e.g. Starting, End time: 08:00 -> 0800, 17:24 -> 1724
        uint256 _fee = getPlace[owner][idx].fee;
        uint256 time = end_time - starting_time;
        if (time-time/100>=60) {
            time = time+40;
        }
        uint256 min_time = 60*(time/100)+(time-time/100);
        return _fee*min_time;
    }

    function _check_current(address user) internal view returns (bool) {
        if (getCurrentplace[user] == address(0)) return true;
        else return false;
    }
    
    function pay(address owner, uint256 idx, address lender, uint256 starting_time, uint256 end_time) public returns (bool){
        // pay for the price
        // return true or false
        return transferFrom(lender, owner, _check_bill(owner, idx, starting_time, end_time));
    }

    function check_com(address owner) public view returns (uint256){
        return getPlacenum[owner];
    }

    function check_com_remain(address owner, uint256 idx) public view returns (uint256) {
        return getPlace[owner][idx].remain;
    }

    function get_place_name(address owner, uint256 idx) public view returns (string memory) {
        return getPlace[owner][idx].name;
    }

    function get_plate_num(address user) public view returns (uint256) {
        return getPlatenum[user];
    }

    function get_current(address user) public view returns (string memory) {
        if (getCurrentplace[user] == address(0)) {
            return "Nowhere!";
        }
        else {
            return get_place_name(getCurrentplace[user],getCurrentplacenum[user]);
        }
    }
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    event Checkin(address owner, uint256 p_identifier, address lender, uint256 time);
    
    event Checkout(address owner, uint256 p_identifier, address lender, uint256 time);
}