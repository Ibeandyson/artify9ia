const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../Config/db-config");
const mongoose = require("mongoose");

const passport = require("passport");