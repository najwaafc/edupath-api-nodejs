const { addCommunity, 
    getAllCommunityHandler,
    searchCommunity,
    sendMessage,
    receiveMessages } = require('./handler');

const routes = [
    {
      method: 'POST',
      path: '/community',
      handler: addCommunity,
    },
    {
      method: 'GET',
      path: '/community',
      handler: getAllCommunityHandler,
    },
    {
      method: 'GET',
      path: '/community/search',
      handler: searchCommunity,
    },
    {
      method: 'POST',
      path: '/community/{communityId}/message',
      handler: sendMessage,
    },
    {
      method: 'GET',
      path: '/community/{communityId}/message',
      handler: receiveMessages,
    }
  ];
  
  module.exports = routes;