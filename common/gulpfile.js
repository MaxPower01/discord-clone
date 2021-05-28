const { src, dest, watch, series, task } = require("gulp");
const insert = require("gulp-insert");
const gulpRename = require("gulp-rename");
const gulpClean = require("gulp-clean");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const TJS = require("typescript-json-schema");

const dotenv = require("dotenv");
dotenv.config();

const srcDir = "src",
  apiRootDir = "../api",
  apiCommonDir = `${apiRootDir}/src/common`,
  clientRootDir = "../client",
  clientCommonDir = `${clientRootDir}/src/common`,
  schemasDir = "schemas",
  schemaFileName = "schema",
  jsonSchemaFileName = "jsonSchema";

const cleanLocalJsonSchemas = () => {
  return src(`${srcDir}/${schemasDir}/**/${jsonSchemaFileName}.ts`).pipe(
    gulpClean({ allowEmpty: true })
  );
};

const generateJsonSchemas = () => {
  return src(`${srcDir}/${schemasDir}/**/${schemaFileName}.d.ts`)
    .pipe(
      insert.transform(function (contents, file) {
        try {
          const splittedPath = file.path.split("\\");

          const typeDirName = splittedPath[splittedPath.length - 2];
          const typeName = "Schema";

          console.log(
            `\nGenerating json schema from "${file.path}" for type "${typeName}" in folder "${typeDirName}"...`
          );

          const settings = {
            required: true,
          };

          const compilerOptions = {
            required: true,
            id: true,
          };

          const program = TJS.getProgramFromFiles(
            [path.resolve(file.path)],
            compilerOptions
          );

          const schema = TJS.generateSchema(program, typeName, settings);

          console.log(
            `Successfully generated json schema for type "${typeName}"`
          );

          return `export const schema = ${JSON.stringify(schema)}`;
        } catch (error) {
          return "";
        }
      })
    )
    .pipe(
      gulpRename((path) => {
        path.dirname = `${schemasDir}\\${path.dirname}`;
        path.basename = jsonSchemaFileName;
        path.extname = ".ts";
      })
    )
    .pipe(dest(srcDir))
    .pipe(dest(apiCommonDir))
    .pipe(dest(clientCommonDir))
    .on("finish", () => {
      console.log("");
    });
};

// const cleanDotEnvFiles = () => {
//   const formattedDirPath = (dir) => `${dir}/.env`;

//   const dirs = [formattedDirPath(apiRootDir), formattedDirPath(clientRootDir)];

//   const srcOptions = {
//     allowEmpty: true,
//     read: false,
//   };

//   const cleanOptions = {
//     force: true,
//     allowEmpty: true,
//   };

//   return src(dirs, srcOptions).pipe(gulpClean(cleanOptions));
// };

// const generateDevEnvFiles = (cb) => {
//   const {
//     API_SESSION_SECRET,
//     API_URL__DEV,
//     API_URL__PROD,
//     DB_URI__DEV,
//     DB_URI__PROD,
//   } = process.env;

//   let apiContent = ``;

//   let clientContent = ``;

//   let content = `ENVIRONMENT=${ENVIRONMENT}\n`;
//   content += `API_SESSION_SECRET=${API_SESSION_SECRET}\n`;
//   content += `DB_URI__DEV=${DB_URI__DEV}\n`;
//   content += `DB_URI__PROD=${DB_URI__PROD}\n`;
//   content += `API_URL__DEV=${API_URL__DEV}\n`;
//   content += `API_URL__PROD=${API_URL__PROD}\n`;

//   // fs.writeFileSync(`${clientRootDir}/.env`, content);
//   fs.writeFileSync(`${apiRootDir}/.env`, content);

//   cb();
// };

// const generateProdEnvFiles = (cb) => {
//   const {
//     API_SESSION_SECRET,
//     API_URL__DEV,
//     API_URL__PROD,
//     DB_URI__DEV,
//     DB_URI__PROD,
//   } = process.env;

//   let apiContent = ``;

//   let clientContent = ``;

//   let content = `ENVIRONMENT=${ENVIRONMENT}\n`;
//   content += `API_SESSION_SECRET=${API_SESSION_SECRET}\n`;
//   content += `DB_URI__DEV=${DB_URI__DEV}\n`;
//   content += `DB_URI__PROD=${DB_URI__PROD}\n`;
//   content += `API_URL__DEV=${API_URL__DEV}\n`;
//   content += `API_URL__PROD=${API_URL__PROD}\n`;

//   // fs.writeFileSync(`${clientRootDir}/.env`, content);
//   fs.writeFileSync(`${apiRootDir}/.env`, content);

//   cb();
// };

const cleanOutputDirectories = () => {
  return src([apiCommonDir, clientCommonDir], {
    allowEmpty: true,
    read: false,
  }).pipe(gulpClean({ force: true, allowEmpty: true }));
};

const generateTypescriptFiles = () => {
  return src(`${srcDir}/**/*.ts`)
    .pipe(
      insert.transform(function (contents, file) {
        let comment = "// This file was generated with a tool.\n";
        comment +=
          "// Any changes made to this file will be lost when it is generated again.\n\n";
        comment += `// Path : ${file.path}\n\n`;

        return comment + contents;
      })
    )
    .pipe(dest(apiCommonDir))
    .pipe(dest(clientCommonDir));
};

const watchTypescriptFiles = () => {
  const files = [
    `${srcDir}/**/*.ts`,
    `!${srcDir}/${schemasDir}/**/${jsonSchemaFileName}.ts`,
  ];

  watch(
    files,
    series(generateTypescriptFiles, cleanLocalJsonSchemas, generateJsonSchemas)
  );
};

exports.default = watchTypescriptFiles;
exports.cleanOutputDirectories = cleanOutputDirectories;
exports.generateTypescriptFiles = generateTypescriptFiles;
// exports.setDevelopmentEnvironment = series(
//   cleanDotEnvFiles,
//   generateDevEnvFiles
// );
// exports.setProductionEnvironment = series(
//   cleanDotEnvFiles,
//   generateProdEnvFiles
// );
