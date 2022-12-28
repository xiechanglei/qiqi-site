import { intiContext, addTable } from "./api.js"


const { layer } = intiContext("container")

addTable(layer,{tableName:"animal",comment:"动物",tableFields:[{name:"id",type:"int"},{name:"name",type:"string"}]})

