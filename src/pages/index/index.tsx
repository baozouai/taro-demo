import { View, Button, Text } from '@tarojs/components'
import {observer} from 'mobx-react'
import useBearStore from '../../store/counter'
import './index.less'



function Index () {

  const {bears, increasePopulation, removeAllBears } = useBearStore()

    return (
      <View className='index'>
        <Button onClick={increasePopulation}>+</Button>
        <Button onClick={removeAllBears}>removeAllBears</Button>
        <Text>{bears}</Text>
      </View>
    )

}

export default Index
