import {createObjectCsvWriter as csvWriter } from 'csv-writer';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {getAllParking} from "./index.js";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// export const names = async () => {
//     let allParkings = await getAllParking()
//     allParkings.forEach((key) => {
//         if (!fs.existsSync(path.resolve(__dirname,key.name+'.csv'))){
//             console.log("ici le nom"+key.name)
//             return key.name
//         }
//     })
// }
// export const index = async (value) => {
//     await csvCreater.writeRecords(value)
// }
// export const csvCreater = csvWriter({
//     path: path.resolve(__dirname,await names()+'.csv'),
//     header: [
//         {id: 'name', title: 'Name'},
//         {id: 'address', title: 'address'},
//         {id: 'com_name', title: 'com_name'},
//         {id: 'latitude', title: 'latitude'},
//         {id: 'longitude', title: 'longitude'},
//         {id: 'free', title: 'free'},
//         {id: 'total', title: 'total'},
//         {id: 'number_used', title: 'number_used'},
//         {id: 'status', title: 'status'},
//         {id: 'date', title: 'date'},
//     ]
// });

