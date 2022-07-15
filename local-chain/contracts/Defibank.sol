// SPDX-License-Identifier: UNLICENSEDs
pragma solidity >=0.7.0 <0.9.0;

import "./BankOwner.sol";

contract DefiBank is BankOwner {
    /**
     * description this is for show total balances token on Metamask wallet
     */
    string public name;
    string public symbol;
    uint8 public decimals;

    constructor(
        string memory _tokenName,
        string memory _symbol,
        uint8 _decimal
    ) payable {
        name = _tokenName;
        symbol = _symbol;
        decimals = _decimal;
    }

    mapping(address => uint256) balances;

    struct Account {
        address owner;
        uint balances;
    }
    mapping(address => string[]) private ownerOf; // store array of key value to find in bankAccounts
    mapping(string => Account) private bankAccounts; // map accountName to balance and owner

    // event for EVM logging
    event Deposit(string indexed accountName, uint indexed amount);
    event Withdraw(string indexed accountName, uint indexed amount);
    event Transfer(
        string indexed sender,
        string indexed reciver,
        uint indexed amount
    );

    // Start Of Manage Bank Accounts Section
    /**
     * @dev add new bankAccounts and add accountName array for ownerWallet
     */
    function createAccount(string calldata accountName) public {
        require(isDuplicate(accountName), "This account name already use!!");
        ownerOf[msg.sender].push(accountName); // add new account to owner
        bankAccounts[accountName] = Account(msg.sender, 0);
    }

    // End Of Manage Bank Accounts Section

    // Start Of Manage Transaction Section
    /**
     * description anyone can deposit token to this accountName
     * @dev add total balance of wallet/accountName by amount
     */
    function deposit(string calldata accountName, uint amount) public {
        require(isCreated(accountName), "This account not found");
        balances[msg.sender] += amount;
        bankAccounts[accountName].balances += amount;
        emit Deposit(accountName, amount);
    }

    /**
     * description only owner of accountName can withdraw token
     * @dev sub total balance of wallet/accountName by amount
     */
    function withdraw(string calldata accountName, uint amount) public {
        require(isCreated(accountName), "This account not found");
        require(isOwner(accountName), "You are not account owner");
        require(
            amount <= bankAccounts[accountName].balances,
            "Your balance is not enough to withdraw"
        );
        balances[msg.sender] -= amount;
        bankAccounts[accountName].balances -= amount;
        emit Withdraw(accountName, amount);
    }

    /**
     * description only owner of accountName can transfer token
     * @dev transfer amount from sender to reciver wallet/accountName by amount
     */
    function transfer(
        string calldata sender,
        string calldata reciver,
        uint256 amount
    ) public {
        require(isCreated(sender), "This sender account not found");
        require(isOwner(sender), "You are not account owner");
        require(
            amount <= bankAccounts[sender].balances,
            "Your balance is not enough to transfer"
        );
        require(isCreated(reciver), "This reciver account not found");
        balances[msg.sender] -= amount;
        balances[bankAccounts[reciver].owner] += amount;
        bankAccounts[sender].balances -= amount;
        bankAccounts[reciver].balances += amount;
        emit Transfer(sender, reciver, amount);
    }

    /**
     * description only owner of accountName can transfer token to multi Accounts
     * @dev transfer amount from sender to list of reciver wallet/accountName by same amount
     */
    function multipleTranfer(
        string calldata sender,
        string[] calldata reciver,
        uint amount
    ) public {
        require(
            amount * reciver.length <= bankAccounts[sender].balances,
            "Your balance is not enough to transfer to all account"
        );
        for (uint i = 0; i < reciver.length; i++) {
            transfer(sender, reciver[i], amount);
        }
    }

    // End Of Manage Transaction Section

    // Start Of Getter function Section
    /**
     * descriptionstruct type for return value to Defibank
     * @dev add total balance of wallet/accountName by amount
     */
    struct AccountBalance {
        string name;
        uint balances;
    }

    /**
     * description anyone can deposit token to this accountName
     * @dev add total balance of wallet/accountName by amount
     */
    function getBankAccountsListByOwner(address ownerAddress)
        public
        view
        returns (AccountBalance[] memory)
    {
        uint numberOfAccounts = ownerOf[ownerAddress].length; // get number of accounts was owned by ownerAddress
        AccountBalance[] memory accounts = new AccountBalance[](
            numberOfAccounts
        );
        for (uint256 i = 0; i < numberOfAccounts; i++) {
            string memory accountName = ownerOf[ownerAddress][i];
            accounts[i] = AccountBalance(
                accountName,
                bankAccounts[accountName].balances
            );
            // get all account for this address
        }
        return accounts;
    }

    /**
     * description anyone can get total balances by ownerAddress
     */
    function balanceOf(address ownerAddress) public view returns (uint256) {
        return balances[ownerAddress];
    }

    /**
     * description anyone can get balance by accountName
     * @dev check accountName is created and get balance from bankAccounts by accountName
     */
    function accountBalance(string calldata accountName)
        public
        view
        returns (uint256)
    {
        require(isCreated(accountName));
        return bankAccounts[accountName].balances;
    }

    // End Of Getter function Section

    // Start Of Utils function Section
    /**
     * @dev check this accountName has owned by any wallet if no owner return true
     */
    function isDuplicate(string calldata accountName)
        private
        view
        returns (bool)
    {
        return bankAccounts[accountName].owner == address(0);
    }

    /**
     * @dev check this accountName has Created if not create return true
     */
    function isCreated(string calldata accountName)
        private
        view
        returns (bool)
    {
        return bankAccounts[accountName].owner != address(0);
    }

    function isOwner(string calldata accountName) private view returns (bool) {
        return bankAccounts[accountName].owner == msg.sender;
    }
    // End Of Utils function Section
}
