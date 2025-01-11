const createUser = (users, socketId) => {
  users[socketId] = null;
};

const deleteUser = (users, socketId, usernames = []) => {
  if (users[socketId] && usernames.includes(users[socketId]))
    delete usernames[usernames.indexOf(users[socketId])];

  delete users[socketId];
};

const getUsers = (users, socketId) => {
  const updatedUsers = [];

  for (const user in users) {
    if (Object.prototype.hasOwnProperty.call(users, user)) {
      if (users[user] !== null && user !== socketId)
        updatedUsers.push({ id: user, username: users[user] });
    }
  }

  return updatedUsers;
};

const User = {
  createUser,
  deleteUser,
  getUsers,
};

export default User;
