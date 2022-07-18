export const addUser = (usersConnected, userId, socketId) => {
  if(!usersConnected) return;
  if (usersConnected.some((user) => user.userId === userId)) return;
  usersConnected.push({ userId, socketId })
  console.log(usersConnected);
  return usersConnected;
}

export const removeUser = (usersConnected, socketId) => {
  if(!usersConnected) return;
  usersConnected = usersConnected.filter((user) => user.socketId !== socketId);
  return usersConnected;
}

export const getUser = (usersConnected, userId) => {
  const findUser = usersConnected?.find((user) => user.userId === userId);
  return findUser;
}
