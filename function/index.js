import axios from 'axios'

const url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=mobilityref-france-base-nationale-des-lieux-de-stationnement&q=&facet=user_type&facet=dep_name&facet=reg_name&facet=dep_code&facet=reg_code&rows=1000&pretty_print=true&start=0';

export const getAllParking = () => {
    return axios
      .get(url)
      .then((response) => {
        return response.data.records
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
          })
      })
      .catch((error) => {
        throw error
      })
}