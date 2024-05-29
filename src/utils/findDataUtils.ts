
// 获取菜单tree
export const getCSArray = (stationArr : any, CPTree: any) => {
    const res: any = []
    CPTree.forEach( (company:any) => {
        const tempR: any = []
        company.stations.forEach((station: any) => {
            stationArr.forEach((item: any) => {
                if(item == station.id){
                    tempR.push({
                        id: station.id,
                        label: station.name
                    })
                }
            })
        })

        if(tempR.length){
            res.push({
                id: company.id,
                label: company.name,
                children: tempR
            })
        }
    })
    console.log('res', res)
    return res;
}

// 获取option
export const getCSOption = (stationArr : any[], optionTree: any[]) => {
    const res:any[] = []
    optionTree.forEach( (company:any) => {
        company.children.forEach((station: any) => {

            stationArr.forEach((item: any) => {
                // console.log('wula',item , station.value, item == station.value)
                if (item === station.value) {
                    // console.log('a,aha')
                    // res.push({
                    //     id: station.value,
                    //     label: station.label
                    // })

                    res.push([company.value, station.value])
                }
            })
        })
    })

    return res
}
