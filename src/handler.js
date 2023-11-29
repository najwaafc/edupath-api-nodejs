const communities = require('./community');
const { nanoid } = require('nanoid');

// menambahkan komunitas
const addCommunity = (request, h) => {
  const {
    name,
    location,
    description,
    members
  } = request.payload;

  // Validasi data yang diterima
  if (!name || !location || !description || members === undefined) {
    return h.response({ status: 'fail', message: 'Gagal menambahkan komunitas. Mohon isi data dengan lengkap' }).code(400);
  }

  const id = nanoid();

  const newCommunity = {
    id,
    name,
    location,
    description,
    members
  };

  communities.push(newCommunity);
  return h.response({ status: 'success', message: 'Komunitas berhasil ditambahkan', data: { communityId: id } }).code(201);
};

//getAll
const getAllCommunityHandler = () => {
  return {
    status: 'success',
    data: {
      communities: communities.map((community) => ({
      id: community.id,
      name: community.name,
      location: community.location,
      members: community.members
      })),
    }
  };
  };

//search community
const searchCommunity = (req, h) => {
  const { searchTerm } = req.query;

  if (!searchTerm) {
      return h.response({ message: 'Kriteria pencarian tidak ditemukan.' }).code(400);
  }

  // Lakukan pencarian komunitas berdasarkan kriteria (misal: nama komunitas)
  const searchResult = communities.filter(
      (communities) =>
          communities.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return h.response({ results: searchResult }).code(200);
}

let communityMessages = {};
const sendMessage = (req, res) => {
  const { communityId } = req.params;
  const { userId, message } = req.body;

  if (!communityMessages[communityId]) {
      communityMessages[communityId] = [];
  }

  communityMessages[communityId].push({ userId, message });
  
  res.status(201).json({ message: 'Pesan berhasil dikirim.', communityId, userId, message });
}

const receiveMessages = (req, res) => {
  const { communityId } = req.params;

  const messages = communityMessages[communityId] || [];

  res.status(200).json({ messages, communityId });
}


module.exports = { addCommunity, getAllCommunityHandler, searchCommunity, sendMessage, receiveMessages };
  