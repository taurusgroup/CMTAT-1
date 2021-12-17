# `burnProrata(address[], uint256)`

## Signature

```solidity
    function burnProrata(address[] memory accounts, uint256 amount) public onlyRole(BURNER_ROLE) {
```

## Description

Destroys the `amount` tokens spread on each account in `accounts` in
prorata of the number of tokens they hold 
