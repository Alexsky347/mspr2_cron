import axios from "axios";
import {MTP_PARKING} from "../constant/parking.js";
import {parseString} from "xml2js";
const nameArr =  ['Europa','Sabines','Arc de Triomphe','Garcia Lorca','Comédie','Pitot','Mosson','Euromédecine','Triangle','Occitanie','Corum','Arceaux','Gambetta','Polygone','Antigone']
const roadArr =  ['Rue Poséidon','avenue du Colonel Pavelet','rue Foch','avenue de Palavas','place de la Comedie','rue du Carré du Roi','route de Lodève','rue de Chambert','rue Foch','avenue du Doyen Giraud','rue du Faubourg de Nimes','place Max Rouquette','cours Gambetta','rue des Pertuisanes','boulevard d\'Antigone']
const lat = [43.6078,43.5838,43.611,43.591,43.6086,43.6122,43.6162,43.639,43.6092,43.6346,43.6139,43.6117,43.607,43.6084,43.6087]
const long = [3.89253,3.86022,3.8732,3.89072,3.87976,3.87019,3.81967,3.82772,3.88184,3.8486,3.88226,3.86749,3.87137,3.88477,3.88882]
const total = [593,283,445,395,774,587,423,255,436,627,450,233,434,1911,239]
const startMonth = '07';
const hour = 12;
const min = '04';
let place = 0;
let index = 0;
const date =  (hour,tmonth,day) => {
    if (hour<10 && day<10){
        return '2022-'+tmonth+'-0'+day+' 0'+hour+':05:43'
    }else if (hour<10 && !day<10){
        return '2022-'+tmonth+'-'+day+' 0'+hour+':05:43'
    }else if (!hour<10 && day<10){
        return '2022-'+tmonth+'-0'+day+' '+hour+':05:43'
    }else{
        return '2022-'+tmonth+'-'+day+' '+hour+':05:43'
    }

}
const random = (total,hour,day) =>{
    let rand = Math.floor(Math.random() * total/100)
    if (hour>20 && hour<8){
        return total -100-rand
    }else{
        let calcul = total -day*hour+rand
        if (Math.sign(calcul)===-1)return calcul*-1
        else return calcul
    }
}

export const makeObj = async (day) => {
    let arr = [];
    let json;

    for (let i = 0; i < 24; i++) {
        let j = 0;
        nameArr.forEach((data)=>{
            let free = random(total[j],i,day)
            json={
                name: data,
                address: roadArr[j],
                latitude: lat[j],
                longitude: long[j],
                total: total[j],
                com_name: 'Montpellier',
                date: date(i,startMonth,day),
                hours: i,
                month: startMonth,
                day: day,
                number_used:total[j] - free,
                free:free,
                status:'open'
            }
            arr.push(json)
            j++
        })

    }
    return arr

}

const toObject = (arr, key) =>
    arr.reduce((a, b) => ({...a, [b[key]]: b}), {});

export const getAllParking = async () => {
    const response = await axios.get(process.env.URL_PARKING_FR);
    const data = await response.data.records
        .filter((i) => {
            return i.fields.com_name === "Montpellier";
        })
        .map((i) => {
            return {
                address: i.fields.address,
                name: i.fields.name,
                latitude: i.fields.ylat,
                // cost_2h: i.fields.cost_2h,
                // cost_3h: i.fields.cost_3h,
                // cost_4h: i.fields.cost_4h,
                com_name: i.fields.com_name,
                longitude: i.fields.xlong,
            };
        });

    const finalData = await toObject(data, "name");
    return formatObject(finalData);
};

export const getParkingPlace = async (parkingName) => {
    return await axios.get(`${process.env.URL_PARKING_MTP}${parkingName}.xml`);
};

const XMLTreatment = async (parkingName) => {
    const response = await getParkingPlace(parkingName);
    let finalResult;
    parseString(response.data, (err, result) => {
        if (result) {
            finalResult = result;
        }
    });
    return finalResult;
};

const formatObject = async (data) => {
    let arr=[];
    let i=0;
    for (let key in data) {
        if (MTP_PARKING[data[key]["name"]]) {
            let parkingInfo = await XMLTreatment(MTP_PARKING[data[key]["name"]]);
            // data[key].free = parkingInfo.park.Free[0];
            // data[key].total = parkingInfo.park.Total[0];
            // data[key].status = parkingInfo.park.Status[0];
            // data[key].datetime = parkingInfo.park.DateTime[0];
            arr[i]= {
                address: data[key].address,
                name: data[key].name,
                latitude: data[key].latitude,
                com_name: data[key].com_name,
                longitude: data[key].longitude,
                free: parseInt(parkingInfo.park.Free[0]),
                total: parseInt(parkingInfo.park.Total[0]),
                number_used:parseInt(parkingInfo.park.Total[0])-parseInt(parkingInfo.park.Free[0]),
                status: parkingInfo.park.Status[0],
                date: new Date(parkingInfo.park.DateTime[0]),
                hours: new Date(parkingInfo.park.DateTime[0]).getUTCHours() + ':' + new Date(parkingInfo.park.DateTime[0]).getMinutes(),
                month: new Date(parkingInfo.park.DateTime[0]).toLocaleString('en', { month: 'long' }),
                day: new Date(parkingInfo.park.DateTime[0]).toLocaleString('en-us', {weekday:'long'}),
            }
            i++
        }
    }
    return arr;
};
