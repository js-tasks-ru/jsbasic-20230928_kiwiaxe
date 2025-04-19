function makeFriendsList(friends) {
  let list = document.createElement('ul');
  for (let friend of friends) {
    let newFriend = document.createElement("LI");
    newFriend.textContent = friend.firstName + ' ' + friend.lastName;
    list.append(newFriend);
  };
  document.body.append(list);
  return list
}
