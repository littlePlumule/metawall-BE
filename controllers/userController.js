const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { appError } = require('../service/errorHandler');
const httpResponse = require('../service/resHandle');

const users = {
  async signup(req, res, next) {
    
  },

  async signin(req, res, next) {
    
  },

  async updatePassword(req, res, next) {
    
  },

  async getMyProfile(req, res, next) {
   
  },

  async getOtherProfile(req, res, next) {
    
  },

  async updateProfile(req, res, next) {
    
  }
};

module.exports = users;