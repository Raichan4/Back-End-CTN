const { nanoid } = require('nanoid');
const articles = require('../data/content-article');

// Adding New Article
const insertNewArticle = (request, h) => {
    const {
      name,
      description,
      pictureId,
      publisherName,
      publisherDate,
      categories,
    } = request.payload;

    const id = nanoid(16);

    if (!name) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      }).code(400);
    }

    articles.push({
      id,
      name,
      description,
      pictureId,
      publisherName,
      publisherDate,
      categories,
    });

    const isDataInserted = articles.filter((articleInserted) => articleInserted.id === id).length > 0;
    if (isDataInserted) {
      return h.response({
        status: 'success',
        message: 'Artikel berhasil ditambahkan',
        articleId: id,
      }).code(201);
    }

    const response = h.response({
      status: 'error',
      message: 'Artikel gagal ditambahkan',
    });
    response.code(500);
    return response;
};

// Get All Articles
const getAllArticles = (request, h) => {
    const response = h.response({
        error: false,
        message: 'success',
        contentArticles: articles.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          pictureId: item.pictureId,
          publisherName: item.publisherName,
          publishDate: item.publishDate,
          categories: item.categories,
        })),
    });
    response.code(200);
    return response;
  };

// Get Detail Article By Id
const getDetailArticleById = (request, h) => {
    const { articleId } = request.params;
    const isArticleFound = articles.filter((articleDetail) => articleDetail.id === articleId)[0];

    if (isArticleFound) {
      return h.response({
        error: false,
        message: 'success',
        detailArticle: isArticleFound, 
      }).code(200);
    }
    
    const response = h.response({
      status: 'fail',
      message: 'Artikel tidak ditemukan',
    });
    response.code(404);
    return response;
};

// Update or Edit Article Item By Id
const updateArticleById = (request, h) => {
  const { articleId } = request.params;
  const {
    name,
    description,
    pictureId,
    publisherName,
    publisherDate,
    categories,
  } = request.payload;
  
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui artikel. Mohon isi nama buku',
    }).code(400);
  }
  
  const isArticleUpdated = articles.findIndex((articleUpdated) => articleUpdated.id === articleId);
  if (isArticleUpdated !== -1){
    articles[isArticleUpdated] = {
      ...articles[isArticleUpdated],
      name,
      description,
      pictureId,
      publisherName,
      publisherDate,
      categories,
    };
    return h.response({
      status: 'success',
      message: 'Artikel berhasil diperbarui',
    }).code(200);
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui artikel. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Delete Article By Id
const removeArticleById = (request, h) => {
  const { articleId } = request.params;
  const isArticleDeleted = articles.findIndex((articleDeleted) => articleDeleted.id === articleId);

  if (isArticleDeleted !== -1){
    articles.splice(isArticleDeleted, 1);
    return h.response({
      status: 'success',
      message: 'Artikel berhasil dihapus',
    }).code(200);
  }

  const response = h.response({
    status: 'fail',
    message: 'Artikel gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { 
    insertNewArticle,
    getAllArticles,
    getDetailArticleById,
    updateArticleById,
    removeArticleById,
};