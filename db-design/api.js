import konva from "../libs/konva/konva.min.js"
const { Stage, Layer, Rect, Group, Text } = konva

//容器背景色
const containerBackground = "#323437"

//初始化容器
export const intiContext = (container) => {
    let stage = new Stage({ container, width: window.innerWidth, height: window.innerHeight })
    let layer = new Layer()
    stage.add(layer)
    stage.getContainer().style.background = containerBackground
    return { stage, layer }
}

//添加表格
export const addTable = (layer, tableData) => {
    const containerGroup = new Group({ draggable: true })
    const locationConfig = { x: 20, y: 60, width: 300 }
    //表格整个高度
    let height = 0
    //表格标题
    let complexText = new Text({
        ...locationConfig,
        text: tableData.tableName,
        fontSize: 16,
        fill: '#fff',
        padding: 20,
        align: 'center',
    })
    //标题背景
    let rect = new Rect({
        ...locationConfig,
        fill: '#009933',
        height: complexText.height(),
        cornerRadius: [5, 5, 0, 0],
    })
    height += rect.height()
    //所有的字段
    const allFiledText = tableData.tableFields.map(item => {
        let text = new Text({
            ...locationConfig,
            y: locationConfig.y + height,
            text: item.name + ":" + item.type,
            fontSize: 14,
            fill: "#666",
            padding: 15,
            // align: 'center',
        });
        height += text.height()
        return text;
    })

    //表格整体背景
    let background = new Rect({
        ...locationConfig,
        fill: "#fff",
        height: height,
        cornerRadius: 5,
        shadowColor: '#000',
        shadowBlur: 10,
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowOpacity: 0.2,
        cornerRadius: 5,
    });
    containerGroup.add(background)
    //表格内容
    containerGroup.add(rect)
    containerGroup.add(complexText)
    allFiledText.forEach(item => containerGroup.add(item))

    containerGroup.cache()
    layer.add(containerGroup)
    return containerGroup
}