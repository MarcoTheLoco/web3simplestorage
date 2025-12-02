// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract SimpleStorage {
    uint256 private value;

    event ValueChanged(uint256 newValue);

    // Сохранить число
    function store(uint256 _value) public {
        value = _value;
        emit ValueChanged(_value);
    }

    // Получить число
    function retrieve() public view returns (uint256) {
        return value;
    }
}
