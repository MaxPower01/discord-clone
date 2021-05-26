const { src, dest, watch, series, task } = require("gulp");
const insert = require("gulp-insert");
const gulpRename = require("gulp-rename");
const gulpClean = require("gulp-clean");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const TJS = require("typescript-json-schema");

const generateDotEnvFiles = () => console.log("generateDotEnvFiles");
const cleanDotEnvFiles = () => console.log("cleanDotEnvFiles");
const watchTypescriptFiles = () => console.log("watchTypescriptFiles");
const cleanOutputDirectories = () => console.log("cleanOutputDirectories");
const generateTypescriptFiles = () => console.log("generateTypescriptFiles");

exports.default = watchTypescriptFiles;
exports.cleanOutputDirectories = cleanOutputDirectories;
exports.generateTypescriptFiles = generateTypescriptFiles;
exports.setDevelopmentEnvironment = series(
  cleanDotEnvFiles,
  generateDotEnvFiles
);
