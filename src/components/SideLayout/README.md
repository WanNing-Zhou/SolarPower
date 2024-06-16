目前获取station信息的方式有两种: 
1. 通过route中的query参数获取
2. 菜单在点击时保存station信息到stationStore中(这里的store使用pinia实现, 可通过`store/pinia/station/index`中进行查看)

修改意见: 后续在使用station信息的时候可以通过`useStationStore()`来获取station信息, 而不是通过`route.query`来获取.