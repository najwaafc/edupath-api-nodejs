// const communities = require('./community');
const { nanoid } = require('nanoid');
const connection = require('./db')

// menambahkan komunitas
const addCommunity = async (request, h) => {
  const {
    name,
    location,
    description,
    member,
    status,
    type
  } = request.payload;

  const query = `INSERT INTO community (name, location, description, member, status, type) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [name, location, description, member, status, type];

  try {
    await new Promise((resolve, reject) => {
      connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    return h.response({ status: 'success', message: 'Komunitas berhasil ditambahkan' }).code(201);
  } catch (error) {
    return h.response({ status: 'error', message: 'Gagal menambahkan komunitas ke database' }).code(500);
  }
};


//getAll
const getAllCommunityHandler = async (req, h) => {
  try {
    const communities = await executeQuery('SELECT id_community, name, location, member FROM community');

    return {
      status: 'success',
      data: {
        communities
      }
    };
  } catch (error) {
    console.error('Database Error:', error); // Tampilkan pesan kesalahan di konsol
    return h.response({
      status: 'error',
      message: 'Failed to retrieve communities from the database'
    }).code(500);
  }
};


const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

  //menampilkan detail
  const getCommunityByIdHandler = async (request, h) => {
    const { id } = request.params;
  
    const query = 'SELECT * FROM community WHERE id_community = ?';
    const values = [id];
  
    try {
      const community = await executeQuery(query, values);
  
      if (community.length === 0) {
        return h.response({ status: 'fail', message: 'Komunitas tidak ditemukan' }).code(404);
      }
  
      return {
        status: 'success',
        data: {
          community: community[0],
        },
      };
    } catch (error) {
      return h.response({ status: 'error', message: 'Gagal mengambil data komunitas dari database' }).code(500);
    }
    function executeQuery(query, values) {
      return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
      });
    }
    
  };
  
  

  // //button join
  // const joinCommunity = async (communityId) => {
  //   // Validasi communityId
  //   if (!communityId) {
  //     throw new Error('Community ID tidak boleh kosong');
  //   }
  
  //   // Mendapatkan data komunitas
  //   const community = communities.find((c) => c.id === communityId);
  
  //   // Validasi komunitas
  //   if (!community) {
  //     throw new Error('Komunitas tidak ditemukan');
  //   }
  
  //   // Menambah jumlah member komunitas
  //   community.members++;
  
  //   // Menyimpan data komunitas yang baru
  //   communities[communityId] = community;
  
  //   // Mengembalikan response
  //   const response = {
  //     message: 'Berhasil bergabung ke komunitas',
  //   };
  
  //   return response;
  // };
  //search community
  const searchCommunities = async (req, h) => {
    // Mendapatkan parameter pencarian dari request
    const keyword = req.query.keyword;
  
    // Check if keyword exists
    if (!keyword) {
      return h.response({ results: [] }).code(200);
    }
  
    // Convert keyword to lowercase
    const lowerCaseKeyword = keyword.toLowerCase();
  
    // Mencari community berdasarkan keyword
    const query = 'SELECT * FROM community WHERE LOWER(name) = ?';
    const values = [`%${lowerCaseKeyword}%`];
  
    try {
      const communitiesFound = await executeQuery(query, values);
  
      return {
        status: 'success',
        data: {
          communities: communitiesFound,
        },
      };
    } catch (error) {
      return h.response({ status: 'error', message: 'Gagal mencari komunitas dari database' }).code(500);
    }
    function executeQuery(query, values) {
      return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
      });
    }
  };
  
  

module.exports = { addCommunity, getAllCommunityHandler, getCommunityByIdHandler, searchCommunities };
  