import axios from 'axios'
import { MTP_PARKING } from '../constant/parking.js';
import { parseString } from 'xml2js';

const toObject = (arr, key) => arr.reduce((a, b) => ({ ...a, [b[key]]: b }), {});

export const getAllParking = async () => {
    const response = await axios.get(process.env.URL_PARKING_FR);
    const data = await response.data.records
          .filter((i) => {
            return i.fields.com_name === 'Montpellier'
          })
          .map((i) => {
              return {
                address: i.fields.address,
                name: i.fields.name,
                latitude: i.fields.ylat,
                cost_2h: i.fields.cost_2h,
                cost_3h: i.fields.cost_3h,
                cost_4h: i.fields.cost_4h,
                com_name: i.fields.com_name,
                longitude: i.fields.xlong,
              }  
          });   
           
    const finalData = await toObject(data, "name");
    
    return formatObject(finalData);
}

export const getParkingPlace = async (parkingName) => {
    return await axios.get(`${process.env.URL_PARKING_MTP}${parkingName}.xml`)
}
  

const XMLTreatment = async (parkingName) => {
  
    const response = await getParkingPlace(parkingName);
    let finalResult;
    parseString(response.data, (err, result) => {
        if(result){
          finalResult = result;
        }
    })
    return finalResult;
}

const formatObject = async (data) => {
  for(let key in data){
    if(MTP_PARKING[data[key]["name"]]){
      let parkingInfo = await XMLTreatment(MTP_PARKING[data[key]["name"]]);
      data[key].free=parkingInfo.park.Free[0];
      data[key].total=parkingInfo.park.Total[0];
      data[key].status=parkingInfo.park.Status[0];
      data[key].datetime=parkingInfo.park.DateTime[0];
    }
  }
  return data;
  
}