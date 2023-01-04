import { intiContext, addTable } from "./api.js"


const { layer } = intiContext("container")

addTable(layer,{tableName:"ct2_file",comment:"文件上传信息",tableFields:[{name:"id",type:"int"},{name:"title",type:"string"},{name:"path",type:"string"},{name:"type",type:"varchar"},{name:"size",type:"int"},{name:"update_date",type:"datetime"}]})


addTable(layer,{tableName:"cu_animal",comment:"动物",tableFields:[{name:"id",type:"int"},{name:"natification",type:"string"}]})

