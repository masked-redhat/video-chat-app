const LIMIT = 50;

const poolFull = (usernames) => {
  return usernames.length >= LIMIT ? true : false;
};

const setUsername = (username, usernames, users, socketId)=>{
    users[socketId] = username;
    usernames.push(username)
}

const Username = {
    poolFull,
    setUsername
}

export default Username