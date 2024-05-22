const { Review, News } = require("../models/index");
const AppError = require("../utils/errors/app-error");
const {StatusCodes}=require('http-status-codes')
class adminRepository {

  async getAllReviews(data) {
    try {
      const reviews = await Review.find({})
      console.log('news in repo',reviews)
      return reviews
    } catch (error) {
      throw new AppError(
        'CreateNewsError',
        'Error occurred while creating News',
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async addReview(data) {
    try {
      const review = await Review.create({ ...data })
      return review
    } catch (error) {
      throw new AppError(
        'CreateReviewError',
        'Error occurred while creating review',
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async deleteReview(reviewId) {
    try {
      const review = await Review.deleteOne({ _id: reviewId })
      return review
    } catch (error) {
      throw new AppError(
        'CreateReviewError',
        'Error occurred while creating review',
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getAllNews(data) {
    try {
      const news = await News.find()
      return news
    } catch (error) {
      throw new AppError(
        'CreateNewsError',
        'Error occurred while creating News',
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async addNews(data) {
    try {
      const news = await News.create({ ...data })
      return news
    } catch (error) {
      throw new AppError(
        'CreateNewsError',
        'Error occurred while creating News',
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async deleteNews(newsId) {
    try {
      console.log(newsId)
      const news = await News.findOneAndDelete({ _id: newsId })
      console.log('news in repo layer:', news);
      return news
    } catch (error) {
      throw new AppError(
        'DeletNewsError',
        'Error occurred while creating review',
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = adminRepository