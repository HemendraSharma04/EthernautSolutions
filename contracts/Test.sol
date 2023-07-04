// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SubscriptionContract {
    struct User {
        bool userActivated;
        bool publicKeyRegistered;
        uint256 userStartBlock;
        uint256 subscribedCount;

        mapping(address => uint8) isSubscribed;
        mapping(address => uint256) subscribed;
        mapping(uint256 => address) mapAddressSubscribed;
    }

    mapping(address => User) private users;

    event UserActivated(address indexed user);
    event PublicKeyRegistered(address indexed user, bool registered);
    event Subscription(address indexed subscriber, address indexed subscribee);
    event Unsubscription(address indexed subscriber, address indexed subscribee);

    modifier onlyActivatedUser() {
        require(users[msg.sender].userActivated, "User not activated");
        _;
    }

    function activateUser() external {
        User storage user = users[msg.sender];
        require(!user.userActivated, "User already activated");

        user.userActivated = true;
        user.userStartBlock = block.number;

        emit UserActivated(msg.sender);
    }

    function registerPublicKey() external onlyActivatedUser {
        User storage user = users[msg.sender];
        require(!user.publicKeyRegistered, "Public key already registered");

        user.publicKeyRegistered = true;

        emit PublicKeyRegistered(msg.sender, true);
    }

    // function subscribe(address subscribee) external onlyActivatedUser {
    //     require(subscribee != address(0), "Invalid subscribee address");

    //     User storage subscriber = users[msg.sender];
    //     User storage user = users[subscribee];

    //     require(subscriber.isSubscribed[subscribee] != 1, "Already subscribed");

    //     subscriber.isSubscribed[subscribee] = 1;
    //     subscriber.subscribedCount++;
    //     subscriber.subscribed[subscriber.subscribedCount] = block.number;
    //     subscriber.mapAddressSubscribed[subscriber.subscribedCount] = subscribee;

    //     emit Subscription(msg.sender, subscribee);
    // }

    function unsubscribe(address subscribee) external onlyActivatedUser {
        User storage subscriber = users[msg.sender];
        User storage user = users[subscribee];

        require(subscriber.isSubscribed[subscribee] == 1, "Not subscribed");

        uint256 subscribedIndex = 0;

        for (uint256 i = 1; i <= subscriber.subscribedCount; i++) {
            if (subscriber.mapAddressSubscribed[i] == subscribee) {
                subscribedIndex = i;
                break;
            }
        }

        delete subscriber.isSubscribed[subscribee];
        // delete subscriber.subscribed[subscribedIndex];
        delete subscriber.mapAddressSubscribed[subscribedIndex];
        subscriber.subscribedCount--;

        emit Unsubscription(msg.sender, subscribee);
    }

    function getUserActivationStatus(address userAddress) external view returns (bool) {
        return users[userAddress].userActivated;
    }

    function getUserPublicKeyStatus(address userAddress) external view returns (bool) {
        return users[userAddress].publicKeyRegistered;
    }

    function getUserStartBlock(address userAddress) external view returns (uint256) {
        return users[userAddress].userStartBlock;
    }

    function getUserSubscribedCount(address userAddress) external view returns (uint256) {
        return users[userAddress].subscribedCount;
    }

    function isUserSubscribed(address subscriber, address subscribee) external view returns (bool) {
        return users[subscriber].isSubscribed[subscribee] == 1;
    }

    function getIsSubScribed(address channel, address _user) public view returns (uint8 get) {
        User storage user = users[_user];
        get = user.isSubscribed[channel];
    }
}
