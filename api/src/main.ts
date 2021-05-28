import DatabaseService from "./services/database-service";
// import express from "express";

DatabaseService.connect()
  .then((connection) => {
    // Initialize app
  })
  .catch((error) => console.log(error));
