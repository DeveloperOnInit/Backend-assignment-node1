const db = require("./db_connection");

class Helper {
   async checkTableExists() {
      return new Promise((resolve, reject) => {
         const query = `
                SELECT COUNT(*) AS count 
                FROM information_schema.tables 
                WHERE table_schema = 'school_management' AND table_name = 'schools';
            `;
         db.query(query, (error, results) => {
            if (error) {
               console.error("Error checking if table exists:", error);
               return reject(error);
            }

            const tableExists = results[0].count > 0;

            resolve(tableExists);
         });
      });
   }

   async createTable() {
      return new Promise((resolve, reject) => {
         const query = `
                CREATE TABLE schools (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    address VARCHAR(255) NOT NULL,
                    latitude DECIMAL(10, 6) NOT NULL,
                    longitude DECIMAL(10, 6) NOT NULL
                );
            `;
         db.query(query, (error, results) => {
            if (error) {
               console.error("Error creating table:", error);
               return reject(error);
            }
            console.log("Table created successfully");
            resolve(results);
         });
      });
   }

   async insertData(name, address, latitude, longitude) {
      try {
         const tableExists = await this.checkTableExists();

         if (tableExists) {
            await this.createTable();
         }

         return new Promise((resolve, reject) => {
            const query =
               "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
            db.query(query, [name, address, latitude, longitude], (error, results) => {
               if (error) {
                  console.error("Error inserting data:", error);
                  return reject(error);
               }
               resolve(results);
            });
         });
      } catch (error) {
         console.error("Error in insertData method:", error);
         throw error;
      }
   }

   async getAllData(latitude, longitude) {
      return new Promise((resolve, reject) => {
         //Haversine formula
         const query = `SELECT id, name, address, latitude, longitude,
         (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +sin(radians(?)) * sin(radians(latitude)))) 
         AS distance FROM schools ORDER BY distance;`;

         db.query(query, [latitude, longitude, latitude], (error, results) => {
            if (error) {
               console.error("Error fetching data:", error);
               return reject(error);
            }

            resolve(results);
         });
      });
   }
}

const helper = new Helper();

exports.insertNewData = async (name, address, latitude, longitude) => {
   try {
      let result = await helper.insertData(name, address, latitude, longitude);
      return result.insertId;
   } catch (error) {
      console.error("Error in insertNewData:", error);
      throw error;
   }
};

exports.getList = async (latitude, longitude) => {
   try {
      let result = await helper.getAllData(latitude, longitude);

      return result;
   } catch (error) {
      console.error("Error in getList:", error);
      throw error;
   }
};
